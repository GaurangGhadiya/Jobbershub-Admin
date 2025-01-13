function formatIndianNumber(number) {
    const numStr = number?.toString();
    const [integerPart, decimalPart] = numStr?.split('.'); // Split into integer and decimal parts
  
    // Handle the last three digits
    let lastThreeDigits = integerPart.slice(-3); // Extract last three digits
    const otherDigits = integerPart.slice(0, -3); // Remaining part of the number
  
    if (otherDigits) {
      lastThreeDigits = ',' + lastThreeDigits;
    }
  
    // Insert commas every two digits for the remaining part
    const formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits;
  
    // Combine integer and decimal parts
    return decimalPart ? formattedInteger + '.' + decimalPart : formattedInteger;
  }

  export default formatIndianNumber
  