<template>
  <div id="app">
    <div v-for="(control, index) in dashcontrols" :key="index">
      <component v-bind:is="control"></component>
    </div>
    <!-- <Dashboard /> -->
    <!-- <Overlay /> -->
  </div>
</template>

<script>
// import { Dashboard } from "../../app/dist/app.common";
// import Overlay from "./components/Overlay.vue";
// import Vue from "vue";

// import createLoadRemoteModule from "@paciolan/remote-module-loader";

export default {
  name: "App",
  components: {
    // Dashboard,
    // Overlay,
  },
  data: () => {
    return {
      loaddash: {
        "plugin-example": "dist/app.umd.js",
      },
      dashcontrols: [],
      overlaycontrols: [],
    };
  },
  async created() {
    // console.log(this.$options.components);
    //dynamically load the controls:

    // console.log(Dashboard);

    // const componentName = fileName
    //   .split("/")
    //   .pop()
    //   .split(".")[0];
    // register the component locally

    for (let key in this.loaddash) {
      console.log(key);

      //ISSUE HERE SEEMS TO BE THAT WEBPACK CAN ONLY IMPORT MODULES using IMPORT, and THE LIBRARY IS ACTUALLY BUNDLED AS A COMMONJS MODULE.

      console.log(`Loading from http://localhost:5000/${this.loaddash[key]}`);
      let Imported = (
        await import(
          /* webpackIgnore: true */
          `http://localhost:5000/${this.loaddash[key]}`
        )
      ).default;
      // let Imported = await createLoadRemoteModule(
      //   `http://localhost:5000/${this.loaddash[key]}`
      // );
      // let Dashboard = new Imported();
      // let { Dashboard } = require.context(
      //   // The relative path of the components folder
      //   `http://localhost:5000/${this.loaddash[key]}`,
      //   // Whether or not to look in subfolders
      //   false,
      //   // The regular expression used to match base component filenames
      //   /[A-Z]w+.(vue|js)$/
      // );

      console.log(Imported);
      // this.$options.components[key] = Dashboard;
      // console.log(this.$options.components);
      // this.dashcontrols.push(key);
    }
  },
};
</script>