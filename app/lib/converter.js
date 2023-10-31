/**
 * Facilitates the calculation of currency amounts with no loss of precision.
 */

export const toDisplayCurrencyUnits = (centsAmount) => {
    return centsAmount / 100; 
}

export const toStorageCurrencyUnits = (dollarAmount) => {
    return dollarAmount * 100;
}