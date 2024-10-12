const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationBlog(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Postion filed is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationBlog,
};
