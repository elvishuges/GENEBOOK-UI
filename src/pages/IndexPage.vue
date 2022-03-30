<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <feature-card title="Messages" description="Messages from system" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <feature-card title="Player" description="Player configurations" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <feature-card title="Actors" description="Actores from System" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import FeatureCard from "components/FeatureCard.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    FeatureCard,
  },
});
</script>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
</style>
