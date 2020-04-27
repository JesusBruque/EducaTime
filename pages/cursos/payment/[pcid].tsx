import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React,{useEffect} from 'react';
import PaymentForm from "../../../components/PaymentForm";
import {getCourseById} from "../../../utils/Curso";
import utilsStyles from "../../../styles/Utils.module.css";
import pagoStyles from "../../../styles/Pago.module.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const payCurso = ({router,curso}) => {

    const getPrice = () => {
        return curso.fees ? curso.fees[0].toFixed(2) : curso.original_fee;
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


    return (
        <div className={utilsStyles.sectionContainer} >
            <h1 className={utilsStyles.sectionTitle}>Confirmación del pago</h1>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                <div>
                    <h4 style={{color:'#70a0af'}}>Detalles de pago</h4>
                    <Elements stripe={stripePromise}>
                        <PaymentForm router={router} cursoId={curso._id}/>
                    </Elements>
                </div>
                <div className={pagoStyles.payResume}>
                    <h3 className={pagoStyles.titleResume}>Resumen de pedido</h3>
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
                </div>
            </div>
        </div>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.pcid);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default payCurso;
