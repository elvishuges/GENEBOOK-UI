<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-3">
        <feature-card
          goToRouteOnClick="messages"
          title="Messages"
          description="Messages from System"
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3">
        <feature-card
          title="Player"
          goToRouteOnClick="player"
          description="Player configurations"
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3">
        <feature-card
          goToRouteOnClick="actors"
          title="Actors"
          description="Actors from System"
        />
      </div>

      <div class="col-xs-12 col-sm-4 col-md-3">
        <feature-card
          goToRouteOnClick="items"
          title="Items"
          description="Items from System"
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3">
        <feature-card
          goToRouteOnClick="files"
          title="Files"
          description="Audios and Images"
        />
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
