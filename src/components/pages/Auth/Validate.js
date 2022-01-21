
export default function validate(data) {
  let errors = {};
  if (data.name !== undefined) {
    errors.name = validateText(data.name, 'name');
  }
  if (data.email !== undefined) {
    errors.email = validateEmail(data.email);
  }
  if (data.password !== undefined) {
    if (data.password2 !== undefined && data.password !== data.password2) {
      errors.password2 = "Both passwords must match";
    }
    errors.password = validatePassword(data.password);
  }
  if (data.city !== undefined) {
    errors.city = validateText(data.city, 'city');
  }
  if (data.street !== undefined) {
    errors.street = validateText(data.street, 'street');
  }
  if (data.zip !== undefined) {
    errors.zip = validateZipCode(data.zip) ? '' : 'invalid zip code';
  }
  // if (data.imageUrl !== undefined) {
  //   errors.imageUrl = isValidImageURL(data.imageUrl) ? '' : 'select a valid image';
  // }
  return errors;
}

const validateText = (value, type) => {
  if (value.trim() === '') {
    return `${type} is required`;
  }
  if (value.length < 3 || value.length > 16) {
    return `${type} must be between 3 and 16 character`;
  }
  return "";
}

const validateZipCode = (val) => {
  return val?.length >= 5 && val?.length <= 32;
}

const validateEmail = (email) => {
  if (email.trim() === '') {
    return "email is required";
  }
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return "email is not valid!"
  }
  return "";
}
const isValidImageURL = (str) => {
  if (typeof str !== 'string') return false;
  return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
}

const validatePassword = (password) => {
  if (password.trim() === '') {
    return "password is required";
  }
  if (password.length < 3 || password.length > 16) {
    return 'password must be between 3 and 16 characters';
  }
  return "";
}