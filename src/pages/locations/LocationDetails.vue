<template>
  <q-page class="q-pa-md q-pb-lg">
    <div class="q-gutter-md">
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        style="border-radius: 8px"
        icon="settings"
        label="Properties"
        header-class="bg-grey-2 text-black"
        expand-icon-class="text-black"
      >
        <q-card>
          <q-card-section>
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
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Visits"
                type="number"
                lazy-rules
                min="0"
                v-model="form.visits"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <q-card
      flat
      bordered
      class="bg-grey-1 q-mt-md"
      @click="goTo('location-descriptions')"
    >
      <q-card-section
        class="text-subtitle q-pt-md row justify-between card-section"
      >
        Descriptions
        <q-icon size="sm" name="double_arrow" />
      </q-card-section>
    </q-card>

    <q-card
      flat
      bordered
      class="bg-grey-1 q-mt-md"
      @click="goTo('location-actions')"
    >
      <q-card-section
        class="text-subtitle q-pt-md row justify-between card-section"
      >
        Actions
        <q-icon size="sm" name="double_arrow" />
      </q-card-section>
    </q-card>

    <q-card
      flat
      bordered
      class="bg-grey-1 q-mt-md"
      @click="goTo('location-exits')"
    >
      <q-card-section
        class="text-subtitle q-pt-md row justify-between card-section"
      >
        Exits
        <q-icon size="sm" name="double_arrow" />
      </q-card-section>
    </q-card>

    <!-- dialog create Description -->

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
        label="Save Changes"
        color="primary"
        size="lg"
        @click="onSaveClick"
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
import { copyObject } from "src/utils/functions";
import { writeText } from "../../backend/utils";

import IfBlockCreator from "src/components/IfBlockCreator.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";
import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard, IfBlockCreator, DeleteConditionsDialog },

  data() {
    return {
      showDialogCreateDescription: false,
      showDeleteConditionsDialog: false,

      deletingDescriptionIndex: null,

      form: {
        name: "",
        title: "",
        visits: 0,
        descriptions: [],
        actions: [],
        exits: [],
      },

      description: {
        text: "",
        image: "",
        condition: [],
      },

      localEditingDescriptions: [],

      statements: [
        {
          label: "If",
          value: "if",
        },
        {
          label: "If Not",
          value: "if_not",
        },
      ],

      logicOperator: [
        {
          label: "and",
          value: "&&",
        },
        {
          label: "or",
          value: "||",
        },
      ],

      required_field,
    };
  },

  computed: {
    ...mapState("locations", ["locations"]),
    ...mapState("files", ["images"]),
  },

  mounted() {
    this.loadPageInfos();
  },

  methods: {
    ...mapActions("locations", ["update_location"]),

    loadPageInfos() {
      const copyLocations = copyObject(this.locations);
      const routeIndex = this.$route.params.index;
      const localEditingLocation = copyLocations[routeIndex];
      this.form = { ...localEditingLocation };
    },

    goTo(routeName) {
      const locationIndex = this.$route.params.index;
      this.$router.push({
        name: routeName,
        params: { index: locationIndex },
      });
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_location({ index: itemIndex, location: this.form }).then(
        () => {
          this.showSuccessNotification("Saved successfully !");
          this.loadPageInfos();
        }
      );
    },

    showSuccessNotification(message) {
      this.$q.notify({
        type: "positive",
        message: message,
      });
    },
  },
};
</script>

<style  lang="sass" scoped>
.create-description
  width: 500px

.feature-card > q-card-section >
:hover
  cursor: pointer
</style>