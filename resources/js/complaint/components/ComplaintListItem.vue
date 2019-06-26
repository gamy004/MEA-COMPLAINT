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
          color="indigo accent-3"
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
        v-if="hover"
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
import { views } from "../../constants";

export default {
  props: {
    item: {
      type: vuex.models.ISSUE,
      required: true
    }
  },

  mixins: [vuexable],

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
      background: rgb(255, 255, 255);
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(250, 250, 250, 1) 20%,
        rgba(255, 255, 255, 1) 100%
      );
      position: absolute;
      right: 0;
      padding-left: 16px;
      padding-right: 8px;
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
