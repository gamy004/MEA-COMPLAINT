<template>
  <v-layout
    v-if="showAllComplaintThisPageSelected || vuexSelectAll"
    justify-center
    align-center
    class="py-2"
  >
    <transition name="slide-y-transition" mode="out-in" appear>
      <div
        key="notAllSelected"
        v-if="!vuexSelectAll"
        v-html="$t('complaint.index.selectAllSearch.someSelected', { count: totalSelectedComplaints })"
      ></div>

      <div
        key="allSelected"
        v-else
        v-html="$t('complaint.index.selectAllSearch.allSelected', { count: $_paginatable_total })"
      ></div>
    </transition>

    <v-btn
      flat
      color="primary"
      small
      class="select-all-complaint__button"
      :loading="isFetchingAllSearch"
      @click.prevent="toggleselectAll"
    >{{ buttonText }}</v-btn>
  </v-layout>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";
import paginatable from "../../mixins/paginatable";

export default {
  mixins: [paginatable, vuexable],

  data() {
    return {
      //   selectAll: false
    };
  },

  computed: {
    vuexSelectAll: {
      get() {
        return this.$_vuexable_getState("selectAll", vuex.modules.ISSUE);
      },

      set(value) {
        this.$_vuexable_setState(
          { key: "selectAll", value },
          vuex.modules.ISSUE
        );

        return this;
      }
    },

    vuexSelected: {
      get() {
        return this.$_vuexable_getState("selected", vuex.modules.ISSUE);
      },

      set(value) {
        this.$_vuexable_setState(
          { key: "selected", value },
          vuex.modules.ISSUE
        );

        return this;
      }
    },

    $_paginatable_module() {
      return vuex.modules.ISSUE;
    },

    vuexSelectedValues() {
      return Object.values(this.vuexSelected);
    },

    showAllComplaintThisPageSelected() {
      return _.some(this.vuexSelectedValues, Boolean);
    },

    selectedComplaintsCount() {
      return this.vuexSelectedValues.reduce((count, x) => {
        return (count += x === true);
      }, 0);
    },

    totalSelectedComplaints() {
      return this.vuexSelectAll
        ? this.$_paginatable_total
        : this.selectedComplaintsCount;
    },

    showSelectAllSearchComplaint() {
      return (
        this.showAllComplaintThisPageSelected &&
        this.$_paginatable_total > this.totalSelectedComplaints
      );
    },

    buttonText() {
      const textType = this.vuexSelectAll ? "clearAll" : "selectAllBtn";

      return this.$t(`complaint.index.selectAllSearch.${textType}`);
    },

    ...vuex.mapWaitingGetters({
      isFetchingAllSearch: vuex.actions.ISSUE.FETCH_SEARCH
    })
  },

  methods: {
    toggleselectAll() {
      this.vuexSelectAll = !this.vuexSelectAll;

      if (!this.vuexSelectAll) {
        this.vuexSelected = {};
        this.$emit("click:clear");
      }

      return this;
    },

    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [
      vuex.actions.ISSUE.FETCH_SEARCH
    ])

    // async loadAllSearchComplaint() {
    //   this.vuexSelectAll = true;
    //   //   let response;

    //   //   try {
    //   //     response = await this[vuex.actions.ISSUE.FETCH_SEARCH]();
    //   //   } catch (error) {
    //   //     throw error;
    //   //   }

    //   //   return response;
    // }
  },

  mounted() {
    const { selectAll } = this;

    if (selectAll === undefined) {
      console.log("ComplaintSelectAllSearch: add state 'selectAll'");

      this.$_vuexable_setState(
        {
          key: "selectAll",
          value: false
        },
        vuex.modules.ISSUE
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.select-all-complaint__button {
  text-transform: none;
}
</style>


