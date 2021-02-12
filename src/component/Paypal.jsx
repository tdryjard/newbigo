import React, {useState, useEffect} from 'react'
import {url} from '../api/url'

const Paypal = ({phone, service, setVonagePhone}) => {

    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);

    const paypalRef = React.useRef();



    const paypalPayment = async (data) => {

    }

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Nouveau numéro de téléphone",
                    amount: {
                      currency_code: "EUR",
                      value: 5.00,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);

              
              console.log(order);

              const payment = await fetch(`${url}/payment/paypal`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(payment){
                const resPay = await payment.json()
                setVonagePhone(resPay.phone)
                const resRegister = await fetch(`${url}/command/create`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone_vonage: resPay.phone,
                        phone_client: phone,
                        service: service,
                        customer_id : order.payer.email_addresse
                    }),
                })
            }

            },
            onError: (err) => {
            //   setError(err),
              console.error(err);
              alert(err)
            },
          })
          .render(paypalRef.current);
      }, []);
      return(
          <div className="paypalContainer">
      <div ref={paypalRef} />
          </div>
      )
}

export default Paypal