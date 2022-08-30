<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Exits from: {{ location.name }}</div>
    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(item, index) in location.exits"
          :key="index"
          class="col-xs-12 col-sm-4 col-md-3 q-px-xs q-pt-sm"
          @click="onItemClick(index)"
        >
          <list-item-card :name="item.name" />
        </div>
      </div>
    </div>

    <!-- dialog create Exit -->

    <q-dialog v-model="showDialogCreateExit" persistent>
      <q-card>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create Exit</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onDialogSubmitClick">
            <div class="row q-pt-md">
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Name"
                lazy-rules
                :rules="[required_field]"
                v-model="form.name"
              />
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Text"
                lazy-rules
                :rules="[required_field]"
                v-model="form.text"
              />
              <q-select
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Destination"
                :options="locations"
                option-value="name"
                option-label="name"
                emit-value
                map-options
                :rules="[required_field]"
                v-model="form.destination"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      No Registered Location
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create Exit" type="submit" />
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
        label="Create Exit"
        color="primary"
        size="lg"
        @click="onCreateExitClick"
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
import { required_field } from "src/utils/validationRules";
import ListItemCard from "components/ListItemCard.vue";

import { copyObject } from "src/utils/functions";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateExit: false,
      location: {
        actions: [],
        descriptions: [],
        exits: [],
        name: "",
        title: "",
        visits: "",
      },

      form: {
        name: "",
        text: "",
        destination: "",
        requiresToShow: {
          items: [],
          actions: [],
          conditions: [],
        },
      },

      required_field,
    };
  },

  computed: {
    ...mapState("locations", ["locations"]),
  },

  mounted() {
    this.loadPageInfos();
  },

  methods: {
    ...mapActions("locations", ["add_location", "update_location"]),

    loadPageInfos() {
      const copyLocations = copyObject(this.locations);
      const routeIndex = this.$route.params.index;
      const localEditingLocation = copyLocations[routeIndex];
      console.log("localEditingLocation", localEditingLocation);
      this.location = { ...localEditingLocation };
    },

    onItemClick(index) {
      const routeIndex = this.$route.params.index;
      this.$router.push({
        name: "location-exit-details",
        params: { index: routeIndex, exitIndex: index },
      });
    },

    onCreateExitClick() {
      this.showDialogCreateExit = true;
    },

    onDialogSubmitClick() {
      this.location.exits.push(this.form);
      const locationIndex = this.$route.params.index;
      this.update_location({
        index: locationIndex,
        location: this.location,
      });
      this.showSuccessNotification("Created successfully !");
      this.loadPageInfos();
      this.showDialogCreateExit = false;
      this.cleanForm();
    },

    cleanForm() {
      this.form = {
        name: "",
        text: "",
        destination: "",
        requiresToShow: {
          items: [],
          actions: [],
          conditions: [],
        },
      };
    },

    showSuccessNotification() {
      this.$q.notify({
        type: "positive",
        message: "Item saved successfully !",
      });
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>