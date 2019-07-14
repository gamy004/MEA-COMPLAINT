<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout v-if="activeComplaint">
        <custom-toolbar class="bb-1 pb-0" :items="itemsLeft"></custom-toolbar>
        <!-- <v-menu min-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <complaint-status :issue-id="activeComplaint.id" />
            </v-btn>
          </template>

          <v-list dense>
            <v-list-tile
              v-for="(menuItem, menuIndex) in statusesItems"
              :key="`menuItem--${menuIndex}`"
              :disabled="menuItem.disabled()"
              @click="menuItem.onClick"
            >
              <v-list-tile-title class="pl-4">{{ menuItem.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>-->
        <v-spacer></v-spacer>
        <custom-toolbar class="bb-1 pb-0 align-right" :items="itemsRight"></custom-toolbar>
      </v-layout>

      <v-layout class="content__wrapper" column>
        <transition name="fade-transition" appear>
          <v-progress-linear
            v-if="$_complaint_mixin_isFetchingShowComplaint || isUpdatingStatus"
            :size="70"
            :width="7"
            color="deep-orange"
            indeterminate
          ></v-progress-linear>
        </transition>

        <v-flex v-if="activeComplaint" xs12>
          <!-- <transition-group name="slide-y-reverse-transition" appear> -->
          <complaint-detail-card
            v-if="!$_complaint_mixin_isFetchingShowComplaint"
            key="complaintDetailCard"
            :issue-id="activeComplaint.id"
            class="pl-5 pr-4"
          />
          <!-- </transition-group> -->
          <!-- <transition-group name="slide-y-reverse-transition" appear mode="out-in"> -->
          <v-progress-linear
            v-if="$_issue_note_mixin_isFetchingNote"
            key="loadingComplaintNotes"
            :indeterminate="true"
            color="deep-orange"
          ></v-progress-linear>
          <template v-else v-for="(note, noteIndex) in $_issue_note_mixin_complaintNotes">
            <v-divider :key="`divider-note-${noteIndex}`" class="mt-1"></v-divider>

            <complaint-note-card
              :key="`issueNoteCard-${activeComplaint.id}__${note.id}`"
              :issue-id="activeComplaint.id"
              :note-id="note.id"
              :delay="noteIndex * 100"
              :managable-module="vuex.modules.ISSUE_NOTE"
              :managable-route-param="{ issue_note: note.id }"
              :managable-edit="$_issue_note_mixin_isEditingNote(note)"
              @updated="onNoteUpdated"
              @delete="onNoteDeleted"
              class="pl-5 pr-4"
            />
          </template>

          <complaint-note-card
            key="issueNoteCardForm"
            v-if="$_issue_note_mixin_issueNoteDialog"
            :issue-id="activeComplaint.id"
            :managable-module="vuex.modules.ISSUE_NOTE"
            :managable-route-param="{}"
            :managable-edit="false"
            :created-by="auth.group_id"
            @updated="onNoteCreated"
            @remove="$_issue_note_mixin_setDialog(false)"
            class="pl-5 pr-4"
          />

          <v-btn
            v-if="!$_issue_note_mixin_issueNoteDialog"
            key="btnAddRemark"
            color="light"
            @click="$_issue_note_mixin_setDialog(true)"
            class="mt-3 btn-add-remark"
          >
            <v-icon class="mr-1">reply</v-icon>
            <span v-t="'complaint.show.remarkBtn'"></span>
          </v-btn>
          <!-- </transition-group> -->
        </v-flex>
      </v-layout>
      <!-- <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(tab, tabIndex) in tabs"
          :key="`tabItem-${tabIndex}`"
          :value="`tab-${tabIndex}`"
        >
          <complaint-list :type="tab.type" :active="isTabActive(`tab-${tabIndex}`)"></complaint-list>
        </v-tab-item>
      </v-tabs-items>-->
    </v-flex>

    <v-navigation-drawer
      v-model="showStatusLogs"
      clipped
      right
      class="pl-4"
      :class="{ 'elevation-3': showStatusLogs }"
      app
      :width="375"
    >
      <v-list dense>
        <v-subheader v-t="'complaint.show.statusHistory.title'"></v-subheader>

        <!-- <template v-for="(item, i) in items"> -->
        <!-- <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex :class="item.route ? 'xs6' : 'xs12'">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex v-if="item.route" xs6 class="text-xs-right">
              <v-btn small flat @click="gotoPage(item.route)">edit</v-btn>
            </v-flex>
        </v-layout>-->
        <!-- <v-list-tile :key="`status-${i}`">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>-->

        <!-- </template> -->

        <v-timeline align-top dense>
          <template v-for="(log, logIndex) in $_complaint_item_mixin_complaintLogs">
            <status-log-item
              :key="`log-${logIndex}`"
              :item="log"
              :issue-id="$_complaint_item_mixin_complaint.id"
            />
          </template>
        </v-timeline>
      </v-list>
    </v-navigation-drawer>

    <complaint-form
      v-if="hasEdittedComplaint && complaintDialog"
      :managable-module="vuex.modules.ISSUE"
      :managable-route-param="{ issue: editingComplaintId }"
      :managable-edit="hasEdittedComplaint"
      :full-screenable="false"
      :is-full-screen="true"
      @form:updated="onComplaintUpdated"
    />

    <message-alert
      key="alertComplaintShow"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
      :alertable-timeout="5000"
    ></message-alert>
  </v-layout>
</template>
<script>
import { vuex } from "../../mixins/vuexable";
import alertable from "../../mixins/alertable";
import issueNoteMixin from "../../mixins/issue-note-mixin";
import CustomToolbar from "../../components/CustomToolbar";
import MessageAlert from "../../components/MessageAlert";
import ComplaintForm from "../components/ComplaintForm";
import complaintMixin from "../../mixins/complaint-mixin";
import ComplaintStatus from "../components/ComplaintStatus";
import ComplaintDetailCard from "../components/ComplaintDetailCard";
import ComplaintNoteCard from "../components/ComplaintNoteCard";
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import issueNoteItemMixin from "../../mixins/issue-note-item-mixin";
import issueStatusMixin from "../../mixins/issue-status-mixin";
import StatusLogItem from "../components/StatusLogItem";

export default {
  mixins: [
    alertable,
    complaintMixin,
    complaintItemMixin,
    issueNoteMixin,
    issueNoteItemMixin,
    issueStatusMixin
  ],
  components: {
    CustomToolbar,
    MessageAlert,
    ComplaintForm,
    ComplaintDetailCard,
    ComplaintNoteCard,
    StatusLogItem
  },
  data() {
    return {
      gobackTimer: null,
      showStatusLogs: false,
      alertable_messages: {
        update_status_success: {
          text: this.$t("alertMessages.complaintStatus.update_success"),
          type: "success"
        },
        update_status_error: {
          text: this.$t("alertMessages.complaintStatus.update_error"),
          type: "error"
        },
        add_note_success: {
          text: this.$t("alertMessages.complaintNote.create_success"),
          type: "success"
        },
        edit_note_success: {
          text: this.$t("alertMessages.complaintNote.update_success"),
          type: "success"
        },
        edit_complaint_success: {
          text: this.$t("alertMessages.complaintForm.update_success"),
          type: "success"
        },
        remove_complaint_fail: this.$t(
          "alertMessages.complaintForm.delete_error"
        ),
        remove_complaint_success: {
          text: this.$t("alertMessages.complaintForm.delete_success"),
          actions: [
            {
              text: this.$t("general.undo"),
              handler: async ({ id, archive = 0, deleted_at = null } = {}) => {
                clearTimeout(this.gobackTimer);
                await this.$_complaint_item_mixin_restoreComplaint({ id });
                // if (archive) {
                //   await this.$_complaint_item_mixin_onArchiveComplaint({ id });
                // } else if (deleted_at !== null) {
                //   await this.$_complaint_item_mixin_onDeleteComplaint({ id });
                // } else {
                //   await this.$_complaint_item_mixin_restoreComplaint({ id });
                // }

                this.$_alertable_alert("action_done");
              }
            }
          ]
        },
        archive_complaint_fail: this.$t(
          "alertMessages.complaintForm.archive_error"
        ),
        archive_complaint_success: {
          text: this.$t("alertMessages.complaintForm.archive_success"),
          actions: [
            {
              text: this.$t("general.undo"),
              handler: async ({ id }) => {
                clearTimeout(this.gobackTimer);
                await this.$_complaint_item_mixin_restoreComplaint({ id });
                this.$_alertable_alert("action_done");
              }
            }
          ]
        },
        delete_note_success: {
          text: this.$t("alertMessages.complaintNote.delete_success"),
          actions: [
            {
              text: this.$t("general.undo"),
              handler: async ({ id }) => {
                await this.$_issue_note_item_mixin_restoreIssueNote({ id });
                this.$_alertable_alert("action_done");
              }
            }
          ]
        },
        delete_note_fail: this.$t("alertMessages.complaintNote.delete_error"),
        action_done: this.$t("alertMessages.undo")
      }
    };
  },
  watch: {
    activeComplaintId: {
      immediate: true,
      async handler(v = null) {
        if (v) {
          this[vuex.actions.ISSUE.SHOW](v);
          this[vuex.actions.ISSUE_NOTE.FETCH]({
            filters: { issue_id: v }
          });
        }
      }
    }
  },
  computed: {
    ...vuex.mapState(["auth"]),

    ...vuex.mapWaitingGetters({
      isUpdatingStatus: "updating complaint status"
    }),
    itemsLeft() {
      return [
        {
          icon: "arrow_back",
          text: this.$t("complaint.show.toolbar.back"),
          onClick: () => {
            this.$router.go(-1);
          }
        },
        {
          icon: "archive",
          text: this.$t("general.archive"),
          onClick: async () => {
            // archive complaint
            // go back

            try {
              const { id } = this.$_complaint_item_mixin_complaint;

              this.$_complaint_item_mixin_onArchiveComplaint(
                this.$_complaint_item_mixin_complaint
              );

              this.$_alertable_alert("archive_complaint_success", {
                id
              });
            } catch (error) {
              this.$_alertable_alert("archive_complaint_fail");
            }

            this.gobackTimer = setTimeout(() => {
              this.$router.go(-1);
            }, 5000);
          }
        },
        {
          icon: "edit",
          text: this.$t("general.edit"),
          onClick: async () => {
            // delete complaint
            // go back
            this.$_complaint_item_mixin_onEditComplaint(
              this.$_complaint_item_mixin_complaint
            );
          }
        },
        {
          icon: "delete",
          text: this.$t("general.delete"),
          onClick: async () => {
            // delete complaint
            try {
              const { id } = this.$_complaint_item_mixin_complaint;

              await this.$_complaint_item_mixin_onDeleteComplaint(
                this.$_complaint_item_mixin_complaint
              );

              this.$_alertable_alert("remove_complaint_success", {
                id
              });
            } catch (error) {
              this.$_alertable_alert("remove_complaint_fail");
            }
            // go back
            this.gobackTimer = setTimeout(() => {
              this.$router.go(-1);
            }, 5000);
          }
        },
        { divider: true },
        {
          menu: true,
          component: () => ComplaintStatus,
          componentProps: () => {
            return {
              statusId: this.$_complaint_item_mixin_complaint
                ? this.$_complaint_item_mixin_complaint.issue_status_id
                : null
            };
          },
          menuItems: this.statusesItems
        }
      ];
    },

    itemsRight() {
      return [
        // {
        //   icon: "keyboard_arrow_left",
        //   text: "Newer",
        //   disabled: () => this.$_paginatable_isFirstPage,
        //   onClick: () => {
        //     this.$_paginatable_toPrevPage();
        //   }
        // },
        // {
        //   icon: "keyboard_arrow_right",
        //   text: "Older",
        //   disabled: () => this.$_paginatable_isLastPage,
        //   onClick: () => {
        //     this.$_paginatable_toNextPage();
        //   }
        // },
        // { icon: "settings", text: "Settings" }
        {
          icon: "history",
          text: this.$t("complaint.show.toolbar.showStatusHistory"),
          disabled: () => {
            const { logs = [] } = this.$_complaint_item_mixin_complaint;
            return !logs.length;
          },
          onClick: () => (this.showStatusLogs = !this.showStatusLogs)
        }
      ];
    },
    // statuses() {
    //   return this.$_vuexable_getSortedValues(vuex.modules.ISSUE_STATUS);
    // },
    statusesItems() {
      return this.$_issue_status_mixin_makeStatusMenuItems(
        this.activeComplaint,
        (issue, status) => {
          this.$_alertable_alert("update_status_success");
        },
        (issue, error) => {
          this.$_alertable_alert("update_status_error");
        }
      );
    }
  },
  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
      [vuex.actions.UPDATE]: "updating complaint status"
    }),

    onNoteCreated() {
      this.$_alertable_alert("add_note_success");
      this.$_issue_note_mixin_setDialog(false);
    },

    onNoteUpdated() {
      this.$_alertable_alert("edit_note_success");
      this.$_issue_note_mixin_setEdit(null);
      this.$_issue_note_mixin_setDialog(false);
    },

    async onNoteDeleted({ id }) {
      try {
        await this.$_issue_note_item_mixin_onDeleteIssueNote({ id });

        this.$_alertable_alert("delete_note_success", { id });
      } catch (error) {
        this.$_alertable_alert("delete_note_fail");
      }
    },

    onComplaintUpdated() {
      this.$_alertable_alert("edit_complaint_success");
      this.$_complaint_mixin_setEdit(null);
      this.$_complaint_mixin_setDialog(false);
    }
  },

  created() {
    this.$_issue_status_mixin_fetchStatuses();
  }
};
</script>
<style lang="scss" scoped>
.content {
  &__wrapper {
    height: calc(100% - 30px);
    overflow: auto;
    background: white;
  }
}

.btn-add-remark {
  margin-left: 4.5rem;
}
</style>