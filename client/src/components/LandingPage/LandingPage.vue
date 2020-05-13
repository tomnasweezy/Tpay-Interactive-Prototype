<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">{{ $t("stepperHeader1") }}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">{{ $t("stepperHeader2") }}</v-stepper-step>

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
                      <v-alert :type="alert1.type" v-if="alert1">{{ alert1.message }}</v-alert>
                      <!-- -----Mobile number upper part---------              -->
                      <p
                        v-if="
                          operatorDetails.isUpDisc &&
                            this.$store.state.selectedCountry === 'UAE'
                        "
                        class="text-center black--text"
                      >
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        : $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        }}
                        {{
                        this.operatorDetails.isVat
                        ? $t("VatInclusive")
                        : $t("VatExcluded")
                        }}
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
                        :placeholder="$t(this.operatorDetails.placeholder)"
                        type="number"
                        class="inputPrice"
                        v-model="MSISDN"
                        v-if="show()"
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
                        >{{ $t("UAEsubscribeButton") }}</v-btn>
                        <v-btn
                          v-else-if="show()"
                          id="v-step-0"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onMobileEnter"
                        >{{ $t("subscribeButton") }}</v-btn>
                      </v-row>

                      <v-row align="center" justify="center" v-if="operatorDetails.isExit">
                        <v-btn
                          id="v-step-1"
                          color="primary"
                          text
                          class="mb-3"
                          @click="e1 = 2"
                        >{{ $t("exitBtn") }}</v-btn>
                      </v-row>

                      <!-- --------Mobile Enter Area-------------- -->
                      <!-- --------Mobile Enter lower part -------------- -->
                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'UAE'
                        "
                        class="text-center black--text"
                      >
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        : $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        }}
                        {{
                        this.operatorDetails.isVat
                        ? $t("VatInclusive")
                        : $t("VatExcluded")
                        }}
                      </p>

                      <p
                        v-if="
                          (operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'TN') ||
                            this.$store.state.selectedCountry === 'AL'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDisctn") }}
                        {{ this.setupDetails.price }}
                        {{ this.currencyText }}
                        {{ this.$t(this.setupDetails.frequency) }}
                      </p>

                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'BH'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDiscbh") }}
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? this.setupDetails.serviceName +
                        " " +
                        "for" +
                        " " +
                        this.operatorDetails.text +
                        " " +
                        "customers " +
                        " " +
                        "is" +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency) +
                        " " +
                        "with 5% VAT exclusive. Charging cycle continues until you unsubscribe."
                        : this.setupDetails.serviceName +
                        " " +
                        "لعملاء" +
                        " " +
                        this.operatorDetails.textAr +
                        " " +
                        "هى " +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency) +
                        " " +
                        "غير شاملة لضريبة القيمة المضافة بنسبة 5% وسوف يتم تجديده تلقائياً حتي يتم الغاء الاشتراك"
                        }}
                      </p>

                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'QA'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDiscqar") }}
                        <span class="bold">
                          {{ this.setupDetails.price }}
                          {{ this.currencyText }}
                          {{ this.$t(this.setupDetails.frequency) }}
                        </span>
                      </p>

                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'OM'
                        "
                        class="text-center black--text"
                      >
                        <span class="bold">
                          {{ $t("upDiscom") }}
                          {{ this.setupDetails.price }}
                          {{ this.currencyText }}
                          {{ this.$t(this.setupDetails.frequency) }}
                        </span>
                      </p>
                      <!-- -------------mobile number Disclaimer section ----------- -->

                      <p
                        v-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'QA' &&
                            this.operatorDetails.operatorCode === '42701'
                        "
                        class="black--text"
                      >{{ QAdisclaimer }}</p>
                      <p
                        v-else-if="
                          (operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'TN') ||
                            this.$store.state.selectedCountry === 'AL'
                        "
                        class="black--text"
                      >{{ TNdisclaimer }}</p>
                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'BH'
                        "
                        class="black--text"
                      >{{ BHdisclaimer }}</p>
                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'OM'
                        "
                        class="black--text"
                      >{{ QAdisclaimer }}</p>
                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'KSA'
                        "
                        class="black--text"
                      >{{ KSAdisclaimer }}</p>
                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'JO' &&
                            this.operatorDetails.shortcode === '91825'
                        "
                        class="black--text"
                      >{{ JOAdisclaimer }}</p>

                      <p
                        v-else-if="operatorDetails.disclaimeravailablity"
                        class="black--text"
                      >{{ disclaimer }}</p>

                      <div v-if="operatorDetails.isTerms" class="black--text">
                        <p>{{ $t("termsTitle") }}</p>
                        <ul>
                          <li>{{ $t("terms1") }}</li>
                          <li>{{ $t("terms2") }}</li>
                          <li>
                            {{
                            this.$store.state.selectedLanguage === "EN"
                            ? $t("terms3") +
                            " " +
                            this.setupDetails.unsubKeyword +
                            " " +
                            this.$t("to") +
                            " " +
                            this.operatorDetails.shortcode
                            : $t("terms3") +
                            " " +
                            this.setupDetails.unsubKeyword +
                            " " +
                            this.$t("to") +
                            " " +
                            this.operatorDetails.shortcode
                            }}
                          </li>
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
                      >{{ alert2.message }}</v-alert>

                      <!-- --------Pincode page upper part----------          -->
                      <p
                        v-if="
                          operatorDetails.isUpDisc &&
                            this.$store.state.selectedCountry === 'UAE'
                        "
                        class="text-center black--text"
                      >
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        : $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        }}
                        {{
                        this.operatorDetails.isVat
                        ? $t("VatInclusive")
                        : $t("VatExcluded")
                        }}
                      </p>
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
                          id="v-step-3"
                          color="primary"
                          text
                          small
                          class="mb-3"
                          @click="onResend"
                        >{{ $t("resendBtn") }}</v-btn>
                      </v-row>
                      <v-row align="center" justify="center">
                        <v-btn
                          v-if="this.$store.state.selectedCountry === 'UAE'"
                          id="v-step-2"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onVerify"
                        >{{ $t("UAEPincodesubscribeButton") }}</v-btn>
                        <v-btn
                          v-else-if="this.$store.state.selectedCountry === 'QA'"
                          id="v-step-2"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onVerify"
                        >{{ $t("QAPincodesubscribeButton") }}</v-btn>
                        <v-btn
                          v-else-if="show()"
                          id="v-step-2"
                          color="primary"
                          large
                          class="mb-3"
                          @click="onVerify"
                        >{{ $t("subscribeButton") }}</v-btn>
                      </v-row>
                      <v-row align="center" justify="center" v-if="operatorDetails.isExit">
                        <v-btn
                          id="v-step-4"
                          color="primary"
                          text
                          class="mb-3"
                          @click="e1 = 2"
                        >{{ $t("exitBtn") }}</v-btn>
                      </v-row>

                      <!-- ------PINCODE AREA----------- -->
                      <!-- ------PINCODE AREA lower part ----------- -->
                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'QA'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDiscqar") }}
                        <span class="bold">
                          {{ this.setupDetails.price }}
                          {{ this.currencyText }}
                          {{ this.$t(this.setupDetails.frequency) }}
                        </span>
                      </p>

                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'BH'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDiscbh") }}
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? this.setupDetails.serviceName +
                        " " +
                        "for" +
                        " " +
                        this.operatorDetails.text +
                        " " +
                        "customers " +
                        " " +
                        "is" +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency) +
                        " " +
                        "with 5% VAT exclusive. Charging cycle continues until you unsubscribe."
                        : this.setupDetails.serviceName +
                        " " +
                        "لعملاء" +
                        " " +
                        this.operatorDetails.textAr +
                        " " +
                        "هى " +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency) +
                        " " +
                        "غير شاملة لضريبة القيمة المضافة بنسبة 5% وسوف يتم تجديده تلقائياً حتي يتم الغاء الاشتراك"
                        }}
                      </p>

                      <p
                        v-if="
                          (operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'TN') ||
                            this.$store.state.selectedCountry === 'AL'
                        "
                        class="text-center black--text"
                      >
                        {{ $t("upDisctn") }}
                        {{ this.setupDetails.price }}
                        {{ this.currencyText }}
                        {{ this.$t(this.setupDetails.frequency) }}
                      </p>

                      <p
                        v-if="
                          operatorDetails.isUpDisc &&
                            this.$store.state.selectedCountry === 'UAE'
                        "
                        class="text-center black--text"
                      >
                        {{
                        this.$store.state.selectedLanguage === "EN"
                        ? $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        : $t("upDisc") +
                        " " +
                        this.setupDetails.price +
                        " " +
                        this.currencyText +
                        " " +
                        this.$t(this.setupDetails.frequency)
                        }}
                        {{
                        this.operatorDetails.isVat
                        ? $t("VatInclusive")
                        : $t("VatExcluded")
                        }}
                      </p>

                      <p
                        v-if="
                          operatorDetails.isdownDisc &&
                            this.$store.state.selectedCountry === 'OM'
                        "
                        class="text-center black--text"
                      >
                        <span class="bold">
                          {{ $t("upDiscom") }}
                          {{ this.setupDetails.price }}
                          {{ this.currencyText }}
                          {{ this.$t(this.setupDetails.frequency) }}
                        </span>
                      </p>

                      <!-- ------- Pin Code Disclaimer section------------- -->

                      <p
                        v-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'QA' &&
                            this.operatorDetails.operatorCode === '42701'
                        "
                        class="black--text"
                      >{{ QAdisclaimer }}</p>

                      <p
                        v-else-if="
                          (operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'TN') ||
                            this.$store.state.selectedCountry === 'AL'
                        "
                        class="black--text"
                      >{{ TNdisclaimer }}</p>

                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'BH'
                        "
                        class="black--text"
                      >{{ BHdisclaimer }}</p>

                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'KSA'
                        "
                        class="black--text"
                      >{{ KSAdisclaimer }}</p>
                      <p
                        v-else-if="
                          operatorDetails.disclaimeravailablity &&
                            this.$store.state.selectedCountry === 'JO' &&
                            this.operatorDetails.shortcode === '91825'
                        "
                        class="black--text"
                      >{{ JOAdisclaimer }}</p>

                      <p
                        v-else-if="operatorDetails.disclaimeravailablity"
                        class="black--text"
                      >{{ disclaimer }}</p>

                      <div v-if="operatorDetails.isTerms" class="black--text">
                        <p>{{ $t("termsTitle") }}</p>
                        <ul>
                          <li>{{ $t("terms1") }}</li>
                          <li>{{ $t("terms2") }}</li>
                          <li>
                            {{
                            this.$store.state.selectedLanguage === "EN"
                            ? $t("terms3") +
                            " " +
                            this.setupDetails.unsubKeyword +
                            " " +
                            this.$t("to") +
                            " " +
                            this.operatorDetails.shortcode
                            : $t("terms3") +
                            " " +
                            this.setupDetails.unsubKeyword +
                            " " +
                            this.$t("to") +
                            " " +
                            this.operatorDetails.shortcode
                            }}
                          </li>
                          <li>{{ $t("terms4") }}</li>
                          <li>{{ $t("terms5") }}</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-stepper-content>

            <!-- -------------------------------Last Page ---------------------- -->

            <v-stepper-content class="spacing" step="3">
              <!-- <v-btn color="primary" large class="mb-3" @click="onCancelEnter">Cancel Subscrition</v-btn> -->

              <v-card height="400" class="overflow-hidden">
                <div class="welcomeTextWrapper">
                  <v-card class="welcomeTextcard" elevation="5">
                    <p class="welcomeText">Welcome to {{this.setupDetails.serviceName}}</p>
                  </v-card>
                </div>

                <v-alert
                  class="locatealert"
                  transition="scale-transition"
                  dense
                  :type="alert3.type"
                  v-if="alert3"
                >{{ alert3.message }}</v-alert>
                <v-navigation-drawer
                  v-model="drawer"
                  :color="color"
                  :expand-on-hover="expandOnHover"
                  :mini-variant="miniVariant"
                  :right="right"
                  :permanent="permanent"
                  absolute
                  dark
                >
                  <v-list dense nav class="py-0">
                    <v-list-item two-line :class="miniVariant && 'px-0'">
                      <!-- ussed URL for Icons  https://cdn.materialdesignicons.com/2.6.95/ -->
                      <v-icon small class="red--text mdi-36px">mdi-account</v-icon>

                      <v-list-item-content>
                        <v-list-item-title>My Account</v-list-item-title>
                        <v-list-item-subtitle>Tpay</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in items" :key="item.title" link>
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title @click="onCancelEnter">{{ item.title }}</v-list-item-title>
                        <v-tour name="cancelPage" :steps="step4"></v-tour>
                      </v-list-item-content>
                    </v-list-item>
                    <div id="v-step-5"></div>
                  </v-list>
                </v-navigation-drawer>
              </v-card>
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
    "log-panel": LogPanel
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
      expandOnHover: true,
      token: "",
      items: [{ title: "Cancel Subscrition", icon: "mdi-cancel" }],
      // color: "primary",
      // colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: false,
      miniVariant: false,

      background: false,
      step0: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Add Subscription API"
          },
          content: `<strong> the Add Subscription API </strong>!`,
          placement: "left"
        }
      ],
      step1: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Add Subscription API"
          },
          content: `<strong> the Add Subscription API </strong>!`,
          placement: "bottom"
        },
        {
          target: "#v-step-1", // We're using document.querySelector() under the hood
          header: {
            title: "Exit"
          },
          content: `the <strong>Exit button</strong>!`,
          placement: "right"
        }
      ],
      step2: [
        {
          target: "#v-step-2", // We're using document.querySelector() under the hood
          header: {
            title: "Verify API"
          },
          content: `<strong> Verify API</strong>!`,
          placement: "bottom"
        },
        {
          target: "#v-step-3", // We're using document.querySelector() under the hood
          header: {
            title: "Resend button"
          },
          content: `the <strong>Resend API </strong>!`,
          placement: "right"
        }
      ],
      step3: [
        {
          target: "#v-step-2", // We're using document.querySelector() under the hood
          header: {
            title: "Verify API"
          },
          content: `<strong> Verify API</strong>!`,
          placement: "bottom"
        },
        {
          target: "#v-step-3", // We're using document.querySelector() under the hood
          header: {
            title: "Resend button"
          },
          content: `the <strong>Resend API </strong>!`,
          placement: "right"
        },
        {
          target: "#v-step-4", // We're using document.querySelector() under the hood
          header: {
            title: "Exit button"
          },
          content: `the <strong>Exit  </strong>!`,
          placement: "right"
        }
      ],
      step4: [
        {
          target: "#v-step-5", // We're using document.querySelector() under the hood
          header: {
            title: "Cancelation API"
          },
          content: `<strong> Cancel API</strong>!`,
          placement: "bottom"
        }
      ]
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
        x => x.value == this.$store.state.selectedCountry
      );
    },
    operatorDetails() {
      return this.country.operator.find(
        x => x.operatorCode == this.selectedOperator
      );
    },

    disclaimer() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `${this.$t("disclaimer1")}
        ${this.setupDetails.serviceName}
        ${this.$t("for")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
          ${this.$t("disclaimer2")}
         ${this.$t("for")}
         ${this.operatorDetails.text}
          ${"subscribers please send"}
          ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
          ${this.$t("disclaimer3")}
         `;
      } else {
        return `${this.$t("disclaimer1")}
        ${this.setupDetails.serviceName}
        ${this.$t("for")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
          ${this.$t("disclaimer2")}
          ${this.$store.state.selectedCountry === "PS" ? "لمستخدمي " : "لعملاء"}
         ${this.operatorDetails.textAr}
          ${"إرسل"}
          ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
          ${this.$t("disclaimer3")}
         `;
      }
    },
    QAdisclaimer() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `
        ${this.$t("disclaimerqa")}
        ${this.setupDetails.serviceName}
        ${this.$t("disclaimerqa1")}
        ${"then you will be charged"}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"you can unsubscribe at any time."}
         ${this.$t("disclaimer3")}
         ${this.$t("or")}
         ${this.$t("for")}
         ${this.operatorDetails.text}
        ${"customers to unsubscribe send"}
        ${this.setupDetails.unsubKeyword}
        ${this.$t("to")}
        ${this.operatorDetails.shortcode}
        ${"for free"}
         ${this.$t("disclaimerqa2")}  `;
      } else {
        return ` ${this.$t("disclaimerqa")}
        ${this.setupDetails.serviceName}
        ${this.$t("disclaimerqa1")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"،ويمكنك إلغاء الاشتراك في أي وقت."}
         ${this.$t("disclaimer3")}
        ${this.$t("or")}
         ${"لعملاء "}
         ${this.operatorDetails.textAr}
        ${"لإلغاء الاشتراك بإرسال"}
        ${this.setupDetails.unsubKeyword}
        ${this.$t("to")}
        ${this.operatorDetails.shortcode}
        ${"مجانًا"}
         ${this.$t("disclaimerqa2")}  `;
      }
    },
    TNdisclaimer() {
      if (this.$store.state.selectedLanguage === "FR") {
        return `
        ${this.$t("disclaimerJtn")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"sera déduit de votre solde"}
         ${this.$t("disclaimerJtn1")}
         ${this.$t("disclaimerJtn2")}
        ${this.setupDetails.unsubKeyword}
        ${this.$t("to")}
        ${this.operatorDetails.shortcode}
         ${this.$t("disclaimerJtn3")}
`;
      } else {
        return `
        ${this.$t("disclaimerJtn")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"من رصيدك."}
         ${this.$t("disclaimerJtn1")}
         ${this.$t("disclaimerJtn2")}
        ${this.setupDetails.unsubKeyword}
        ${this.$t("to")}
        ${this.operatorDetails.shortcode}
         ${this.$t("disclaimerJtn3")}
`;
      }
    },
    BHdisclaimer() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `
        ${this.$t("disclaimerbh")}
         ${this.operatorDetails.text}
        ${this.$t("disclaimerbh1")}
        ${
          this.setupDetails.serviceName
        } ${"who manages this subscription service"}
        ${this.$t("disclaimerbh2")}
         ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
        ${this.$t("disclaimerbh3")}
        ${this.$t("disclaimerbh4")}
        ${this.$t("disclaimerbh5")}

      `;
      } else {
        return `
      ${this.$t("disclaimerbh")}
         ${this.operatorDetails.textAr}
        ${this.$t("disclaimerbh1")}
        ${this.setupDetails.serviceName}
        ${this.$t("disclaimerbh2")}
         ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
        ${this.$t("disclaimerbh3")}
        ${this.$t("disclaimerbh4")}
        ${this.$t("disclaimerbh5")}
      `;
      }
    },
    KSAdisclaimer() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `
        ${this.$t("disclaimerksa")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"automatically until you unsubscribe."}
        ${this.$t("disclaimerksa1")}
         ${this.$t("disclaimerksa2")}
         ${
           this.operatorDetails.operatorCode === "42004"
             ? " or For" +
               " " +
               this.operatorDetails.text +
               " " +
               "users, please send" +
               " " +
               this.setupDetails.unsubKeyword +
               " " +
               this.$t("to") +
               " " +
               this.operatorDetails.shortcode
             : ""
         }
         ${this.$t("disclaimerksa2")}


          `;
      } else {
        return `
         ${this.$t("disclaimerksa")}
         ${this.operatorDetails.textAr}
        ${"سيتم تجديد الاشتراك تلقائيًا بسعر"}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"حتى تلغي اشتراكك."}
        ${this.$t("disclaimerksa1")}
         ${this.$t("disclaimerksa3")}
         ${
           this.operatorDetails.operatorCode === "42004"
             ? "أو قم بإرسال " +
               " " +
               this.setupDetails.unsubKeyword +
               " " +
               this.$t("to") +
               " " +
               this.operatorDetails.shortcode
             : ""
         }
          ${this.$t("disclaimerksa2")}



        `;
      }
    },
    JOAdisclaimer() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `
      ${this.$t("disclaimerJor1")}
      ${this.setupDetails.serviceName}
         ${this.$t("for")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${"please Send SUB G to "}
        ${this.operatorDetails.shortcode}
        ${this.$t("disclaimer2")}
         ${this.$t("for")}
         ${this.operatorDetails.text}
          ${"subscribers please send"}
          ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
          ${this.$t("disclaimer3")}`;
      } else {
        return `
         ${this.$t("disclaimerJor1")}
          ${this.setupDetails.serviceName}
           ${this.$t("for")}
        ${this.setupDetails.price}
        ${this.currencyText}
        ${this.$t(this.setupDetails.frequency)}
        ${" قم بإرسال "}
        ${"SUB G"}
        ${"الى "}
         ${this.operatorDetails.shortcode}
          ${"و "}
        ${this.$t("disclaimer2")}
         ${this.operatorDetails.textAr}
          ${"قم بإرسال"}
          ${this.setupDetails.unsubKeyword}
          ${this.$t("to")}
         ${this.operatorDetails.shortcode}
          ${this.$t("disclaimer3")}`;
      }
    },
    WelcomeSMS() {
      if (this.$store.state.selectedLanguage === "EN") {
        return `Thank you for Subscribing in  ${
          this.setupDetails.serviceName
        } ${this.$t("for")} ${this.setupDetails.price} ${
          this.currencyText
        } ${this.$t(this.setupDetails.frequency)} ${this.$t(
          "disclaimer2"
        )}${this.$t("for")} ${
          this.operatorDetails.text
        } ${"subscribers please send"} ${
          this.setupDetails.unsubKeyword
        } ${this.$t("to")} ${this.operatorDetails.shortcode}`;
      } else {
        return `شكرًا لك على الاشتراك في ${
          this.setupDetails.serviceName
        } ${this.$t("for")} ${this.setupDetails.price} ${
          this.currencyText
        } ${this.$t(this.setupDetails.frequency)} ${this.$t(
          "disclaimer2"
        )} ${this.$t("for")}${
          this.operatorDetails.textAr
        } ${"subscribers please send"} ${
          this.setupDetails.unsubKeyword
        } ${this.$t("to")}${this.operatorDetails.shortcode}`;
      }
    }
  },
  methods: {
    // async sessionToken() {
    //   this.loading = true;
    //   return

    //   // return this.token;
    //   // this.loading = false;
    //   // console.log(this.token);
    // },

    async onMobileEnter() {
      // let streq = await this.$store.dispatch("heSessionToken", [
      //   this.MSISDN,
      //   this.selectedOperator
      // ]);
      // this.$store.commit("noOfReq");
      this.token = TPay.HeaderEnrichment.sessionToken();
      // axios.get(streq).then(response => {
      //   console.log("the motherfucken response", response);
      // });
      // let recaptchaScript = document.createElement("script");
      // recaptchaScript.setAttribute("src", streq);
      // recaptchaScript.setAttribute("type", "text/javascript");
      // document.head.appendChild(recaptchaScript);
      // let timer = this.onMobileEnter.timer;
      // if (timer) {
      //   clearTimeout(timer);
      // }
      // this.showAlert.timer = setTimeout(() => {
      //   this.token = TPay.HeaderEnrichment.sessionToken();
      // }, 500);
      // this.loading = true;
      // let st = this.sessionToken();
      // console.log(streq);

      this.alert1 = null;
      this.$store
        .dispatch("addSub", [this.MSISDN, this.selectedOperator, this.token])
        .then(response => {
          this.$store.commit("noOfReq");

          this.loading = false;
          this.e1 = 2;
          if (this.$store.state.selectedCountry === "UAE") {
            this.$tours["pincodePage1"].start();
          } else {
            this.$tours["pincodePage"].start();
          }
        })
        .catch(error => {
          this.alert1 = {
            type: "error",
            message: error.errorMessage
          };
          this.loading = false;
        });
    },
    show() {
      if (
        this.$store.state.selectedCountry === "JO" &&
        this.operatorDetails.shortcode === "91825"
      ) {
        this.$tours["onMobileEnter"].stop();
        return false;
      } else {
        // this.$tours["onMobileEnter"].start();
        return true;
      }
    },

    onVerify() {
      this.alert2 = null;
      this.alert3 = null;
      this.loading = true;
      this.$store
        .dispatch("Verify", this.PinCode)
        .then(response => {
          this.$store.commit("noOfReq");
          // if (!response.response.errorMessage) {
          this.loading = false;
          // let timer = this.onVerify.timer;
          this.e1 = 3;
          this.alert3 = {
            type: "success",
            message:
              "You have successfully subscribed successfully you should recieve an SMS with the subscription detials"
          };

          this.$store
            .dispatch("welcomeSms", [
              this.MSISDN,
              this.selectedOperator,
              this.WelcomeSMS.trim()
            ])
            .then(response => {
              this.$store.commit("noOfReq");
            })
            .catch(error => {
              // console.log(error);
              this.alert3 = {
                type: "error",
                message: error.errorMessage
              };
              // this.loading = false;
            });
          let timer = this.onVerify.timer;
          if (timer) {
            clearTimeout(timer);
          }
          this.showAlert.timer = setTimeout(() => {
            this.alert3 = null;
            console.log("here1");
            console.log(timer);
          }, 500);
        })
        .catch(error => {
          this.alert2 = {
            type: "error",
            message: error.errorMessage
          };
          this.loading = false;
        });
    },
    onResend() {
      this.alert2 = null;
      this.loading = true;
      this.$store
        .dispatch("Resend")
        .then(response => {
          this.$store.commit("noOfReq");

          this.loading = false;
          // console.log("here");
          this.alert2 = {
            type: "success",
            message: "pin code was sent successfully"
          };
          let timer = this.onResend.timer;
          if (timer) {
            clearTimeout(timer);
          }
        })
        .catch(error => {
          // console.log(error);
          this.alert2 = {
            type: "error",
            message: error.errorMessage
          };
          this.loading = false;
        });
      this.showAlert.timer = setTimeout(() => {
        console.log("here");
        this.alert2 = null;
      }, 10000);
    },
    onCancelEnter() {
      // console.log("button clicked");
      this.alert3 = null;
      this.loading = true;
      this.$store
        .dispatch("cancelSub")
        .then(response => {
          this.$store.commit("noOfReq");

          this.loading = false;
          this.alert3 = {
            type: "success",
            message: "You have successfully UN-subscribed"
          };
          let timer = this.onCancelEnter.timer;
          if (timer) {
            clearTimeout(timer);
          }

          // console.log("caneled");
        })
        .catch(error => {
          this.alert3 = {
            type: "error",
            message: error.errorMessage
          };
          this.loading = false;
        });
      this.showAlert.timer = setTimeout(() => {
        // console.log("here");
        this.alert2 = null;
        this.e1 = 1;
        this.$tours["onMobileEnter"].stop();
        this.$tours["pincodePage1"].stop();
      }, 10000);
    }
  },
  mounted() {
    this.$store.dispatch("heSessionToken", [" ", " "]).then(response => {
      // return response;
      let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute("src", response);
      recaptchaScript.setAttribute("type", "text/javascript");
      document.head.appendChild(recaptchaScript);
      console.log("here");
      // this.e1 = 3;
      this.$tours["cancelPage"].start();
      if (this.$store.state.selectedCountry === "UAE") {
        this.$tours["onMobileEnter1"].start();
      } else {
        this.$tours["onMobileEnter"].start();
      }
    });
  }
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
.bold {
  font-weight: bold;
}
.locatealert {
  width: 80%;
  margin: auto;
}
.spacing {
  padding: 0;
  margin: 0;
}

.welcomeTextWrapper {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  /* border: 1px solid red; */
  height: 100%;
}

.welcomeText {
  text-align: center;

  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
  /* margin: 0; */
}

.welcomeTextcard {
  background-color: #333;
  width: 70%;
  margin-top: 10%;
  margin: auto;

  height: 40%;

  display: flex;
  /* -webkit-box-pack: center; */
  justify-content: center;

  align-items: center;
}
</style>
