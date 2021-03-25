import React from 'react'
import { TextField, InputLabel, FormHelperText } from '@material-ui/core';
import './cardForm.css'

const CardForm = (props) => {
  const { defaultValueFullName, defaultValueCardNum, defaultValueExpiryDate, cardNumberLen, lsCardBrand, ccNumClass, setFocus, handleChange, handleOnBeforeInput, onPasteHandler, isValidExpirayDate } = props

  return (
    <form noValidate autoComplete="off">
      <InputLabel>Full name</InputLabel>
      <TextField 
        type="text"
        id="full-name" 
        defaultValue={defaultValueFullName}
        placeholder="John Smith"
        onFocus={() => setFocus('fullName')} 
        onChange={(e) => handleChange('fullName', e)}
        onBeforeInput={(e) => handleOnBeforeInput('fullName', e)}
      />
      <InputLabel>Card number</InputLabel>
      <TextField 
        className={`cc-num-input cc-num-input--${ccNumClass}`}
        type="tel" 
        id="cc-num-card"
        defaultValue={defaultValueCardNum}
        placeholder="8888 8888 8888 8888"
        onPaste={(e) => onPasteHandler('cardNumber', e)}
        onFocus={() => setFocus('cardNumber')} 
        onChange={(e) => handleChange('cardNumber', e)}
        onBeforeInput={(e) => handleOnBeforeInput('cardNumber', e)}
      />
      { lsCardBrand === 'null' && cardNumberLen ? <FormHelperText className="error-text">Card number is invalid.</FormHelperText> : null }
      <InputLabel>Expiry date</InputLabel>
      <TextField
        className={`cc-exp-date-input cc-exp-date-input--${isValidExpirayDate}`}
        type="text"
        id="expity-date"
        inputMode="numeric"
        defaultValue={defaultValueExpiryDate}
        placeholder="MM/YY"
        isValidExpirayDate={isValidExpirayDate}
        onPaste={(e) => onPasteHandler('expiryDate', e)}
        onFocus={() => setFocus('expiryDate')} 
        onChange={(e) => handleChange('expiryDate', e)}
        onBeforeInput={(e) => handleOnBeforeInput('expiryDate', e)}
      />
      { isValidExpirayDate === 'errorColor' ? <FormHelperText className="error-text">Card is expired.</FormHelperText> : null }
    </form>
  );
}
 
export default CardForm;