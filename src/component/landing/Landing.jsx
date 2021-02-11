import React, {useEffect, useState} from 'react'
import Pricing from '../pricing/Pricing'
import ubereats from '../../image/ubereats.png'
import delivroo from '../../image/delivroo.png'
import './Landing.css'

const Landing = () => {
    const [paymentType, setPaymentType] = useState('')
    const [service, setService] = useState('')
    const [serviceValid, setServiceValid] = useState(false)

    return(
        <div className="container">
            <p className="titleBold">En moyenne 20€ d'économie</p>
            <p className="title">Sur votre première commande avec un nouveau compte Uber eats et Delivroo</p>
            <div className="content">
            {!paymentType && !service ?
            <>
            <p className="headContent">CÉEZ VOUS UN NOUVEAU COMPTE POUR SEULEMENT 5€</p>
            <p className="headContent2">Quel nouveau compte souhaitez vous obtenir ?</p>
            <img onClick={() => setService('Uber eats')} className="marque" src={ubereats}/>
            <img onClick={() => setService('Delivroo')} className="marque" src={delivroo}/>
            </>
            : service && !paymentType && !serviceValid ?

            <>
            <img className="marque" src={ubereats}/>
            <a href="https://www.nouvelobs.com/codepromo/uber-eats#id-91119478" target="_blank" rel="nopooner noreferrer"
            className="voirpromo">VOIR LES PROMOTIONS</a>
            <button style={{marginTop: '5px', marginBottom: '5px'}} onClick={() => setServiceValid(true)} className="voirpromo">OBTENIR UN NOUVEAU COMPTE</button>
            <img className="marque" src={delivroo}/>
            <a href="https://codepromo.20minutes.fr/code-promo/deliveroo" target="_blank" rel="nopooner noreferrer"
             style={{marginTop: '5px', marginBottom: '5px'}} className="voirpromo">VOIR LES PROMOTIONS</a>
            <button onClick={() => setServiceValid(true)} className="voirpromo">OBTENIR UN NOUVEAU COMPTE</button>
            </>
            : service && !paymentType && serviceValid ?

            <>
            <p style={{marginTop: '20px', maxWidth: '100%'}} className="title">Obtenez un numéro de téléphone et un code d'activation
             <span style={{fontWeight: 'bold', marginLeft: '5px', marginRight: '5px'}}>{service}</span> en 2 minutes</p>
            <p className="headContent2">Sélectionnez votre mode de paiement</p>
            <button onClick={() => setPaymentType('card')} className="buttonPayment"/>
            </>
            : paymentType === 'card' &&
                <Pricing/>
            }
            </div>
        </div>
    )
}

export default Landing