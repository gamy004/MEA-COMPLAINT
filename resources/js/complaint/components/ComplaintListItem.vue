<template>
  <v-hover>
    <v-list-tile
      slot-scope="{ hover }"
      class="complaint-list__item clickable"
      :class="getItemCLasses(hover)"
      @click.prevent.stop="onClick"
    >
      <v-list-tile-action class="complaint-list__action" :class="isMobileClasses">
        <v-avatar color="indigo accent-3" size="10" class="status-indicator"></v-avatar>
      </v-list-tile-action>

      <v-list-tile-action class="complaint-list__action" :class="isMobileClasses">
        <!-- action selected -->
        <div @click.prevent.stop>
          <v-checkbox v-model="itemSelected" color="deep-orange" hide-details></v-checkbox>
        </div>
      </v-list-tile-action>

      <v-list-tile-action class="complaint-list__action" :class="isMobileClasses">
        <!-- action starred -->
        <v-btn icon @click.prevent.stop="item.markStarred()">
          <v-icon
            :color="item.starred ? 'deep-orange' : 'grey lignten-2'"
          >{{ item.starred ? 'star' : 'star_border' }}</v-icon>
        </v-btn>
      </v-list-tile-action>

      <v-list-tile-content class="complaint-list__content" :class="isMobileClasses">
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

        <v-chip
          class="complaint-list__status"
          small
          :color="item.statusColor"
          :style="statusStyles"
          dark
        >{{ item.currentStatus }}</v-chip>

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
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="item.archive()" class="mr-2">
              <v-icon color="grey darken-1">archive</v-icon>
            </v-btn>
          </template>
          <span>Archive</span>
        </v-tooltip>

        <v-menu
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
              <span>Change Status</span>
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
                <v-avatar :color="item.color" size="12" class="status-indicator mr-1"></v-avatar>

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

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onEditItem" class="mr-2">
              <v-icon color="grey darken-1">edit</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent.stop="onDeleteItem">
              <v-icon color="grey darken-1">delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
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
      selectingStatus: false
    };
  },

  computed: {
    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    title() {
      return this.item.joinedRecipientName;
    },

    issuer() {
      return this.$_vuexable_getByKey(this.item.issued_by, vuex.modules.GROUP);
    },

    itemSelected: {
      get() {
        const { selected = false } = this.item;

        return selected;
      },

      set(value) {
        this.item.update("selected", value);
      }
    },

    statusesItems() {
      return this.$_issue_status_mixin_makeStatusMenuItems(
        this.item,
        (issue, status) => {
          this.selectingStatus = false;
          this.$emit("update:status", this.item);
        }
      );
    },

    statusStyles() {
      return {
        color: getCorrectTextColor(this.item.statusColor)
      };
    }
  },

  methods: {
    getItemCLasses(hover) {
      return {
        "elevation-2": hover
      };
    },

    onEditItem() {
      this.$emit("edit", this.item);
    },

    onDeleteItem() {
      this.$emit("delete", this.item);
    },

    onClick() {
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
    min-width: 80px;
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

  &__title {
    max-width: 168px;
    min-width: 125px;
    padding-right: 32px;

    &.is-mobile {
      max-width: 100%;
    }
  }

  &__status {
    margin-right: 12px;
  }
}
</style>
