<template>
  <div
    class="require-to-show-subitem q-px-md"
    v-for="(item, indexItem) in conditionsItems"
    :key="indexItem"
  >
    <div v-if="indexItem == 0" class="row justify-between q-gutter-sm">
      <q-select
        class="col-xs-6 col-sm-2 col-md-2 q-px-xs q-pt-xs"
        dense
        outlined
        label="Statement"
        :options="statements"
        v-model="item.statement"
        emit-value
        map-options
      />
      <div class="q-pt-xs">
        <q-btn
          v-if="ableAddCondition"
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
          :options="logicOperators"
          v-model="item.operator"
          emit-value
          map-options
        />
        <q-select
          class="col-xs-6 col-sm-2 col-md-2 q-pt-md"
          dense
          outlined
          label="Statement"
          :options="statements"
          v-model="item.statement"
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
        v-show="item.statement"
        class="col-xs-12 col-sm-2 col-md-2 q-pl-xs q-pt-sm"
        dense
        outlined
        label="Game Object"
        :options="selectGameObjects"
        v-model="item.options[0]"
        emit-value
        map-options
        @update:model-value="onGameObjectChange(indexItem)"
      />
      <div
        v-show="item.options[0]"
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
        <q-select
          emit-value
          map-options
          v-else
          dense
          outlined
          :label="getSelectLabel(item.options, option, optionIndex)"
          :options="getSelectOptions(item.options, option, optionIndex)"
          v-model="item.result"
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
import { mapActions, mapState } from "vuex";

import { defineComponent } from "vue";

import {
  selectGameObjects,
  selectGameObjectActor,
  selectGameObjectPlayer,
  selectGameObjectLocation,
} from "src/utils/mapedSelectOptions";

export default defineComponent({
  name: "IfBlockCreator",

  emits: [
    "addCondition",
    "deleteCondition",
    "gameObjectChange",
    "selectedOptionsChange",
  ],

  props: {
    conditionsItems: {
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
      statements: [
        {
          label: "If",
          value: "!!",
        },
        {
          label: "If Not",
          value: "!",
        },
      ],

      logicOperators: [
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
      this.selectGameObjectPlayer.performedActions.options = actions;
      this.selectGameObjectPlayer.collectedItems.options = itemsName;
      this.selectGameObjectPlayer.currentLocation.options = locationsName;

      //actor
      this.selectGameObjectActor.location.options = locationsName;
      this.selectGameObjectActor.collectedItems.options = itemsName;
      this.selectGameObjectActor.actor.options = actorsName;

      //location
      this.selectGameObjectLocation.location.options = locationsName;
    },

    onAddConditionClick() {
      const condition = {
        statement: "!!",
        operator: "&&",
        result: "",
        options: [],
      };
      this.$emit("addCondition", condition);
    },

    onDeleteConditionClick(indexItem) {
      this.$emit("deleteCondition", indexItem);
    },

    onGameObjectChange(indexItem) {
      this.$emit("gameObjectChange", indexItem);
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

      return ["Error: Item not found"];
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
  },
});
</script>

<style lang="sass" scoped>
.list-item-card > q-card-section >
:hover
  cursor: pointer
</style>

