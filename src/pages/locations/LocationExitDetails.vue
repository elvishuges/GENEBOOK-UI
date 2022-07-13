<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md q-pb-md">
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        style="border-radius: 8px"
        icon="settings"
        label="Properties"
        header-class="bg-grey-2 text-black"
        expand-icon-class="text-black"
      >
        {{ localEditingLocation }}
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
                label="Text"
                lazy-rules
                :rules="[required_field]"
                v-model="form.text"
              />

              <q-select
                class="col-12 q-px-xs q-pt-sm"
                outlined
                label="Destination"
                :options="locations"
                option-value="name"
                option-label="name"
                v-model="form.destination"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Requires To Show: {{ form.name }}</div>
          </div>
        </div>
        <q-separator />

        <div class="row items-center no-wrap">
          <q-select
            class="col-6 q-px-xs q-py-sm"
            outlined
            label="items"
            :options="items"
            option-value="name"
            option-label="name"
            emit-value
            map-options
            v-model="form.requiresToShow.items"
            multiple
            dense
          />
          <q-select
            class="col-6 q-px-xs q-py-sm"
            outlined
            label="actions"
            v-model="form.requiresToShow.actions"
            :options="actions"
            multiple
            dense
          />
        </div>

        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Conditions</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              v-if="!form.requiresToShow.conditions.length"
              @click="onAddBlockConditionsClick"
              outline
              push
              color="secondary"
              label="Create Block Conditions"
            >
            </q-btn>

            <q-btn
              v-else
              @click="onDeleteConditionsClick"
              outline
              push
              color="red"
              label="Delete Conditions"
            >
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <if-block-creator
          :conditionsItems="form.requiresToShow.conditions"
          @addCondition="onIfBlockAddConditionClick"
          @deleteCondition="onIfBlockDeleteConditionClick"
          @gameObjectChange="onIfBlockGameObjectChange"
          @selectedOptionsChange="onIfBlockSelectedOptionsChange"
        />
      </q-card-section>
    </q-card>

    <div class="row justify-end q-pa-lg q-gutter-sm fixed-bottom-right">
      <q-btn
        align="around"
        color="grey"
        label="Back"
        size="lg"
        @click="$router.go(-1)"
        flat
      />
      <q-btn label="Save" color="primary" size="lg" @click="onSaveClick">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>

    <delete-conditions-dialog
      text="Want to delete the created conditions?"
      :state="showDeleteConditionsDialog"
      @confirm="onConfirDialogClick"
      @cancel="onCancelDialogClick"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import { copyObject } from "src/utils/functions";

import { writeText } from "../../backend/utils";

import ListItemCard from "components/ListItemCard.vue";
import IfBlockCreator from "src/components/IfBlockCreator.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";

export default {
  components: { ListItemCard, IfBlockCreator, DeleteConditionsDialog },

  data() {
    return {
      showDeleteConditionsDialog: false,
      form: {
        name: "",
        text: "",
        destination: "",
        requiresToShow: { items: [], actions: [], conditions: [] },
      },
      required_field,

      localEditingLocation: {
        actions: [],
        descriptions: [],
        exits: [],
        name: "",
        title: "",
        visits: "",
      },
    };
  },

  computed: {
    ...mapState("ends", ["ends"]),

    ...mapState("items", ["items"]),
    ...mapState("actions", ["actions"]),
    ...mapState("locations", ["locations"]),
  },

  mounted() {
    this.loadPageInfos();
  },

  methods: {
    ...mapActions("locations", ["update_location"]),

    loadPageInfos() {
      const copyLocations = copyObject(this.locations);
      const locationIndex = this.$route.params.index;
      const exitIndex = this.$route.params.exitIndex;
      this.localEditingLocation = copyLocations[locationIndex];
      const localEditingExit = this.localEditingLocation.exits[exitIndex];

      this.form = { ...localEditingExit };
    },

    onSaveClick() {
      const locationIndex = this.$route.params.index;
      this.update_location({
        index: locationIndex,
        location: this.localEditingLocation,
      }).then(() => {
        this.showSuccessNotification();
        this.loadPageInfos();
      });
    },

    onAddBlockConditionsClick() {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };

      this.form.requiresToShow.conditions.push(condition);
    },

    onDeleteConditionsClick() {
      this.showDeleteConditionsDialog = true;
    },

    onCancelDialogClick() {
      this.showDeleteConditionsDialog = false;
    },

    onConfirDialogClick() {
      this.form.requiresToShow.conditions = [];
      this.showDeleteConditionsDialog = false;
    },

    onIfBlockAddConditionClick(condition) {
      this.form.requiresToShow.conditions.push(condition);
    },

    onIfBlockDeleteConditionClick(indexItem) {
      this.form.requiresToShow.conditions.splice(indexItem, 1);
    },

    onIfBlockGameObjectChange(indexItem) {
      this.form.requiresToShow.conditions[indexItem].options.length = 1;
      this.form.requiresToShow.conditions[indexItem].result = "";
    },

    onIfBlockSelectedOptionsChange(payload) {
      this.form.requiresToShow.conditions[payload.indexItem].options.length =
        payload.optionIndex + 2;
      this.form.requiresToShow.conditions[payload.indexItem].result = "";
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