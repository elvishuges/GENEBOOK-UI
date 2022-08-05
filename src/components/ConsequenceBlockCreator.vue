<template>
  <div
    class="require-to-show-subitem q-px-md"
    v-for="(item, indexItem) in consequenceItems"
    :key="indexItem"
  >
    <div v-if="indexItem == 0" class="row justify-between q-gutter-sm">
      <div></div>
      <div class="q-pt-xs">
        <q-btn
          size="md"
          color="secondary"
          label="Add Expression"
          @click="onAddConditionClick()"
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
          :options="assignmentOperators"
          v-model="item.assignmentOperator"
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
          @click="onDeleteConditionClick(indexItem)"
        >
          <q-tooltip> Delete Expresion </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row text-h5 q-pl-xl">
      <q-select
        class="col-xs-12 col-sm-2 col-md-2 q-pl-xs q-pt-sm"
        dense
        outlined
        label="Object / Function"
        :options="firstSelectOptions"
        v-model="item.options[0]"
        emit-value
        map-options
        @update:model-value="onFirstSelectChange(indexItem)"
      />
      <div
        v-show="item.options[0] && hasNextOptions(item.options)"
        v-for="(option, optionIndex) in item.options"
        :key="optionIndex"
        class="col-xs-12 col-sm-3 col-md-3 q-pl-xs q-pt-sm"
      >
        <q-select
          emit-value
          map-options
          v-if="!getSelectLastOption(item.options, option, optionIndex)"
          dense
          outlined
          :label="getSelectLabel(item.options, option, optionIndex)"
          :options="getSelectOptions(item.options, option, optionIndex)"
          v-model="item.options[optionIndex + 1]"
          @update:model-value="onSelectedOptionsChange(indexItem, optionIndex)"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                No Registered Items
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { defineComponent } from "vue";

import {
  firstSelectOptions,
  firstSelectActor,
  firstSelectPlayer,
  firstSelectLocation,
  firstSelectPutInTheBag,
  firstSelectInsertAction,
  hasNextfirstSelectOptions,
} from "src/utils/mapedSelectOptionsConsequence";

