// Common Validation Utility
// Consolidates all validation logic used across components

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9A-Z]+@[a-z]+\.[a-z]{2,3}$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number length based on country
 * @param {string} phoneNo - Phone number to validate
 * @param {string} country - Country name
 * @param {Array} phoneValidationData - Array of country phone length data
 * @returns {boolean} - True if valid phone number length
 */
export const validatePhoneNo = (phoneNo, country, phoneValidationData) => {
  if (!country || !phoneValidationData) return false;
  
  const countryData = phoneValidationData.find(
    (item) => item.country === country
  );
  
  if (!countryData) return false;
  
  return phoneNo?.length === Number(countryData.numberLength);
};

/**
 * Validates if date is in the future
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if date is in the future
 */
export const validateFutureDate = (dateString) => {
  if (!dateString) return false;
  
  const currentDate = new Date();
  const selectedDate = new Date(dateString);
  
  return selectedDate - currentDate > 0;
};

/**
 * Validates password strength (minimum 5 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets minimum requirements
 */
export const validatePassword = (password) => {
  return password && password.length >= 5;
};

/**
 * Validates required field is not empty
 * @param {string} value - Value to validate
 * @returns {boolean} - True if value is not empty
 */
export const validateRequired = (value) => {
  return value && value.trim() !== "";
};

/**
 * Validates contact form data
 * @param {Object} contactData - Contact form data
 * @param {Object} errorLabels - Error label strings from Data
 * @returns {Object|null} - Error object or null if valid
 */
export const validateContactForm = (contactData, errorLabels) => {
  const error = {
    name: !validateRequired(contactData.name) ? errorLabels.name : "",
    email: !validateEmail(contactData.email) ? errorLabels.email : "",
  };

  if (error.name === "" && error.email === "") {
    return null;
  }
  return error;
};

/**
 * Validates login form data
 * @param {Object} loginData - Login form data
 * @param {string} loginType - "admin" or "register"
 * @param {Object} errorLabels - Error label strings from Data
 * @returns {Object|null} - Error object or null if valid
 */
export const validateLoginForm = (loginData, loginType, errorLabels) => {
  const error = {
    name: loginType === "register" && !validateRequired(loginData.name) 
      ? errorLabels.name 
      : "",
    email: !validateEmail(loginData.email) ? errorLabels.email : "",
    password: !validateRequired(loginData.password)
      ? errorLabels.enterPassword
      : !validatePassword(loginData.password)
      ? errorLabels.weekPassword
      : "",
  };

  const isValid = loginType === "register"
    ? error.name === "" && error.email === "" && error.password === ""
    : error.email === "" && error.password === "";

  if (isValid) {
    return null;
  }
  return error;
};

/**
 * Validates booking form data
 * @param {Object} bookingData - Booking form data
 * @param {string} country - Selected country
 * @param {Array} phoneValidationData - Phone validation data
 * @param {string} formType - "places" or "hotels"
 * @param {Object} errorLabels - Error label strings from Data
 * @returns {Object|null} - Error object or null if valid
 */
export const validateBookingForm = (
  bookingData,
  country,
  phoneValidationData,
  formType,
  errorLabels
) => {
  const error = {
    Fname: !validateRequired(bookingData.Fname) ? errorLabels.name : "",
    Email: !validateEmail(bookingData.Email) ? errorLabels.invalidEmail : "",
    Country: !validateRequired(country) ? errorLabels.selectCountry : "",
    MobileNo: !validateRequired(country)
      ? errorLabels.verifyMobileNo
      : !validatePhoneNo(bookingData.MobileNo, country, phoneValidationData)
      ? errorLabels.invalidMobileNo
      : "",
    TDate: !validateRequired(bookingData.TDate)
      ? errorLabels.enterDate
      : !validateFutureDate(bookingData.TDate)
      ? errorLabels.expiredDate
      : "",
    Members: formType === "places" && !validateRequired(bookingData.Members)
      ? errorLabels.members
      : "",
    Rooms: formType === "hotels" && !validateRequired(bookingData.Rooms)
      ? errorLabels.rooms
      : "",
  };

  const requiredField = formType === "places" ? error.Members : error.Rooms;

  if (
    error.Fname === "" &&
    error.Email === "" &&
    error.Country === "" &&
    error.MobileNo === "" &&
    error.TDate === "" &&
    requiredField === ""
  ) {
    return null;
  }
  return error;
};

/**
 * Validates subscription email
 * @param {string} email - Email to validate
 * @param {Object} errorLabels - Error label strings from Data
 * @returns {Object|null} - Error object or null if valid
 */
export const validateSubscriptionEmail = (email, errorLabels) => {
  const error = {
    email: !validateRequired(email)
      ? errorLabels.enterEmail
      : !validateEmail(email)
      ? errorLabels.email
      : "",
  };

  if (error.email === "") {
    return null;
  }
  return error;
};
