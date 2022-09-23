<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-md">Images</div>
    <q-scroll-area style="height: 160px">
      <div class="row q-pb-md q-gutter-md no-wrap">
        <q-card
          v-for="(image, index) in images"
          :key="index"
          class="image-card"
        >
          <q-img
            :ratio="16 / 9"
            style="width: 100%"
            src="https://i.pinimg.com/originals/ea/b3/45/eab345a639c644efa5f03b75546f162d.png"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ image }}
            </div>
          </q-img>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="row text-h5 q-py-md">Audios:</div>
    <q-scroll-area style="height: 160px">
      <div class="row q-pb-md q-gutter-md no-wrap">
        <q-card
          v-for="(audio, index) in audios"
          :key="index"
          class="image-card"
        >
          <q-img
            style="width: 100%"
            src="https://i.pinimg.com/originals/67/4f/3d/674f3d5fb2ac0f1a9b0793a0ac0a0ece.png"
            :ratio="16 / 9"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ audio }}
            </div>
          </q-img>
        </q-card>
      </div>
    </q-scroll-area>
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
        label="Create File"
        @click="onCreateFileClick"
        color="primary"
        size="lg"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>

    <!-- dialog register File -->

    <q-dialog v-model="dialogRegisterFile" persistent>
      <q-card style="width: 580px; max-width: 80vw">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">Register File</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-md">
          <q-form @submit="onFormRergisterFileSubmit">
            <div class="row">
              <q-select
                class="col-12 q-px-sm q-pt-sm"
                outlined
                label="File Type"
                lazy-rules
                :options="fileTypeOptions"
                :rules="[required_field]"
                v-model="form.type"
              />
              <q-input
                class="col-12 q-px-sm q-pt-sm"
                outlined
                label="File Name"
                lazy-rules
                :rules="[required_field, no_space_required]"
                v-model="form.name"
                @keydown.space.prevent
              />
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
              <q-btn flat label="Register File" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { required_field, no_space_required } from "src/utils/validationRules";

export default defineComponent({
  name: "Files",

  data() {
    return {
      dialogRegisterFile: false,
      form: {
        name: "",
        type: "",
      },

      fileTypeOptions: ["audio", "image"],
      loadedVideos: [],
      loadedImages: [],
      required_field,
      no_space_required,
    };
  },

  computed: {
    ...mapState("files", ["audios", "images"]),
  },

  methods: {
    ...mapActions("files", ["register_audio", "register_image"]),

    onCreateFileClick() {
      this.dialogRegisterFile = true;
    },

    onFormRergisterFileSubmit() {
      if (this.form.type === "audio") {
        this.register_audio(this.form.name);
      }
      if (this.form.type === "image") {
        this.register_image(this.form.name);
      }
      this.cleanForm();
      this.dialogRegisterFile = false;
    },

    cleanForm() {
      this.form = {
        name: "",
        type: "",
      };
    },
  },
});
</script>

<style lang="sass" scoped>
.image-card
  width: 250px
</style>
