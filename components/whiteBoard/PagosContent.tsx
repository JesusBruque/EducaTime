import React,{ useState } from "react";
import PaymentForm from '../PaymentForm'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUserData } from '../../utils/Authentication';
const stripePromise = loadStripe("pk_test_h8X3p5zwiygmbpvGOFkRDWh000GKTO0Rln");
import styles from '../../styles/whiteBoard/Pagos.module.css';
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const PagosContent = ({ user, setUser, utils, router }) => {
    const cursosInfo = user && user.cursos ? user.cursos : [];
    const [pagando, setPagando] = useState(null);
    const [mensaje, setMensaje] = useState(null)


    const handleFinish = () => {
        setPagando(null);
        utils.initLoader();
        utils.startLoader();
        getUserData().then(res => {
            if (res.status === 200) {
                utils.removeLoader();
                setUser(res.data.user);
            } else {
                utils.removeLoader();
            }
        }).catch(err => console.error(err));
        setMensaje('Se ha realizado el pago satisfactoriamente.');
        setTimeout(() => { setMensaje(null) }, 5 * 1000);
    };

    const manageShowAction = (fee, index: number, x) => {
        const fees = x.feeState;
        if (fee.paid === true) return <span style={{color:'var(--green-color)',fontWeight:'bold'}}><FontAwesomeIcon style={{marginRight:'8px'}} icon={faCheckCircle} />PAGADO</span>;
        if (fees && fees[index - 1] && fees[index - 1].paid === true) return <Button color={'blue'} text={'Pagar ahora'} action={() => { setPagando({ fee, plazo: index, cursoId: x.idCurso._id }) }} />;
        return <span style={{color:'var(--red-color)',fontWeight:'bold'}}><FontAwesomeIcon style={{marginRight:'8px'}} icon={faTimesCircle}/>PENDIENTE DE PAGO</span>;
    };

    return (
        <div className={styles.container}>
            {cursosInfo && cursosInfo.length > 0 && cursosInfo.map(x => {
                const nombre = x && x.idCurso && x.idCurso.title;
                return (<React.Fragment>
                        <table className={styles.pagosTable}>
                            <thead>
                            <tr>
                                <th colSpan={3}><span style={{fontSize:'1.2em',fontWeight:'bold',textTransform:'uppercase',color:'var(--main-color)'}}>{nombre}</span></th>
                            </tr>
                            <tr>
                                <th>CUANTÍA</th>
                                <th>FECHA VENCIMIENTO</th>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>
                            {x.feeState && x.feeState.length > 0 && x.feeState.map((fee, index) => {
                                const feeInfo = x && x.idCurso && x.idCurso.fees && x.idCurso.fees.find(x => x._id + '' === fee.idFee + '');
                                if (!feeInfo) return <div />
                                let td3 = <div> {manageShowAction(fee, index, x)}</div>;

                                return <tr key={index}>
                                    <td><span>{feeInfo && feeInfo.fee}€</span></td>
                                    <td><span style={fee.paid ? {} :{color:'var(--red-color)',fontWeight:'bold'}}>{new Date(feeInfo.date).toLocaleDateString()}</span></td>
                                    <td style={{fontWeight:'bold'}}>{(pagando && pagando.fee && pagando.fee._id + '' === fee._id + '') ? 'EN PROCESO DE PAGO' : td3}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        {pagando && pagando.cursoId === x.idCurso._id &&
                        <Elements stripe={stripePromise}>
                            <PaymentForm stay={handleFinish} router={router} cursoId={pagando.cursoId} plazo={pagando.plazo} utils={utils} />
                        </Elements>
                        }
                    </React.Fragment>
                   )
            })}

            {mensaje && <p>{mensaje}</p>}
        </div>)
}
export default PagosContent;
