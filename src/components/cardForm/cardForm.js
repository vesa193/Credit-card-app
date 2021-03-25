import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { placeholderLeftChars } from '../../lib/utils';
import './cardForm.css';

const CardForm = (props) => {
  const { defaultValueFullName, defaultValueCardNum, defaultValueExpiryDate, cardNumberLen, lsCardBrand, ccNumClass, setFocus, handleChange, handleOnBeforeInput, onPasteHandler, isValidExpirayDate } = props

  return (
    <form noValidate autoComplete="off">
      <InputLabel>Card name</InputLabel>
      <TextField 
        type="text"
        id="full-name" 
        defaultValue={defaultValueFullName}
        placeholder="John Smith"
        onFocus={(e) => setFocus('fullName', e)} 
        onChange={(e) => handleChange('fullName', e)}
        onBeforeInput={(e) => handleOnBeforeInput('fullName', e)}
      />
      <InputLabel>Card number</InputLabel>
      <TextField 
        className={`cc-num-input cc-num-input--${ccNumClass}`}
        type="tel" 
        id="cc-num-card"
        defaultValue={defaultValueCardNum}
        placeholder={placeholderLeftChars("8888 8888 8888 8888", defaultValueCardNum)}
        onPaste={(e) => onPasteHandler('cardNumber', e)}
        onFocus={(e) => setFocus('cardNumber', e)} 
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
        onFocus={(e) => setFocus('expiryDate', e)} 
        onChange={(e) => handleChange('expiryDate', e)}
        onBeforeInput={(e) => handleOnBeforeInput('expiryDate', e)}
      />
      { isValidExpirayDate === 'errorColor' ? <FormHelperText className="error-text">Card has expired.</FormHelperText> : null }
    </form>
  );
}
 
export default CardForm;