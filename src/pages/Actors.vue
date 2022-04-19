<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-md">Actors:</div>

    <div class="q-pa-md row items-start q-gutter-md">
      <created-actors-card
        v-for="(item, index) in actors"
        :key="index"
        :title="item.title"
        :name="item.name"
        :description="item.description"
      />
    </div>

    <!-- dialog create Actor -->

    <q-dialog v-model="dialogCreateActor" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Create Actor</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onFormCreateActorClick">
            <div class="row">
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Name"
                lazy-rules
                dense
                :rules="[required_field]"
                v-model="form.name"
              />
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Title"
                lazy-rules
                dense
                :rules="[required_field]"
                v-model="form.title"
              />
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Description"
                lazy-rules
                dense
                :rules="[required_field]"
                v-model="form.description"
              />
              <q-select
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Collected Items"
                dense
                multiple
                v-model="form.collectedItems"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                :options="images"
                label="Image"
                dense
                v-model="form.image"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                label="Location"
                dense
                v-model="form.location"
              />

              <div class="col-12 q-px-sm q-px-sm q-pt-sm">
                <strong>Status:</strong>
              </div>
              <q-input
                class="col-6 q-px-sm q-pt-sm"
                type="number"
                label="Life"
                outlined
                dense
                v-model="form.status.life"
                :rules="[required_field]"
              />
              <div>
                <q-checkbox label="active" v-model="form.status.active" />
              </div>
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create Actor" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

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
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreatedActorsCard from "components/CreatedActorsCard.vue";
import { required_field, no_space_required } from "src/utils/validationRules";
export default {
  components: {
    CreatedActorsCard,
  },

  data() {
    return {
      dialogCreateActor: false,
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

      address: "",
      required_field,
    };
  },
  computed: {
    ...mapState("actors", ["actors"]),
    ...mapState("files", ["audios", "images"]),
  },

  methods: {
    ...mapActions("actors", ["create_actor"]),

    onCreateActionClick() {
      this.dialogCreateActor = true;
    },
    onFormCreateActorClick() {
      this.create_actor(this.form);
      this.dialogCreateActor = false;
      this.cleanForm();
    },

    cleanForm() {
      this.form = {
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
      };
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>