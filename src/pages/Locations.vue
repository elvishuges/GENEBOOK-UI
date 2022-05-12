<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Locations</div>
    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(item, index) in locations"
          :key="index"
          class="col-xs-12 col-sm-4 col-md-3 q-px-xs q-pt-sm"
          @click="onItemClick(index)"
        >
          <list-item-card :name="item.title" />
        </div>
      </div>
    </div>

    <!-- dialog create Item -->

    <q-dialog v-model="showDialogCreateLocations" persistent>
      <q-card>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create Location</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onDialogSubmitClick">
            <div class="row q-pt-md">
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Name"
                lazy-rules
                :rules="[required_field]"
                v-model="form.name"
              />
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Title"
                lazy-rules
                :rules="[required_field]"
                v-model="form.title"
              />
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Visits"
                type="number"
                lazy-rules
                min="0"
                v-model="form.visits"
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create Locations" type="submit" />
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
        label="Create Location"
        color="primary"
        size="lg"
        @click="onCreateLocationClick"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required_field, no_space_required } from "src/utils/validationRules";
import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateLocations: false,
      form: {
        name: "",
        title: "",
        visits: 0,
        descriptions: [],
        actions: [],
        exits: [],
      },

      required_field,
    };
  },

  computed: {
    ...mapState("locations", ["locations"]),
  },

  mounted() {
    console.log("ITEMS:", this.locations);
  },

  methods: {
    ...mapActions("locations", ["add_location"]),

    onItemClick(index) {
      this.$router.push({ name: "edit-location", params: { index: index } });
    },

    onCreateLocationClick() {
      this.showDialogCreateLocations = true;
    },

    onDialogSubmitClick() {
      this.add_location(this.form);
      this.showDialogCreateLocations = false;
      this.showSuccessNotification();
    },

    cleanForm() {
      this.form = {
        name: "",
        title: "",
        visits: 0,
        descriptions: [],
        actions: [],
        exits: [],
      };
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