<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Ends</div>

    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(item, index) in ends"
          :key="index"
          class="col-xs-12 col-sm-4 col-md-3 q-px-xs q-pt-sm"
          @click="onItemClick(index)"
        >
          <list-item-card :name="item.title" />
        </div>
      </div>
    </div>

    <!-- dialog create End -->

    <q-dialog v-model="showDialogCreateEnd" persistent>
      <q-card>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create End</div>
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
                @keydown.space.prevent
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
                label="Text"
                lazy-rules
                :rules="[required_field]"
                v-model="form.text"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                label="Image"
                :options="images"
                v-model="form.image"
              />
              <q-select
                class="col-6 q-px-sm q-pt-sm"
                outlined
                :options="audios"
                label="Audio"
                v-model="form.audio"
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create End" type="submit" />
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
import { required_field, no_space_required } from "src/utils/validationRules";
import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateEnd: false,
      form: {
        name: "",
        title: "",
        text: "",
        image: "",
        audio: "",
        requiresToFinish: {
          items: [],
          actions: [],
          conditions: [],
          conditionsType: "",
        },
      },

      address: "",
      required_field,
    };
  },

  computed: {
    ...mapState("ends", ["ends"]),
    ...mapState("files", ["audios", "images"]),
  },

  methods: {
    ...mapActions("ends", ["add_end"]),
    onItemClick(index) {
      this.$router.push({ name: "edit-end", params: { index: index } });
    },

    onCreateItemClick() {
      this.showDialogCreateEnd = true;
    },

    onDialogSubmitClick() {
      this.add_end(this.form);
      this.showDialogCreateEnd = false;
      this.cleanForm();
      this.showSuccessNotification();
    },

    cleanForm() {
      this.form = {
        name: "",
        title: "",
        text: "",
        image: "",
        audio: "",
        requiresToFinish: {
          items: [],
          actions: [],
          conditions: [],
        },
      };
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

<style lang="sass" scoped></style>
