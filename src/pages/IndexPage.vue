<template>
  <q-page class="q-pa-md q-mb-lg">
    <div class="row">
      <div
        v-for="(item, index) in indexPageItems"
        :key="index"
        class="col-xs-12 col-sm-4 col-md-3"
      >
        <feature-card
          :goToRouteOnClick="item.goToRouteOnClick"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>

    <div class="row justify-end q-pa-lg q-gutter-sm fixed-bottom-right">
      <q-btn
        type="submit"
        label="Generate GameBook File"
        color="secondary"
        size="lg"
        @click="onGenerateGameBookClick"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
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

  methods: {
    onGenerateGameBookClick() {
      console.log("generate gamebook...");
    },
  },

  data() {
    return {
      indexPageItems: [
        {
          goToRouteOnClick: "messages",
          title: "Messages",
          description: "Messages from System",
        },
        {
          goToRouteOnClick: "player",
          title: "Player",
          description: "Player configurations",
        },
        {
          goToRouteOnClick: "actors",
          title: "Actors",
          description: "Actors from System",
        },
        {
          goToRouteOnClick: "items",
          title: "Items",
          description: "Items from System",
        },
        {
          goToRouteOnClick: "files",
          title: "Files",
          description: "Audios and Images",
        },
        {
          goToRouteOnClick: "locations",
          title: "Locations",
          description: "Locations from System",
        },
        {
          goToRouteOnClick: "ends",
          title: "Ends",
          description: "Ends from System",
        },
      ],
    };
  },
});
</script>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
</style>
