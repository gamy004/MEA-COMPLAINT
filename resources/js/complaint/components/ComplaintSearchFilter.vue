<template>
  <v-text-field
    flat
    solo
    color="deep-orange"
    hide-details
    label="Search complaint"
    prepend-inner-icon="search"
    v-model="issue_search_mixin_searchKeyword"
    @keyup.enter.stop.prevent="onSearchByKeyword"
  >
    <template #append>
      <v-menu
        v-model="dialog"
        :close-on-content-click="false"
        offset-y
        :nudge-left="550"
        :nudge-width="550"
      >
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltipClear }">
              <v-btn
                v-show="issue_search_mixin_searchKeyword.length || $_issue_search_mixin_filtered"
                v-on="tooltipClear"
                class="clear-search__button"
                icon
                @click.prevent.stop="onClear"
              >
                <v-icon color="grey darken-2">clear</v-icon>
              </v-btn>
            </template>
            <span>Clear search</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn v-on="{ ...menu, ...tooltip }" icon>
                <v-icon
                  :color="$_issue_search_mixin_filtered ? 'deep-orange' : 'grey darken-2'"
                >mdi-filter</v-icon>
              </v-btn>
            </template>
            <span>Show search options</span>
          </v-tooltip>
        </template>

        <v-card class="pt-2 px-2">
          <v-list class="search-filter-list">
            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">From</span>
              </v-list-tile-action>

              <v-autocomplete
                class="search-complaint-form__input-recipient bdb-1"
                v-model="issue_search_mixin_form.from"
                :items="$_issue_search_mixin_storeRecipients"
                small-chips
                cache-items
                :loading="$_issue_search_mixin_isFetchingFormRecipient"
                full-width
                hide-details
                hide-no-data
                multiple
                single-line
                color="deep-orange"
                @focus="$_issue_search_mixin_fetchRecipients"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ issue_search_mixin_form.from.length - 3 }} others)</span>
                </template>
              </v-autocomplete>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">To</span>
              </v-list-tile-action>

              <v-autocomplete
                class="search-complaint-form__input-recipient bdb-1"
                v-model="issue_search_mixin_form.to"
                :items="$_issue_search_mixin_storeRecipients"
                small-chips
                cache-items
                :loading="$_issue_search_mixin_isFetchingFormRecipient"
                full-width
                hide-details
                hide-no-data
                multiple
                single-line
                color="deep-orange"
                @focus="$_issue_search_mixin_fetchRecipients"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ issue_search_mixin_form.to.length - 3 }} others)</span>
                </template>
              </v-autocomplete>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">Status</span>
              </v-list-tile-action>

              <v-autocomplete
                class="search-complaint-form__input-status bdb-1"
                v-model="issue_search_mixin_form.statuses"
                :items="$_issue_search_mixin_storeStatuses"
                small-chips
                cache-items
                :loading="$_issue_search_mixin_isFetchingFormStatus"
                full-width
                hide-details
                hide-no-data
                multiple
                single-line
                color="deep-orange"
                @focus="$_issue_search_mixin_fetchStatuses"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ issue_search_mixin_form.statuses.length - 3 }} others)</span>
                </template>
              </v-autocomplete>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">Category</span>
              </v-list-tile-action>

              <v-autocomplete
                class="search-complaint-form__input-status bdb-1"
                v-model="issue_search_mixin_form.categories"
                :items="$_issue_search_mixin_storeCategories"
                small-chips
                cache-items
                :loading="$_issue_search_mixin_isFetchingFormCategory"
                full-width
                hide-details
                hide-no-data
                multiple
                single-line
                color="deep-orange"
                @focus="$_issue_search_mixin_fetchIssueCategories"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ issue_search_mixin_form.categories.length - 3 }} others)</span>
                </template>
              </v-autocomplete>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">Subject</span>
              </v-list-tile-action>

              <v-text-field
                v-model="issue_search_mixin_form.subject"
                class="bdb-1"
                single-line
                full-width
                hide-details
                color="deep-orange"
              ></v-text-field>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">Has the words</span>
              </v-list-tile-action>

              <v-text-field
                v-model="issue_search_mixin_form.include_words"
                class="bdb-1"
                single-line
                full-width
                hide-details
                color="deep-orange"
              ></v-text-field>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">Doesn't have</span>
              </v-list-tile-action>

              <v-text-field
                v-model="issue_search_mixin_form.exclude_words"
                class="bdb-1"
                single-line
                full-width
                hide-details
                color="deep-orange"
              ></v-text-field>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <span class="mr-3 body-2">{{ $_issue_search_mixin_textFieldLabel }}</span>
              </v-list-tile-action>

              <v-menu
                ref="dateMenu"
                v-model="issue_search_mixin_dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="issue_search_mixin_form.dates"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="issue_search_mixin_form.dates"
                    class="mt-3"
                    append-icon="event"
                    color="deep-orange"
                    readonly
                    v-on="on"
                  >
                    <template #append>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" icon @click="$_issue_search_mixin_onSwitchDateType">
                            <v-icon color="grey darken-2">{{ $_issue_search_mixin_calendarIcon }}</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $_issue_search_mixin_calendarTooltip }}</span>
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  :key="`picker-${$_issue_report_mixin_reportType}`"
                  v-model="$_issue_report_mixin_reportVModel"
                  multiple
                  :type="$_issue_report_mixin_reportType"
                  no-title
                  scrollable
                  header-color="has-gradient"
                  color="deep-orange"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="deep-orange"
                    @click="issue_search_mixin_dateMenu = false"
                  >Cancel</v-btn>
                  <v-btn
                    flat
                    color="deep-orange"
                    :loading="$_issue_search_mixin_isSearchingComplaint"
                    @click="$refs.dateMenu.save($_issue_report_mixin_reportVModel)"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-list-tile>

            <!-- <v-list-tile>
          <v-list-tile-action>
            <span class="mr-3 body-2">title</span>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-switch v-model="hints" color="purple"></v-switch>
          </v-list-tile-content>
            </v-list-tile>-->
          </v-list>

          <v-card-actions class="py-3">
            <v-spacer></v-spacer>

            <v-btn flat @click="dialog = false">Cancel</v-btn>
            <v-btn
              color="deep-orange"
              :loading="$_issue_search_mixin_isSearchingComplaint"
              flat
              @click.prevent.stop="onSearch"
            >Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import { issueSearchMixin } from "../../mixins/issue-search-mixin";
