import React, {useEffect, useState} from 'react'
import Pricing from '../pricing/Pricing'
import ubereats from '../../image/ubereats.png'
import delivroo from '../../image/delivroo.png'
import './Landing.css'

const Landing = () => {
    const [paymentType, setPaymentType] = useState('')
    const [service, setService] = useState('')
    const [serviceValid, setServiceValid] = useState(false)
    const [vonagePhone, setVonagePhone] = useState('')
    const [phone, setPhone] = useState('')

    return(
        <div className="container">
            {!vonagePhone ?
            <>
            <p className="titleBold">En moyenne 15€ d'économie</p>
            <p className="title">Sur votre première commande avec un nouveau compte Uber eats et Delivroo</p>
            <div className="content">
            {!paymentType && !service ?
            <>
            <p className="headContent">CRÉEZ UN NOUVEAU COMPTE POUR SEULEMENT 5€</p>
            <p className="headContent2">Quel nouveau compte souhaitez vous obtenir ?</p>
            <img onClick={() => setService('Uber eats')} className="marque" src={ubereats}/>
            <img onClick={() => setService('Delivroo')} className="marque" src={delivroo}/>
            </>
            : service && !paymentType && !serviceValid ?

            <>
            {service === 'Uber eats' ?
            <div style={{marginTop: '60px'}} className="column">
            <img className="marque" src={ubereats}/>
            <a href="https://codepromo.20minutes.fr/code-promo/uber-eats" target="_blank" rel="nopooner noreferrer"
            className="voirpromo">VOIR LES PROMOTIONS</a>
            <button style={{marginTop: '5px', marginBottom: '5px'}} onClick={() => setServiceValid(true)} className="voirpromo">OBTENIR UN NOUVEAU COMPTE</button>
            </div>
            :
            <div style={{marginTop: '60px'}} className="column">
            <img className="marque" src={delivroo}/>
            <a href="https://codepromo.20minutes.fr/code-promo/deliveroo" target="_blank" rel="nopooner noreferrer"
             style={{marginTop: '5px', marginBottom: '5px'}} className="voirpromo">VOIR LES PROMOTIONS</a>
            <button onClick={() => setServiceValid(true)} className="voirpromo">OBTENIR UN NOUVEAU COMPTE</button>
            </div>}
            </>
            : service && !paymentType && serviceValid ?

            <>
            <p style={{marginTop: '20px', maxWidth: '100%'}} className="title">Obtenez un numéro de téléphone et un code d'activation
             <span style={{fontWeight: 'bold', marginLeft: '5px', marginRight: '5px'}}>{service}</span> en 2 minutes pour 5€</p>
            <p className="headContent2">Sélectionnez votre mode de paiement</p>
            <button onClick={() => setPaymentType('card')} className="buttonPayment"/>
            </>
            : paymentType === 'card' &&
                <Pricing setPhone={setPhone} phone={phone} vonagePhone={vonagePhone} setVonagePhone={setVonagePhone} service={service} />
            }
            </div>
            </>
            :
            <div className="content">
                <p style={{fontSize: '25px', marginBottom: '0px'}} className="title">Votre numéro de téléphone : </p>
            <p style={{fontSize: '30px'}} className="titleBold">{vonagePhone}</p>
            <p style={{fontSize: '20px'}} className="title">Merci pour votre commande !<br/><br/> Votre numéro d'activation pour votre compte {service}{' '}
            sera reçu sur votre numéro attribué {vonagePhone}<br/><br/>
            Puis automatiquement renvoyé par SMS sur votre numéro personnel {phone}.<br/><br/>
            <span style={{fontSize: '18px'}}> Merci de ne pas relancer la procédure d'inscription plusieurs fois d'affilée, le transfert du code d'activation peut prendre entre 1 et 5 minutes</span>.</p>

                </div>}
        </div>
    )
}

export default Landing