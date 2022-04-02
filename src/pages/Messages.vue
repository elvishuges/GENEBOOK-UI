<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit" class="q-pb-xl">
      <div class="row">
        <q-input
          v-model="form.gameTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game title"
          hint="The Game Title"
          lazy-rules
        />
        <q-input
          v-model="form.initialImage"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Image"
          hint="The Initial Image"
          lazy-rules
        />
        <q-input
          v-model="form.initialAudio"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Audio"
          hint="The Initial Audio"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.gameIntroduction"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game Introdution"
          hint="The Game Introdution Message"
          lazy-rules
        />
        <q-input
          v-model="form.gameStart"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game Start"
          hint="The Game Start Message"
          lazy-rules
        />
        <q-input
          v-model="form.gameContinue"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game Continue"
          hint="The Game Continue Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.goButton"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Go Button"
          hint="The Go Button Text"
          lazy-rules
        />
        <q-input
          v-model="form.contentToBeLoaded"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Content To be Loaded"
          hint="The Content To be Loaded Message"
          lazy-rules
        />
        <q-input
          v-model="form.itemsText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Items Text"
          hint="The Items Text Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.actionsText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Actions Texts"
          hint="The Actions Texts Message"
          lazy-rules
        />
        <q-input
          v-model="form.exitsText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Exits Texts"
          hint="The Exits Texts Message"
          lazy-rules
        />
        <q-input
          v-model="form.goingTo"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Going To"
          hint="The Going To Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.optionsText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Options Text"
          hint="The Options Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.inventoryLinkText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Inventory Link Text"
          hint="The Inventory Link Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.inventoryTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Inventory Title"
          hint="The Inventory Title Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.inventoryText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Inventory Text"
          hint="The Inventory Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.noItemsCollected"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="No Items Collected"
          hint="The No Items Collected Message"
          lazy-rules
        />
        <q-input
          v-model="form.mapLinkText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Map Link"
          hint="The Map Link Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.mapText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Map Text"
          hint="The Map Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.creditsLinkText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Cridits Link Text"
          hint="The Credits Links Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.creditsTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Credits Title"
          hint="The Credits Title Message"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.creditsText"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Credits Text"
          hint="The Credits Text Message"
          lazy-rules
        />
        <q-input
          v-model="form.fromLabel"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="From Label"
          hint="The From Label Message"
          lazy-rules
        />
        <q-input
          v-model="form.toLabel"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="To Label"
          hint="The To Label Message"
          lazy-rules
        />
      </div>
      <div class="row justify-end q-pa-md q-gutter-sm fixed-bottom-right">
        <q-btn
          align="around"
          color="grey"
          label="Back"
          size="lg"
          @click="$router.go(-1)"
          flat
        />
        <q-btn type="submit" label="Save" color="primary" size="lg">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
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
        mapTitle: "",
        mapText: "",
        creditsLinkText: "",
        creditsTitle: "",
        creditsText: "",
        fromLabel: "",
        toLabel: "",
      },
    };
  },
  computed: {
    ...mapState("messages", ["messages"]),
  },
  mounted() {
    this.loadMessages();
  },
  methods: {
    ...mapActions("messages", ["set_messages"]),

    loadMessages() {
      this.form = { ...this.messages };
    },

    onSubmit() {
      this.set_messages({ ...this.form });
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>