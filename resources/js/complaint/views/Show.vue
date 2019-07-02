<template>
  <v-layout row wrap>
    <v-flex xs12>
      <custom-toolbar
        v-if="activeComplaint"
        id="showComplaintToolbar"
        class="bb-1 pb-0"
        :items="items"
      ></custom-toolbar>
      <v-layout align-center justify-center class="loading__wrapper">
        <v-flex xs12>
          <transition name="slide-y-reverse-transition" appear>
            <v-progress-circular
              v-if="$_complaint_mixin_isFetchingShowComplaint || isUpdatingStatus"
              :size="70"
              :width="7"
              color="deep-orange"
              indeterminate
            ></v-progress-circular>
          </transition>
        </v-flex>
      </v-layout>
      <v-layout v-if="activeComplaint" class="content__wrapper" column>
        <v-flex xs12>
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
              @form:submitted="onNoteUpdated"
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
            @form:submitted="onNoteCreated"
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
            <span>Remark</span>
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
    <complaint-form
      v-if="hasEdittedComplaint && complaintDialog"
      :managable-module="vuex.modules.ISSUE"
      :managable-route-param="{ issue: editingComplaintId }"
      :managable-edit="hasEdittedComplaint"
      :full-screenable="false"
      :is-full-screen="true"
      @form:submitted="onComplaintUpdated"
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
    ComplaintNoteCard
  },
  data() {
    return {
      gobackTimer: null,
      alertable_messages: {
        update_status_success: {
          text: "Complaint Status was updated successfully",
          type: "success"
        },
        add_note_success: {
          text: "Note was created successfully",
          type: "success"
        },
        edit_note_success: {
          text: "Note was updated successfully",
          type: "success"
        },
        edit_complaint_success: {
          text: "Complaint was updated successfully",
          type: "success"
        },
        remove_complaint_fail: "Cannot delete complaint, please try again",
        remove_complaint_success: {
          text: "Complaint moved to Trash",
          actions: [
            {
              text: "Undo",
              handler: async ({ id }) => {
                this.gobackTimer = null;
                this.$_complaint_item_mixin_restoreComplaint({ id });
                this.$_alertable_alert("action_done");
              }
            }
          ]
        },
        delete_note_success: {
          text: "Remark was deleted successfully",
          actions: [
            {
              text: "Undo",
              handler: async ({ id }) => {
                this.$_issue_note_item_mixin_restoreIssueNote({ id });
                this.$_alertable_alert("action_done");
              }
            }
          ]
        },
        delete_note_fail: "Cannot delete note, please try again",
        action_done: "Action undone"
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
    items() {
      return [
        {
          icon: "arrow_back",
          text: "Back to Inbox",
          onClick: () => {
            this.$router.go(-1);
          }
        },
        {
          icon: "archive",
          text: "Archive",
          onClick: async () => {
            // archive complaint
            // go back
            this.$router.go(-1);
          }
        },
        {
          icon: "edit",
          text: "Edit",
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
          text: "Delete",
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
        },
        { spacer: true },
        {
          icon: "keyboard_arrow_left",
          text: "Newer",
          disabled: () => this.$_paginatable_isFirstPage,
          onClick: () => {
            this.$_paginatable_toPrevPage();
          }
        },
        {
          icon: "keyboard_arrow_right",
          text: "Older",
          disabled: () => this.$_paginatable_isLastPage,
          onClick: () => {
            this.$_paginatable_toNextPage();
          }
        },
        { icon: "settings", text: "Settings" }
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