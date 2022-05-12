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
        <div
          v-for="(item, indexItem) in localEditingDescriptions"
          :key="indexItem"
        >
          <q-card flat bordered class="bg-grey-1 q-ma-md q-py-sm">
            <q-card-section class="q-px-lg q-py-md">
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
            </q-card-section>
            <div
              class="require-to-show-subitem q-px-md"
              v-for="(subitem, indexSubitem) in item.condition"
              :key="indexSubitem"
            >
              <div
                v-if="indexSubitem == 0"
                class="row justify-between q-gutter-sm no-wrap"
              >
                <q-select
                  class="col-xs-6 col-sm-2 col-md-2 q-px-xs q-pt-xs"
                  dense
                  outlined
                  label="Statement"
                  :options="statements"
                  v-model="subitem.statement"
                  emit-value
                  map-options
                />
                <div class="q-pt-xs">
                  <q-btn
                    size="md"
                    color="secondary"
                    label="Add Condition"
                    @click="onAddConditionClick(indexItem)"
                  />
                </div>
              </div>
              <div v-else class="row justify-between q-gutter-sm">
                <div class="row col-sm-10 q-gutter-xs q-px-lg">
                  <q-select
                    class="col-xs-4 col-sm-2 col-md-2 q-pt-md"
                    dense
                    outlined
                    label="Operator"
                    :options="logicOperator"
                    v-model="subitem.operator"
                    emit-value
                    map-options
                  />
                  <q-select
                    class="col-xs-6 col-sm-2 col-md-2 q-pt-md"
                    dense
                    outlined
                    label="Statement"
                    :options="statements"
                    v-model="subitem.statement"
                    emit-value
                    map-options
                  />
                </div>

                <div class="q-gutter-sm q-pt-sm">
                  <q-btn
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="onDeleteConditionClick(indexItem, indexSubitem)"
                  >
                    <q-tooltip> Delete Condition </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <div class="row text-h5 q-pl-xl">
                <q-select
                  v-show="subitem.statement"
                  class="col-xs-12 col-sm-2 col-md-2 q-pl-xs q-pt-sm"
                  dense
                  outlined
                  label="Game Object"
                  :options="selectGameObjects"
                  v-model="subitem.options[0]"
                  emit-value
                  map-options
                  @update:model-value="
                    onGameObjectChange(indexItem, indexSubitem)
                  "
                />
                <div
                  v-show="subitem.options[0]"
                  v-for="(option, optionIndex) in subitem.options"
                  :key="optionIndex"
                  class="col-xs-12 col-sm-3 col-md-3 q-pl-xs q-pt-sm"
                >
                  <q-select
                    emit-value
                    map-options
                    v-if="
                      !getSelectLastOption(subitem.options, option, optionIndex)
                    "
                    dense
                    outlined
                    :label="
                      getSelectLabel(subitem.options, option, optionIndex)
                    "
                    :options="
                      getSelectOptions(subitem.options, option, optionIndex)
                    "
                    v-model="subitem.options[optionIndex + 1]"
                    @update:model-value="
                      OnSelectedOptionsChange(
                        indexItem,
                        indexSubitem,
                        optionIndex
                      )
                    "
                  />
                  <q-select
                    v-else
                    emit-value
                    map-options
                    dense
                    outlined
                    :label="
                      getSelectLabel(subitem.options, option, optionIndex)
                    "
                    :options="
                      getSelectOptions(subitem.options, option, optionIndex)
                    "
                    v-model="subitem.result"
                  />
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-card-section>
    </q-card>

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
                label="Desciption Text"
                lazy-rules
                :rules="[required_field]"
                v-model="description.text"
              />
              <q-select
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Desciption Image"
                lazy-rules
                :rules="[required_field]"
                :options="images"
                v-model="description.image"
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
import {
  selectGameObjects,
  selectGameObjectActor,
  selectGameObjectPlayer,
  selectGameObjectLocation,
} from "src/utils/mapedSelectOptions";

import { writeText } from "../backend/utils";

