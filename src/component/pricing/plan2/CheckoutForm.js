import React, { useEffect, useState } from 'react'
import {url} from '../../../api/url'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import loadGif from '../../../image/load.gif'

const CheckoutForm = ({phone, setPhone, vonagePhone, setVonagePhone, service}) => {

    const [verifPhone, setVerifPhone] = useState('')
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const elements = useElements();
    const stripeFunction = useStripe();

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#ffffff',
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#ffffff' },
                '::placeholder': { color: '#ffffff' },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    const subscription = async (event) => {
        if (!phone || phone.lenght < 10) setError('Veuillez entrer votre numéro de téléphone')
        else if (phone !== verifPhone) setError(`Veuillez répéter correctement votre numéro de téléphone`)
        else {
            setLoad(true)
            fetch(`${url}/create-customer`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phone
                })
            })
                .then(response => {
                    if (!response) setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                    else return response.json();
                })
                .then(result => {
                    // result.customer.id is used to map back to the customer object
                    // result.setupIntent.client_secret is used to create the payment method
                    if (result) createPaymentMethod(elements.getElement(CardElement), result.customer.id, 'price_1IJy1FKleZ50Ivn6jrJjguT9')
                });
        }

    }

    function createPaymentMethod(cardElement, customerId, priceId) {
        return stripeFunction
            .createPaymentMethod({
                type: 'card',
                card: cardElement,
            })
            .then((result) => {
                if (result.error) {
                    setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                } else {
                    createSubscription({
                        customerId: customerId,
                        paymentMethodId: result.paymentMethod.id,
                        priceId: priceId,
                    });
                }
            });
    }

    async function createSubscription({ customerId, paymentMethodId, priceId }) {
        const resSub = await fetch(`${url}/create-subscription`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                paymentMethodId: paymentMethodId,
                priceId: priceId,
            }),
        })
            .then((response) => {
                console.log(response)
                return response.json();
            })
            // If the card is declined, display an error to the user.
            .then(async (result) => {
                console.log(result)
                if (result.error) {
                    // The card had an error when trying to attach it to a customer.
                    setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                    throw result;
                }
                setVonagePhone(result.phone)
                const resRegister = await fetch(`${url}/command/create`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone_vonage: result.phone,
                        phone_client: phone,
                        service: service,
                        customer_id : customerId
                    }),
                })
                if(resRegister){
                    const resJson = await resRegister.json()
                }
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
            setLoad(false)
        }, 7000)
    }, [error])


    return (
        <div className="contentPlanStripe" >
            {error && <p style={{fontSize: '15px', color: 'red'}} className="errorPay">{error}</p>}
            {!load ?
                <>
                    <input className="inputPricing" onChange={(e) => setPhone(e.target.value)} placeholder="Votre numéro de téléphone" />
                    <input className="inputPricing" onChange={(e) => setVerifPhone(e.target.value)} placeholder="Confirmer votre numéro" />
                </>
                : <img style={{ width: "50%" }} src={loadGif} />}

            <div className="inputPricingCard">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <button onClick={() => subscription()} type="submit" className="buttonBuyPricing"><p className="titleBuy">Obtenir nouveau compte 5€ </p></button>
        </div>
    )
}

export default CheckoutForm