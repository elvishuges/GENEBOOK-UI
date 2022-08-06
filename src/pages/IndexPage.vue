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

      <q-btn color="negative" @click="onCleanClick" label="Reset GameBook" />
    </div>

    <delete-conditions-dialog
      text="Do you want to reset all GameBook states?"
      :state="showDeleteConditionsDialog"
      @confirm="onConfirDialogClick"
      @cancel="onCancelDialogClick"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { playerInitialState } from "./../store/player/state";
import { messagesInitialState } from "./../store/messages/state";
import FeatureCard from "components/FeatureCard.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    FeatureCard,
    DeleteConditionsDialog,
  },

  methods: {
    ...mapActions("player", ["clean_player"]),
    ...mapActions("messages", ["clean_messages"]),
    ...mapActions("locations", ["clean_locations"]),
    ...mapActions("items", ["clean_items"]),
    ...mapActions("ends", ["clean_ends"]),
    ...mapActions("actors", ["clean_actors"]),
    ...mapActions("actions", ["clean_actions"]),
    ...mapActions("files", ["clean_files"]),

    onGenerateGameBookClick() {
      console.log("generate");
    },

    cleanGameBookState() {
      this.clean_player(playerInitialState);
      this.clean_messages(messagesInitialState);
      this.clean_locations();
      this.clean_items();
      this.clean_ends();
      this.clean_actors();
      this.clean_actions();
      this.clean_files();
    },

    onCleanClick() {
      this.showDeleteConditionsDialog = true;
    },
    onCancelDialogClick() {
      this.showDeleteConditionsDialog = false;
    },
    onConfirDialogClick() {
      this.cleanGameBookState();
      this.showDeleteConditionsDialog = false;
    },
  },

  data() {
    return {
      showDeleteConditionsDialog: false,

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
        {
          goToRouteOnClick: "actions",
          title: "Actions",
          description: "Actions used in the system",
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
