<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">{{
              $t("stepperHeader1")
            }}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">{{
              $t("stepperHeader2")
            }}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">{{ $t("stepperHeader3") }}</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              color="deep-purple accent-4"
            ></v-progress-linear>
            <v-stepper-content step="1">
              <v-card elevation="0">
                <v-card-text>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="6">
                      <v-alert :type="alert1.type" v-if="alert1">{{
                        alert1.message
                      }}</v-alert>
                      <p
                        v-if="operatorDetails.isUpDisc"
                        class="text-center black--text"
                      >
                        {{ $t("upDisc") }}
                      </p>
                      <v-select
                        class="my-2"
                        :items="country.operator"
                        :label="$t('mobileOperatorInput')"
                        v-model="selectedOperator"
                        :item-text="language"
                        item-value="operatorCode"
                      ></v-select>
                      <v-text-field
                        :label="$t('mobileNumberInput')"
                        type="number"
                        class="inputPrice"
                        v-model="MSISDN"
                      ></v-text-field>

                      <v-tour name="onMobileEnter" :steps="step0"></v-tour>
                      <v-tour name="onMobileEnter1" :steps="step1"></v-tour>
                      <v-row align="center" justify="center">
                        <v-btn
                          v-if="this.$store.state.selectedCountry === 'UAE'"
                          id="v-step-0"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onMobileEnter"
                          >{{ $t("UAEsubscribeButton") }}</v-btn
                        >
                        <v-btn
                          v-else
                          id="v-step-0"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onMobileEnter"
                          >{{ $t("subscribeButton") }}</v-btn
                        >
                      </v-row>

                      <v-row
                        align="center"
                        justify="center"
                        v-if="operatorDetails.isExit"
                      >
                        <v-btn
                          id="v-step-1"
                          color="primary"
                          text
                          class="mb-3"
                          @click="e1 = 2"
                          >{{ $t("exitBtn") }}</v-btn
                        >
                      </v-row>
                      <p class="black--text">{{ disclaimer }}</p>
                      <div v-if="operatorDetails.isTerms" class="black--text">
                        <p>{{ $t("termsTitle") }}</p>
                        <ul>
                          <li>{{ $t("terms1") }}</li>
                          <li>{{ $t("terms2") }}</li>
                          <li>{{ $t("terms3") }}</li>
                          <li>{{ $t("terms4") }}</li>
                          <li>{{ $t("terms5") }}</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card elevation="0">
                <v-card-text>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="6">
                      <v-alert
                        transition="scale-transition"
                        dense
                        dismissible
                        :type="alert2.type"
                        v-if="alert2"
                        >{{ alert2.message }}</v-alert
                      >
                      <p v-if="operatorDetails.isUpDisc">{{ $t("upDisc") }}</p>
                      <v-text-field
                        v-model="PinCode"
                        type="number"
                        class="inputPrice"
                        :label="$t('pinCodeInput')"
                      ></v-text-field>
                      <v-tour name="pincodePage" :steps="step2"></v-tour>
                      <v-tour name="pincodePage1" :steps="step3"></v-tour>
                      <v-row align="center" justify="center">
                        <v-btn
                          color="primary"
                          text
                          small
                          class="mb-3"
                          @click="onResend"
                          >{{ $t("resendBtn") }}</v-btn
                        >
                      </v-row>
                      <v-row align="center" justify="center">
                        <v-btn
                          color="primary"
                          large
                          class="mb-3"
                          @click="onVerify"
                          >{{ $t("subscribeButton") }}</v-btn
                        >
                      </v-row>
                      <v-row
                        align="center"
                        justify="center"
                        v-if="operatorDetails.isExit"
                      >
                        <v-btn
                          color="primary"
                          text
                          class="mb-3"
                          @click="e1 = 2"
                          >{{ $t("exitBtn") }}</v-btn
                        >
                      </v-row>
                      <p class="black--text">{{ disclaimer }}</p>
                      <div v-if="operatorDetails.isTerms">
                        <p>{{ $t("termsTitle") }}</p>
                        <ul>
                          <li>{{ $t("terms1") }}</li>
                          <li>{{ $t("terms2") }}</li>
                          <li>{{ $t("terms3") }}</li>
                          <li>{{ $t("terms4") }}</li>
                          <li>{{ $t("terms5") }}</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-alert type="success"
                >You have successfully subscribed successfully you should
                recieve an SMS with the subscription detials</v-alert
              >

              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <log-panel></log-panel>
  </v-container>
</template>

