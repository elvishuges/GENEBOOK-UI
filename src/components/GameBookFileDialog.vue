<template>
  <q-dialog v-model="state" full-width style="max-height: 350px" persistent>
    <q-card scroll="no">
      <q-card-section>
        <div class="text-h6">game-config.json</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll">
        <pre id="myText">{{ jsonFileString }}</pre>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn dense flat @click="onCloseClick"> Close </q-btn>
        <q-btn flat @click="onCopyClick" label="Copy" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    jsonFile: {
      type: Object,
      default: {},
    },
    state: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    onCloseClick() {
      this.$emit("close");
    },
    async onCopyClick() {
      await navigator.clipboard.writeText(
        JSON.stringify(this.jsonFile, this.replace, 4)
      );
      this.showSuccessNotification("Copy Successfuly!");
    },

    showSuccessNotification(msg) {
      this.$q.notify({
        type: "positive",
        message: msg,
      });
    },

    replace(key, value) {
      if (isNaN(parseInt(value))) {
        return value;
      }
      let change = parseFloat(value);
      return change;
    },
  },

  computed: {
    jsonFileString() {
      return { ...JSON.parse(JSON.stringify(this.jsonFile, this.replace, 4)) };
    },
  },
};
</script>

<style>
pre {
  height: 380px;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.9rem;
}
</style>