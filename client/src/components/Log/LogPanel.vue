<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset scrollable>
      <template v-slot:activator="{ on }">
        <v-row align="center" justify="center">
          <v-btn absolute bottom dark color="grey darken-3" style="bottom:-20px" v-on="on">
            <div class="mr-12">request & response logs</div>
            <v-badge color="warning">
              <template v-slot:badge>
                <span v-if="noReq > 0">!</span>
              </template>
              <v-icon>mdi-arrow-up</v-icon>
            </v-badge>
          </v-btn>
        </v-row>
      </template>
      <v-card>
        <v-card-text class="text-center">
          <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
            close
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
          <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
          >The Request and response logs fired in the subscription flow should appear below:</v-alert>
          <v-stepper vertical>
            <v-alert
              type="warning"
              v-if="!this.$store.state.addSubRes"
            >No requests has been fired yet</v-alert>
            <v-stepper-step
              step="1"
              v-if="this.$store.state.addSubRes"
              editable
            >AddSubscriptionContractRequest API</v-stepper-step>

            <v-stepper-content step="1" v-if="this.$store.state.addSubRes">
              <v-row justify="center">
                <v-expansion-panels inset multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Request</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.addSubRes.request"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Response</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.addSubRes.response"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-stepper-content>

            <v-stepper-step
              step="2"
              v-if="this.$store.state.resendRes"
              editable
            >SendSubscriptionContractVerificationSMS API</v-stepper-step>

            <v-stepper-content step="2" v-if="this.$store.state.resendRes">
              <v-row justify="center">
                <v-expansion-panels inset multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Request</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.resendRes.request"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Response</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.resendRes.response"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-stepper-content>

            <v-stepper-step
              step="3"
              v-if="this.$store.state.verifyRes"
              editable
            >VerifySubscriptionContract API</v-stepper-step>

            <v-stepper-content step="3" v-if="this.$store.state.verifyRes">
              <v-row justify="center">
                <v-expansion-panels inset multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Request</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.verifyRes.request"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Response</v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      <vue-json-pretty
                        showLine
                        highlightMouseoverNode
                        :data="this.$store.state.verifyRes.response"
                      ></vue-json-pretty>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-stepper-content>

            <v-stepper-step
              step="4"
              v-if="this.$store.state.sendFreeRes"
              editable
            >SendFreeMTMessage API</v-stepper-step>
            <v-stepper-content step="4" v-if="this.$store.state.sendFreeRes">
              <v-row justify="center">
                <v-expansion-panels inset multiple>
                  <v-expansion-panel v-for="(item,i) in 2" :key="i">
                    <v-expansion-panel-header>Request</v-expansion-panel-header>
                    <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "About",
  components: {
    VueJsonPretty
  },
  data: () => ({
    sheet: false,
    e6: 1
  }),
  computed: {
    setupDetails() {
      return this.$store.state.setupDetails;
    },
    language() {
      return this.$store.state.selectedLanguage;
    },
    country() {
      return this.$store.state.selectedCountry;
    },
    noReq() {
      //this.$store.commit("noOfReq");
      return this.$store.state.noOfReq;
    }
  }
};
</script>

<style>
</style>
