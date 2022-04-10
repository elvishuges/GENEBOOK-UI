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

    <!-- dialog create Actor -->

    <q-dialog v-model="createActorDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Create Actor</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-pb-sm">
            <div class="row">
              <q-input
                class="col-12 q-px-sm q-pt-sm"
                outlined
                label="Title"
                lazy-rules
                dense
                v-model="form.title"
              />
              <q-input
                class="col-12 q-px-sm q-pt-sm"
                outlined
                label="Description"
                lazy-rules
                dense
                v-model="form.description"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                label="Image"
                dense
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                label="Location"
                dense
              />

              <div class="col-12 q-px-sm q-px-sm q-pt-sm">
                <strong>Status:</strong>
              </div>
              <q-input
                class="col-6 q-px-sm q-pt-sm"
                type="number"
                outlined
                dense
              />
              <div>
                <q-checkbox label="Ativo" />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Create Actor" @click="onFormCreateActorClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreatedActorsCard from "components/CreatedActorsCard.vue";
export default {
  components: {
    CreatedActorsCard,
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
    onFormCreateActorClick() {},
  },
};
</script>

<style  lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>