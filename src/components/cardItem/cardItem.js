import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { showLastDigits } from '../../lib/utils';
import './cardItem.css'
import visa from '../../assets/images/visa.svg'
import mastercard from '../../assets/images/mastercard.svg'
import discover from '../../assets/images/discover.svg'
import amex from '../../assets/images/amex.svg'

const useStyles = makeStyles({
  root: {
    minWidth: 230,
    backgroundColor: '#f2f2f2'
  },
});

const CardItem = ({ dataCard, cardBrandImg }) => {
  const classes = useStyles();

  console.log('dataCard', dataCard)

  const content = dataCard?.map(card => {
    const {id, fullName, cardNumber, expiryDate, cardBrand } = card

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

    return (
      <Card key={id} className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fullName}
            </Typography>
            <div className="card-item-wrapper">
              <Typography variant="body2" color="textSecondary" component="p">
                {showLastDigits(cardNumber)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {expiryDate}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <img className="mr-10" width="20" src={handleImage(cardBrand || 'null', 'image')} alt=""/>
            {cardBrand}
          </CardActions>
        </CardActionArea>
      </Card>
    )
  })
  

  return content
}
 
export default CardItem;