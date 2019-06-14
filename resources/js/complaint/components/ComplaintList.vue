<template>
  <v-layout class="complaint-list" row wrap>
    <v-flex v-if="isFetchingComplaint" xs12>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-flex>
    <v-flex v-else xs12>
      <!-- <v-data-iterator
        :items="$_paginatable_currentPaginatedList"
        :rows-per-page-items="paginatable_rowsPerPage"
        :pagination.sync="$_paginatable_pagination"
        hide-actions
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex xs12>
            <v-card class="complaint-list__card">
              <v-card-title>
                <h4>{{ props.item.subject }}</h4>
              </v-card-title>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>-->
      <v-list class="py-0">
        <v-list-tile
          v-for="(item, itemIndex) in $_paginatable_currentPaginatedList"
          :key="`complaint-${itemIndex}`"
          class="complaint-list__item"
        >
          <v-list-tile-action class="complaint-list__action">
            <!-- action selected -->
            <v-checkbox
              id="complaintSelectAll"
              v-model="item.selected"
              color="deep-orange"
              hide-details
            ></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-action class="complaint-list__action">
            <!-- action starred -->
            <v-btn icon @click="item.starred = !item.starred">
              <v-icon
                :color="item.starred ? 'deep-orange' : 'grey lignten-2'"
              >{{ item.starred ? 'star' : 'star_border' }}</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-sub-title class="font-weight-bold" v-text="item.subject"></v-list-tile-sub-title>
          </v-list-tile-content>
          <!-- <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content> -->
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import paginatable from "../../mixins/paginatable";
import { vuex, vuexable } from "../../mixins/vuexable";

export default {
  props: {
    type: String,
    active: {
      type: Boolean,
      default: () => false
    }
  },

  mixins: [paginatable],

  data() {
    return {
      //
    };
  },

  watch: {
    active: {
      immediate: true,
      async handler(active) {
        if (active) {
          await this[vuex.actions.COMPLAINT.FETCH]();

          console.log(this.paginatedComplaintList);
        }
      }
    }
  },

  computed: {
    $_paginatable_module() {
      return vuex.modules.COMPLAINT;
    },

    ...vuex.mapWaitingGetters({
      isFetchingComplaint: [vuex.actions.COMPLAINT.FETCH]
    })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.COMPLAINT, [
      vuex.actions.COMPLAINT.FETCH
    ])
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
}
</style>


