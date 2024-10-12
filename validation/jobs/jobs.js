const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationJobs(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.job_type = !isEmpty(data.job_type) ? data.job_type : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title filed is require";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City filed is require";
  }

  if (Validator.isEmpty(data.job_type)) {
    errors.job_type = "Job type filed is require";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description filed is require";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationJobs,
};
