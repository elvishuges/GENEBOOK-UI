<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md q-pb-md">
      <div v-if="false" class="row">
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
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Collected Items"
          multiple
          v-model="form.collectedItems"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
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
    </div>

    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Requires To show</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              v-show="!localEditingConditions.length"
              @click="onAddFirstConditionClick"
              outline
              push
              color="secondary"
              label="Create Statement"
            >
            </q-btn>
          </div>
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <div
          v-for="(item, indexItem) in localEditingConditions"
          :key="indexItem"
        >
          <div
            class="require-to-show-subitem"
            v-for="(subitem, indexSubitem) in item"
            :key="indexSubitem"
          >
            <div
              v-if="indexSubitem == 0"
              class="row justify-between q-gutter-sm"
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
              <q-select
                class="col-xs-6 col-sm-2 col-md-2 q-px-lg q-pt-md"
                dense
                outlined
                label="Statement"
                :options="statements"
                v-model="subitem.statement"
                emit-value
                map-options
              />
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
                  :label="getSelectLabel(subitem.options, option, optionIndex)"
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
                  emit-value
                  map-options
                  v-else
                  dense
                  outlined
                  :label="getSelectLabel(subitem.options, option, optionIndex)"
                  :options="
                    getSelectOptions(subitem.options, option, optionIndex)
                  "
                  v-model="subitem.result"
                />
              </div>
            </div>
          </div>
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
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required_field, no_space_required } from "src/utils/validationRules";
import {
  selectGameObjects,
  selectGameObjectActor,
  selectGameObjectPlayer,
} from "src/utils/mapedSelectOptions";

import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      dialogCreateItem: false,
      form: {
        name: "",
        title: "",
        description: "",
        image: "",
        audio: "",
        location: "",
        collectedItems: [],
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

      selectGameObjects,
      selectGameObjectActor,
      selectGameObjectPlayer,

      required_field,
    };
  },

  computed: {
    ...mapState("items", ["items"]),
    ...mapState("files", ["audios", "images"]),
  },

  mounted() {
    this.loadItem();

    ///
  },

  methods: {
    ...mapActions("items", ["update_item"]),

    loadItem() {
      const items = JSON.parse(JSON.stringify(this.items));
      const editItemIndex = this.$route.params.index;
      const localEditingItem = items[editItemIndex];
      this.form = { ...localEditingItem };
      this.localEditingConditions = this.form.requiresToShow.conditions;
    },

    onSaveClick() {
      const itemIndex = this.$route.params.index;
      this.update_item({ index: itemIndex, item: this.form }).then(() => {
        this.showNotification();
        this.loadItem();
      });
    },

    onAddFirstConditionClick() {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };

      this.localEditingConditions[0] = [];
      this.localEditingConditions[0].push(condition);
    },

    onAddConditionClick(indexItem) {
      const condition = {
        statement: "",
        operator: "",
        result: "",
        options: [],
      };
      this.localEditingConditions[indexItem].push(condition);
    },

    onDeleteConditionClick(indexItem, indexSubitem) {
      this.localEditingConditions[indexItem].splice(indexSubitem, 1);
    },

    onGameObjectChange(indexItem, indexSubitem) {
      this.localEditingConditions[indexItem][indexSubitem].options.length = 1;
      this.localEditingConditions[indexItem][indexSubitem].result = "";
    },

    OnSelectedOptionsChange(indexItem, indexSubitem, optionIndex) {
      this.localEditingConditions[indexItem][indexSubitem].options.length =
        optionIndex + 2;
      this.localEditingConditions[indexItem][indexSubitem].result = "";
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
      }

      if (listOptions[0] === "player") {
        if (this.selectGameObjectPlayer[option]) {
          return this.selectGameObjectPlayer[option].title;
        }
        if (!this.selectGameObjectPlayer[option]) {
          const nextText =
            this.selectGameObjectPlayer[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectPlayer[nextText].title;
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
      }

      if (listOptions[0] === "player") {
        if (this.selectGameObjectPlayer[option]) {
          return this.selectGameObjectPlayer[option].lastOption;
        }
        if (!this.selectGameObjectPlayer[option]) {
          const nextText =
            this.selectGameObjectPlayer[listOptions[optionIndex - 1]].next;

          return this.selectGameObjectPlayer[nextText].lastOption;
        }
      }
    },

    showNotification() {
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