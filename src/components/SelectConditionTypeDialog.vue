<template>
  <q-dialog v-model="state" persistent>
    <q-card class="card">
      <q-card-section class="items-center">
        <q-select
          filled
          v-model="model"
          :options="options"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          label="Condition Type"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancelClick" />
        <q-btn flat label="Select" color="primary" @click="onConfirmClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  emits: ["cancel", "confirm"],
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      model: "if",
      options: [
        {
          label: "If",
          value: "if",
        },
        {
          label: "If Else",
          value: "if_else",
        },
      ],
    };
  },
  methods: {
    onCancelClick() {
      this.$emit("cancel");
    },
    onConfirmClick() {
      this.$emit("confirm", this.model);
    },
  },
};
</script>

<style lang="sass" scoped>
.card
  width: 300px
</style>