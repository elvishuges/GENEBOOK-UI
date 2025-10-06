<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="tool-bar">
        <q-toolbar-title @click="$router.push('/index')">
          GEnEBook-UI
        </q-toolbar-title>
        <div>v 2.0</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GeneBookUi",

  methods: {
    goToRouteOnClick() {},
  },
});
</script>

<style scoped>
.tool-bar {
  cursor: pointer;
}
</style>
