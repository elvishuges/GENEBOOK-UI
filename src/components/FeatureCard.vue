<template>
  <q-card
    @click="$router.push(goToRouteOnClick)"
    flat
    bordered
    class="feature-card bg-grey-1"
  >
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-subtitle1">{{ title }}</div>
          <div class="text-subtitle2">{{ description }}</div>
        </div>
        <div class="col-auto">
          <q-btn round flat icon="double_arrow"> </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeatureCard",

  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    goToRouteOnClick: {
      type: String,
      default: "/",
    },
  },
});
</script>

<style lang="sass" scoped>
.feature-card > q-card-section >
:hover
  color: $primary
  cursor: pointer
</style>

