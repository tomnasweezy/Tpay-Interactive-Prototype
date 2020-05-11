import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { countries, lang } from "./utils/countries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setupDetails: {},
    langs: lang,
    countries: countries,
    selectedCountry: "EG",
    selectedLanguage: "EN",
    addSubRes: null,
    verifyRes: null,
    resendRes: null,
    sendFreeRes: null,
    noOfReq: 0,
  },
  mutations: {
    setSetup(state, payload) {
      state.setupDetails = payload;
    },
    setCountry(state, payload) {
      state.selectedCountry = payload;
    },
    setLanguage(state, payload) {
      state.selectedLanguage = payload;
    },
    setAddSubRes(state, payload) {
      state.addSubRes = payload;
    },
    verifyRes(state, payload) {
      state.verifyRes = payload;
    },
    resendRes(state, payload) {
      state.resendRes = payload;
    },
    noOfReq(state) {
      //state.noOfReq++;
      state.noOfReq = state.addSubRes ? 1 : state.noOfReq;
    },
  },
  actions: {
    async addSub({ state, commit }, [msisdn, operatorCode, token]) {
      try {
        let response = await axios.post(
          "/api/v1/AddSubscription",
          {
            MSISDN: msisdn,
            operatorCode: operatorCode,
            lang:
              state.selectedLanguage == "EN"
                ? "1"
                : state.selectedLanguage == "AR"
                ? "2"
                : "3",
            isInitial:
              state.setupDetails.selectedSubType == "PR" ||
              state.setupDetails.selectedSubType == "FS"
                ? "false"
                : "true",
            freeStartDays: state.setupDetails.freeStartDays,
            subscriptionPlanId: state.setupDetails.subPlanId,
            catalogName: state.setupDetails.catalogName,
            productSKU: state.setupDetails.productId,
            sessionToken: token,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("setAddSubRes", response.data);
        return response.data;
      } catch (err) {
        commit("setAddSubRes", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
    async Verify({ state, commit }, pincode) {
      try {
        let response = await axios.post(
          "/api/v1/VerifySubscription",
          {
            contractId: state.addSubRes.response.subscriptionContractId,
            pinCode: pincode,
            transactionId: !state.addSubRes.response.transactionId
              ? ""
              : state.addSubRes.response.transactionId,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("verifyRes", response.data);
        return response.data;
      } catch (err) {
        commit("verifyRes", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
    async Resend({ state, commit }) {
      try {
        let response = await axios.post(
          "/api/v1/resendPinCode",
          {
            contractId: state.addSubRes.response.subscriptionContractId,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("resendRes", response.data);
        return response.data;
      } catch (err) {
        commit("resendRes", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
    async welcomeSms({ state, commit }, [msisdn, operatorCode, message]) {
      try {
        let response = await axios.post(
          "/api/v1/sendSMS",
          {
            messageBody: message,
            MSISDN: msisdn,
            operatorCode: operatorCode,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("sendFreeSms", response.data);
        return response.data;
      } catch (err) {
        commit("sendFreeSms", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
    async cancelSub({ state, commit }) {
      try {
        let response = await axios.post(
          "/api/v1/cancelSubscription",
          {
            contractId: state.verifyRes.response.subscriptionContractId,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("cancelSub", response.data);
        return response.data;
      } catch (err) {
        commit("cancelSub", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
    async heSessionToken({ state, commit }, [msisdn, operatorCode]) {
      try {
        let response = await axios.post(
          "/api/v1/heEnrichment",
          {
            MSISDN: msisdn,
            operatorCode: operatorCode,
          },
          {
            headers: {
              pubkey: state.setupDetails.publicKey,
              privkey: state.setupDetails.privateKey,
            },
          }
        );
        commit("sessionToken", response.data);
        return response.data;
      } catch (err) {
        commit("sessionToken", err.response.data.responseWhole);
        throw err.response.data;
      }
    },
  },
});
