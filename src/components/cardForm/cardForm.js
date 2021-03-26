import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { placeholderLeftChars } from '../../lib/utils';
import './cardForm.css';

const CardForm = (props) => {
  const { defaultValueFullName, defaultValueCardNum, defaultValueExpiryDate, defaultValueCvcCode, cardNumberLen, lsCardBrand, ccNumClass, setFocus, setBlur, handleChange, handleOnBeforeInput, onPasteHandler, isValidExpirayDate, formRef } = props

  console.log('CArdForm', defaultValueFullName, defaultValueCardNum, defaultValueExpiryDate)
  useEffect(() => {
    console.log('RErendered form')
  }, [defaultValueFullName])


  return (
    <form autoComplete="off" ref={formRef}>
      <InputLabel>Card name</InputLabel>
      <TextField 
        type="text"
        id="full-name" 
        defaultValue={defaultValueFullName}
        placeholder="John Smith"
        onFocus={(e) => setFocus('fullName', e)}
        onBlur={() => setBlur('')}
        onChange={(e) => handleChange('fullName', e)}
        onBeforeInput={(e) => handleOnBeforeInput('fullName', e)}
      />
      <InputLabel>Card number</InputLabel>
      <TextField 
        className={`cc-num-input cc-num-input--${ccNumClass}`}
        type="tel"
        id="cc-num-card"
        inputMode="numeric"
        defaultValue={defaultValueCardNum}
        // placeholder={placeholderLeftChars("8888 8888 8888 8888", defaultValueCardNum)}
        placeholder="8888 8888 8888 8888"
        onPaste={(e) => onPasteHandler('cardNumber', e)}
        onFocus={(e) => setFocus('cardNumber', e)}
        onBlur={() => setBlur('')} 
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
        onBlur={() => setBlur('')} 
        onChange={(e) => handleChange('expiryDate', e)}
        onBeforeInput={(e) => handleOnBeforeInput('expiryDate', e)}
      />
      { isValidExpirayDate === 'errorColor' ? <FormHelperText className="error-text">Card has expired.</FormHelperText> : null }
      <InputLabel>CVC Number</InputLabel>
      <TextField
        className={`cvc-code-input cvc-code-input--${isValidExpirayDate}`}
        type="tel"
        id="expity-date"
        inputMode="numeric"
        defaultValue={defaultValueCvcCode}
        placeholder="CVC"
        isValidExpirayDate={isValidExpirayDate}
        onPaste={(e) => onPasteHandler('cvcCode', e)}
        onFocus={(e) => setFocus('cvcCode', e)}
        onBlur={() => setBlur('')} 
        onChange={(e) => handleChange('cvcCode', e)}
        onBeforeInput={(e) => handleOnBeforeInput('cvcCode', e)}
      />
      { isValidExpirayDate === 'errorColor' ? <FormHelperText className="error-text">Card has expired.</FormHelperText> : null }
    </form>
  );
}
 
export default CardForm;