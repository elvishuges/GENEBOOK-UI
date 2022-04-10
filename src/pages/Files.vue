<template>
  <q-page class="q-pa-md">
    <div class="row text-h5 q-pb-md">Images</div>
    <div class="row q-pb-md q-gutter-md">
      <q-card class="my-card">
        <q-img
          style="height: 170px"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
          <div class="absolute-bottom text-subtitle2 text-center">Title</div>
        </q-img>
      </q-card>

      <q-card class="my-card">
        <q-img
          style="height: 170px"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
          <div class="absolute-bottom text-subtitle2 text-center">Title</div>
        </q-img>
      </q-card>
    </div>
    <div class="row text-h5 q-pb-md">Audios</div>
    <div class="row justify-end q-pa-lg q-gutter-sm fixed-bottom-right">
      <q-btn
        align="around"
        color="grey"
        label="Back"
        size="lg"
        @click="$router.go(-1)"
        flat
      />
      <q-btn label="Create File" color="primary" size="lg">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Files",
});
</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 250px
</style>
