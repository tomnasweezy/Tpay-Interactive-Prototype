<template>
  <v-app-bar app>
    <v-toolbar-title>Landing Page</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn depressed to="setup">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-if="this.$store.state.selectedCountry === 'LY'" v-slot:activator="{ off}">
          <v-btn depressed v-on="on">{{selectedlanguage}}</v-btn>
        </template>
        <template v-else v-slot:activator="{ on }">
          <v-btn depressed v-on="on">{{selectedlanguage}}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(lang, index) in language"
            :key="index"
            @click="changeLang(lang.value)"
          >
            <v-list-item-title>{{ lang.value }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppNavigation",
  data() {
    return {};
  },
  methods: {
    changeLang(lang) {
      this.$store.state.selectedLanguage = lang;
      this.$i18n.locale = lang.toLowerCase();
    }
  },
  computed: {
    language() {
      console.log("okok", this.$store.state.selectedCountry);
      if (this.$store.state.selectedCountry === "LY") {
        // console.log("here1");
        return this.$store.state.langs[1];
      } else if (
        this.$store.state.selectedCountry != "AL" &&
        this.$store.state.selectedCountry != "TN"
      ) {
        console.log("here2");
        return this.$store.state.langs.slice(0, 2);
      } else {
        console.log("here3");
        return this.$store.state.langs.slice(1, 3);
      }

      // return this.$store.state.langs;
    },
    selectedlanguage() {
      return this.$store.state.selectedLanguage;
    }
  }
};
</script>