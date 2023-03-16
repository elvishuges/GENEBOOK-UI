<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Book Configurations</div>
    <q-form @submit="onSubmit" class="q-pb-xl">
      <div class="row">
        <q-input
          v-model="form.title"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Title"
          hint="The Game Title"
          lazy-rules
        />
        <q-input
          v-model="form.description"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Description"
          hint="The Game Description"
          lazy-rules
        />
        <q-select
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          :options="images"
          label="coverImage"
          hint="The Game Creator Cover Image"
          v-model="form.coverImage"
        />
        <q-input
          v-model="form.creator"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Creator"
          hint="The Game Creator"
          lazy-rules
        />
        <q-input
          v-model="form.titleSection"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Title Section"
          hint="The Game Title Section"
          lazy-rules
        />
        <q-input
          v-model="form.navSection"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Nav Section"
          hint="The Game Title Section"
          lazy-rules
        />
        <q-input
          v-model="form.content"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Content"
          hint="The Game Content"
          lazy-rules
        />
        <q-input
          v-model="form.language"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Language"
          hint="The Game Language"
          lazy-rules
        />
        <!-- <q-input
          v-model="form.created"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Created"
          hint="The Game Created Date"
          lazy-rules
        /> -->

        <div class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md">
          <q-input filled v-model="form.created">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.created" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <q-input
          v-model="form.modified"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="Modified"
          hint="The Game modified Date"
          lazy-rules
        />
        <q-input
          v-model="form.attributionURL"
          class="col-xs-12 col-sm-4 col-md-4 q-px-sm q-pt-md"
          outlined
          label="AttributionURL"
          hint="The Game Attribution URL"
          lazy-rules
        />
      </div>
      <div class="row justify-end q-pa-lg q-gutter-sm fixed-bottom-right">
        <q-btn
          align="around"
          color="grey"
          label="Back"
          size="lg"
          @click="$router.go(-1)"
          flat
        />
        <q-btn type="submit" label="Save" color="primary" size="lg">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        coverImage: "",
        creator: "",

        titleSection: "",
        navSection: "",

        content: "",
        language: "",
        created: "",
        modified: "",
        attributionURL: "",

        inputValue: "",
        suffix: "_suffix",
      },
    };
  },

  mounted() {
    this.loadConfigs();
  },
  computed: {
    ...mapState("configs", ["configs"]),
    ...mapState("files", ["audios", "images"]),
  },

  methods: {
    ...mapActions("configs", ["set_configs"]),

    loadConfigs() {
      this.form = JSON.parse(JSON.stringify(this.configs));
    },

    onSubmit() {
      this.set_configs({ ...this.form }).then(() => {
        this.showSuccessNotification();
      });
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
