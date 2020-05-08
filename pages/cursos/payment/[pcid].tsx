import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React,{useEffect, useState} from 'react';
import PaymentForm from "../../../components/PaymentForm";
import {getCourseById} from "../../../utils/Course";
import utilsStyles from "../../../styles/Utils.module.css";
import pagoStyles from "../../../styles/Pago.module.css";
import radioStyle from "../../../styles/Utils.module.css";
import moment from 'moment';
import Layout from "../../../components/Layout";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const payCurso = (props) => {
    const {curso, router} =props;
    const [unicFee,setunicFee] = useState(true);

    const getPrice = () => {
        if(unicFee){
            return curso.original_fee;
        }
        return curso.fees[0].fee;
    };
    const getDisccount = () => {
        return (getPrice()*(curso.discount/100));
    };
    const getIVA = () => {
        return (getPrice()-getDisccount())*0.21;
    };
    const getTotal = () => {
        return (getPrice()-getDisccount()) + getIVA();
    };
    const tipoDePago = {
        display: "flex",
        justifyContent: "space-evenly"
    }
    let a = 1;
    const plazosList = curso.fees.map(function (plazo){ return <li style={{fontSize:'.8em'}}>Plazo número {a++}: <b>{plazo.fee}€.</b> Vence el <b style={{color:'var(--red-color)'}}>{moment(plazo.date).format('DD/MM/YYYY')}</b></li>});
    return (
        <Layout setUser={props.setUser} utils={props.utils} router={props.router} user={props.user}>
            <div className={utilsStyles.sectionContainer} >
                <h1 className={utilsStyles.sectionTitle}>Confirmación del pago</h1>
                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                    <div>
                        <h4 style={{color:'#70a0af',fontSize:'1.6em'}}>Detalles de pago</h4>
                        <Elements stripe={stripePromise}>
                            <PaymentForm router={router} cursoId={curso._id} plazo={!unicFee}/>
                        </Elements>
                    </div>
                    <div className={pagoStyles.payResume}>
                        <h3 className={pagoStyles.titleResume}>Resumen de pedido</h3>
                        { curso.fees && curso.fees.length > 0 &&
                        <div style={tipoDePago}>
                            <label className={radioStyle.labelForRadio}>
                                <span>Pago único</span>
                                <input onChange={()=>{setunicFee(true)}} className= {radioStyle.inputRadio} type="radio" name="tipoDePago" checked={unicFee}/>
                                <span className = {radioStyle.spanForRadio}></span>
                            </label>
                            <label className={radioStyle.labelForRadio}>
                                <span>Pago a plazos</span>
                                <input onChange={()=>{setunicFee(false)}} className= {radioStyle.inputRadio} type="radio" name="tipoDePago" checked={!unicFee}/>
                                <span className = {radioStyle.spanForRadio}></span>
                            </label>
                        </div>
                        }
                        <br/>
                        <br/>
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
                                <td>{getDisccount().toFixed(2)}€</td>
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
                        {!unicFee && <div>*Los plazos de pagos son los siguientes:<ul>{plazosList}</ul>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.pcid);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default payCurso;
