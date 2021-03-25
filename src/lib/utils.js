const cardNumberRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/

export function formatString(s) {
  return s.toString().replace(/\d{4}(?=.)/g, '$& ');
}

export function normalizeFullName(string) {
  const re = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/
  return re.test(string)
}

export function normalizeCardNumber(s, subStrEnd) {
  return s ? s.toString().replace(/\s/g, '').match(/.{1,4}/g)?.join(' ').substr(0, subStrEnd) : '';
}

export function normalizeExpiryDate(s) {
  return s ? s.toString().replace(/\s/g, '').match(/.{1,2}/g)?.join('/').substr(0, 5) : '';
}

export function ccExpiresFormat(string) {
  return string.replace(
      /[^0-9]/g, '' // To allow only numbers
  ).replace(
      /^([2-9])$/g, '0$1' // To handle 3 > 03
  ).replace(
      /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
  ).replace(
      /^0{1,}/g, '0' // To handle 00 > 0
  ).replace(
    /^0\/|0+$/g, '0' // 0/ > 0 and 00 > 0 //UPDATED by NAVNEET
  ).replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
  );
}

export function checkIsCardNumber(val) {
  let flag = null

  if (cardNumberRegEx.test(val)) {
    flag = true
  } else {
    flag = false
  }

  return flag
}

export function hasNumber(myString) {
  const val = +myString

  if (typeof val === 'number') {
    return true
  }
  
  return false
}

export function stringContainsDigits(val) {
  const isnum = /^\d+$/.test(val)
  return isnum
}

export function checkIfNumbersInString(s) {
  const reDigits = /^[0-9\b]+$/
  return s && reDigits.test(s)
}

// export function checkIfLettersAndSpacesInStr(s) {
//   // const regexOld = /^[a-zA-Z ]*$/
//   const regex = /^[a-zA-Z ]([A-Za-z]* [A-Za-z]*)/;
//   return s && regex.test(s)
// }

export function validateCreditCardNumber(ccNum) {

  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  let isValid = false;

  if (ccNum.match(visaRegEx)) {
    isValid = true;
  } else if(mastercardRegEx.test(ccNum)) {
    isValid = true;
  } else if(amexpRegEx.test(ccNum)) {
    isValid = true;
  } else if(discovRegEx.test(ccNum)) {
    isValid = true;
  }

  // if(isValid) {
  //    alert("Thank You!");
  // } else {
  //    alert("Please provide a valid Visa number!");
  // }
  return isValid
}

export function detectWhatIsBrandCard(ccNum) {

  const cb_visa_pattern = /^4/;
  const cb_mast_pattern = /^5[1-5]/;
  const cb_disc_pattern = /^6(011|5|4[4-9]|22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/;
  const cb_amex_pattern = /^3[47]/;
  const data = {}
  let isValid = false
  let cardBrand = null
  if (ccNum) {
    if (cb_visa_pattern.test(ccNum)) {
      isValid = true
      cardBrand = 'Visa'
    } else if (cb_mast_pattern.test(ccNum)) {
      isValid = true
      cardBrand = 'Mastercard'
    } else if (cb_disc_pattern.test(ccNum)) {
      isValid = true
      cardBrand = 'Discover'
    } else if (cb_amex_pattern.test(ccNum)) {
      isValid = true
      cardBrand = 'American Express'
    }
  }

  localStorage.setItem('cardBrand', cardBrand)

  return { ...data, isValid, cardBrand }
}

export function defineLengthOfCardNumber(data, val) {
  const cardBrand = data


  switch (cardBrand) {
    case 'Visa':
      val?.substr(0, 18)
      break;
    case 'Mastercard':
      val?.substr(0, 18)
      break;
    case 'Discover':
      val?.substr(0, 18)
      break;
    case 'American Express':
      val?.substr(0, 17)
      break;
  
    default:
      val?.substr(0, 18)
      break;
  }
}


export function limitOfCardNumber(data, val) {
  const cardBrand = data
  const usualLimit = 19
  const specLimit = 18
  let isValid = false

  if (cardBrand.includes('Visa') || cardBrand.includes('Mastercard') || cardBrand.includes('Discover')) {
    if (usualLimit > val?.length) {
      isValid = false
    } else {
      isValid = true
    }
  }

  if (cardBrand.includes('American Express')) {
    if (specLimit > val?.length) {
      isValid = false
    } else {
      isValid = true
    }
  }


  return isValid
}

export function lastDayOfMonth(y,m) {
  return  new Date(y, m, 0).getDate();
}

export function placeholderLeftChars(placeholderVal, inputVal, cardBrand) {
  const totaPlaceholder = placeholderVal.slice(inputVal?.length);
  const wantedVal = `${inputVal}${totaPlaceholder}`;
  
  if (cardBrand === 'American Express') {
    return wantedVal.substr(0, wantedVal.length - 1)
  }
  
  
  return wantedVal
}
