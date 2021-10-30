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

        console.log(`${this.component.url}`);

        this.computedComponent = () =>
          externalComponent(`${this.component.url}`);
      },
    },
  },
};
</script>