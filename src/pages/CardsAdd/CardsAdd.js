import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Card as ShowCard } from '../../components/card/cardDesign'
import Layout from '../../components/layout/layout';
import CardBrands from '../../components/cardBrands/cardBrands';
import { formatString, checkIsCardNumber, hasNumber, stringContainsDigits, normalizeCardNumber, normalizeExpiryDate, ccExpiresFormat, checkIfNumbersInString, normalizeFullName, validateCreditCardNumber, detectWhatIsBrandCard, defineLengthOfCardNumber, lastDayOfMonth } from '../../lib/utils'
import './CardsAdd.css'

import partOfCard from '../../assets/images/partOfCard.png'
import visa from '../../assets/images/visa.svg'
import CardForm from '../../components/cardForm/cardForm';

const useStyles = makeStyles({
  // root: {
  //   width: '80%',
  //   minWidth: '320px',
  // },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CardsAdd = () => {
  const classes = useStyles();
  const lsCardBrand = localStorage.getItem('cardBrand')
  const [data, setData] = useState(null)
  const [focus, setFocus] = useState(null)
  // const [cardNumber, setCardNumber] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: ''
  })

  const handleChange = (key, e) => {
    const val = e.target.value
    console.log('event', e)
    
    if (key.includes('fullName')) {
      const regName = /^[a-z][a-z\s]*$/
      if (regName.test(val)) {
        e.target.value = val
      }
    }

    if (key === 'expiryDate') {
    //  val = val.replace('-', '/').split('/').reverse().join('/')
      e.target.value = ccExpiresFormat(val || '')
    }

    if (key === 'cardNumber') {
        const cardBrand = data?.cardBrand
        setData(detectWhatIsBrandCard(e.target.value))
        console.log('cardBrnd', cardBrand)
        // e.target.value = normalizeCardNumber(val || '')
    }


    setForm({ ...form, [key]: val })
  }


  const handleOnBeforeInput = (key, e, data) => {
    const val = e.target.value
    // const options = ''
    if (key.includes('cardNumber')) {
      console.log('INFO ####', data?.cardBrand)
      const lsCardBrand = localStorage.getItem('cardBrand')
      const cardBrand = data?.cardBrand || lsCardBrand
      console.log('cardBrand', cardBrand)
      if (!checkIfNumbersInString(e.nativeEvent.data)) { e.preventDefault() }

      if (cardBrand) {
        if (cardBrand.includes('Visa')) {
          // e.target.value = val.substr(0, 10)
          e.target.value = normalizeCardNumber(val || '', 18)
        } else if (cardBrand.includes('Mastercard')) {
          // e.target.value = val.substr(0, 18)
          e.target.value = normalizeCardNumber(val || '', 18)
        } else if (cardBrand.includes('Discover')) {
          // e.target.value = val.substr(0, 18)
          e.target.value = normalizeCardNumber(val || '', 18)
        } else if (cardBrand.includes('American Express')) {
          // e.target.value = val.substr(0, 12)
          e.target.value = normalizeCardNumber(val || '', 17)
        } else {
          e.target.value = normalizeCardNumber(val || '', 18)
        }
      }
    }
      

    if (key.includes('expiryDate')) {
      console.log('KEY', e)
      if (!checkIfNumbersInString(e.nativeEvent.data)) { e.preventDefault() }
      e.target.value = ccExpiresFormat(val || '')
      e.target.value = val.substr(0, 4)
    }
  }

  const onPasteHandler = (key, e) => {
    if (key.includes('cardNumber') || key.includes('expiryDate')) {
      e.preventDefault()
    }
  }

  console.log('INFOOO222', focus, normalizeCardNumber(form.cardNumber))
  console.log('DATA', data, data?.isValid)

  const styleCNInput = (data, val) => {
    let cssClass = ''
    if (!val.length) {
      cssClass = 'currentColor'
    } else if (val.length && !data.isValid) {
      cssClass = 'errorColor'
    }
    
    return cssClass
  }

  const isValidExpirayDate = (val, type) => {
    let cssClass = ''
    let isValid = null

    const d = new Date()
    const currDate = d.getDate();
    const currMonth = d.getMonth() + 1;
    const currYear = +d.getFullYear().toString().split('0')[1];
    const valSplited = val?.split('/')
    const enteredMonth = isNaN(+valSplited?.[0]) ? 0 : +valSplited?.[0]
    const enteredYear = isNaN(+valSplited?.[1]) ? 0 : +valSplited?.[1]
    const lastDay = lastDayOfMonth(d.getFullYear(), enteredMonth)
    console.log('LAST day', lastDay, enteredMonth)
    // const isTheSameMonthAndYear = enteredMonth === currMonth && enteredYear === currYear && lastDay > currDate
    const isExpiredDate = (enteredMonth < currMonth && enteredYear < currYear) || (enteredMonth > currMonth && enteredYear < currYear) || (enteredMonth === currMonth && enteredYear < currYear) || (enteredMonth < currMonth && enteredYear === currYear) || (enteredMonth === currMonth && enteredYear === currYear && lastDay <= currDate)

    if (!val.length) {
      cssClass = 'currentColor'
      isValid = false
    } else if (val.length) {
      console.log('EXP DATE', enteredMonth, currMonth, enteredYear, currYear, enteredMonth < currMonth && enteredYear < currYear )
      if (isExpiredDate) {
        cssClass = 'errorColor'
        isValid = false
      } else {
        cssClass = 'currentColor'
        isValid = true
      }
    }

    if (type === 'class') {
      return cssClass
    }

    console.log('exp date is valid', isValid)
    
    return isValid
  }

  const isValidCcNum = styleCNInput(data, form.cardNumber) !== 'errorColor'
  const buttonIsDisabled = form.fullName.length > 0 && isValidCcNum && (isValidExpirayDate(form.expiryDate, 'isValid') && form.expiryDate.length > 4)

  console.log('INFOO: ', isValidCcNum, buttonIsDisabled)
  return (
    <Layout className="cards-add-page">
      <h2 className="title-of-page">Cards Add</h2>
      <Card className={`${classes.root} card-wrapper`}>
        <div className="card-wrapper-header">
          <h4>Create Your Own Card</h4>
        </div>
        <CardContent>
          <ShowCard
            partOfCard={partOfCard}
            cardNumber={normalizeCardNumber(form.cardNumber)}
            expiryDate={form.expiryDate}
            fullName={form.fullName}
          />
          <CardForm
            defaultValueFullName={form.fullName}
            defaultValueCardNum={form.cardNumber}
            defaultValueExpityDate={form.expiryDate}
            setFocus={(inputName) => setFocus(inputName)}
            handleChange={(key, e) => handleChange(key, e)}
            handleOnBeforeInput={(key, e) => handleOnBeforeInput(key, e)}
            onPasteHandler={(key, e) => onPasteHandler(key, e)}
            lsCardBrand={lsCardBrand}
            cardNumberLen={form.cardNumber.length}
            ccNumClass={styleCNInput(data, form.cardNumber)}
            isValidExpirayDate={isValidExpirayDate(form.expiryDate, 'class')}
          />
        </CardContent>
        <CardActions className="card-wrapper-footer">
          <CardBrands />
          <Button disabled={!buttonIsDisabled && true} color="primary" variant="contained" size="large">Add Card</Button>
        </CardActions>
      </Card>
    </Layout>
  );
}
 
export default CardsAdd;