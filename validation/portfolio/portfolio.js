const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationDeliverables(data) {
  let errors = {};

  data.portfolioId = !isEmpty(data.portfolioId) ? data.portfolioId : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.portfolioId)) {
    errors.portfolioId = "Portfolio field is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationDeliverables,
};
