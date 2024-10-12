const Validator = require("validator");
const isEmpty = require("../isEmpty");
const { isValid } = require("date-fns");

function validationTeams(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name filed is require";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title filed is require";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname filed is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationTeams,
};
