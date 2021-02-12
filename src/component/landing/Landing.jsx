import React, {useEffect, useState} from 'react'
import Pricing from '../pricing/Pricing'
import ubereats from '../../image/ubereats.png'
import delivroo from '../../image/delivroo.png'
import { PayPalButton } from "react-paypal-button-v2";
import Paypal from '../Paypal'
import usnb from '../../image/1us.png'
import {url} from '../../api/url'
import './Landing.css'

const Landing = () => {
    const [paymentType, setPaymentType] = useState('')
    const [service, setService] = useState('')
    const [serviceValid, setServiceValid] = useState(false)
    const [vonagePhone, setVonagePhone] = useState('')
    const [phone, setPhone] = useState('')
    const [verifPhone, setVerifPhone] = useState('')
    const [error, setError] = useState('')
    const [credit, setCredit] = useState('')

    useEffect(() => {
        fetch(`${url.replace('/api', '')}/get-credit`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setCredit(res[0].stock)
        })
    }, [])

    return(
        <div className="container">
            <head>
            </head>
            {!vonagePhone ?
            <>
            <p className="titleBold">En moyenne 15€ d'économie</p>
            <p className="title">Sur votre <span style={{fontWeight: 'bold'}}> première commande </span> avec un <span style={{fontWeight: 'bold'}}> nouveau compte </span> Uber eats et Delivroo</p>
            <div className="content">
            {!paymentType && !service ?
            <>
            <p className="headContent">CRÉEZ UN NOUVEAU COMPTE POUR SEULEMENT 5€</p>
            <p className="headContent2">Quel nouveau compte souhaitez vous obtenir ?</p>
            {credit && credit < 1.5 &&
            <div className="filterNoCredit">Plus de numéro de téléphone en stock pour aujourd'hui, désolé :(<br/><br/>à demain !</div>}
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
            <button onClick={() => setServiceValid(true)} className="voirpromo2">OBTENIR UN NOUVEAU COMPTE</button>
            </div>
            :
            <div style={{marginTop: '60px'}} className="column">
            <img className="marque" src={delivroo}/>
            <a href="https://codepromo.20minutes.fr/code-promo/deliveroo" target="_blank" rel="nopooner noreferrer"
             style={{marginTop: '5px', marginBottom: '5px'}} className="voirpromo">VOIR LES PROMOTIONS</a>
            <button onClick={() => setServiceValid(true)} className="voirpromo2">OBTENIR UN NOUVEAU COMPTE</button>
            </div>}
            </>
            : service && !paymentType && serviceValid ?
            <>
            <p style={{marginTop: '20px', maxWidth: '100%'}} className="title">Obtenez un numéro de téléphone et un code d'activation
             <span style={{fontWeight: 'bold', marginLeft: '5px', marginRight: '5px'}}>{service}</span> en 2 minutes pour 5€</p>
            <p className="headContent2">Sélectionnez votre mode de paiement</p>
            <button onClick={() => setPaymentType('card')} className="buttonPayment"/>
            <button onClick={() => setPaymentType('paypal')} className="buttonPaymentPaypal"/>
            </>
            : paymentType === 'card' ?
                <Pricing setPhone={setPhone} phone={phone} vonagePhone={vonagePhone} setVonagePhone={setVonagePhone} service={service} />
                : paymentType === 'paypal' &&
                <>
            {error && <p style={{fontSize: '15px', color: 'red', maxWidth: '90%', textAlign: 'center'}} className="errorPay">{error}</p>}
                    <input style={{marginTop: '40px'}} className="inputPricing" onChange={(e) => setPhone(e.target.value)} placeholder="Votre numéro de téléphone" />
                    <input style={{marginTop: '0px'}} className="inputPricing" onChange={(e) => setVerifPhone(e.target.value)} placeholder="Confirmer votre numéro" />
                    {(!phone || phone.split('').length !== 11 || phone !== verifPhone) ?
                <div style={{width: '100%', position:'relative', marginTop: '20px'}}>
                <div onClick={(e) => {
                    if (!phone || phone.split('').lenght !== 11) setError('Veuillez entrer votre numéro de téléphone en +33 exemple : 33655555555')
                    else if (phone !== verifPhone) setError(`Veuillez répéter correctement votre numéro de téléphone`)
                }} className="filterImage"/>
                <Paypal 
                  total={5.00}
                  phone={phone}
                  service={service}
                  setVonagePhone={setVonagePhone}
                />
                </div>
                :
                <Paypal 
                  total={5.00}
                  phone={phone}
                  service={service}
                  setVonagePhone={setVonagePhone}
                />}
                </>
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
            <span style={{fontSize: '18px'}}> Merci de ne pas relancer la procédure d'inscription plusieurs fois d'affilée, le transfert du code d'activation peut prendre entre 10 secondes à 5 minutes</span>.</p>
            <ul>
                <span style={{fontWeight: 'bold', marginBottom: '15px', fontSize: '18px'}}> Les Bonne pratiques !<br/><br/></span>
                <li>Lors du renseignement de votre nouveau n° de téléphone, sélectionnez <img style={{height: '70px', width: 'auto'}} src={usnb}/> <br/><br/></li>
                <li>Utilisez une adresse email jamais renseignée sur uber/delivroo (se taper le front sur le clavier fonctionnera)<br/><br/></li>
                <li>Savourer son repas !<br/><br/></li>
            </ul>
            {service === 'Uber eats' ?
            <a href="https://codepromo.20minutes.fr/code-promo/uber-eats" target="_blank" rel="nopooner noreferrer"
            className="voirpromo">VOIR LES PROMOTIONS</a>
            :
            <a href="https://codepromo.20minutes.fr/code-promo/deliveroo" target="_blank" rel="nopooner noreferrer"
             style={{marginTop: '5px', marginBottom: '5px'}} className="voirpromo">VOIR LES PROMOTIONS</a>}
                </div>}
        </div>
    )
}

export default Landing