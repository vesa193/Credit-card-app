import React, { useState } from 'react'
import './cardDesign.css'

import visa from '../../assets/images/visa.svg'
import mastercard from '../../assets/images/mastercard.svg'
import discover from '../../assets/images/discover.svg'
import amex from '../../assets/images/amex.svg'
import { placeholderLeftChars } from '../../lib/utils'

export const Card = (props) => {
  const lsCardBrand = localStorage.getItem('cardBrand')
  const [cardData, setCardData] = useState({
    cardBrandImage: 'null',
    cardClass: ''
  })
  const { partOfCard, cardNumber, expiryDate, fullName } = props

  const handleImage = (cBrand, typeData) => {
    let img = 'null'
    let cardClass = ''
    let data = null

    if (cBrand === 'Visa') {
      img = visa
      cardClass = 'visa'
    } else if (cBrand === 'Mastercard') {
      img = mastercard
      cardClass = 'mastercard'
    } else if (cBrand === 'Discover') {
      img = discover
      cardClass = 'discover'
    } else if (cBrand === 'American Express') {
      img = amex
      cardClass = 'amex'
    }

    if (typeData === 'image') {
      data = img
    } else {
      data = cardClass
    }

    return data
  }

  return (
    <div className={`card card--${handleImage(lsCardBrand || 'null', 'cardClass') || 'invalid'}`}>
      <div className="card-header">
        <h5>Credit Card</h5>
      </div>
      <div className="card-check">
        <img width="50" src={partOfCard} alt="part of card"/>
      </div>
      <div className="card-content">
        <p>{placeholderLeftChars('•••• •••• •••• ••••', cardNumber, lsCardBrand)}</p>
        <p>{placeholderLeftChars('MM/YY', expiryDate, 'null', 'expiryDate')}</p>
      </div>
      <div className="card-footer">
        <p>{fullName || 'Card name'}</p>
        <img aria-hidden={lsCardBrand !== 'null' ? 'false' : 'true'} src={handleImage(lsCardBrand || 'null', 'image')} alt={lsCardBrand} />
      </div>
    </div>
  );
}
