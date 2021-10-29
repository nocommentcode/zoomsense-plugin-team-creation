<template>
  <Component :is="computedComponent" v-bind="props" />
</template>

<script>
import externalComponent from "./externalComponent";

export default {
  name: "DynamicComponent",
  props: {
    component: {
      required: true,
      type: Object,
    },
    props: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      computedComponent: null,
    };
  },
  watch: {
    component: {
      immediate: true,
      handler(newComponent, prevComponent = "") {
        if (newComponent.url === prevComponent.url) return;

        console.log(`http://localhost:5000/${this.component.url}`);

        this.computedComponent = () =>
          externalComponent(`http://localhost:5000/${this.component.url}`);
      },
    },
  },
};
</script>