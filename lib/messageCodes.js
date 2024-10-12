const messageCodes = async (vars) => {
  let { code } = vars;

  if (!code) {
    return "";
  }
  let messageArray = {
    1000: "Përdoruesi egzitonë",
    1001: "Përdoruesi nuk egzistonë",
  };
  return messageArray[code];
};

module.exports = { messageCodes };
