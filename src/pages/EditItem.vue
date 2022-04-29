<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div v-show="false" class="row">
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Name"
          lazy-rules
          :rules="[required_field]"
          v-model="form.name"
        />
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Title"
          lazy-rules
          :rules="[required_field]"
          v-model="form.title"
        />
        <q-input
          class="col-12 q-px-xs q-pt-sm"
          dense
          outlined
          label="Description"
          v-model="form.description"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Collected Items"
          multiple
          v-model="form.collectedItems"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Location"
          v-model="form.location"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Audio"
          v-model="form.audio"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          dense
          outlined
          label="Image"
          v-model="form.image"
        />
      </div>
    </div>
    {{ form }}

    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Requires To show</div>
          </div>

          <div class="col-auto q-py-xs">
            <q-btn
              v-show="!localEditingCondition.length"
              @click="onAddFirstConditionClick"
              flat
              push
              color="secondary"
              label="Add Condition"
            >
            </q-btn>
          </div>
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <div
          v-for="(item, indexItem) in localEditingCondition"
          :key="indexItem"
          class="require-to-show-item"
        >
          <div
            class="require-to-show-subitem"
            v-for="(subitem, indexSubitem) in item"
            :key="indexSubitem"
          >
            <div v-show="indexSubitem == 0" class="row text-h5">
              <q-select
                class="col-xs-6 col-sm-2 col-md-2 q-px-xs q-pt-xs"
                dense
                outlined
                label="Condition"
                :options="statements"
                v-model="subitem.statement"
                emit-value
              />
            </div>
            <div class="row text-h5 q-pl-xl">
              <q-select
                v-show="subitem.statement"
                class="col-xs-12 col-sm-2 col-md-2 q-pl-xs q-pt-sm"
                dense
                outlined
                label="Game Object"
                :options="selectGameObjects"
                v-model="subitem.userSelectedOptions[0]"
                emit-value
                @update:model-value="
                  onGameObjectChange(indexItem, indexSubitem)
                "
              />
              <div
                v-show="subitem.userSelectedOptions[0]"
                v-for="(option, optionIndex) in subitem.userSelectedOptions"
                :key="optionIndex"
                class="col-xs-12 col-sm-3 col-md-3 q-pl-xs q-pt-sm"
              >
                <q-select
                  v-if="
                    getSelectOptions(
                      subitem.userSelectedOptions,
                      option,
                      optionIndex
                    ).length
                  "
                  dense
                  outlined
                  :label="
                    getSelectLabel(
                      subitem.userSelectedOptions,
                      option,
                      optionIndex
                    )
                  "
                  :options="
                    getSelectOptions(
                      subitem.userSelectedOptions,
                      option,
                      optionIndex
                    )
                  "
                  v-model="subitem.userSelectedOptions[optionIndex + 1]"
                  @update:model-value="
                    OnSelectedOptionsChange(
                      indexItem,
                      indexSubitem,
                      optionIndex
                    )
                  "
                />
                <q-input
                  v-else
                  dense
                  outlined
                  :label="
                    getSelectLabel(
                      subitem.userSelectedOptions,
                      option,
                      optionIndex
                    )
                  "
                  v-model="subitem.equalsTo"
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

      localEditingCondition: [],

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
    const items = JSON.parse(JSON.stringify(this.items));
    const editItemIndex = this.$route.params.index;
    const localEditingItem = items[editItemIndex];
    this.form = { ...localEditingItem };
    this.localEditingCondition = this.form.requiresToShow.conditions;

    ///
  },

  methods: {
    ...mapActions("items", ["add_item"]),

    onAddFirstConditionClick() {
      const condition = {
        statement: "",
        operator: "",
        equalsTo: "",
        userSelectedOptions: [],
      };

      this.localEditingCondition[0] = [];
      this.localEditingCondition[0].push(condition);
    },

    onCreateItemClick() {
      this.dialogCreateItem = true;
    },

    onDialogSubmitClick() {
      this.add_item(this.form);
      this.dialogCreateItem = false;
    },

    onGameObjectChange(indexItem, indexSubitem) {
      console.log(
        "this.localEditingCondition[indexItem",
        this.localEditingCondition[indexItem][indexSubitem]
          .userSelectedOptions[0]
      );

      this.localEditingCondition[indexItem][
        indexSubitem
      ].userSelectedOptions.length = 1;
    },

    OnSelectedOptionsChange(indexItem, indexSubitem, optionIndex) {
      this.localEditingCondition[indexItem][
        indexSubitem
      ].userSelectedOptions.length = optionIndex + 2;
    },

    getSelectOptions(listOptions, option, optionIndex) {
      if (listOptions[0] === "actors") {
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

      return ["fallback", "fallback", "fallback"];
    },

    getSelectLabel(listOptions, option, optionIndex) {
      if (listOptions[0] === "actors") {
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
      }
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>