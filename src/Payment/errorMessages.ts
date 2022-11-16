export const CARD_ERRORS = {
  wrongCardNumber: 'wrong card number',
  wrongDate: 'wrong date',
  wrongCvc: 'wrong CVC',
  dateEmpty: 'Date must be exist',
  cvcAsNumber: 'CVC must be a number',
};

export const DONATION_ERRORS = {
  noDonationValue: 'donation value is required',
  donationAsNumber: 'donation value must be a number',
  positiveNumber: 'Amount must be a positive number',
  noDonationError: 'Donation is required',
  typeError: 'donation parameter must be a Donation type',
};

export const ORDER_ERRORS = {
  over0Number: 'Order amount must be greater than 0',
  noOrderError: 'Order is required',
  typeError: 'order parameter must be an Order type',
  noOrderAmount: 'Order amount value is required',
  amountAsNumber: 'Order amount must be a number',
};

export const ACCOUNT_ERRORS = {
  fullNameFormat: 'Full name needs first and last name',
  ibanFormat: 'IBAN is not valid',
};

export const PAYMENT_TYPE_ERRORS = {
  noPaymentType: 'Payment type is required',
  typeValue: 'Payment type must be a valid value',
};
