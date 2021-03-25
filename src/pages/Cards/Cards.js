import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Card } from '../../components/card/cardDesign'
import Layout from '../../components/layout/layout';
import './Cards.css'

import partOfCard from '../../assets/images/partOfCard.png'
import { normalizeCardNumber } from '../../lib/utils';


const Cards = () => {
  const history = useHistory()

  return (
    <Layout className="cards-page">
      <h2 className="title-of-page">Welcome to Credit Card App</h2>
      <div className="cards-page-wrapper">
        {/* <Card
          partOfCard={partOfCard}
          cardNumber={normalizeCardNumber(form.cardNumber)}
          expiryDate={form.expiryDate}
          fullName={form.fullName}
          /> */}
        <Button variant="contained" onClick={() => history.push('/cards/add')}>Add Card</Button>
      </div>
    </Layout>
  );
}
 
export default Cards;