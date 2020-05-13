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
      // console.log(err.responseWhole);
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
      return handleResponseCodes(err.responseWhole.response.responseCode);
    } else {
      return handleResponseCodes(err.responseWhole.response.paymentStatus);
    }
  }
  if (route === "resend") {
    return mostCommonErrors(err.errorMessage);
  }
  if (route === "cancelSub") {
    return mostCommonErrors(err.errorMessage);
  }
};

const mostCommonErrors = (msg) => {
  console.log(msg);
  if (msg === "This user already subscribed to the given product") {
    return i18n.__("alreadySubscribedError");
  }
  if (
    msg === "Please enter valid phone number for the selected mobile operator."
  ) {
    return i18n.__("unvalidMobileNumber");
  }
  if (msg === "MSISDN Can't be null") {
    return i18n.__("empytMobileInput");
  }
  if (msg === "This mobile number is blacklisted") {
    return i18n.__("blacklistedNumber");
  }
  if (msg === "MSISDN Can't be null") {
    return i18n.__("empytMobileInput");
  }
  if (
    msg ===
    "request to api TPaySubscription.svc/AddSubscriptionContractRequest with request identifier… is duplicate, wait for 2 minutes before issuing same request"
  ) {
    return i18n.__("duplicateRequest");
  }
  if (msg === "Contract Is Already Canceled") {
    return i18n.__("alreadyCanceled");
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
  if (code === 4) {
    return i18n.__("notEnoughCredit");
  }
  if (code === 11) {
    return i18n.__("wrongPinCode");
  }
  if (code === 16) {
    return i18n.__("pincodeDurationEnded");
  }
  if (code === 19) {
    return i18n.__("timeOutError");
  }
  if (code === 9) {
    return i18n.__("inactiveMobileNumber");
  }
  if (code === 14) {
    return i18n.__("companyLine");
  } else {
    return i18n.__("unkownError");
  }
};

module.exports = errorhandling;
