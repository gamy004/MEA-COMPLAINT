<template>
  <v-list-tile class="complaint-list__item">
    <v-list-tile-action class="complaint-list__action">
      <v-avatar color="indigo accent-3" size="14"></v-avatar>
    </v-list-tile-action>

    <v-list-tile-action class="complaint-list__action">
      <!-- action selected -->
      <v-checkbox v-model="itemSelected" color="deep-orange" hide-details></v-checkbox>
    </v-list-tile-action>

    <v-list-tile-action class="complaint-list__action">
      <!-- action starred -->
      <v-btn icon @click="item.markStarred()">
        <v-icon
          :color="item.starred ? 'deep-orange' : 'grey lignten-2'"
        >{{ item.starred ? 'star' : 'star_border' }}</v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-content class="complaint-list__content">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-list-tile-sub-title
            v-on="on"
            class="complaint-list__title font-weight-bold"
            v-text="title"
          ></v-list-tile-sub-title>
        </template>
        <span v-html="title"></span>
      </v-tooltip>

      <v-chip
        class="complaint-list__status"
        small
        color="indigo accent-3"
        dark
      >{{ item.currentStatus }}</v-chip>

      <v-list-tile-sub-title class="complaint-list__sub-title" v-html="item.topic"></v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action class="complaint-list__action-right">
      <!-- <v-list-tile-sub-title class="complaint-list__status font-weight-bold">
        <v-avatar class="info" size="10"></v-avatar>
        <span class="info--text">{{ item.currentStatus }}</span>
      </v-list-tile-sub-title>-->

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
    title() {
      return this.item.joinedRecipientName;
    },

    issuer() {
      return this.$_vuexable_getByKey(this.item.issued_by, vuex.modules.GROUP);
    },

    itemSelected: {
      get() {
        const { selected = false } = this.item;

        return selected;
      },

      set(value) {
        this.item.update("selected", value);
      }
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
    justify-content: flex-start;
  }

  &__action-right {
    justify-content: flex-end;
  }

  &__content,
  &__action-right {
    flex-direction: row;
    align-items: center;
  }

  &__title,
  &__action-right-content {
    color: #333 !important;
  }

  &__action-right {
    min-width: 100px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 16px;
  }

  &__action-right-content {
    width: auto;
    margin-left: 16px;
  }

  &__title {
    max-width: 168px;
    min-width: 125px;
    padding-right: 32px;
  }

  &__sub-title {
    width: auto;
  }

  &__status {
    margin-right: 12px;
  }
}
</style>

