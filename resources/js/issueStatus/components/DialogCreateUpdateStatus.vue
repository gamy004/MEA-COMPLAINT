<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">{{ managableEdit ? "Update" : "New" }} Status</v-card-title>

      <v-card-text>
        <v-form>
          <v-layout>
            <v-menu
              origin="top right"
              transition="slide-x-transition"
              :close-on-content-click="false"
            >
              <template #activator="{ on: menu }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-avatar
                      v-on="{ ...tooltip, ...menu }"
                      :color="form.colors"
                      size="36"
                      class="clickable elevation-2 ml-1 mt-2 mr-3"
                    ></v-avatar>
                  </template>
                  <span>Pick Status Color</span>
                </v-tooltip>
              </template>
              <chrome-picker :value="form.colors" @input="updateColorValue" />
            </v-menu>

            <v-text-field
              v-model="form.status"
              label="Status"
              color="deep-orange"
              outline
              single-line
              height="16"
              :error="form.errors.has('status')"
              :error-messages="form.errors.getError('status')"
              @input="form.errors.clear('status')"
            ></v-text-field>

            <!-- <v-flex xs4>
              <chrome-picker :value="form.colors" @input="updateColorValue" />
            </v-flex>-->
          </v-layout>

          <v-layout column px-1>
            <v-switch
              v-model="form.track_status"
              color="blue-grey darken-2"
              label="Track this status"
              class="ml-1"
            ></v-switch>

            <v-list v-if="form.track_status">
              <v-list-tile
                v-for="(time, timeIndex) in form.times"
                :key="`status-timing-${timeIndex}`"
                class="v-list__tile-time"
                avatar
              >
                <v-list-tile-avatar>
                  <v-menu
                    origin="top right"
                    transition="slide-x-transition"
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on: menu }">
                      <v-tooltip top>
                        <template #activator="{ on: tooltip }">
                          <v-avatar
                            v-on="{ ...tooltip, ...menu }"
                            :color="form.times[timeIndex].colors"
                            size="34"
                            class="clickable elevation-2"
                          ></v-avatar>
                        </template>
                        <span>Pick Status Color for Time No.{{ timeIndex + 1 }}</span>
                      </v-tooltip>
                    </template>
                    <chrome-picker
                      :value="form.times[timeIndex].colors"
                      @input="updateTimeColorValue($event, timeIndex)"
                    />
                  </v-menu>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <!-- <v-list-tile-title>How long?</v-list-tile-title> -->
                  <v-layout>
                    <v-flex xs8>
                      <v-text-field
                        v-model="form.times[timeIndex].duration"
                        label="How long?"
                        placeholder="3"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4>
                      <v-select
                        v-model="form.times[timeIndex].unit"
                        :items="['minute', 'hour', 'day', 'week', 'month', 'year']"
                        label="Solo field"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <!-- <v-text-field
                    v-model="form.times[timeIndex].duration"
                    label="How long?"
                    height="24"
                    hide-details
                    :error="form.errors.has('time')"
                    :error-messages="form.errors.getError('time')"
                    @input="form.errors.clear('time')"
                  ></v-text-field>-->
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon color="blue-grey">delete</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-btn
              v-if="form.track_status"
              outline
              color="deep-orange"
              block
              class="py-1"
              @click="addTime"
            >
              <v-icon>add</v-icon>
              <span>Add Timing</span>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn flat @click="closeForm">Cancel</v-btn>
        <v-btn
          color="deep-orange"
          depressed
          class="mr-2 rounded-sm"
          dark
          :loading="form.isSubmitting"
          @click.prevent.stop="onSubmit"
        >{{ $_managable_actionButton }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import managable from "../../mixins/managable";
import { vuex } from "../../mixins/vuexable";
import issueStatusMixin from "../../mixins/issue-status-mixin";
import { Chrome } from "vue-color";

export default {
  mixins: [dialogable, managable, issueStatusMixin],

  components: {
    ChromePicker: Chrome
  },

  data() {
    return {
      form: vuex.models.FORM.make({
        status: "",
        colors: "#304FFE",
        track_status: false,
        times: []
      })
    };
  },

  watch: {
    dialog(v) {
      if (v) {
        this.form.reset();
      }
    },

    $_issue_status_mixin_edit: {
      deep: true,
      handler({ id = null, status = "" } = {}) {
        this.form.record({ id, status });
      }
    }
  },

  methods: {
    closeForm() {
      this.dialog = false;
      this.$_issue_status_mixin_edit = null;
    },

    updateColorValue({ hex8 = "#FFFFFFFF" } = {}) {
      this.form.colors = hex8;
    },

    updateTimeColorValue({ hex8 = "#FFFFFFFF" } = {}, timeIndex) {
      const { times = [] } = this.form;

      if (times.length >= timeIndex) {
        this.$set(times[timeIndex], "colors", hex8);
      }

      this.form.times = [...times];
    },

    addTime() {
      const { times = [] } = this.form;

      times.push({
        colors: "#FFFFFFFF",
        duration: null,
        unit: "day"
      });

      this.form.times = [...times];
    },

    async onSubmit() {
      const { form } = this;

      let v;

      try {
        v = await this.$_managable_submitForm(form, ["status"]);
      } catch (error) {
        throw error;
      }

      this.closeForm();
    }
  }
};
</script>

<style lang="scss">
.v-list__tile {
  &-time {
    .v-list__tile {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>

