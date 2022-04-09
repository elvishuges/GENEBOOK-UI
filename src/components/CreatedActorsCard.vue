<template>
  <q-card class="my-card cursor-pointer" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
        <div class="text-caption text-grey">
          {{ description }}
        </div>
      </q-card-section>
    </q-card-section>
    <q-separator></q-separator>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreatedActorsCard",

  props: {
    name: {
      type: String,
      default: "",
    },
    title: {
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
    max-width: 300px
    height: 150px
</style>

<style>
</style>