<script>
import axios from "axios";
import LogPanel from "../Log/LogPanel";
import VueTour from "vue-tour";
export default {
  name: "Home",
  components: {
    "log-panel": LogPanel,
  },
  data() {
    return {
      e1: 0,
      selectedCountry: null,
      selectedOperator: null,
      MSISDN: null,
      alert1: null,
      alert2: null,
      loading: false,
      PinCode: null,
      opertorShortCodes: "",
      operatorNames: "",
      currencyText: "",
      step0: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Add Subscription API",
          },
          content: `<strong> the Add Subscription API </strong>!`,
          placement: "left",
        },
      ],
      step1: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Add Subscription API",
          },
          content: `<strong> the Add Subscription API </strong>!`,
          placement: "bottom",
        },
        {
          target: "#v-step-1", // We're using document.querySelector() under the hood
          header: {
            title: "Exit",
          },
          content: `the <strong>Exit button</strong>!`,
          placement: "right",
        },
      ],
      step2: [
        {
          target: "#v-step-2", // We're using document.querySelector() under the hood
          header: {
            title: "Verify API",
          },
          content: `<strong> Verify API</strong>!`,
          placement: "bottom",
        },
        {
          target: "#v-step-1", // We're using document.querySelector() under the hood
          header: {
            title: "Exit",
          },
          content: `the <strong>Exit button</strong>!`,
          placement: "right",
        },
      ],
    };
  },
  created() {
    let setupCheck = this.setupDetails;
    if (
      !setupCheck.publicKey ||
      !setupCheck.privateKey ||
      !setupCheck.subPlanId ||
      !setupCheck.catalogName ||
      !setupCheck.productId ||
      !setupCheck.selectedSubType ||
      !setupCheck.price ||
      !setupCheck.frequency ||
      !setupCheck.serviceName ||
      !setupCheck.unsubKeyword
    ) {
      return this.$router.push("setup");
    }

    for (let i of this.country.operator) {
      if (this.opertorShortCodes) {
        this.opertorShortCodes = `${this.opertorShortCodes}, ${i.operatorCode}`;
      } else {
        this.opertorShortCodes = `${this.opertorShortCodes} ${i.operatorCode}`;
      }
    }
    this.selectedOperator = this.country.operator[0].operatorCode;
  },
  computed: {
    setupDetails() {
      return this.$store.state.setupDetails;
    },
    language() {
      this.operatorNames = "";
      if (this.$store.state.selectedLanguage === "AR") {
        for (let i of this.country.operator) {
          if (this.operatorNames) {
            this.operatorNames = `${
              this.operatorNames
            }, ${i.textAr.toLowerCase()}`;
          } else {
            this.operatorNames = `${
              this.operatorNames
            } ${i.textAr.toLowerCase()}`;
          }
        }
        this.currencyText = this.country.currencyAr;
        this.$vuetify.rtl = true;
        return "textAr";
      } else {
        for (let i of this.country.operator) {
          if (this.operatorNames) {
            this.operatorNames = `${
              this.operatorNames
            }, ${i.text.toLowerCase()}`;
          } else {
            this.operatorNames = `${
              this.operatorNames
            } ${i.text.toLowerCase()}`;
          }
        }
        this.currencyText = this.country.currency;
        this.$vuetify.rtl = false;
        return "text";
      }
    },
    country() {
      return this.$store.state.countries.find(
        (x) => x.value == this.$store.state.selectedCountry
      );
    },
    selectedoperator() {
      return this.$store.state.countries.find(
        (x) => x.value == this.$store.state.selectedCountry
      );
    },
    disclaimer() {
      return `${this.$t("disclaimer1")} ${
        this.setupDetails.serviceName
      } ${this.$t("for")} ${this.setupDetails.price} ${
        this.currencyText
      } ${this.$t(this.setupDetails.frequency)} ${this.$t("for")} ${
        this.operatorNames
      } ${this.$t("disclaimer2")} ${this.setupDetails.unsubKeyword} ${this.$t(
        "to"
      )} ${this.opertorShortCodes}`;
    },
    operatorDetails() {
      return this.country.operator.find(
        (x) => x.operatorCode == this.selectedOperator
      );
    },
  },
  methods: {
    onMobileEnter() {
      this.loading = true;
      this.$store
        .dispatch("addSub", [this.MSISDN, this.selectedOperator])
        .then((response) => {
          this.$store.commit("noOfReq");
          if (!response.response.errorMessage) {
            this.loading = false;
            this.e1 = 2;
          } else {
            this.alert1 = {
              type: "error",
              message: response.response.errorMessage,
            };
            this.loading = false;
          }
        });
    },
    onVerify() {
      this.loading = true;
      this.$store.dispatch("Verify", this.PinCode).then((response) => {
        this.$store.commit("noOfReq");
        if (!response.response.errorMessage) {
          this.loading = false;
          this.e1 = 3;
          if (this.$store.state.selectedCountry === "UAE") {
            this.$tours["pincodePage1"].start();
          } else {
            this.$tours["pincodePage"].start();
          }
        } else {
          this.alert2 = {
            type: "error",
            message: response.response.errorMessage,
          };
          this.loading = false;
        }
      });
    },
    onResend() {
      this.loading = true;
      this.$store.dispatch("Resend").then((response) => {
        this.$store.commit("noOfReq");
        if (!response.response.errorMessage) {
          this.loading = false;
          this.alert2 = {
            type: "success",
            message: "pin code was sent successfully",
          };
          let timer = this.onResend.timer;
          if (timer) {
            clearTimeout(timer);
          }
          this.showAlert.timer = setTimeout(() => {
            this.alert2 = null;
          }, 6000);
        } else {
          this.alert2 = {
            type: "error",
            message: response.response.errorMessage,
          };
          this.loading = false;
        }
      });
    },
  },
  mounted() {
    if (this.$store.state.selectedCountry === "UAE") {
      this.$tours["onMobileEnter1"].start();
    } else {
      this.$tours["onMobileEnter"].start();
    }
  },
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