export default defineComponent({
  name: "ConsequenceBlockCreator",

  emits: [
    "addCondition",
    "deleteCondition",
    "firstSelectChange",
    "selectedOptionsChange",
  ],

  props: {
    consequenceItems: {
      type: Array,
      default: [],
    },
    ableAddCondition: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      assignmentOperators: [
        "+",
        "-",
        "=",
        {
          label: "break line",
          value: ";",
        },
      ],

      firstSelectOptions,
      firstSelectActor,
      firstSelectPlayer,
      firstSelectLocation,
      firstSelectPutInTheBag,
      firstSelectInsertAction,
      hasNextfirstSelectOptions,
    };
  },

  mounted() {
    this.fillsSelectOptions();
  },

  computed: {
    ...mapState("actions", ["actions"]),
    ...mapState("items", ["items"]),
    ...mapState("locations", ["locations"]),
    ...mapState("actors", ["actors"]),
  },

  methods: {
    fillsSelectOptions() {
      const actions = this.actions;
      const itemsName = this.items.map((item) => item.name);
      const locationsName = this.locations.map((locations) => locations.name);
      const actorsName = this.actors.map((actor) => actor.name);

      //player
      this.firstSelectPlayer.performedActions.options = actions;
      this.firstSelectPlayer.collectedItems.options = itemsName;
      this.firstSelectPlayer.currentLocation.options = locationsName;

      //actor
      this.firstSelectActor.location.options = locationsName;
      this.firstSelectActor.collectedItems.options = itemsName;
      this.firstSelectActor.actor.options = actorsName;

      //location
      this.firstSelectLocation.location.options = locationsName;

      //put in the bag
      this.firstSelectPutInTheBag.putInTheBag.options = itemsName;

      //insert action
      this.firstSelectInsertAction.insertAction.options = actions;
    },

    onAddConditionClick() {
      const condition = {
        assignmentOperator: ";", // sinal que vem antes da consequence
        options: [],
      };
      this.$emit("addCondition", condition);
    },

    onDeleteConditionClick(indexItem) {
      this.$emit("deleteCondition", indexItem);
    },

    onFirstSelectChange(indexItem) {
      this.$emit("firstSelectChange", indexItem);
    },

    onSelectedOptionsChange(indexItem, optionIndex) {
      const payload = {
        indexItem: indexItem,
        optionIndex: optionIndex,
      };
      this.$emit("selectedOptionsChange", payload);
    },

    getSelectOptions(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.firstSelectActor[option]) {
          return this.firstSelectActor[option].options;
        }

        if (!this.firstSelectActor[option]) {
          const nextText =
            this.firstSelectActor[listOptions[optionIndex - 1]].next;

          return this.firstSelectActor[nextText].options;
        }
      } else if (listOptions[0] === "player") {
        if (this.firstSelectPlayer[option]) {
          return this.firstSelectPlayer[option].options;
        }
        if (!this.firstSelectPlayer[option]) {
          const nextText =
            this.firstSelectPlayer[listOptions[optionIndex - 1]].next;

          return this.firstSelectPlayer[nextText].options;
        }
      } else if (listOptions[0] === "location") {
        if (this.firstSelectLocation[option]) {
          return this.firstSelectLocation[option].options;
        }
        if (!this.firstSelectLocation[option]) {
          const nextText =
            this.firstSelectLocation[listOptions[optionIndex - 1]].next;

          return this.firstSelectLocation[nextText].options;
        }
      } else if (listOptions[0] === "putInTheBag") {
        if (this.firstSelectPutInTheBag[option]) {
          return this.firstSelectPutInTheBag[option].options;
        }
        if (!this.firstSelectPutInTheBag[option]) {
          const nextText =
            this.firstSelectPutInTheBag[listOptions[optionIndex - 1]].next;

          return this.firstSelectPutInTheBag[nextText].options;
        }
      } else if (listOptions[0] === "insertAction") {
        if (this.firstSelectInsertAction[option]) {
          return this.firstSelectInsertAction[option].options;
        }
        if (!this.firstSelectInsertAction[option]) {
          const nextText =
            this.firstSelectInsertAction[listOptions[optionIndex - 1]].next;

          return this.firstSelectInsertAction[nextText].options;
        }
      }

      return ["error: next item not found"];
    },

    getSelectLabel(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.firstSelectActor[option]) {
          return this.firstSelectActor[option].title;
        }

        if (!this.firstSelectActor[option]) {
          const nextText =
            this.firstSelectActor[listOptions[optionIndex - 1]].next;

          return this.firstSelectActor[nextText].title;
        }
      } else if (listOptions[0] === "player") {
        if (this.firstSelectPlayer[option]) {
          return this.firstSelectPlayer[option].title;
        }
        if (!this.firstSelectPlayer[option]) {
          const nextText =
            this.firstSelectPlayer[listOptions[optionIndex - 1]].next;

          return this.firstSelectPlayer[nextText].title;
        }
      } else if (listOptions[0] === "location") {
        if (this.firstSelectLocation[option]) {
          return this.firstSelectLocation[option].title;
        }
        if (!this.firstSelectLocation[option]) {
          const nextText =
            this.firstSelectLocation[listOptions[optionIndex - 1]].next;

          return this.firstSelectLocation[nextText].title;
        }
      } else if (listOptions[0] === "putInTheBag") {
        if (this.firstSelectPutInTheBag[option]) {
          return this.firstSelectPutInTheBag[option].title;
        }
        if (!this.firstSelectPutInTheBag[option]) {
          const nextText =
            this.firstSelectPutInTheBag[listOptions[optionIndex - 1]].next;

          return this.firstSelectPutInTheBag[nextText].title;
        }
      } else if (listOptions[0] === "insertAction") {
        if (this.firstSelectInsertAction[option]) {
          return this.firstSelectInsertAction[option].title;
        }
        if (!this.firstSelectInsertAction[option]) {
          const nextText =
            this.firstSelectInsertAction[listOptions[optionIndex - 1]].next;

          return this.firstSelectInsertAction[nextText].title;
        }
      }
    },

    getSelectLastOption(listOptions, option, optionIndex) {
      if (listOptions[0] === "actor") {
        if (this.firstSelectActor[option]) {
          return this.firstSelectActor[option].lastOption;
        }

        if (!this.firstSelectActor[option]) {
          const nextText =
            this.firstSelectActor[listOptions[optionIndex - 1]].next;

          return this.firstSelectActor[nextText].lastOption;
        }
      } else if (listOptions[0] === "player") {
        if (this.firstSelectPlayer[option]) {
          return this.firstSelectPlayer[option].lastOption;
        }
        if (!this.firstSelectPlayer[option]) {
          const nextText =
            this.firstSelectPlayer[listOptions[optionIndex - 1]].next;

          return this.firstSelectPlayer[nextText].lastOption;
        }
      } else if (listOptions[0] === "location") {
        if (this.firstSelectLocation[option]) {
          return this.firstSelectLocation[option].lastOption;
        }
        if (!this.firstSelectLocation[option]) {
          const nextText =
            this.firstSelectLocation[listOptions[optionIndex - 1]].next;

          return this.firstSelectLocation[nextText].lastOption;
        }
      } else if (listOptions[0] === "putInTheBag") {
        if (this.firstSelectPutInTheBag[option]) {
          return this.firstSelectPutInTheBag[option].lastOption;
        }
        if (!this.firstSelectPutInTheBag[option]) {
          const nextText =
            this.firstSelectPutInTheBag[listOptions[optionIndex - 1]].next;

          return this.firstSelectPutInTheBag[nextText].lastOption;
        }
      } else if (listOptions[0] === "insertAction") {
        if (this.firstSelectInsertAction[option]) {
          return this.firstSelectInsertAction[option].lastOption;
        }
        if (!this.firstSelectInsertAction[option]) {
          const nextText =
            this.firstSelectInsertAction[listOptions[optionIndex - 1]].next;

          return this.firstSelectInsertAction[nextText].lastOption;
        }
      }
    },

    hasNextOptions(listOptions) {
      if (this.hasNextfirstSelectOptions[listOptions[0]].hasNext) {
        return true;
      }
      return false;
    },
  },
});
</script>

<style lang="sass" scoped>
.list-item-card > q-card-section >
:hover
  cursor: pointer
</style>

