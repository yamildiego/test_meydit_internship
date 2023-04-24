const validations = {
  required: "The %F field is required.",
  email: "The %F field must contain a valid email address.",
  unique: "The %F is already registered.",
  existsUser: "This %F is not registered.",
  maxLength: "The %F field must not exceed the maximum allowed length.",
  minLength: "The %F field must have at least 8 characters.",
};

const getMsgError = (id: ErrorIdType, field: string) => {
  return validations[id].replace("%F", field);
};

export default getMsgError;
