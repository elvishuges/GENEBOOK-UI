<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Actor</div>

    <q-form @submit="onSubmit">
      <div class="row">
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Name"
          lazy-rules
          :rules="[required_field]"
          v-model="form.name"
        />
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Title"
          lazy-rules
          :rules="[required_field]"
          v-model="form.title"
        />
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Description"
          lazy-rules
          :rules="[required_field]"
          v-model="form.description"
        />

        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Image"
          lazy-rules
          v-model="form.iamge"
        />

        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm q-pb-sm"
          outlined
          label="Location"
          :options="locations"
          option-value="name"
          option-label="name"
          emit-value
          map-options
          v-model="form.location"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                No Registered Locations
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm q-pb-sm"
          outlined
          label="Collected Items"
          hint="The player collected items"
          multiple
          :options="items"
          option-value="name"
          option-label="name"
          emit-value
          map-options
          v-model="form.collectedItems"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                No Registered Items
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="col-12 q-px-sm q-px-sm q-pt-md">
          <strong>Status:</strong>
        </div>
        <q-input
          class="col-6 q-px-sm q-pt-sm"
          type="number"
          label="Life"
          outlined
          v-model="form.status.life"
          :rules="[required_field]"
        />
        <div>
          <q-checkbox label="active" v-model="form.status.active" />
        </div>
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
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import { copyObject } from "src/utils/functions";
export default {
  components: {},

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

  mounted() {
    this.loadActor();
  },

  computed: {
    ...mapState("player", ["player"]),
    ...mapState("items", ["items"]),
    ...mapState("locations", ["locations"]),
    ...mapState("actions", ["actions"]),
    ...mapState("actors", ["actors"]),
  },

  methods: {
    ...mapActions("actors", ["update_actor"]),

    loadActor() {
      const copyActor = copyObject(this.actors);
      const routeIndex = this.$route.params.index;
      const localEditingActor = copyActor[routeIndex];
      this.form = { ...localEditingActor };
    },

    onSubmit() {
      const itemIndex = this.$route.params.index;
      this.update_actor({ index: itemIndex, actor: this.form }).then(() => {
        this.showSuccessNotification("Saved successfully !");
        this.loadActor();
      });
    },

    showSuccessNotification() {
      this.$q.notify({
        type: "positive",
        message: "Saved successfully !",
      });
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>