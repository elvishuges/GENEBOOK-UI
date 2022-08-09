<template>
  <q-dialog v-model="state" persistent full-width full-height>
    <q-card class="column">
      <q-bar>
        <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" />
        <div>9:34</div>

        <q-space />

        <q-btn dense flat icon="close" @click="onCloseClick" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section style="max-height: 100vh" class="scroll">
        <pre id="myText">{{ jsonFileString }}</pre>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Copy Content" color="primary" v-close-popup />
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
  },

  computed: {
    jsonFileString() {
      return JSON.stringify(this.jsonFile, undefined, 4);
    },
  },
};
</script>

<style>
pre {
  height: 460px;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.9rem;
}
</style>