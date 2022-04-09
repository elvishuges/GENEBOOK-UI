<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <created-actors-card v-for="(item, index) in loadedActors" :key="index" />
    </div>
    <div class="row justify-end q-pa-lg q-gutter-sm fixed-bottom-right">
      <q-btn
        align="around"
        color="grey"
        label="Back"
        size="lg"
        @click="$router.go(-1)"
        flat
      />
      <q-btn
        @click="onCreateActionClick"
        label="Create Actor"
        color="primary"
        size="lg"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
    <q-dialog v-model="createActorDialog" persistent>
      <create-actor-form />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreatedActorsCard from "components/CreatedActorsCard.vue";
import CreateActorForm from "components/CreateActorForm.vue";
export default {
  components: {
    CreatedActorsCard,
    CreateActorForm,
  },

  data() {
    return {
      createActorDialog: false,
      form: {
        name: "",
        title: "",
        description: "",
        image: "",
        location: "",
        collectedItems: [],
        status: {
          life: 0,
          active: false,
        },
      },

      loadedActors: [],
      address: "",
    };
  },
  computed: {
    ...mapState("actors", ["actors"]),
  },
  mounted() {
    this.loadActors();
  },
  methods: {
    ...mapActions("actors", ["create_actor"]),

    loadActors() {
      this.loadedActors = { ...this.actors };
    },

    onCreateActionClick() {
      this.createActorDialog = true;
    },
  },
};
</script>

<style  lang="sass" scoped>
.my-card
    width: 100%
    max-width: 300px
</style>