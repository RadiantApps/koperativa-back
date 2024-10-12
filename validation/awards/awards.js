const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationAwards(data) {
  let errors = {};

  data.organization = !isEmpty(data.organization) ? data.organization : "";
  data.project = !isEmpty(data.project) ? data.project : "";
  data.award = !isEmpty(data.award) ? data.award : "";

  if (Validator.isEmpty(data.organization)) {
    errors.organization = "Organization field is require";
  }

  if (Validator.isEmpty(data.project)) {
    errors.project = "Project field is require";
  }

  if (Validator.isEmpty(data.award)) {
    errors.award = "Award field is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationAwards,
};
