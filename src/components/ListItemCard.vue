<template>
  <q-card flat bordered dark class="list-item-card bg-grey-6">
    <q-card-section>
      <div class="row text-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ name }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItemCard",

  props: {
    name: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="sass" scoped>
.list-item-card > q-card-section >
:hover
  cursor: pointer
</style>

