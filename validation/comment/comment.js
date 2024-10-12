const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationComment(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is require";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is require";
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Comment is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validationCommentStaff(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.position = !isEmpty(data.position) ? data.position : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name filed is require";
  }

  if (Validator.isEmpty(data.position)) {
    errors.position = "Position filed is require";
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Comment filed is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationComment,
  validationCommentStaff,
};
