export const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateSkill = (name, description) => {
  if (!name || !description) {
    return false;
  }
  return true;
};
