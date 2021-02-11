import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Plan2 = (props) => {
    const [active, setActive] = useState(false)
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [type, setType] = useState()

    const stripePromise = loadStripe('pk_live_u4e03SLJFJMC8k4Bv7g1T3Py00rrpMeJLo');

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('type')) setType(localStorage.getItem('type'))
    }, [])

    return (
                <Elements stripe={stripePromise}>
                    <CheckoutForm setGoodPay={props.setGoodPay} emailSub={props.emailSub} passwordSub={props.passwordSub} />
                </Elements>
    );
};

export default Plan2