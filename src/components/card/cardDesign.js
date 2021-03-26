import React, { useEffect, useState } from 'react'
import './cardDesign.css'

import visa from '../../assets/images/visa.svg'
import mastercard from '../../assets/images/mastercard.svg'
import discover from '../../assets/images/discover.svg'
import amex from '../../assets/images/amex.svg'
import { placeholderLeftChars } from '../../lib/utils'

export const Card = (props) => {
  const lsCardBrand = localStorage.getItem('cardBrand')
  const { partOfCard, cardNumber, expiryDate, fullName, cvcCode, focusedElement } = props

  const handleImage = (cBrand, typeData) => {
    let img = 'null'
    let cardClass = 'invalid'
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
    } else {
      img = ''
      cardClass = 'invalid'
    }

    if (typeData === 'image') {
      data = img
    } else {
      data = cardClass
    }

    return data
  }

  const isCardFlipped = focusedElement?.includes('cvcCode') ? 'card--flipped' : ''

  return (
    <div className="card-holder">
      <div className={`card card--${handleImage(lsCardBrand, 'cardClass') || 'invalid'} ${isCardFlipped}`}>
        <div className="card-front">
          <div className="card-header">
            <h5>Credit Card</h5>
          </div>
          <div className="card-check">
            <img width="50" src={partOfCard} alt="part of card"/>
          </div>
          <div className="card-content">
            <p className={`cardNumber cardNumber--${focusedElement?.includes('cardNumber') ? 'focused' : 'unfocused'}`}>{placeholderLeftChars('•••• •••• •••• ••••', cardNumber, lsCardBrand)}</p>
            <p className={`expiryDate expiryDate--${focusedElement?.includes('expiryDate') ? 'focused' : 'unfocused'}`}>{placeholderLeftChars('MM/YY', expiryDate, 'null', 'expiryDate')}</p>
          </div>
          <div className="card-footer">
            <p className={`fullName fullName--${focusedElement?.includes('fullName') ? 'focused' : 'unfocused'}`}>{fullName || "Card name"}</p>
            <img aria-hidden={lsCardBrand !== 'null' ? 'false' : 'true'} src={handleImage(lsCardBrand || 'null', 'image')} alt={lsCardBrand} />
          </div>
        </div>
        <div className="card-back">
          <div className="card-back-rect" />
          <div className="card-back-cvc">
            <p>{placeholderLeftChars('CVC', cvcCode)}</p>
          </div>
          { lsCardBrand === 'American Express' ? <p className="card-back-cvc-message">* This card must contain 4 digits</p> : null }
        </div>
      </div>
    </div>
  );
}
