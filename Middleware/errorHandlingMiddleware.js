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

    let routeName = err.routeName;
    delete err.routeName;
    if (err.responseWhole) {
      err.errorMessage = handleErrorForRoutes(routeName, err);
      res.status(500).send(err);
    } else {
      let errorResponse = {
        errorMessage: i18n.__("failedToConnect"),
      };

      res.status(500).send(errorResponse);
    }
  });
};

const handleErrorForRoutes = (route, err) => {
  if (route === "addSub") {
    return mostCommonErrors(err.errorMessage);
  }
  if (route === "verifySub") {
    if (err.responseWhole.request.charge === "false") {
      console.log("hello");
      return handleResponseCodes(err.responseWhole.response.responseCode);
    }
  }
};

const mostCommonErrors = (msg) => {
  console.log(msg);
  if (msg === "Invalid Digest") {
    return i18n.__("alreadySubscribedError");
  } else {
    return msg;
  }
};

const handleResponseCodes = (code) => {
  if (code === 302) {
    return i18n.__("wrongPinCode");
  }
  if (code === 305) {
    return i18n.__("exceedAttempts");
  }
  if (code === 0) {
    return i18n.__("duplicateRequest");
  }
};

module.exports = errorhandling;
