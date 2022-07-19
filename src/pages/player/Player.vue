<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-xs">Player</div>

    <q-form @submit="onSubmit">
      <div class="row">
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Current State"
          hint="The player current state"
          readonly
          lazy-rules
          :rules="[required_field]"
          v-model="form.currentState"
        />
        <q-select
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Current Location"
          hint="The player current location"
          :options="locations"
          option-value="name"
          option-label="name"
          emit-value
          map-options
          :rules="[required_field]"
          v-model="form.currentLocation"
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
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Collected Items"
          hint="The player collected items"
          multiple
          :options="items"
          option-value="name"
          option-label="name"
          emit-value
          map-options
          v-model="form.collectedItems"
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
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          outlined
          label="Performed Actions"
          hint="The player performed actions"
          multiple
          :options="actions"
          v-model="form.performedActions"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                No Registered Actions
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="col-12 q-px-sm q-px-xs q-pt-sm">
          <strong>Status:</strong>
        </div>
        <q-input
          class="col-xs-12 col-sm-6 col-md-6 q-px-xs q-pt-sm"
          type="number"
          label="Life"
          hint="The player status life"
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
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required_field } from "src/utils/validationRules";
import { copyObject } from "src/utils/functions";
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
    ...mapState("items", ["items"]),
    ...mapState("locations", ["locations"]),
    ...mapState("actions", ["actions"]),
  },

  methods: {
    ...mapActions("player", ["set_player"]),

    loadPlayer() {
      this.form = copyObject(this.player);
    },

    onSubmit() {
      this.set_player(this.form).then(() => {
        this.showSuccessNotification();
        this.loadPlayer();
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

<style  lang="sass" scoped>
</style>