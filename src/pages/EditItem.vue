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
                v-model="form.location"
              />
              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Audio"
                v-model="form.audio"
              />
              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Image"
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
            <div class="text-h6">Requires To show: {{ form.title }}</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              v-if="!localEditingConditions.length"
              @click="onAddConditionClick"
              outline
              push
              color="secondary"
              label="Create Conditions"
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
        <q-separator />
      </q-card-section>

      <q-card-section>
        <if-block-creator
          @addCondition="onIfBlockAddConditionClick"
          @deleteCondition="onIfBlockDeleteConditionClick"
          @gameObjectChange="onIfBlockGameObjectChange"
          @selectedOptionsChange="onIfBlockSelectedOptionsChange"
          :conditionsItems="localEditingConditions"
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

    <confirm-dialog
      text="Want to delete the created conditions?"
      :state="dialogConfirm"
      @confirm="onConfirmDialogClick"
      @cancel="onCancelDialogClick"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import {
  selectGameObjects,
  selectGameObjectActor,
  selectGameObjectPlayer,
  selectGameObjectLocation,
} from "src/utils/mapedSelectOptions";

import { writeText } from "../backend/utils";

import ListItemCard from "components/ListItemCard.vue";
import IfBlockCreator from "src/components/IfBlockCreator.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";

export default {
  components: { ListItemCard, IfBlockCreator, ConfirmDialog },

  data() {
    return {
      dialogCreateItem: false,
      dialogConfirm: false,
      form: {
        name: "",
        title: "",
        description: "",
        image: "",
        audio: "",
        location: "",
        requiresToShow: [],
      },

      localEditingConditions: [],

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

      selectGameObjects,
      selectGameObjectActor,
      selectGameObjectPlayer,
      selectGameObjectLocation,

      selectOption: { actor: {}, player: {} },

      item: "",

      required_field,
    };
  },

  computed: {
    ...mapState("items", ["items"]),
    ...mapState("files", ["audios", "images"]),
  },

  mounted() {
    this.loadPageInfos();
  },

  methods: {
    ...mapActions("items", ["update_item"]),

    loadPageInfos() {
      const items = JSON.parse(JSON.stringify(this.items));
      const editItemIndex = this.$route.params.index;
      const localEditingItem = items[editItemIndex];
      this.form = { ...localEditingItem };
      this.localEditingConditions = this.form.requiresToShow.conditions;
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_item({ index: itemIndex, item: this.form }).then(() => {
        this.showSuccessNotification();
        this.loadPageInfos();
      });
    },

    onAddConditionClick() {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };

      this.localEditingConditions.push(condition);
    },

    onDeleteConditionsClick() {
      this.dialogConfirm = true;
    },
    onCancelDialogClick() {
      this.dialogConfirm = false;
    },
    onConfirmDialogClick() {
      this.localEditingConditions = [];
      this.dialogConfirm = false;
    },

    onIfBlockAddConditionClick(condition) {
      this.localEditingConditions.push(condition);
    },

    onIfBlockDeleteConditionClick(indexItem) {
      this.localEditingConditions.splice(indexItem, 1);
    },

    onIfBlockGameObjectChange(indexItem) {
      this.localEditingConditions[indexItem].options.length = 1;
      this.localEditingConditions[indexItem].result = "";
    },

    onIfBlockSelectedOptionsChange(indexItem, optionIndex) {
      this.localEditingConditions[indexItem].options.length = optionIndex + 2;
      this.localEditingConditions[indexItem].result = "";
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