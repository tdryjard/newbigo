import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import Plan2 from './plan2/Plan2'
import './Pricing.css'

const Pricing = ({phone, setPhone, vonagePhone, setVonagePhone, service}) => {

  const stripePromise = loadStripe('pk_live_u4e03SLJFJMC8k4Bv7g1T3Py00rrpMeJLo');


 const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff', 
        
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: '#87bbfd' },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  return (
        <Elements stripe={stripePromise}>
          <Plan2  setPhone={setPhone} phone={phone} vonagePhone={vonagePhone} setVonagePhone={setVonagePhone} options={CARD_OPTIONS} service={service} />
        </Elements>
  )
}

export default Pricing