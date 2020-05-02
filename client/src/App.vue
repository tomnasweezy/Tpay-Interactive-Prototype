<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppNavigation from "./components/Layout/AppNavigation";
import AppFooter from "./components/Layout/AppFooter";

export default {
  name: "App",
  components: {
    AppNavigation,
    AppFooter
  }
};
</script>