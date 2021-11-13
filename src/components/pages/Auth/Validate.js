
export default function validate(data) {
  let errors = {};
  if (data.name) {
    errors.name = validateName(data.name);
  }
  if (data.email) {
    errors.email = validateEmail(data.email);
  }
  if (data.password) {
    errors.password = validatePassword(data.password);
  }
  return errors;
}

const validateName = (name) => {
  if (name.trim() === '') {
    return "*name is required";
  }
  if (name.length < 3 || name.length > 16) {
    return '*name must be between 3 and 16 characters ';
  }
  return "";
}

const validateEmail = (email) => {
  if (email.trim() === '') {
    return "*email is required";
  }
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return "*email is not valid!"
  }
  return "";
}

const validatePassword = (password) => {
  if (password.trim() === '') {
    return "*password is required";
  }
  if (password.length < 3 || password.length > 16) {
    return '*password must be between 3 and 16 characters';
  }
  return "";
}