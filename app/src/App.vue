<template>
  <div id="app">
    <div v-for="(control, index) in loaddash" :key="index">
      <ComputedComponent :component="control"></ComputedComponent>
    </div>
    <!-- <Dashboard /> -->
    <!-- <Overlay /> -->
  </div>
</template>

<script>
// import { Dashboard } from "../../app/dist/app.common";
// import Overlay from "./components/Overlay.vue";
import ComputedComponent from "./ComputedComponent.vue";
// import Vue from "vue";

// import createLoadRemoteModule from "@paciolan/remote-module-loader";

// import { corsImport } from "webpack-external-import";

// import externalComponent from "./externalComponent";

export default {
  name: "App",
  components: {
    // Dashboard,
    // Overlay,
    ComputedComponent,
  },
  data: () => {
    return {
      loaddash: {
        "plugin-example": {
          url: "dist/PluginExample.Dashboard.umd.min.js",
        },
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
    // for (let key in this.loaddash) {
    //   console.log(key);
    //   //ISSUE HERE SEEMS TO BE THAT WEBPACK CAN ONLY IMPORT MODULES using IMPORT, and THE LIBRARY IS ACTUALLY BUNDLED AS A COMMONJS MODULE.
    //   console.log(`Loading from http://localhost:5000/${this.loaddash[key]}`);
    // import(
    //   /* webpackIgnore: true */
    //   `http://localhost:5000/${this.loaddash[key]}`
    // ).then(() => {
    //   someFunction();
    // });
    // let Imported = await import(
    //   /* webpackIgnore: true */
    //   `http://localhost:5000/${this.loaddash[key]}`
    // );
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
    // const Imported = () =>
    //   externalComponent(`http://localhost:5000/${this.loaddash[key]}`);
    // this.dashcontrols.push(Imported);
    // console.log(Imported());
    // this.$options.components[key] = Imported();
    // console.log(this.$options.components);
    // this.dashcontrols.push(key);
    // }
  },
};
</script>