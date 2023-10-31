/**
 * Facilitates the calculation of currency amounts with no loss of precision.
 */

export const toDisplayCurrencyUnits = (centsAmount) => {
    if(centsAmount) {
        return (centsAmount / 100);
    }
    return '';
}

export const toStorageCurrencyUnits = (dollarAmount) => {
    if(dollarAmount) {
        return dollarAmount * 100;
    }
    return '';
}