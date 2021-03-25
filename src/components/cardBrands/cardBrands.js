import React from 'react'
import visa from '../../assets/images/visa.svg'
import mastercard from '../../assets/images/mastercard.svg'
import discover from '../../assets/images/discover.svg'
import amex from '../../assets/images/amex.svg'
import './cardBrands.css'

const cardBrands = () => {
  const cBrands = [
    { id: 0, label: 'Visa', image: visa },
    { id: 1, label: 'Mastercard', image: mastercard },
    { id: 2, label: 'Discover', image: discover },
    { id: 3, label: 'American Express', image: amex },
  ]

  return (
    <div className="credit-card-brands">
      {
        cBrands.map(cb => {
          return (
            <img key={cb.id} src={cb.image} alt={cb.label} />
          )
        })
      }
    </div> 
  );
}
 
export default cardBrands;