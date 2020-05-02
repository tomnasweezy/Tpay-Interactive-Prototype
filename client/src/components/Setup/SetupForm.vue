<template>
  <v-row align="center" justify="center">
    <v-col md="8" xs="12">
      <v-card>
        <ValidationObserver ref="obs">
          <v-card-text>
            <span class="headline black--text">Simulation Setup</span>
            <v-row>
              <v-col cols="12" md="6">
                <span class="subtitle-1 black--text">Country</span>
                <validation-provider name="Country" rules="required" v-slot="{ errors, valid }">
                  <v-overflow-btn
                    class="my-2"
                    :items="countries"
                    label="Select Country"
                    :error-messages="errors[0]"
                    :success="valid"
                    v-model="selectedCountry"
                    editable
                  ></v-overflow-btn>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
                <span class="subtitle-1 black--text">Language</span>
                <validation-provider name="Language" rules="required" v-slot="{ errors, valid }">
                  <v-overflow-btn
                    class="my-2"
                    :items="language"
                    label="Select Language"
                    :error-messages="errors[0]"
                    :success="valid"
                    v-model="selectedLanguage"
                    editable
                  ></v-overflow-btn>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="4">
                <span class="subtitle-1 black--text">Security Keys</span>
                <validation-provider name="Public Key" rules="required" v-slot="{ errors, valid }">
                  <v-text-field
                    label="Public Key"
                    :error-messages="errors[0]"
                    :success="valid"
                    v-model="setupDetails.publicKey"
                  ></v-text-field>
                </validation-provider>
                <validation-provider name="Private Key" rules="required" v-slot="{ errors, valid }">
                  <v-text-field
                    label="Private Key"
                    :error-messages="errors[0]"
                    :success="valid"
                    v-model="setupDetails.privateKey"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="4">
                <span class="subtitle-1 black--text">Subscription Configuration</span>
                <validation-provider
                  name="Subscription plan id"
                  rules="required"
                  v-slot="{ errors, valid }"
                >
                  <v-text-field
                    label="Subscription Plan Id"
                    :error-messages="errors[0]"
                    :success="valid"
                    v-model="setupDetails.subPlanId"
                  ></v-text-field>
                </validation-provider>
                <v-row>
                  <v-col>
                    <validation-provider
                      name="Catalog Name"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        label="Catalog Name"
                        :error-messages="errors[0]"
                        :success="valid"
                        v-model="setupDetails.catalogName"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <validation-provider
                      name="Product Id"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        label="Product ID"
                        :error-messages="errors[0]"
                        :success="valid"
                        v-model="setupDetails.productId"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <span class="subtitle-1 black--text">Subscription Type</span>
                <v-radio-group v-model="setupDetails.selectedSubType" column>
                  <v-radio
                    v-for="type in subTypes"
                    :key="type.value"
                    :label="type.text"
                    :value="type.value"
                    primary
                  ></v-radio>
                  <validation-provider
                    name="Free period"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-if="setupDetails.selectedSubType ==='FS'"
                      label="Number Of free trial days"
                      :error-messages="errors[0]"
                      :success="valid"
                      v-model="setupDetails.freeStartDays"
                    ></v-text-field>
                  </validation-provider>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <span class="subtitle-1 black--text">Disclaimer configuration</span>
                <v-row>
                  <v-col md="6">
                    <validation-provider name="Price" rules="required" v-slot="{ errors, valid }">
                      <v-text-field
                        label="Price"
                        :error-messages="errors[0]"
                        :success="valid"
                        v-model="setupDetails.price"
                        type="number"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col md="6">
                    <validation-provider
                      name="Frequnecy"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-select
                        :items="subfrequency"
                        :error-messages="errors[0]"
                        v-model="setupDetails.frequency"
                        label="Frequnecy"
                        :success="valid"
                      ></v-select>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <validation-provider
                      name="Service Name"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        label="Service Name"
                        :error-messages="errors[0]"
                        v-model="setupDetails.serviceName"
                        :success="valid"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <validation-provider
                      name="Unsub Keyword"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        label="Unsub Keyword"
                        :error-messages="errors[0]"
                        :success="valid"
                        v-model="setupDetails.unsubKeyword"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-btn color="primary" :disabled="allowSubmit" @click="onSubmit">Submit</v-btn>
            </v-row>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
      <v-snackbar v-model="snackbar" color="error" :timeout="3000">
        {{ snackbarText }}
        <v-btn @click="snackbar = false" dark>X</v-btn>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message(value) {
    return `The ${value} is required`;
  }
});

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    snackbarText: "",
    snackbar: false,
    subTypes: [
      { text: "Parking Period", value: "PR" },
      { text: "Free Start Period", value: "FS" },
      { text: "Initial Payment", value: "IP" }
    ],
    setupDetails: {},
    selectedCountry: null,
    selectedLanguage: null,
    subfrequency: ["Daily", "Weekly", "Monthly", "Yearly"]
  }),
  methods: {
    onSubmit() {
      let setupCheck = this.setupDetails;
      if (
        !this.selectedCountry ||
        !this.selectedCountry ||
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
        this.snackbarText = "The highlighted fields are required";
        this.$refs.obs.validate();
        return (this.snackbar = true);
      }
      this.$store.commit("setSetup", this.setupDetails);
      this.$store.commit(
        "setCountry",
        this.selectedCountry ? this.selectedCountry : "EG"
      );
      this.$store.commit(
        "setLanguage",
        this.selectedLanguage ? this.selectedLanguage : "EN"
      );
      this.$i18n.locale = this.selectedLanguage
        ? this.selectedLanguage.toLowerCase()
        : "en";
      this.$router.push("/");
    }
  },
  computed: {
    language() {
      return this.$store.state.langs;
    },
    countries() {
      return this.$store.state.countries;
    },
    allowSubmit() {
      let setupCheck = this.setupDetails;
      if (
        !this.selectedCountry ||
        !this.selectedCountry ||
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
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
</style>