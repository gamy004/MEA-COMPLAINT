<template>
  <div>
    <v-text-field
      flat
      solo
      color="deep-orange"
      hide-details
      :label="$t('userGroup.index.searchLabel')"
      prepend-inner-icon="search"
      :loading="isSearchingUser"
      v-model="searchKeyword"
      class="search-user__input"
      @keyup.enter.prevent="search"
    ></v-text-field>
  </div>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";
import { userMixin } from "../../mixins/user-mixin";
export default {
  mixins: [userMixin, vuexable],

  data() {
    return {
      searchKeyword: ""
    };
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isSearchingUser: "search user fetching"
    })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.USER, {
      searchUser: {
        action: vuex.actions.USER.FETCH,
        loader: "search user fetching"
      }
    }),

    search() {
      let value = {
        keyword: "",
        fields: []
      };

      if (this.searchKeyword.length) {
        value = {
          keyword: this.searchKeyword,
          fields: [
            "username",
            "name",
            "email",
            "group_name",
            "sub_group_name",
            "role"
          ]
        };
      }

      this.$_vuexable_updatePagination(
        {
          key: "search",
          value
        },
        vuex.modules.USER
      );

      return this.searchUser({
        pagination: this.$_user_mixin_pagination
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-user {
  &__input {
    width: 300px;
  }
}
</style>
