<template>
  <q-dialog v-model="state" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="delete" color="red" size="32px" />
        <span class="q-ml-sm">{{ text }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancelClick" />
        <q-btn
          flat
          :label="confirmButtonLabel"
          color="primary"
          @click="onConfirmClick"
        />
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
    text: {
      type: String,
      default: "Alert",
    },
    confirmButtonLabel: {
      type: String,
      default: "Delete",
    },
  },
  methods: {
    onCancelClick() {
      this.$emit("cancel");
    },
    onConfirmClick() {
      this.$emit("confirm");
    },
  },
};
</script>

<style>
</style>