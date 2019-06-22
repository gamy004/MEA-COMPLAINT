<template>
  <v-layout class="complaint-list" :class="isMobileClasses" row wrap>
    <v-flex xs12>
      <transition name="slide-y-transition" mode="out-in">
        <v-progress-linear v-if="isFetchingComplaint" key="complaintLoading" :indeterminate="true"></v-progress-linear>

        <v-list v-else key="complaintList" :three-line="isMobile" :class="isMobileClasses">
          <template v-for="(item, itemIndex) in $_paginatable_currentPaginatedList">
            <complaint-list-item
              :key="`complaint-${itemIndex}`"
              :item="item"
              @delete="onDeleteItem(item, itemIndex)"
            />
          </template>
        </v-list>
      </transition>
    </v-flex>

    <message-alert
      key="alertComplaintList"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
      :alertable-timeout="5000"
    ></message-alert>
  </v-layout>
</template>

<script>
import alertable from "../../mixins/alertable";
import paginatable from "../../mixins/paginatable";
import { vuex, vuexable } from "../../mixins/vuexable";
import ComplaintListItem from "./ComplaintListItem";
import MessageAlert from "../../components/MessageAlert";

export default {
  props: {
    type: String,
    active: {
      type: Boolean,
      default: () => false
    }
  },

  mixins: [alertable, paginatable],

  components: {
    ComplaintListItem,
    MessageAlert
  },

  data() {
    return {
      vuex,
      warningDelete: false,
      alertable_messages: {
        error: "Cannot delete complaint, please try again.",
        remove: {
          text: "Complaint moved to Trash.",
          actions: [
            {
              text: "Undo",
              handler: ({ item, itemIndex }) => {
                this[vuex.actions.COMPLAINT.RESTORE](item);
              }
            }
          ]
        },
        undo: "Action undone."
      }
    };
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
      vuex.actions.COMPLAINT.FETCH,
      vuex.actions.COMPLAINT.DELETE,
      vuex.actions.COMPLAINT.RESTORE
    ]),

    async onDeleteItem(item, itemIndex) {
      try {
        await this[vuex.actions.COMPLAINT.DELETE](item);

        this.$_alertable_alert("remove", { item, itemIndex });
      } catch (error) {
        this.$_alertable_alert("error");

        throw error;
      }
    }
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
  &.is-mobile {
    margin-bottom: 35px;
  }

  .v-list {
    padding-top: 0;
    padding-bottom: 0;

    &--three-line {
      &.is-mobile {
        .v-list__tile {
          align-items: flex-start;
          height: 120px;
          padding-top: 8px;
          padding-bottom: 8px;

          &__sub-title {
            white-space: nowrap;
            display: block;
          }
        }
      }
    }
  }

  &__sub-title {
    display: flex;

    * {
      margin: 0 !important;
    }
  }
}
</style>


