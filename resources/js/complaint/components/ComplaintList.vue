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
        <template v-for="(item, itemIndex) in $_paginatable_currentPaginatedList">
          <complaint-list-item :key="`complaint-${itemIndex}`" :item="item"/>
        </template>
      </v-list>
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
    active: {
      immediate: true,
      async handler(active) {
        if (active) {
          await this[vuex.actions.COMPLAINT.FETCH]();
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


