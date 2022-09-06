<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Actions</div>
    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(item, index) in actions"
          :key="index"
          class="col-xs-12 col-sm-4 col-md-3 q-px-xs q-pt-sm"
        >
          <list-item-card :name="item" />
        </div>
      </div>
    </div>

    <!-- dialog create Item -->

    <q-dialog v-model="showDialogCreateAction" persistent>
      <q-card class="create-action-card">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Create Action</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onDialogSubmitClick">
            <div class="row q-pt-md">
              <q-input
                @keydown.space.prevent
                class="col-12 q-px-sm q-pt-xs"
                outlined
                label="Action name"
                lazy-rules
                :rules="[required_field]"
                v-model="form.name"
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Create action" type="submit" />
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
        label="Create Action"
        color="primary"
        size="lg"
        @click="onCreateActionsClick"
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
import { required_field, no_space_required } from "src/utils/validationRules";
import ListItemCard from "components/ListItemCard.vue";

export default {
  components: { ListItemCard },

  data() {
    return {
      showDialogCreateAction: false,
      form: {
        name: "",
      },

      required_field,
    };
  },

  computed: {
    ...mapState("actions", ["actions"]),
  },

  methods: {
    ...mapActions("actions", ["add_action"]),

    onCreateActionsClick() {
      this.showDialogCreateAction = true;
    },

    onDialogSubmitClick() {
      this.add_action(this.form.name);
      this.showDialogCreateAction = false;
      this.showSuccessNotification();
      this.cleanForm();
    },

    cleanForm() {
      this.form = {
        name: "",
      };
    },

    showSuccessNotification() {
      this.$q.notify({
        type: "positive",
        message: "Item saved successfully !",
      });
    },
  },
};
</script>

<style  lang="sass" scoped>
.create-action-card
  width: 500px
</style>