const i18n = require("i18n");

const errorhandling = (app) => {
  app.use((err, req, res, next) => {
    let lang = "en";
    if (req.body.lang == 2) {
      lang = "ar";
    }
    if (req.body.lang == 3) {
      lang = "fr";
    }
    i18n.setLocale(lang);
    err.errorMessage = mostCommonErrors(err.errorMessage);
    res.status(200).send(err);
  });
};

const mostCommonErrors = (msg) => {
  if (msg === "Invalid Digest") {
    return i18n.__("alreadySubscribedError");
  }
};

module.exports = errorhandling;
