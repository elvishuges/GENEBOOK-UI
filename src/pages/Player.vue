<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Player</div>

    <div class="q-pa-md q-gutter-md">
      <q-form @submit="onSubmit">
        <div class="row">
          <q-input
            class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
            outlined
            label="Current State"
            lazy-rules
            v-model="form.currentState"
          />
          <q-select
            class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
            outlined
            label="Current Location"
            v-model="form.currentLocation"
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
            label="Performed Actions"
            multiple
            v-model="form.performedActions"
          />
          <div class="col-12 q-px-sm q-px-xs q-pt-sm">
            <strong>Status:</strong>
          </div>
          <q-input
            class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
            type="number"
            label="Life"
            outlined
            v-model="form.status.life"
            :rules="[required_field]"
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
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field, no_space_required } from "src/utils/validationRules";
export default {
  components: {},

  data() {
    return {
      dialogCreateActor: false,
      form: {
        currentState: "game-start",
        currentLocation: "bed",
        collectedItems: [],
        performedActions: [],
        status: {
          life: 5,
        },
      },

      address: "",
      required_field,
    };
  },

  mounted() {
    this.loadPlayer();
  },

  computed: {
    ...mapState("player", ["player"]),
  },

  methods: {
    ...mapActions("player", ["set_player"]),

    loadPlayer() {
      this.form = JSON.parse(JSON.stringify(this.player));
    },

    onSubmit() {
      this.set_player(this.form);
      this.loadPlayer();
    },
  },
};
</script>

<style  lang="sass" scoped>
</style>