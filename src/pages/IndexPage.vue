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
        label="game-config.json"
        color="primary"
        size="lg"
        @click="onGenerateGameConfigClick"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
      <q-btn
        type="submit"
        label="book-config.json"
        color="primary"
        size="lg"
        @click="onGenarateBookConfigClick"
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
      @confirm="onConfirmDialogClick"
      @cancel="onCancelDialogClick"
      confirmButtonLabel="Reset"
    />

    <game-book-file-dialog
      :state="showGameConfigFileDialog"
      @close="onGenerateGameBookClose"
      :jsonFile="gameBookFile"
    />
    <book-config-file-dialog
      :state="showBookConfigFileDialog"
      @close="onGenerateBookConfigClose"
      :jsonFile="configsFile"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import { playerInitialState } from "./../store/player/state";
import { messagesInitialState } from "./../store/messages/state";
import { configsInitialState } from "./../store/configs/state";

import FeatureCard from "components/FeatureCard.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";

import GameBookFileDialog from "src/components/GameBookFileDialog.vue";
import BookConfigFileDialog from "src/components/BookConfigFileDialog.vue";

import StateFormater from "./../utils/states-formater";

export default defineComponent({
  name: "IndexPage",

  components: {
    FeatureCard,
    DeleteConditionsDialog,
    GameBookFileDialog,
    BookConfigFileDialog,
  },
  data() {
    return {
      configsFile: {
        title: "",
        description: "",
        coverImage: "",
        creator: "",

        titleSection: "",
        navSection: "",

        content: "",
        language: "",
        created: "",
        modified: "",
        attributionURL: "",
      },
      gameBookFile: {
        messages: {
          gameTitle: "",
          initialImage: "",
          initialAudio: "",
          gameIntroduction: "",
          gameStart: "",
          gameContinue: "",
          goButton: "",
          contentToBeLoaded: "",
          itemsText: "",
          actionsText: "",
          exitsText: "",
          goingTo: "",
          optionsText: "",
          inventoryLinkText: "",
          inventoryTitle: "",
          inventoryText: "",
          noItemsCollected: "",
          mapLinkText: "",
          mapText: "",
          creditsLinkText: "",
          creditsTitle: "",
          creditsText: "",
          fromLabel: "",
          toLabel: "",
        },

        // ################################

        player: {
          currentState: "",
          currentLocation: "",
          collectedItems: [],
          performedActions: [],
          status: {
            life: 0,
          },
        },

        actors: [],

        items: [],

        locations: [],

        ends: [],
      },

      stateFormater: new StateFormater(),

      showDeleteConditionsDialog: false,
      showGameConfigFileDialog: false,
      showBookConfigFileDialog: false,

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
          description: "Actions from system",
        },
        {
          goToRouteOnClick: "configs",
          title: "Book-Config",
          description: "Book Configurations",
        },
      ],
    };
  },

  computed: {
    // seguindo ordem do arquivo invasion.js
    ...mapState("messages", ["messages"]),
    ...mapState("player", ["player"]),
    ...mapState("actors", ["actors"]),
    ...mapState("items", ["items"]),
    ...mapState("locations", ["locations"]),
    ...mapState("ends", ["ends"]),
    ...mapState("configs", ["configs"]),
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
    ...mapActions("configs", ["clean_configs"]),

    onGenerateGameConfigClick() {
      this.generateGameConfigJasonFile();
      this.showGameConfigFileDialog = true;
    },
    onGenarateBookConfigClick() {
      this.generateBookConfigJsonFile();
      this.showBookConfigFileDialog = true;
    },

    onGenerateGameBookClose() {
      this.showGameConfigFileDialog = false;
    },

    onGenerateBookConfigClose() {
      this.showBookConfigFileDialog = false;
    },

    generateGameConfigJasonFile() {
      this.gameBookFile.messages = this.stateFormater.formatMessages(
        this.messages
      );

      this.gameBookFile.player = this.stateFormater.formatPlayer(this.player);

      this.gameBookFile.actors = this.stateFormater.formatActors(this.actors);

      this.gameBookFile.items = this.stateFormater.formatItems(this.items);

      this.gameBookFile.locations = this.stateFormater.formatLocations(
        this.locations
      );

      this.gameBookFile.ends = this.stateFormater.formatEnds(this.ends);
    },

    generateBookConfigJsonFile() {
      this.configsFile = this.stateFormater.formatConfigs(this.configs);
    },

    cleanGameBookState() {
      this.clean_player(playerInitialState); // clean and set
      this.clean_messages(messagesInitialState); // clean and set
      this.clean_locations();
      this.clean_items();
      this.clean_ends();
      this.clean_actors();
      this.clean_actions();
      this.clean_files();
      this.clean_configs(configsInitialState); // clean and set
    },

    onCleanClick() {
      this.showDeleteConditionsDialog = true;
    },
    onCancelDialogClick() {
      this.showDeleteConditionsDialog = false;
    },
    onConfirmDialogClick() {
      this.cleanGameBookState();
      this.showDeleteConditionsDialog = false;
      this.showSuccessNotification("GameBook state reseted successfully!");
    },
    showSuccessNotification(msg) {
      this.$q.notify({
        type: "positive",
        message: msg,
      });
    },
  },
});
</script>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
</style>
