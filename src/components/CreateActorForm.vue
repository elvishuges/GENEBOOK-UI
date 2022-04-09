<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Create Actor</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form class="q-pb-xl">
        <div class="row">
          <q-input
            class="col-12 q-px-sm q-pt-sm"
            outlined
            label="Title"
            lazy-rules
            dense
          />
          <q-input
            class="col-12 q-px-sm q-pt-sm"
            outlined
            label="Description"
            lazy-rules
            dense
          />
          <q-select
            class="col-6 q-px-sm q-pt-sm"
            outlined
            label="Image"
            dense
          />
          <q-select
            class="col-6 q-px-sm q-pt-sm"
            outlined
            label="Location"
            dense
          />

          <div class="col-12 q-px-sm q-px-sm q-pt-sm">
            <strong>Status:</strong>
          </div>
          <q-input class="col-6 q-px-sm q-pt-sm" type="number" outlined dense />
          <div>
            <q-checkbox label="Ativo" />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Open another dialog" @click="secondDialog = true" />
      <q-btn flat label="Close" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateActorForm",
  data() {
    return {
      address: "",
    };
  },
});
</script>

<style lang="sass" scoped>
</style>

<style>
</style>