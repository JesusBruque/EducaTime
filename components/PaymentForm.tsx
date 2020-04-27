import React, {useState,useEffect} from 'react';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {createPaymentIntent, afterPayment} from "../utils/Order";
import Input from "./Input";
import Button from "./Button";
import inputStyles from "../styles/Input.module.css";
import {Joi} from "celebrate";

const PaymentForm = ({router,cursoId}) => {
    const [values,setValues] = useState({email:'',name:''});
    const [errors,setErrors] = useState(Object);

    const setErrorInput = (property) => (err: string) => setErrors({ ...errors, [property]: err });
    const setValue = (property) => (val: string | number) => setValues({ ...values, [property]: val });

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        let id = cursoId ? cursoId : router.query.pcid;
        createPaymentIntent(id).then(res => {
            setClientSecret(res.data.clientSecret);
            console.log(res.data);
        }).catch(err => {
            router.push('/cursos');
            console.error(err);
        });

    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "var(--black-color)",
                fontFamily: 'Lato, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "1em",
                lineHeight:'1.3em',
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
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
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
            setError(`Pago fállido. ${payload.error.message}`);
            setProcessing(false);
        } else {
            const payment = await afterPayment({
                amount:payload.paymentIntent.amount,
                client_secret:payload.paymentIntent.client_secret,
                id:payload.paymentIntent.id,
                receipt_email:payload.paymentIntent.receipt_email,
                status:payload.paymentIntent.status,
                curso:cursoId});
            console.log(payment);
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const styleInputs = {
        backgroundColor:'#eef8ff',
        padding:'8px 15px',
        boxShadow:'none',
    };

    return (
        <React.Fragment>
            <form id="payment-form" onSubmit={handleSubmit}>
                <Input value={values.name} setValue={setValue('name')} type={'text'} icon={'/assets/icons/user.svg'} placeHolder={'Nombre'}
                       name={'name'} validators={['required']} error={errors.name} setError={setErrorInput('name')} styles={styleInputs}/>
                <Input value={values.email} setValue={setValue('email')} type={'text'}icon={'/assets/icons/mail.svg'} placeHolder={'Email'}
                       name={'email'} validators={['email','required']} error={errors.email} setError={setErrorInput('email')} styles={styleInputs}/>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} className={'card-input--element'}/>

                <Button disabled={processing} color={'blue'} text={'Realizar Pago'} type={'submit'} styles={{padding:'8px 15px',width:'fit-content'}}/>

            </form>

        </React.Fragment>
    )
};

export default PaymentForm;