import { vuexable, vuex } from "../../mixins/vuexable";
import paginatable from "../../mixins/paginatable";
import { views } from "../../constants";

export default {
  mixins: [dialogable, issueSearchMixin, paginatable, vuexable],

  watch: {
    searchFilters: {
      immediate: true,
      deep: true,
      handler(v) {
        this.$emit("update:searchFilter", v);
      }
    },

    authSettingPerPage: {
      async handler(v, ov) {
        // if (!this.$_vuexable_shouldUpdatePagination(v, vuex.modules.ISSUE))
        //   return;

        this.$_issue_search_mixin_updateKeywordAndBackup();

        this.$_paginatable_rowsPerPage = v;

        const {
          $_issue_search_mixin_searchFiltersVuex = [],
          issue_search_mixin_searchKeyword = ""
        } = this;

        // console.log(
        //   $_issue_search_mixin_searchFiltersVuex,
        //   issue_search_mixin_searchKeyword
        // );

        if (
          $_issue_search_mixin_searchFiltersVuex.length ||
          issue_search_mixin_searchKeyword.length
        ) {
          // if ($_issue_search_mixin_searchFiltersVuex.length) {
          //   await this.$_issue_search_mixin_onSearchFilter();
          // } else {
          //   await this.$_issue_search_mixin_onSearchByKeyword();
          // }
          await this.$_issue_search_mixin_searchComplaint();
        }
      }
    },

    "$_paginatable_pagination.descending": {
      async handler(v, ov) {
        // if (v == (this.$route.query.descending === "true")) return;

        // if (!this.$_vuexable_shouldUpdatePagination(v, vuex.modules.ISSUE))
        //   return;

        this.$_issue_search_mixin_updateKeywordAndBackup();

        const {
          $_issue_search_mixin_searchFiltersVuex = [],
          issue_search_mixin_searchKeyword = ""
        } = this;

        // console.log(
        //   $_issue_search_mixin_searchFiltersVuex,
        //   issue_search_mixin_searchKeyword
        // );

        if (
          $_issue_search_mixin_searchFiltersVuex.length ||
          issue_search_mixin_searchKeyword.length
        ) {
          // if ($_issue_search_mixin_searchFiltersVuex.length) {
          //   await this.$_issue_search_mixin_onSearchFilter();
          // } else {
          //   await this.$_issue_search_mixin_onSearchByKeyword();
          // }
          await this.$_issue_search_mixin_searchComplaint();

          this.$router.push({
            name: views.ISSUE.INDEX,
            query: {
              ...this.$route.query,
              descending: this.$_paginatable_descending
            }
          });
        }
      }
    },

    "$_paginatable_pagination.page": {
      async handler(v, ov) {
        if (v == _.toInteger(this.$route.query.page)) return;

        // if (!this.$_vuexable_shouldUpdatePagination(v, vuex.modules.ISSUE))
        //   return;

        this.$_issue_search_mixin_updateKeywordAndBackup();

        const {
          $_issue_search_mixin_searchFiltersVuex = [],
          issue_search_mixin_searchKeyword = ""
        } = this;

        // console.log(
        //   $_issue_search_mixin_searchFiltersVuex,
        //   issue_search_mixin_searchKeyword
        // );

        if (
          $_issue_search_mixin_searchFiltersVuex.length ||
          issue_search_mixin_searchKeyword.length
        ) {
          // if ($_issue_search_mixin_searchFiltersVuex.length) {
          //   await this.$_issue_search_mixin_onSearchFilter();
          // } else {
          //   await this.$_issue_search_mixin_onSearchByKeyword();
          // }
          await this.$_issue_search_mixin_searchComplaint();

          this.$router.push({
            name: views.ISSUE.INDEX,
            query: {
              ...this.$route.query,
              page: this.$_paginatable_currentPage
            }
          });
        }
      }
    },

    $route: "onRouteChange"
  },

  computed: {
    ...vuex.mapState(["auth"]),

    $_paginatable_module() {
      return vuex.modules.ISSUE;
    },

    authSettingPerPage() {
      let { inbox_settings = null } = this.auth;
      let rowsPerPage = 10;

      if (inbox_settings) {
        inbox_settings = JSON.parse(inbox_settings);

        rowsPerPage = inbox_settings.rowsPerPage;
      }

      return rowsPerPage;
    }
  },

  methods: {
    async onSearch() {
      let response;

      try {
        // reset page
        this.$_vuexable_updatePagination(
          {
            key: "page",
            value: 1
          },
          vuex.modules.ISSUE
        );

        response = await this.$_issue_search_mixin_onSearchFilter();
      } catch (error) {
        this.dialog = true;

        throw error;
      }

      this.dialog = false;
    },

    async onSearchByKeyword() {
      let response;

      try {
        // reset page
        this.$_vuexable_updatePagination(
          {
            key: "page",
            value: 1
          },
          vuex.modules.ISSUE
        );

        response = await this.$_issue_search_mixin_onSearchByKeyword();
      } catch (error) {
        throw error;
      }
    },

    onClear() {
      this.$_issue_search_mixin_clearSearchKeyword();
      this.$_issue_search_mixin_clearSearchFilters();
    },

    async onRouteChange() {
      if (!this.$route.query.q) {
        console.log(5566);

        this.onClear();
        this.$_issue_search_mixin_clearState();
      }
    }
  },

  async mounted() {
    this.$_issue_search_mixin_searchComplaint = _.debounce(
      this.$_issue_search_mixin_searchComplaint,
      300
    );
    const {
      $_issue_search_mixin_searchFiltersVuex = [],
      issue_search_mixin_searchKeyword = ""
    } = this;

    if (
      $_issue_search_mixin_searchFiltersVuex.length ||
      issue_search_mixin_searchKeyword.length
    ) {
      let descending = true;

      if (this.$route.query.hasOwnProperty("descending")) {
        descending = this.$route.query.descending == "true";
      }

      // let isDescendingChange = descending !== this.$_paginatable_descending;

      this.$_paginatable_pagination = {
        sortBy: "updated_at",
        page: this.$route.query.page || 1,
        descending,
        rowsPerPage: this.authSettingPerPage
      };

      if ($_issue_search_mixin_searchFiltersVuex.length) {
        await this.$_issue_search_mixin_onSearchFilter();
      } else {
        await this.$_issue_search_mixin_onSearchByKeyword();
      }
      // await this.$_issue_search_mixin_searchComplaint();
    }
  }
};
</script>

<style lang="scss">
.search-filter-list {
  .v-list__tile {
    height: 56px;

    &__action {
      min-width: 25%;
      align-items: flex-end;
    }

    .v-input__slot {
      align-items: flex-end;
      margin-bottom: 0;
    }
  }
}

.clear-search {
  &__button {
    margin-right: -6px;
  }
}
</style>
