<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit">
      <div class="row">
        <q-input
          v-model="form.gameTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game title"
          hint="the game title"
          lazy-rules
        />
        <q-input
          v-model="form.initialImage"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Image"
          hint="Name and surname"
          lazy-rules
        />
        <q-input
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Your name *"
          hint="Name and surname"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.gameTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game title"
          hint="the game title"
          lazy-rules
        />
        <q-input
          v-model="form.initialImage"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Image"
          hint="Name and surname"
          lazy-rules
        />
        <q-input
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Your name *"
          hint="Name and surname"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.gameTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game title"
          hint="the game title"
          lazy-rules
        />
        <q-input
          v-model="form.initialImage"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Image"
          hint="Name and surname"
          lazy-rules
        />
        <q-input
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Your name *"
          hint="Name and surname"
          lazy-rules
        />
      </div>
      <div class="row">
        <q-input
          v-model="form.gameTitle"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Game title"
          hint="the game title"
          lazy-rules
        />
        <q-input
          v-model="form.initialImage"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Initial Image"
          hint="Name and surname"
          lazy-rules
        />
        <q-input
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Your name *"
          hint="Name and surname"
          lazy-rules
        />
      </div>
      <div class="row justify-end q-pa-md q-gutter-sm">
        <q-btn
          align="around"
          color="grey"
          label="Back"
          size="lg"
          @click="$router.go(-1)"
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

    onSubmit() {
      this.set_messages({ email: "Elvis Huges", password: "123456" });
    },

    loadMessages() {
      this.form = { ...this.messages };
      // console.log("form", this.form);
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>