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
                label="Text"
                v-model="form.text"
              />
              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Image"
                v-model="form.image"
              />

              <q-select
                class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
                outlined
                label="Audio"
                v-model="form.audio"
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
              v-if="!form.requiresToFinish.conditions.length"
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
        <q-separator />
      </q-card-section>

      <q-card-section>
        <if-block-creator
          :conditionsItems="form.requiresToFinish.conditions"
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

    <confirm-dialog
      text="Want to delete the created conditions?"
      :state="showConfirmDialog"
      @confirm="onConfirmDialogClick"
      @cancel="onCancelDialogClick"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import { copyObject } from "src/utils/functions";
import {
  selectGameObjects,
  selectGameObjectActor,
  selectGameObjectPlayer,
  selectGameObjectLocation,
} from "src/utils/mapedSelectOptions";

import { writeText } from "../../backend/utils";

import ListItemCard from "components/ListItemCard.vue";
import IfBlockCreator from "src/components/IfBlockCreator.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";

export default {
  components: { ListItemCard, IfBlockCreator, ConfirmDialog },

  data() {
    return {
      showConfirmDialog: false,
      form: {
        name: "",
        title: "",
        text: "",
        image: "",
        audio: "",
        requiresToFinish: { items: [], actions: [], conditions: [] },
      },

      selectGameObjects,
      selectGameObjectActor,
      selectGameObjectPlayer,
      selectGameObjectLocation,

      required_field,
    };
  },

  computed: {
    ...mapState("ends", ["ends"]),
    ...mapState("files", ["audios", "images"]),
  },

  mounted() {
    this.loadPageInfos();
  },

  methods: {
    ...mapActions("ends", ["update_end"]),

    loadPageInfos() {
      const ends = copyObject(this.ends);
      const editEndIndex = this.$route.params.index;
      const localEditingEnd = ends[editEndIndex];
      this.form = { ...localEditingEnd };
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_end({ index: itemIndex, item: this.form }).then(() => {
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

      this.form.requiresToFinish.conditions.push(condition);
    },

    onDeleteConditionsClick() {
      this.showConfirmDialog = true;
    },

    onCancelDialogClick() {
      this.showConfirmDialog = false;
    },

    onConfirmDialogClick() {
      this.form.requiresToFinish.conditions = [];
      this.showConfirmDialog = false;
    },

    onIfBlockAddConditionClick(condition) {
      this.form.requiresToFinish.conditions.push(condition);
    },

    onIfBlockDeleteConditionClick(indexItem) {
      this.form.requiresToFinish.conditions.splice(indexItem, 1);
    },

    onIfBlockGameObjectChange(indexItem) {
      this.form.requiresToFinish.conditions[indexItem].options.length = 1;
      this.form.requiresToFinish.conditions[indexItem].result = "";
    },

    onIfBlockSelectedOptionsChange(payload) {
      this.form.requiresToFinish.conditions[payload.indexItem].options.length =
        payload.optionIndex + 2;
      this.form.requiresToFinish.conditions[payload.indexItem].result = "";
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