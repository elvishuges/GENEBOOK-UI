<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Sucess to: {{ form.name }}</div>
          </div>
        </div>
        {{ form.requiresToPerform.success.consequence }}

        <q-separator />

        <div class="items-center no-wrap">
          <q-input
            class="col-12 q-px-xs q-py-sm"
            outlined
            label="Text"
            lazy-rules
            dense
            :rules="[required_field]"
            v-model="form.requiresToPerform.success.text"
          />

          <div class="row">
            <q-select
              class="col-6 q-px-xs q-py-sm"
              outlined
              label="image"
              v-model="form.requiresToPerform.success.image"
              :options="images"
              dense
            >
            </q-select>
            <q-select
              class="col-6 q-px-xs q-py-sm"
              outlined
              label="audio"
              v-model="form.requiresToPerform.success.audio"
              :options="audios"
              multiple
              dense
            >
            </q-select>
          </div>
        </div>

        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Consequence</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              v-if="!form.requiresToPerform.success.consequence.length"
              @click="onCreateConsequeceClick"
              outline
              push
              color="secondary"
              label="Create Consequence"
            >
            </q-btn>

            <q-btn
              v-else
              @click="onDeleteConditionsClick"
              outline
              push
              color="red"
              label="Delete Consequence"
            >
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <consequence-block-creator
          :consequenceItems="form.requiresToPerform.success.consequence"
          @deleteCondition="onDeleteConditionClick"
          @addCondition="onAddConditionClick"
          @firstSelectChange="onFirstSelectChange"
          @selectedOptionsChange="onSelectedOptionsChange"
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
      @confirm="onConfirDeleteConditionsDialogClick"
      @cancel="onCancelDeleteConditionsDialogClick"
    />
    <select-condition-type-dialog
      :state="showSelectConditionTypeDialog"
      @confirm="onConfirSelectConditionTypeDialogClick"
      @cancel="onCancelSelectConditionTypeDialogClick"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import { copyObject } from "src/utils/functions";

import ListItemCard from "components/ListItemCard.vue";
import ConsequenceBlockCreator from "src/components/ConsequenceBlockCreator.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";
import SelectConditionTypeDialog from "src/components/SelectConditionTypeDialog.vue";

export default {
  components: {
    ListItemCard,
    DeleteConditionsDialog,
    SelectConditionTypeDialog,
    ConsequenceBlockCreator,
  },

  data() {
    return {
      showDeleteConditionsDialog: false,
      showSelectConditionTypeDialog: false,
      form: {
        name: "",
        text: "",
        requiresToShow: {
          items: [],
          actions: [],
          conditions: [],
        },
        requiresToPerform: {
          items: [],
          actions: [],
          conditions: [],
          success: {
            text: "",
            image: "",
            consequence: [],
          },
          failure: {
            text: "",
            image: "",
            consequence: [],
          },
        },
        attempts: 999999999,
      },

      required_field,
    };
  },

  computed: {
    ...mapState("items", ["items"]),
    ...mapState("files", ["audios", "images"]),

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
      const actionIndex = this.$route.params.actionIndex;
      this.localEditingLocation = copyLocations[locationIndex];
      const localeditingAction = this.localEditingLocation.actions[actionIndex];

      this.form = { ...localeditingAction };
    },

    goTo(routeName) {
      const locationIndex = this.$route.params.index;
      const actionIndex = this.$route.params.actionIndex;
      this.$router.push({
        name: routeName,
        params: { index: locationIndex, actionIndex: actionIndex },
      });
    },

    onSaveClick() {
      const locationIndex = this.$route.params.index;
      this.update_location({
        index: locationIndex,
        location: this.localEditingLocation,
      });

      this.showSuccessNotification();
      this.loadPageInfos();
    },

    onCreateConsequeceClick() {
      const condition = {
        assignmentOperator: "", // atribuição
        options: [],
      };
      this.form.requiresToPerform.success.consequence.push(condition);
    },

    onDeleteConditionsClick() {
      this.showDeleteConditionsDialog = true;
    },

    onCancelDeleteConditionsDialogClick() {
      this.showDeleteConditionsDialog = false;
    },

    onConfirDeleteConditionsDialogClick() {
      this.form.requiresToPerform.success.consequence = [];
      this.showDeleteConditionsDialog = false;
    },

    onCancelSelectConditionTypeDialogClick() {
      this.showSelectConditionTypeDialog = false;
    },

    onConfirSelectConditionTypeDialogClick(conditionType) {
      this.showSelectConditionTypeDialog = false;
      this.handleSelectedConditionTypeCreation(conditionType);
    },

    onAddConditionClick(condition) {
      this.form.requiresToPerform.success.consequence.push(condition);
    },

    onDeleteConditionClick(indexItem) {
      this.form.requiresToPerform.success.consequence.splice(indexItem, 1);
    },

    onFirstSelectChange(indexItem) {
      this.form.requiresToPerform.success.consequence[
        indexItem
      ].options.length = 1;
    },

    onSelectedOptionsChange(payload) {
      this.form.requiresToPerform.success.consequence[
        payload.indexItem
      ].options.length = payload.optionIndex + 2;
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
.feature-card > q-card-section >
:hover
  cursor: pointer
</style>