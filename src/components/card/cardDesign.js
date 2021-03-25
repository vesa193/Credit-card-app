import React from 'react'
import './cardDesign.css'

import visa from '../../assets/images/visa.svg'
import mastercard from '../../assets/images/mastercard.svg'
import discover from '../../assets/images/discover.svg'
import amex from '../../assets/images/amex.svg'

export const Card = (props) => {
  const lsCardBrand = localStorage.getItem('cardBrand')
  const { partOfCard, cardNumber, expiryDate, fullName } = props

  const handleImage = (cBrand) => {
    let img = 'null'

    if (cBrand === 'Visa') {
      img = visa
    } else if (cBrand === 'Mastercard') {
      img = mastercard
    } else if (cBrand === 'Discover') {
      img = discover
    } else if (cBrand === 'American Express') {
      img = amex
    }

    return img
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Credit Card</h5>
      </div>
      <div className="card-check">
        <img width="50" src={partOfCard} alt="part of card"/>
      </div>
      <div className="card-content">
        <p>{cardNumber || '**** **** **** ****'}</p>
        <p>{expiryDate || 'MM/YYYY'}</p>
      </div>
      <div className="card-footer">
        <p>{fullName || 'Full name'}</p>
        <img aria-hidden={lsCardBrand !== 'null' ? 'false' : 'true'} src={handleImage(lsCardBrand || 'null')} alt={lsCardBrand} />
      </div>
    </div>
  );
}
