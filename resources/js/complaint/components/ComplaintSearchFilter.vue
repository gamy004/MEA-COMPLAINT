<template>
  <v-menu
    v-model="dialog"
    :close-on-content-click="false"
    offset-y
    :nudge-left="550"
    :nudge-width="550"
  >
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...menu, ...tooltip }" icon>
            <v-icon :color="filtered ? 'deep-orange' : 'grey darken-2'">mdi-filter</v-icon>
          </v-btn>
        </template>
        <span>Show filter options</span>
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
            v-model="form.from"
            :items="storeRecipients"
            small-chips
            cache-items
            :loading="isFetchingFormRecipient"
            full-width
            hide-details
            hide-no-data
            multiple
            single-line
            color="deep-orange"
            @focus="fetchRecipient"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 3">
                <span>{{ item.text }}</span>
              </v-chip>
              <span
                v-if="index === 3"
                class="grey--text caption"
              >(+{{ form.from.length - 3 }} others)</span>
            </template>
          </v-autocomplete>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <span class="mr-3 body-2">To</span>
          </v-list-tile-action>

          <v-autocomplete
            class="search-complaint-form__input-recipient bdb-1"
            v-model="form.to"
            :items="storeRecipients"
            small-chips
            cache-items
            :loading="isFetchingFormRecipient"
            full-width
            hide-details
            hide-no-data
            multiple
            single-line
            color="deep-orange"
            @focus="fetchRecipient"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 3">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 3" class="grey--text caption">(+{{ form.to.length - 3 }} others)</span>
            </template>
          </v-autocomplete>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <span class="mr-3 body-2">Subject</span>
          </v-list-tile-action>

          <v-text-field
            v-model="form.subject"
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
            v-model="form.include_words"
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
            v-model="form.exclude_words"
            class="bdb-1"
            single-line
            full-width
            hide-details
            color="deep-orange"
          ></v-text-field>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <span class="mr-3 body-2">{{ textFieldLabel }}</span>
          </v-list-tile-action>

          <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="form.dates"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.dates"
                class="mt-3"
                append-icon="event"
                color="deep-orange"
                readonly
                v-on="on"
              >
                <template #append>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon @click="onSwitchDateType">
                        <v-icon color="grey darken-2">{{ calendarIcon }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ calendarTooltip }}</span>
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
              <v-btn flat color="deep-orange" @click="dateMenu = false">Cancel</v-btn>
              <v-btn
                flat
                color="deep-orange"
                :loading="isSearchingComplaint"
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
        <v-btn color="deep-orange" :loading="isSearchingComplaint" flat @click="onSearch">Search</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import { vuex, vuexable } from "../../mixins/vuexable";
import {
  mapTextValue,
  filterContains,
  filterIn,
  filterNotIn,
  filterNotContains
} from "../../helpers";
import IssueReportMixin from "../../mixins/issue-report-mixin";

export default {
  mixins: [dialogable, vuexable, IssueReportMixin],

  data() {
    return {
      filtered: false,
      message: false,
      hints: false,
      fav: true,
      dateMenu: false,
      form: vuex.models.FORM.make({
        from: [],
        to: [],
        subject: "",
        include_words: "",
        exclude_words: "",
        dates: [],
        categories: [],
        statuses: [],
        has_attachment: false
      })
    };
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isFetchingFormRecipient: "fetching form recipients",
      isFetchingFormCategory: "fetching form categories",
      isSearchingComplaint: [vuex.actions.ISSUE.SEARCH]
    }),

    storeRecipients() {
      const recipients = this.$_vuexable_getter(
        vuex.getters.SORTED_VALUES,
        vuex.modules.GROUP
      );

      return mapTextValue(recipients, "name", "id");
    },

    calendarIcon() {
      return this.$_issue_report_mixin_reportType === "date"
        ? "mdi-calendar-month"
        : "mdi-calendar-today";
    },

    calendarTooltip() {
      return `Switch to select by ${
        this.$_issue_report_mixin_reportType === "date" ? "month" : "date"
      }`;
    },

    textFieldLabel() {
      return _.capitalize(this.$_issue_report_mixin_reportType);
    },

    textFieldKey() {
      let base = "textField";

      if (this.$_issue_report_mixin_reportType) {
        base += `--${this.$_issue_report_mixin_reportType}`;
      }

      return base;
    }
  },
  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [vuex.actions.ISSUE.SEARCH]),

    ...vuex.mapWaitingActions(vuex.modules.GROUP, {
      [vuex.actions.GROUP.FETCH]: "fetching form recipients"
    }),

    ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
      [vuex.actions.ISSUE_CATEGORY.FETCH]: "fetching form categories"
    }),

    onSwitchDateType() {
      this.$_issue_report_mixin_switchType();

      this.dateMenu = false;

      setTimeout(() => {
        this.dateMenu = true;
      }, 200);
    },

    async fetchRecipient() {
      let response,
        filters = {},
        select = ["groups:id,name"],
        sort = ["name"];

      try {
        response = await this[vuex.actions.GROUP.FETCH]({
          filters,
          select,
          sort
        });
      } catch (error) {}
    },

    async onSearch() {
      const filters = [];

      if (this.form.from.length) {
        filters.push(filterIn("issued_by", this.form.from));
      }

      if (this.form.to.length) {
        this.form.to.forEach(recipient => {
          filters.push(filterContains("recipient_ids", recipient));
        });
        // filters.push(filterIn("recipients", this.form.to));
      }

      if (this.form.subject.length) {
        const subject_words = this.form.subject.split(/[\s,=:./-]/);

        subject_words.forEach(word => {
          filters.push(filterContains("subject", word));
        });
      }

      if (this.form.include_words.length) {
        const include_words = this.form.include_words.split(/[\s,=:./-]/);

        include_words.forEach(word => {
          filters.push(filterContains("description", word));
        });
      }

      if (this.form.exclude_words.length) {
        const exclude_words = this.form.exclude_words.split(/[\s,=:./-]/);

        exclude_words.forEach(word => {
          filters.push(filterNotContains("description", word));
        });
      }

      if (this.form.dates.length) {
        this.form.dates.forEach(date => {
          filters.push(filterContains("created_at", date));
        });
      }

      if (!filters.length) {
        this.$emit("alert:invalidSearchForm");
      }

      try {
        await this[vuex.actions.ISSUE.SEARCH]({
          filter_groups: [{ filters }]
        });
      } catch (error) {
        this.$emit("alert:searchError");
        this.dialog = true;
      }

      this.dialog = false;
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
</style>
