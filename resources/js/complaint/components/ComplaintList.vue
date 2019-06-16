<template>
  <v-layout class="complaint-list" row wrap>
    <v-flex xs12>
      <transition name="slide-y-transition" mode="out-in">
        <v-progress-linear v-if="isFetchingComplaint" key="complaintLoading" :indeterminate="true"></v-progress-linear>

        <v-list v-else key="complaintList" :three-line="isMobile" :class="isMobileClasses">
          <template v-for="(item, itemIndex) in $_paginatable_currentPaginatedList">
            <complaint-list-item :key="`complaint-${itemIndex}`" :item="item"/>
          </template>
        </v-list>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import paginatable from "../../mixins/paginatable";
import { vuex, vuexable } from "../../mixins/vuexable";
import ComplaintListItem from "./ComplaintListItem";

export default {
  props: {
    type: String,
    active: {
      type: Boolean,
      default: () => false
    }
  },

  mixins: [paginatable],

  components: {
    ComplaintListItem
  },

  watch: {
    // active: {
    //   immediate: true,
    //   async handler(active) {
    //     if (active) {
    //       await this[vuex.actions.COMPLAINT.FETCH]();
    //     }
    //   }
    // },

    $_paginatable_pagination: {
      immediate: true,
      deep: true,
      async handler(v, ov) {
        if (this.active) {
          console.log("ComplaintList pagination changed: ", v);

          await this[vuex.actions.COMPLAINT.FETCH]();
        }
      }
    }
  },

  computed: {
    $_paginatable_module() {
      return vuex.modules.COMPLAINT;
    },

    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    ...vuex.mapWaitingGetters({
      isFetchingComplaint: [vuex.actions.COMPLAINT.FETCH]
    })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.COMPLAINT, [
      vuex.actions.COMPLAINT.FETCH
    ])
  },

  created() {
    this.$_paginatable_pagination = {
      sortBy: "updated_at",
      descending: true
    };
  }
};
</script>

<style lang="scss">
.complaint-list {
  .v-list {
    padding-top: 0;
    padding-bottom: 0;

    &--three-line {
      &.is-mobile {
        .v-list__tile {
          align-items: flex-start;
          height: 110px;
          padding-top: 8px;

          &__sub-title {
            white-space: nowrap;
            display: block;
          }
        }
      }
    }
  }
}
</style>