import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateDescription: false,
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

      selectGameObjects,
      selectGameObjectActor,
      selectGameObjectPlayer,
      selectGameObjectLocation,

      required_field,
    };
  },

  computed: {
    ...mapState("locations", ["locations"]),
    ...mapState("files", ["images"]),
  },

  mounted() {
    this.loadItem();
  },

  methods: {
    ...mapActions("locations", ["update_location"]),

    loadItem() {
      const locations = JSON.parse(JSON.stringify(this.locations));
      const editLocationIndex = this.$route.params.index;
      const LocalEditingLocation = locations[editLocationIndex];
      this.form = { ...LocalEditingLocation };
      this.localEditingDescriptions = this.form.descriptions;
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_location({ index: itemIndex, location: this.form }).then(
        () => {
          this.showSuccessNotification("Saved successfully !");
          this.loadItem();
        }
      );
    },

    onDialogCreateDescriptionSubmitClick() {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };
      let description = {
        text: this.description.text,
        image: this.description.image,
        condition: [],
      };
      description.condition.push(condition);

      this.localEditingDescriptions.push(description);
      this.showDialogCreateDescription = false;
      this.showSuccessNotification("Description created sucessfully !!");
    },

    onCreateDescriptionClick() {
      this.showDialogCreateDescription = true;
    },

    onAddConditionClick(indexItem) {
      const condition = {
        statement: "if",
        operator: "and",
        result: "",
        options: [],
      };
      this.localEditingDescriptions[indexItem].condition.push(condition);
    },

    onDeleteConditionClick(indexItem, indexSubitem) {
      this.localEditingDescriptions[indexItem].condition.splice(
        indexSubitem,
        1
      );
    },

    onDeleteDescriptionClick(indexItem, indexSubitem) {
      this.localEditingDescriptions.splice(indexItem, 1);
    },

    onGameObjectChange(indexItem, indexSubitem) {
      this.localEditingDescriptions[indexItem].condition[
        indexSubitem
      ].options.length = 1;

      this.localEditingDescriptions[indexItem].condition[indexSubitem].result =
        "";
    },

    OnSelectedOptionsChange(indexItem, indexSubitem, optionIndex) {
      this.localEditingDescriptions[indexItem].condition[
        indexSubitem
      ].options.length = optionIndex + 2;

      this.localEditingDescriptions[indexItem].condition[indexSubitem].result =
        "";
    },

    getSelectOptions(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.selectGameObjectActor[option]) {
          return this.selectGameObjectActor[option].options;
        }

        if (!this.selectGameObjectActor[option]) {
          const nextText =
            this.selectGameObjectActor[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectActor[nextText].options;
        }
      } else if (listOptions[0] === "player") {
        if (this.selectGameObjectPlayer[option]) {
          return this.selectGameObjectPlayer[option].options;
        }
        if (!this.selectGameObjectPlayer[option]) {
          const nextText =
            this.selectGameObjectPlayer[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectPlayer[nextText].options;
        }
      } else if (listOptions[0] === "location") {
        if (this.selectGameObjectLocation[option]) {
          return this.selectGameObjectLocation[option].options;
        }
        if (!this.selectGameObjectLocation[option]) {
          const nextText =
            this.selectGameObjectLocation[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectLocation[nextText].options;
        }
      }

      return ["Items Not Found"];
    },

    getSelectLabel(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.selectGameObjectActor[option]) {
          return this.selectGameObjectActor[option].title;
        }

        if (!this.selectGameObjectActor[option]) {
          const nextText =
            this.selectGameObjectActor[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectActor[nextText].title;
        }
      } else if (listOptions[0] === "player") {
        if (this.selectGameObjectPlayer[option]) {
          return this.selectGameObjectPlayer[option].title;
        }
        if (!this.selectGameObjectPlayer[option]) {
          const nextText =
            this.selectGameObjectPlayer[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectPlayer[nextText].title;
        }
      } else if (listOptions[0] === "location") {
        if (this.selectGameObjectLocation[option]) {
          return this.selectGameObjectLocation[option].title;
        }
        if (!this.selectGameObjectLocation[option]) {
          const nextText =
            this.selectGameObjectLocation[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectLocation[nextText].title;
        }
      }
    },

    getSelectLastOption(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.selectGameObjectActor[option]) {
          return this.selectGameObjectActor[option].lastOption;
        }

        if (!this.selectGameObjectActor[option]) {
          const nextText =
            this.selectGameObjectActor[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectActor[nextText].lastOption;
        }
      } else if (listOptions[0] === "player") {
        if (this.selectGameObjectPlayer[option]) {
          return this.selectGameObjectPlayer[option].lastOption;
        }
        if (!this.selectGameObjectPlayer[option]) {
          const nextText =
            this.selectGameObjectPlayer[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectPlayer[nextText].lastOption;
        }
      } else if (listOptions[0] === "location") {
        if (this.selectGameObjectLocation[option]) {
          return this.selectGameObjectLocation[option].lastOption;
        }
        if (!this.selectGameObjectLocation[option]) {
          const nextText =
            this.selectGameObjectLocation[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectLocation[nextText].lastOption;
        }
      }
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