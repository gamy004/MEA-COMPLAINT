<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height pa-0 v-resize="onResize">
        <slot/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import layoutable from "../mixins/layoutable";

export default {
  mixins: [layoutable]
};
</script>

