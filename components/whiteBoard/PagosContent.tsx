import { useState } from "react";
import PaymentForm from '../PaymentForm'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUserData } from '../../utils/Authentication';
const stripePromise = loadStripe("pk_test_h8X3p5zwiygmbpvGOFkRDWh000GKTO0Rln");
const PagosContent = ({ user, setUser, utils, router }) => {
    const cursosInfo = user && user.cursos ? user.cursos : [];
    const [pagando, setPagando] = useState(null);
    const [mensaje, setMensaje] = useState(null)


    const handleFinish = () => {
        setPagando(null)
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
        setMensaje('Se ha realizado el pago satisfactoriamente.')
        setTimeout(() => { setMensaje(null) }, 5 * 1000)
    }
    const manageShowAction = (fee, index: number, x) => {
        const fees = x.feeState;
        if (fee.paid === true) return 'PAGADO';
        if (fees && fees[index - 1] && fees[index - 1].paid === true) return <button onClick={() => { setPagando({ fee, plazo: index, cursoId: x.idCurso._id }) }}>PAGAR AHORA</button>;
        return 'PENDIENTE DE PAGO';
    }
    return (
        <div>
            {cursosInfo && cursosInfo.length > 0 && cursosInfo.map(x => {
                const nombre = x && x.idCurso && x.idCurso.title;
                return (<table>
                    <thead>
                        <tr>
                            <td colSpan={3}><span>{nombre}</span></td>
                        </tr>
                        <tr>
                            <td>CUANTÍA</td>
                            <td>FECHA VENCIMIENTO</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {x.feeState && x.feeState.length > 0 && x.feeState.map((fee, index) => {
                            const feeInfo = x && x.idCurso && x.idCurso.fees && x.idCurso.fees.find(x => x._id + '' === fee.idFee + '');
                            if (!feeInfo) return <div />
                            let anterior = null;
                            let td3 = <span>{fee.paid === true ? 'PAGADO' : <button onClick={() => { setPagando({ fee, plazo: index, cursoId: x.idCurso._id }) }}>PAGAR AHORA</button>}</span>;
                            td3 = <span> {manageShowAction(fee, index, x)}</span>

                            return <tr key={index}>
                                <td><span>{feeInfo && feeInfo.fee}€</span></td>
                                <td><span>{new Date(feeInfo.date).toLocaleDateString()}</span></td>
                                <td>{(pagando && pagando.fee && pagando.fee._id + '' === fee._id + '') ? 'EN PROCESO DE PAGO' : td3}</td>
                            </tr>
                        })}
                    </tbody>
                </table>)
            })}

            {pagando &&
                <Elements stripe={stripePromise}>
                    <PaymentForm stay={handleFinish} router={router} cursoId={pagando.cursoId} plazo={pagando.plazo} utils={utils} />
                </Elements>}
            {mensaje && <p>{mensaje}</p>}
        </div>)
}
export default PagosContent;
