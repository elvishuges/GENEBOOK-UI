<template>
  <q-page class="q-pa-md q-pb-lg">
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

    <q-card flat bordered class="bg-grey-1 q-pb-xl">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Descriptions: {{ form.title }}</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              @click="onCreateDescriptionClick"
              outline
              push
              color="secondary"
              label="Create Description"
            >
            </q-btn>
          </div>
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <div v-for="(item, indexItem) in form.descriptions" :key="indexItem">
          <q-card flat bordered class="bg-grey-1 q-ma-md q-py-sm">
            <q-card-section class="q-px-md q-py-md">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-overline text-orange-9">
                    Text: {{ item.text }}
                  </div>
                </div>
                <div class="q-gutter-sm">
                  <q-btn
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="onDeleteDescriptionClick(indexItem)"
                  >
                    <q-tooltip> Delete Description </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <div class="row justify-end q-pt-md">
                <q-btn
                  v-if="!item.condition.length"
                  outline
                  push
                  color="secondary"
                  label="Create Block Conditions"
                  @click="onAddBlockConditionsClick(indexItem)"
                >
                </q-btn>

                <q-btn
                  v-else
                  @click="onDeleteConditionsClick(indexItem)"
                  outline
                  push
                  color="red"
                  label="Delete Conditions"
                >
                </q-btn>
              </div>
            </q-card-section>
            <if-block-creator
              :conditionsItems="item.condition"
              @addCondition="onIfBlockAddConditionClick(indexItem, $event)"
              @deleteCondition="
                onIfBlockDeleteConditionClick(indexItem, $event)
              "
              @gameObjectChange="onIfBlockGameObjectChange(indexItem, $event)"
              @selectedOptionsChange="
                onIfBlockSelectedOptionsChange(indexItem, $event)
              "
            />
          </q-card>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-gutter-md q-pb-xl q-pt-sm">
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        style="border-radius: 8px"
        icon="settings"
        label="Actions"
        header-class="bg-grey-2 text-black"
        expand-icon-class="text-black"
      >
        <q-card>
          <q-card-section>
            <div class="row">List Actions</div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <!-- dialog create Description -->

    <q-dialog v-model="showDialogCreateDescription" persistent>
      <q-card class="create-description">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create Description</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onDialogCreateDescriptionSubmitClick">
            <div class="row q-pt-md">
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Description Text"
                lazy-rules
                :rules="[required_field]"
                v-model="description.text"
              />
              <q-select
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Description Image"
                lazy-rules
                :options="images"
                v-model="description.image"
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create Description" type="submit" />
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

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_location({ index: itemIndex, location: this.form }).then(
        () => {
          this.showSuccessNotification("Saved successfully !");
          this.loadPageInfos();
        }
      );
    },

    onDialogCreateDescriptionSubmitClick() {
      let description = {
        text: this.description.text,
        image: this.description.image,
        condition: [],
      };

      this.form.descriptions.push(description);
      this.showDialogCreateDescription = false;
      this.showSuccessNotification("Description created sucessfully !!");
    },

    onAddBlockConditionsClick(indexItem) {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };
      this.form.descriptions[indexItem].condition.push(condition);
    },

    onDeleteConditionsClick(descriptionIndex) {
      this.deletingDescriptionIndex = descriptionIndex;
      this.showDeleteConditionsDialog = true;
    },

    onCancelDialogClick() {
      this.showDeleteConditionsDialog = false;
      this.deletingDescriptionIndex = null;
    },

    onConfirDialogClick() {
      const index = this.deletingDescriptionIndex;
      this.form.descriptions[index].condition = [];
      this.showDeleteConditionsDialog = false;
    },

    onCreateDescriptionClick() {
      this.showDialogCreateDescription = true;
    },

    onIfBlockAddConditionClick(indexItem, condition) {
      this.form.descriptions[indexItem].condition.push(condition);
    },

    onIfBlockDeleteConditionClick(indexItem, indexSubitem) {
      this.form.descriptions[indexItem].condition.splice(indexSubitem, 1);
    },

    onDeleteDescriptionClick(indexItem) {
      this.form.descriptions.splice(indexItem, 1);
    },

    onIfBlockGameObjectChange(indexItem, indexSubitem) {
      this.form.descriptions[indexItem].condition[
        indexSubitem
      ].options.length = 1;

      this.form.descriptions[indexItem].condition[indexSubitem].result = "";
    },

    onIfBlockSelectedOptionsChange(indexItem, payload) {
      this.form.descriptions[indexItem].condition[
        payload.indexItem
      ].options.length = payload.optionIndex + 2;

      this.form.descriptions[indexItem].condition[payload.indexItem].result =
        "";
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
</style>