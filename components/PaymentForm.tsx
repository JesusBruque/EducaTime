import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { createPaymentIntent, afterPayment } from "../utils/Order";
import Input from "./Input";
import Button from "./Button";
import ErrorsPanel from "./ErrorsPanel";
const PaymentForm = ({ router, cursoId, plazo, utils, stay = null, code = null }) => {
    const [values, setValues] = useState({ email: '', name: '' });
    const [errors, setErrors] = useState(Object);

    const setErrorInput = (property) => (err: string) => setErrors({ ...errors, [property]: err });
    const setValue = (property) => (val: string | number) => setValues({ ...values, [property]: val });

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    const cardStyle = {
        style: {
            base: {
                color: "var(--black-color)",
                fontFamily: 'Lato, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "1em",
                lineHeight: '1.3em',
                "::placeholder": {
                    color: "#707070"
                },
            },
            invalid: {
                color: "#fc585d",
                iconColor: "#fc585d"
            }
        }
    };
    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? [{ 'fallo al pagar': event.error.message }] : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        let id = cursoId ? cursoId : router.query.pcid;
        const paymentResponse = await createPaymentIntent(id, plazo, code.code).catch(() => router.push('/cursos'));
        const clientSecret = paymentResponse.data.clientSecret;
        const payload = await stripe.confirmCardPayment(clientSecret, {
            receipt_email: values.email,
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: values.name
                }
            }
        });
        if (payload.error) {
            console.log(payload.error);
            setError([{ 'fallo al pagar': payload.error.message }]);
            setProcessing(false);
            utils.removeLoader();
        } else {
            const payment = await afterPayment({
                amount: payload.paymentIntent.amount,
                plazo: plazo,
                code:code._id,
                client_secret: payload.paymentIntent.client_secret,
                id: payload.paymentIntent.id,
                receipt_email: payload.paymentIntent.receipt_email,
                status: payload.paymentIntent.status,
                curso: cursoId,
                name:values.name
            });
            setError(null);
            setProcessing(false);
            if (!stay) router.push('/cursos/payment/succeded');
            else stay()
        }
    };

    const styleInputs = {
        backgroundColor: '#eef8ff',
        padding: '8px 15px',
        boxShadow: 'none',
    };

    return (
        <React.Fragment>
            <form id="payment-form" onSubmit={handleSubmit}>
                <Input value={values.name} setValue={setValue('name')} type={'text'} icon={'/assets/icons/user.svg'} placeHolder={'Nombre'}
                    name={'name'} validators={['required']} error={errors.name} setError={setErrorInput('name')} styles={styleInputs} />
                <Input value={values.email} setValue={setValue('email')} type={'text'} icon={'/assets/icons/mail.svg'} placeHolder={'Email'}
                    name={'email'} validators={['email', 'required']} error={errors.email} setError={setErrorInput('email')} styles={styleInputs} />
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} className={'card-input--element'} />

                <Button disabled={processing} color={'blue'} text={'Realizar Pago'} type={'submit'} styles={{ padding: '8px 15px', width: 'fit-content', fontSize: '1.2em', color: 'white' }} />

            </form>
            {error && <ErrorsPanel errors={error} close={() => setError(null)} />}

        </React.Fragment>
    )
};

export default PaymentForm;
