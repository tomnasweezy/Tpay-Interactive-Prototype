<template>
  <v-app-bar app>
    <v-toolbar-title>Landing Page</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn depressed to="setup">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
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
      return this.$store.state.langs;
    },
    selectedlanguage() {
      return this.$store.state.selectedLanguage;
    }
  }
};
</script>