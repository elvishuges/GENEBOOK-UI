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
                class="col-12 q-px-xs q-pt-sm"
                outlined
                label="Description"
                v-model="form.description"
              />
              <q-select
                class="col-sm-12 q-px-xs q-pt-sm"
                outlined
                label="Location"
                :options="locations"
                option-label="name"
                option-value="name"
                v-model="form.location"
              />
              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Audio"
                :options="audios"
                v-model="form.audio"
              />
              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Image"
                :options="images"
                v-model="form.image"
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
            <div class="text-h6">Requires To Show: {{ form.title }}</div>
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
            multiple
            v-model="form.requiresToShow.items"
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">
                  No Registered Items
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-select
            class="col-6 q-px-xs q-py-sm"
            outlined
            label="actions"
            v-model="form.requiresToShow.actions"
            :options="actions"
            multiple
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">
                  No Registered Actions
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
        <div v-show="form.requiresToShow.conditionsType === 'if'">
          <if-block-creator
            :conditionsItems="form.requiresToShow.conditions"
            @addCondition="onIfBlockAddConditionClick"
            @deleteCondition="onIfBlockDeleteConditionClick"
            @gameObjectChange="onIfBlockGameObjectChange"
            @selectedOptionsChange="onIfBlockSelectedOptionsChange"
          />
        </div>
        <div v-show="form.requiresToShow.conditionsType === 'if_else'">
          <if-else-block-creator
            :conditionsItems="form.requiresToShow.conditions"
            @gameObjectChange="onIfBlockGameObjectChange"
            @selectedOptionsChange="onIfBlockSelectedOptionsChange"
          />
        </div>
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
import IfBlockCreator from "src/components/IfBlockCreator.vue";
import IfElseBlockCreator from "src/components/IfElseBlockCreator.vue";
import DeleteConditionsDialog from "src/components/DeleteConditionsDialog.vue";
import SelectConditionTypeDialog from "src/components/SelectConditionTypeDialog.vue";

export default {
  components: {
    ListItemCard,
    IfBlockCreator,
    IfElseBlockCreator,
    DeleteConditionsDialog,
    SelectConditionTypeDialog,
  },

  data() {
    return {
      showDeleteConditionsDialog: false,
      showSelectConditionTypeDialog: false,
      form: {
        name: "",
        title: "",
        description: "",
        image: "",
        audio: "",
        location: "",
        requiresToShow: {
          items: [],
          actions: [],
          conditionsType: "",
          conditions: [],
        },
      },
      required_field,

      condition: {
        statement: "",
        operator: "",
        result: "",
        options: [],
      },
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
    ...mapActions("items", ["update_item"]),

    loadPageInfos() {
      const items = copyObject(this.items);
      const editItemIndex = this.$route.params.index;
      const localEditingItem = items[editItemIndex];
      this.form = { ...localEditingItem };
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_item({ index: itemIndex, item: this.form });
      this.showSuccessNotification();
      this.loadPageInfos();
    },

    onAddBlockConditionsClick() {
      this.showSelectConditionTypeDialog = true;
      //this.createIfCondition();
    },

    onDeleteConditionsClick() {
      this.showDeleteConditionsDialog = true;
    },

    onCancelDeleteConditionsDialogClick() {
      this.showDeleteConditionsDialog = false;
    },

    onConfirDeleteConditionsDialogClick() {
      this.form.requiresToShow.conditions = [];
      this.showDeleteConditionsDialog = false;
    },

    onCancelSelectConditionTypeDialogClick() {
      this.showSelectConditionTypeDialog = false;
    },

    onConfirSelectConditionTypeDialogClick(conditionType) {
      this.showSelectConditionTypeDialog = false;
      this.handleSelectedConditionTypeCreation(conditionType);
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

    handleSelectedConditionTypeCreation(type) {
      if (type === "if") {
        this.createIfCondition();
      } else if (type === "if_else") {
        this.createIfElseConditions();
      }
    },

    createIfCondition() {
      const condition = copyObject(this.condition);
      this.form.requiresToShow.conditions.push(condition);
      this.form.requiresToShow.conditionsType = "if";
    },

    createIfElseConditions() {
      const condition1 = copyObject(this.condition);
      const condition2 = copyObject(this.condition);
      const condition3 = copyObject(this.condition);
      this.form.requiresToShow.conditions.push(condition1);
      this.form.requiresToShow.conditions.push(condition2);
      this.form.requiresToShow.conditions.push(condition3);
      this.form.requiresToShow.conditionsType = "if_else";
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