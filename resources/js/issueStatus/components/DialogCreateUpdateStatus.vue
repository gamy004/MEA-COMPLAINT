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
              offset-x
              offset-y
              :close-on-content-click="false"
            >
              <template #activator="{ on: menu }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-avatar
                      v-on="{ ...tooltip, ...menu }"
                      :color="form.color"
                      size="36"
                      class="clickable elevation-2 ml-1 mt-2 mr-3"
                    ></v-avatar>
                  </template>
                  <span>Pick Status Color</span>
                </v-tooltip>
              </template>
              <chrome-picker :value="form.color" @input="updateColorValue" />
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
              <chrome-picker :value="form.color" @input="updateColorValue" />
            </v-flex>-->
          </v-layout>

          <v-layout column px-1>
            <v-switch
              v-model="track_status"
              color="indigo accent-2"
              label="ติดตามสถานะ"
              class="ml-1 mr-1"
            ></v-switch>

            <v-list v-if="track_status">
              <v-list-tile
                v-for="(time, configIndex) in form.configs"
                :key="`status-timing-${configIndex}`"
                class="v-list__tile-time"
                avatar
              >
                <v-list-tile-avatar>
                  <v-menu
                    origin="top right"
                    transition="slide-x-transition"
                    offset-x
                    offset-y
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on: menu }">
                      <v-tooltip top>
                        <template #activator="{ on: tooltip }">
                          <v-avatar
                            v-on="{ ...tooltip, ...menu }"
                            :color="form.configs[configIndex].color"
                            size="34"
                            class="clickable elevation-2"
                          ></v-avatar>
                        </template>
                        <span>Pick Status Color for Time No.{{ configIndex + 1 }}</span>
                      </v-tooltip>
                    </template>
                    <chrome-picker
                      :value="form.configs[configIndex].color"
                      @input="updateTimeColorValue($event, configIndex)"
                    />
                  </v-menu>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <!-- <v-list-tile-title>How long?</v-list-tile-title> -->
                  <v-layout>
                    <v-flex xs8 mr-1>
                      <v-text-field
                        v-model="form.configs[configIndex].duration"
                        type="number"
                        :min="1"
                        label="Duration"
                        placeholder="3"
                        color="deep-orange"
                        :error="form.errors.has(`configs.${configIndex}.duration`)"
                        :error-messages="form.errors.getError(`configs.${configIndex}.duration`)"
                        @input="form.errors.clear(`configs.${configIndex}.duration`)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4>
                      <v-select
                        v-model="form.configs[configIndex].unit"
                        :items="timeItems"
                        color="deep-orange"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <!-- <v-text-field
                    v-model="form.configs[configIndex].duration"
                    label="How long?"
                    height="24"
                    hide-details
                    :error="form.errors.has('time')"
                    :error-messages="form.errors.getError('time')"
                    @input="form.errors.clear('time')"
                  ></v-text-field>-->
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon @click="deleteConfig(configIndex)">
                    <v-icon color="blue-grey">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-btn
              v-if="track_status"
              outline
              color="deep-orange"
              block
              class="py-1"
              @click="addConfig"
            >
              <v-icon>add</v-icon>
              <span>Add Timing</span>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn flat @click="onCancel">Cancel</v-btn>
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

    <warning-dialog :dialogable-visible.sync="warn" @click:accept="onDiscard">
      <template v-slot:header>Discard draft?</template>

      <template v-slot:message>Your draft will be permanently deleted.</template>
    </warning-dialog>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import managable from "../../mixins/managable";
import { vuex } from "../../mixins/vuexable";
import issueStatusMixin from "../../mixins/issue-status-mixin";
import { Chrome } from "vue-color";
import WarningDialog from "../../components/WarningDialog";

export default {
  mixins: [dialogable, managable, issueStatusMixin],

  components: {
    ChromePicker: Chrome,
    WarningDialog
  },

  data() {
    return {
      warn: false,
      track_status: false,
      form: vuex.models.FORM.make({
        status: "",
        color: "#E0E0E0FF",
        default: false,
        configs: []
      }),

      timeItems: [
        { text: "minute", value: "minutes" },
        { text: "hour", value: "hours" },
        { text: "day", value: "days" },
        { text: "week", value: "weeks" },
        { text: "month", value: "months" },
        { text: "year", value: "years" } // values are moment.js key!!
      ]
    };
  },

  watch: {
    dialog(v) {
      if (v) {
        this.track_status = false;

        this.form = vuex.models.FORM.make({
          status: "",
          color: "#E0E0E0FF",
          default: false,
          configs: []
        });
      }
    },

    $_issue_status_mixin_edit: {
      deep: true,
      handler(edittedStatus) {
        if (edittedStatus) {
          const {
            id = null,
            status = "",
            color = "#E0E0E0FF",
            configs = []
          } = _.cloneDeep(edittedStatus);

          this.track_status = configs.length > 0;

          this.form.record({
            id,
            status,
            color,
            configs
          });
        }
      }
    }
  },

  methods: {
    onCancel() {
      if (this.form.isChanged) {
        this.warn = true;

        return;
      }

      this.closeForm();
    },

    closeForm() {
      this.dialog = false;
      this.$_issue_status_mixin_edit = null;
    },

    onDiscard() {
      this.warn = false;
      this.closeForm();
    },

    updateColorValue({ hex8 = "#E0E0E0FF" } = {}) {
      this.form.color = hex8;
    },

    updateTimeColorValue({ hex8 = "#E0E0E0FF" } = {}, configIndex) {
      const { configs = [] } = this.form;

      if (configs.length >= configIndex) {
        this.$set(configs[configIndex], "color", hex8);
      }

      this.form.configs = [...configs];
    },

    addConfig() {
      const { configs = [] } = this.form;

      configs.push({
        color: "#E0E0E0FF",
        duration: null,
        unit: "minutes"
      });

      this.form.configs = [...configs];
    },

    deleteConfig(configIndex) {
      const { configs = [] } = this.form;

      configs.splice(configIndex);

      this.form.configs = [...configs];
    },

    async onSubmit() {
      const { form } = this;

      let v;

      try {
        v = await this.$_managable_submitForm(form, [
          "status",
          "color",
          "default",
          "configs"
        ]);
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
      height: 72px;
    }
  }
}
</style>
