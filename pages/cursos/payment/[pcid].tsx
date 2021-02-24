import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from 'react';
import PaymentForm from "../../../components/PaymentForm";
import { getCourseById } from "../../../utils/Course";
import utilsStyles from "../../../styles/Utils.module.css";
import pagoStyles from "../../../styles/Pago.module.css";
import radioStyle from "../../../styles/Utils.module.css";
import moment from 'moment';
import Layout from "../../../components/Layout";
import fetch from "isomorphic-unfetch";
import Footer from "../../../components/Footer";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from 'axios';
import Head from "next/head";

const stripePromise = loadStripe(process.env.CLAVE_PK_STRIPE);

const payCurso = (props) => {
    const { curso, router } = props;
    const [unicFee, setunicFee] = useState(true);
    const [mobile,setMobile] = useState(null);
    const [code,setCode] = useState(null);
    const [codeError, setCodeError] = useState(null);
    const [codeApplied, setCodeApplied] = useState(null);
    useEffect(() => {
        setMobile(document.querySelector('main>div').getBoundingClientRect().height < window.innerHeight);
    },[]);

    const getPrice = (i?) => {
        if (unicFee) {
            return curso.original_fee / 1.21;
        }
        return curso.fees[i? i: 0].fee / 1.21;
    };
    const getCodeDisccount = (i?) => {
        if(codeApplied){
            return (getPrice(i) *  (codeApplied.value / 100));
        }
        return 0;
    }
    const getDisccount = () => {
        return (getPrice() * (curso.discount / 100));
    };
    const getIVA = () => {
        return (getPrice() - getDisccount() - getCodeDisccount()) * 0.21;
    };
    const getTotal = () => {
        return (getPrice() - getDisccount() - getCodeDisccount()) + getIVA();
    };
    const tipoDePago = {
        display: "flex",
        justifyContent: "space-evenly"
    };
    const handleChangePayment = (opt) => {
        setunicFee(opt);
    };
    const handleApplyCode = () => {
        axios.get(process.env.API_URL + '/api/code/checkCode/'+curso._id, {params:{code:code}}).then((res) => {
            if(res.status === 200){
                setCodeApplied(res.data.code);
            }else{
                setCodeError('Ha ocurrido algún error al aplicar el código.')
            }
        }).catch(() => setCodeError('Ha ocurrido algún error al aplicar el código.'));
    };


    let a = 1;
    const plazosList = curso.fees.map(function (plazo, index) { return <li key={index} style={{ fontSize: '.8em' }}>Plazo número {a++}: <b>{index === 0 ? (plazo.fee - getCodeDisccount(index)).toFixed(2) : plazo.fee.toFixed(2)}€.</b> Vence el <b style={{ color: 'var(--red-color)' }}>{moment(plazo.date).format('DD/MM/YYYY')}</b></li> });
    return (
        <Layout setUser={props.setUser} utils={props.utils} router={props.router} user={props.user}>
            <Head>
                <title>Casor - {curso.title}</title>
                <meta name={'description'}  content={'Casor. Curso de formación "'+curso.title + '". ' + curso.description} key={'description'}/>
                <link rel={'icon'} href={'/assets/logo.svg'}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/assets/logo.svg"/>
                <meta property="og:title" content={curso.title}/>
                <meta property="og:description" content={'Casor. Curso de formación "'+curso.title+ '". ' + curso.description}/>
                <meta property="og:image" content={curso.thumbnail}/>
                <meta property="og:url" content={'https://academiaformaciondeportiva.com'+ props.router.pathname} />
            </Head>
            <div className={utilsStyles.sectionContainer} >
                <h1 className={utilsStyles.sectionTitle}>Confirmación del pago</h1>
                <div className={utilsStyles.centeredContainer}>
                    <div className={pagoStyles.pagoContainer}>
                        <div>
                            <h4 style={{ color: '#70a0af', fontSize: '1.6em' }}>Detalles de pago</h4>
                            <Elements stripe={stripePromise}>
                                <PaymentForm router={router} cursoId={curso._id} plazo={unicFee ? null : 0} utils={props.utils} code={codeApplied}/>
                            </Elements>
                        </div>
                        <div className={pagoStyles.payResume}>
                            <h3 className={pagoStyles.titleResume}>Resumen de pedido</h3>
                            {curso.fees && curso.fees.length > 0 &&
                            <div style={tipoDePago}>
                                <label className={radioStyle.labelForRadio}>
                                    <span>Pago único</span>
                                    <input onChange={() => handleChangePayment(true)} className={radioStyle.inputRadio} type="radio" name="tipoDePago" checked={unicFee} />
                                    <span className={radioStyle.spanForRadio}></span>
                                </label>
                                <label className={radioStyle.labelForRadio}>
                                    <span>Pago a plazos</span>
                                    <input onChange={() => handleChangePayment(false)} className={radioStyle.inputRadio} type="radio" name="tipoDePago" checked={!unicFee} />
                                    <span className={radioStyle.spanForRadio}></span>
                                </label>
                            </div>
                            }
                            <br />
                            <br />
                            <table className={pagoStyles.resumeTable}>
                                <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Precio</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{curso.title}</td>
                                    <td>{getPrice().toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td>Descuento aplicado</td>
                                    <td style={{color:'var(--red-color)'}}>- {(getDisccount() + getCodeDisccount()).toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td>IVA 21%</td>
                                    <td>{getIVA().toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td>TOTAL</td>
                                    <td>{getTotal().toFixed(2)}€</td>
                                </tr>
                                </tbody>
                            </table>
                            {
                                <div style={{display:'flex', alignItems:'baseline'}}>
                                    <Input value={code} setValue={setCode} type={'text'} name={'code'} label={'Código descuento'} error={codeError}/>
                                    <Button disabled={codeApplied} styles={{padding:'8px', height:'fit-content', width:'fit-content'}} color={'black'} text={'Aplicar'} action={handleApplyCode}/>
                                </div>
                             }
                            {!unicFee && <div>*Los plazos de pagos son los siguientes:<ul>{plazosList}</ul>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer absolute={mobile}/>
        </Layout>
    )
};
export const getServerSideProps = async ctx => {
    const res = await fetch('http://localhost:3000/api/course/findById/' + ctx.params.pcid);
    const data = await res.json();
    const curso = data.Course;
    return { props: { curso: curso } }
};
export default payCurso;
