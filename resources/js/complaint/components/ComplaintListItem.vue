<template>
  <v-hover>
    <v-list-tile
      slot-scope="{ hover }"
      class="complaint-list__item clickable"
      :class="getItemCLasses(hover)"
      @click.prevent.stop="onClick"
    >
      <!-- <v-list-tile-action class="complaint-list__action" :class="isMobileClasses">
        <v-avatar color="indigo accent-3" size="10" class="status-indicator"></v-avatar>
      </v-list-tile-action>-->

      <v-list-tile-action v-if="!cannotSee" class="complaint-list__action" :class="isMobileClasses">
        <!-- action selected -->
        <div @click.prevent.stop>
          <v-checkbox v-model="itemSelected" color="deep-orange" hide-details></v-checkbox>
        </div>
      </v-list-tile-action>

      <!-- <v-list-tile-action class="complaint-list__action" :class="isMobileClasses">
        <v-btn icon @click.prevent.stop="item.markStarred()">
          <v-icon
            :color="item.starred ? 'deep-orange' : 'grey lignten-2'"
          >{{ item.starred ? 'star' : 'star_border' }}</v-icon>
        </v-btn>
      </v-list-tile-action>-->

      <v-list-tile-content class="complaint-list__content" :class="isMobileClasses">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-list-tile-sub-title
              v-on="on"
              class="complaint-list__sender font-weight-bold"
              :class="isMobileClasses"
              v-text="issuerName"
            ></v-list-tile-sub-title>
          </template>
          <span v-text="issuerName"></span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-list-tile-sub-title
              v-on="on"
              class="complaint-list__title font-weight-bold"
              :class="isMobileClasses"
              v-text="title"
            ></v-list-tile-sub-title>
          </template>
          <span v-html="title"></span>
        </v-tooltip>

        <v-chip v-if="!isMobile && category" small>
          <span>{{ categoryName }}</span>
        </v-chip>

        <v-chip
          v-if="!isMobile && status"
          class="complaint-list__status"
          small
          :color="itemStatusColor"
          :style="statusStyles"
        >{{ item.currentStatus }}</v-chip>

        <v-layout v-if="isMobile">
          <v-chip v-if="category" small>
            <span>{{ categoryName }}</span>
          </v-chip>

          <v-chip
            v-if="status"
            class="complaint-list__status"
            small
            :color="itemStatusColor"
            :style="statusStyles"
            dark
          >{{ item.currentStatus }}</v-chip>
        </v-layout>

        <!-- Merge line on desktop and tablet -->
        <v-list-tile-sub-title
          v-if="!isMobile"
          class="complaint-list__sub-title"
          :class="isMobileClasses"
          v-html="item.topic"
        ></v-list-tile-sub-title>

        <!-- Seperate line on mobile -->
        <v-list-tile-sub-title
          v-if="isMobile"
          class="complaint-list__title font-weight-bold"
          :class="isMobileClasses"
          v-text="item.subject"
        ></v-list-tile-sub-title>

        <v-list-tile-sub-title
          v-if="isMobile"
          class="complaint-list__sub-title"
          :class="isMobileClasses"
          v-html="item.description"
        ></v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action
        v-if="hover || selectingStatus"
        class="complaint-list__action-right complaint-list__action-right--hover"
        :class="isMobileClasses"
      >
        <v-tooltip v-if="canRestore" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onRestoreItem" class="mr-2">
              <v-icon color="grey darken-1">history</v-icon>
            </v-btn>
          </template>
          <span v-t="'general.restore'"></span>
        </v-tooltip>

        <v-tooltip v-if="canArchive" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onArchiveItem" class="mr-2">
              <v-icon color="grey darken-1">archive</v-icon>
            </v-btn>
          </template>
          <span v-t="'general.archive'"></span>
        </v-tooltip>

        <v-menu
          v-if="canChangeStatus"
          :min-width="200"
          offset-y
          origin="top right"
          nudge-left="150"
          @update:returnValue="selectingStatus = false"
        >
          <template #activator="{ on: menu }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn
                  v-on="{ ...tooltip, ...menu }"
                  icon
                  class="mr-2"
                  @click.prevent.stop="onClickChangeStatus(menu)"
                >
                  <v-icon color="grey darken-1">mdi-update</v-icon>
                </v-btn>
              </template>
              <span v-t="'general.changeStatus'"></span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in statusesItems"
              :key="index"
              :disabled="item.disabled()"
              @click.prevent.stop="item.onClick ? item.onClick(item, index) : () => {}"
            >
              <v-list-tile-title>
                <!-- <v-avatar
                                    :color="item.color"
                                    size="12"
                                    class="status-indicator mr-1"
                ></v-avatar>-->

                <span>{{ item.status }}</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn v-on="{ ...tooltip, ...menu }" icon @click.prevent.stop="item.archive()" class="mr-2">
              <v-icon color="grey darken-1">mdi-update</v-icon>
            </v-btn>
          </template>
          <span>Change Status</span>
        </v-tooltip>-->

        <v-tooltip v-if="canEdit" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onEditItem" class="mr-2">
              <v-icon color="grey darken-1">edit</v-icon>
            </v-btn>
          </template>
          <span v-t="'general.edit'"></span>
        </v-tooltip>

        <v-tooltip v-if="canSoftDelete" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onDeleteItem">
              <v-icon color="grey darken-1">delete</v-icon>
            </v-btn>
          </template>
          <span v-t="'general.delete'"></span>
        </v-tooltip>

        <v-tooltip v-if="canHardDelete" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onForceDeleteItem">
              <v-icon color="grey darken-1">delete</v-icon>
            </v-btn>
          </template>
          <span v-t="'general.forceDelete'"></span>
        </v-tooltip>
      </v-list-tile-action>

      <v-list-tile-action v-else class="complaint-list__action-right" :class="isMobileClasses">
        <v-list-tile-sub-title
          class="complaint-list__action-right-content font-weight-bold"
          v-text="item.shortUpdatedAt"
        ></v-list-tile-sub-title>
      </v-list-tile-action>
    </v-list-tile>
  </v-hover>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";
