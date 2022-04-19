<template>
  <q-card class="my-card">
    <q-card-section class="bg-grey-8 text-white">
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ name }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreatedActorsCard",

  props: {
    title: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>

<style>
</style>