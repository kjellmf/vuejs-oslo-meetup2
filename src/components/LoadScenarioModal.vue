<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Load scenario</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-upload v-model="dropFiles" @input="load"
                  drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon
                  icon="upload"
                  size="is-large">
                </b-icon>
              </p>
              <p>Drop your file here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>

    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
import {LOAD_SCENARIO} from "../store/action-types";

export default {
  name: "load-scenario-modal",
  data() {
    return {
      dropFiles: []
    }
  },
  methods: {
    load(files) {
      if (!files.length)
        return;
      var reader = new FileReader();

      reader.onload = (e) => {
        try {
          let json = JSON.parse(e.target.result);
          if (json.type && json.type == "ScenarioViewer") {
            this.$store.dispatch(LOAD_SCENARIO, json);
            this.$router.push({name: "home"});
            this.$parent.close();
          }
        } catch (ex) {
          console.error("Failed to parse", ex)
        }
      };
      reader.readAsText(files[0]);
    }
  }
}
</script>

<style scoped>

</style>
