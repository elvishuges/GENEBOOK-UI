<template>
  <div class="fullscreen text-black text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2" style="opacity: 0.9">GEnEbook-UI</div>

      <div class="q-pt-md">
        <q-btn
          outline
          type="submit"
          label="Create Adventure Game"
          color="secondary"
          size="lg"
          @click="onInitButtonClick"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Welcome",
  data() {
    return {
      folderName: "",
    };
  },

  methods: {
    onInitButtonClick() {
      this.$router.push("/index");
    },
  },
});
</script>
