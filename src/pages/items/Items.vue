<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Items</div>

    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-xs-12 col-sm-4 col-md-3 q-px-xs q-pt-sm"
          @click="onItemClick(index)"
        >
          <list-item-card :name="item.title" />
        </div>
      </div>
    </div>

    <!-- dialog create Item -->

    <q-dialog v-model="showDialogCreateItem" persistent>
      <q-card>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create Item</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onDialogSubmitClick">
            <div class="row">
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Name"
                lazy-rules
                :rules="[required_field]"
                v-model="form.name"
              />
              <q-input
                class="col-6 q-px-sm q-pt-xs"
                outlined
                label="Title"
                lazy-rules
                :rules="[required_field]"
                v-model="form.title"
              />
              <q-input
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Description"
                lazy-rules
                :rules="[required_field]"
                v-model="form.description"
              />
              <q-select
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Location"
                :options="locations"
                option-value="name"
                option-label="name"
                emit-value
                map-options
                :rules="[required_field]"
                v-model="form.location"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      No Registered Location
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                :options="audios"
                label="Audio"
                v-model="form.audio"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                label="Image"
                :options="images"
                v-model="form.image"
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create Item" type="submit" />
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
        label="Create Item"
        color="primary"
        size="lg"
        @click="onCreateItemClick"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required_field } from "src/utils/validationRules";
import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateItem: false,
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

      address: "",
      required_field,
    };
  },

  computed: {
    ...mapState("items", ["items"]),
    ...mapState("locations", ["locations"]),
    ...mapState("files", ["audios", "images"]),
  },

  methods: {
    ...mapActions("items", ["add_item"]),

    onItemClick(index) {
      this.$router.push({ name: "edit-item", params: { index: index } });
    },

    onCreateItemClick() {
      this.showDialogCreateItem = true;
    },

    onDialogSubmitClick() {
      this.add_item(this.form);
      this.showDialogCreateItem = false;
    },

    cleanForm() {
      this.form = {
        name: "",
        title: "",
        description: "",
        image: "",
        audio: "",
        location: "",
        collectedItems: [],
        requiresToShow: {
          items: [],
          actions: [],
          conditionsType: "",
          conditions: [],
        },
      };
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>