<template>
  <v-btn
    v-if="isMobile"
    :round="!isMobile"
    large
    color="grey lighten-5"
    :fab="isMobile"
    :fixed="isMobile"
    :bottom="isMobile"
    :right="isMobile"
    dark
    class="btn-complaint has-gradient"
    :class="isMobileClasses"
  >
    <v-icon>add_comment</v-icon>
  </v-btn>

  <v-btn v-else round large color="grey lighten-5" dark class="btn-complaint has-gradient">
    <v-icon>add_comment</v-icon>
    <span class="subheading font-weight-medium text-capitalize mx-2">Complaint</span>
  </v-btn>
</template>

<script>
import { vuex } from "../../mixins/vuexable";

export default {
  computed: {
    ...vuex.mapGetters(["isMobile", "isMobileClasses"])
  }
};
</script>


<style lang="scss" scoped>
.btn-complaint {
  margin-bottom: 8px;

  &:not(.is-mobile) {
    height: 48px;
    padding: 10px 24px 10px 16px;
  }
}
</style>