import issueStatusMixin from "../../mixins/issue-status-mixin";
import { views } from "../../constants";
import { getCorrectTextColor } from "../../helpers";

export default {
  props: {
    item: {
      type: vuex.models.ISSUE,
      required: true
    }
  },

  mixins: [issueStatusMixin, vuexable],

  data() {
    return {
      selectingStatus: false,
      itemStatusColor: "#E0E0E0FF",
      statusStyles: {
        color: getCorrectTextColor("#E0E0E0FF")
      }
    };
  },

  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(item) {
        this.itemStatusColor = item.statusColor;
        this.statusStyles = {
          color: getCorrectTextColor(this.itemStatusColor)
        };
      }
    }
  },

  computed: {
    ...vuex.mapState(["auth"]),

    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    title() {
      const { joinedRecipientName = "" } = this.item;
      return joinedRecipientName.length
        ? joinedRecipientName
        : this.$t("general.anonymousRecipient");
    },

    issuer() {
      return this.$_vuexable_getByKey(this.item.issued_by, vuex.modules.GROUP);
    },

    drafted() {
      const { draft = 1 } = this.item;

      return draft !== 0;
    },

    archived() {
      const { archive = 0 } = this.item;

      return archive !== 0;
    },

    trashed() {
      const { deleted_at = null } = this.item;

      return deleted_at !== null;
    },

    category() {
      return this.$_vuexable_getByKey(
        this.item.issue_category_id,
        vuex.modules.ISSUE_CATEGORY
      );
    },

    status() {
      return this.$_vuexable_getByKey(
        this.item.issue_status_id,
        vuex.modules.ISSUE_STATUS
      );
    },

    issuerName() {
      return this.issuer ? this.issuer.name : this.$t("general.admin");
    },

    categoryName() {
      return this.category
        ? this.category.category
        : this.$t("general.anonymous");
    },

    itemSelected: {
      get() {
        // const { selected = false } = this.item;

        // return selected;

        return this.$_vuexable_getStateAttr(
          "selected",
          this.item.id,
          vuex.modules.ISSUE
        );
      },

      set(value) {
        // this.item.update("selected", value);
        this.$_vuexable_updateState(
          {
            key: "selected",
            attr: this.item.id,
            value
          },
          vuex.modules.ISSUE
        );
      }
    },

    statusesItems() {
      return this.$_issue_status_mixin_makeStatusMenuItems(
        this.item,
        (issue, status) => {
          this.selectingStatus = false;
          this.$emit("update:status-success", this.item);
          // this.itemStatusColor = this.item.statusColor;
          // this.statusStyles = {
          //   color: getCorrectTextColor(this.itemStatusColor)
          // };
        },
        (issue, error) => {
          this.$emit("update:status-error", this.item);
          // this.itemStatusColor = this.item.statusColor;
          // this.statusStyles = {
          //   color: getCorrectTextColor(this.itemStatusColor)
          // };
        }
      );
    },

    cannotSee() {
      return this.item.draft || this.item.deleted_at !== null;
    },

    canManage() {
      return this.item.canManage(this.auth);
    },

    canEdit() {
      return this.item.canEdit(this.auth);
    },

    canSoftDelete() {
      return this.item.canSoftDelete(this.auth);
    },

    canHardDelete() {
      return this.item.canHardDelete(this.auth);
    },

    canChangeStatus() {
      return this.item.canChangeStatus(this.auth);
    },

    canArchive() {
      return this.item.canArchive(this.auth);
    },

    canRestore() {
      return this.item.canRestore(this.auth);
    },

    // statusStyles() {
    //   return {
    //     color: getCorrectTextColor(this.item.statusColor)
    //   };
    // }
  },

  methods: {
    getItemCLasses(hover) {
      return {
        "elevation-2": hover
      };
    },

    onRestoreItem() {
      this.$emit("restore", this.item);
    },

    onArchiveItem() {
      this.$emit("archive", this.item);
    },

    onEditItem() {
      this.$emit("edit", this.item);
    },

    onDeleteItem() {
      this.$emit("delete", this.item);
    },

    onForceDeleteItem() {
      this.$emit("forceDelete", this.item);
    },

    onClick() {
      if (this.cannotSee) return;

      this.$router.push({
        name: views.ISSUE.SHOW,
        params: {
          issue: this.item.id
        }
      });
    },

    onClickChangeStatus(menu) {
      this.selectingStatus = true;
    }
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

    &.is-mobile {
      align-items: flex-start;
    }

    .status-indicator {
      margin-top: 4px;
      margin-left: 4px;
    }
  }

  &__content {
    justify-content: flex-start;

    &.is-mobile {
      flex-direction: column;
    }
  }

  &__action-right {
    justify-content: flex-end;

    &.is-mobile {
      flex-direction: row;
    }
  }

  &__content,
  &__action-right {
    flex-direction: row;
    align-items: center;

    &.is-mobile {
      align-items: flex-start;
    }
  }

  &__title,
  &__action-right-content {
    color: #333 !important;
  }

  &__action-right {
    min-width: 75px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 16px;

    &.is-mobile {
      min-width: auto;
      justify-content: flex-start;
    }

    &--hover {
      background: #f5f5f5;
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 16px;
      padding-right: 8px;
      padding-top: 8px;
    }
  }

  &__action-right-content {
    width: auto;
    margin-left: 16px;
  }

  &__sender {
    max-width: 100px;

    &.is-mobile {
      max-width: fit-content;
    }
  }

  &__title {
    max-width: 168px;
    min-width: 125px;
    padding-right: 32px;

    &.is-mobile {
      max-width: fit-content;
    }
  }

  &__status {
    margin-right: 12px;
  }
}
</style>
