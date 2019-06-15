<template>
  <v-list-tile class="complaint-list__item">
    <v-list-tile-action class="complaint-list__action">
      <!-- action selected -->
      <v-checkbox id="complaintSelectAll" v-model="item.selected" color="deep-orange" hide-details></v-checkbox>
    </v-list-tile-action>

    <v-list-tile-action class="complaint-list__action">
      <!-- action starred -->
      <v-btn icon @click="item.starred = !item.starred">
        <v-icon
          :color="item.starred ? 'deep-orange' : 'grey lignten-2'"
        >{{ item.starred ? 'star' : 'star_border' }}</v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-content class="complaint-list__content">
      <v-list-tile-sub-title class="complaint-list__title font-weight-bold" v-text="issuer.name"></v-list-tile-sub-title>
      <v-list-tile-sub-title class="complaint-list__sub-title" v-html="item.topic"></v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action class="complaint-list__action-right">
      <v-list-tile-sub-title
        class="complaint-list__action-right-content font-weight-bold"
        v-text="item.shortUpdatedAt"
      ></v-list-tile-sub-title>
    </v-list-tile-action>
    <!-- <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content> -->
  </v-list-tile>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";

export default {
  props: {
    item: {
      type: vuex.models.COMPLAINT,
      required: true
    }
  },

  mixins: [vuexable],

  computed: {
    // แนทยสฟรืะ() {
    //   return this.$_vuexable_getByKey(this.item.id, vuex.modules.COMPLAINT);
    // },

    issuer() {
      return this.$_vuexable_getByKey(this.item.issued_by, vuex.modules.GROUP);
    }
  }
};
</script>

<style lang="scss" scoped>
.complaint-list {
  &__item {
    border-bottom: 1px solid #e0e0e0;
  }

  &__action {
    min-width: 36px !important;
  }

  &__content {
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  }

  &__title,
  &__action-right-content {
    color: #333 !important;
  }

  &__action-right {
    min-width: 75px;
  }

  &__action-right-content {
    width: auto;
  }

  &__title {
    max-width: 168px;
    min-width: 125px;
    padding-right: 32px;
  }

  &__sub-title {
    width: auto;
  }
}
</style>

