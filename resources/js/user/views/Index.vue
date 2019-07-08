<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat white class="fill-height">
        <v-card-title class="pa-0">
          <custom-toolbar :items="toolbars" class="py-0 bb-1"></custom-toolbar>
        </v-card-title>

        <v-card-text class="pa-0">
          <custom-table
            v-model="selected"
            :headers="headers"
            :items="$_user_mixin_paginated_items"
            item-key="id"
            :total-items="$_user_mixin_totalItems"
            :pagination="$_user_mixin_pagination"
            :loading="$_user_mixin_fetching"
            :selectable="false"
            :multiple-select="false"
            :actions="actions"
            hide-actions
            @update:pagination="onPaginationChange"
            @action:edit="onItemEdit"
            @action:delete="onItemDelete"
          >
            <template slot="items" slot-scope="{ item }">
              <td :key="`name-${item.id}`">
                <v-layout align-center>
                  <avatar-user class="mr-2" :userId="item.id" :size="32" color="has-gradient" />
                  <v-layout column>
                    <span class="body-2">{{ item.name }}</span>
                    <span class="caption">{{ item.username }}</span>
                  </v-layout>
                </v-layout>
              </td>

              <!-- <td :key="`username-${item.id}`">
                <span class="body-2">{{ item.username }}</span>
              </td>-->

              <td :key="`role-${item.id}`">
                <span class="body-1">{{ item.role }}</span>
              </td>

              <td :key="`group-${item.id}`">
                <span class="body-1">{{ item.group_name }}</span>
              </td>

              <td :key="`subgroup-${item.id}`">
                <span class="body-1">{{ item.sub_group_name }}</span>
              </td>
            </template>
          </custom-table>
          <!-- <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>-->
        </v-card-text>
      </v-card>
    </v-flex>

    <dialog-create-update-User
      :dialogable-visible.sync="$_user_mixin_dialog"
      :managable-module="vuex.modules.USER"
      :managable-route-param="routeParam"
      :managable-edit="$_user_mixin_isEditing"
      @form:create="$_alertable_alert('create_success')"
      @form:update="$_alertable_alert('update_success')"
      @form:submitted="onFormSubmitted"
    />

    <message-alert
      key="alertUserIndex"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
      :alertable-timeout="5000"
    />
  </v-layout>
</template>

<script>
import AvatarUser from "../components/AvatarUser";
import CustomToolbar from "../../components/CustomToolbar";
import CustomTable from "../../components/CustomTable";
import MessageAlert from "../../components/MessageAlert";
import { userMixin } from "../../mixins/user-mixin";
import ButtonCreateUser from "../components/ButtonCreateUser";
import DialogCreateUpdateUser from "../components/DialogCreateUpdateUser";
import { vuex } from "../../mixins/vuexable";
import { views } from "../../constants";
import alertable from "../../mixins/alertable";

export default {
  mixins: [alertable, userMixin],

  components: {
    AvatarUser,
    ButtonCreateUser,
    DialogCreateUpdateUser,
    CustomToolbar,
    CustomTable,
    MessageAlert
  },

  data() {
    return {
      vuex,
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Role",
          align: "left",
          sortable: true,
          value: "role"
        },
        {
          text: "Group",
          align: "left",
          sortable: true,
          value: "group_name"
        },
        {
          text: "Sub Group",
          align: "left",
          sortable: true,
          value: "sub_group_name"
        }
      ],
      alertable_messages: {
        create_success: {
          text: "User was created successfully",
          type: "success"
        },
        update_success: {
          text: "User was updated successfully",
          type: "success"
        },
        delete_success: {
          text: "User was deleted successfully",
          actions: [
            {
              text: "Undo",
              handler: async ({ item }) => {
                await this.$_user_mixin_restoreUser(item);

                this.$_alertable_alert("restore_success");
              }
            }
          ]
        },
        restore_success: {
          text: "Action undone"
        }
      }
    };
  },

  // watch: {
  //   $_user_mixin_pagination: {
  //     // immediate: true,
  //     async handler(v, ov) {
  //       if (!_.isEqual(v, ov)) {
  //         console.log("User Index pagination changed: ", v);

  //         await this.$_user_mixin_fetchUser({
  //           pagination: v
  //         });
  //       }
  //     }
  //   }
  // },

  computed: {
    toolbars() {
      return [
        { text: "Users & Groups", classes: { title: true } },
        { spacer: true },
        { component: () => ButtonCreateUser }
      ];
    },

    actions() {
      return this.$_vuexable_auth && this.$_vuexable_auth.isAdmin
        ? ["edit", "delete"]
        : [];
    },

    routeParam() {
      return this.$_user_mixin_isEditing
        ? {
            user: this.$_user_mixin_edit.id
          }
        : {};
    }
  },

  methods: {
    onFormSubmitted() {
      return this.$_user_mixin_fetchUser({
        pagination: this.$_user_mixin_pagination
      });
    },

    async onPaginationChange(newPagination, { force = false } = {}) {
      const original = this.$_user_mixin_pagination;

      if (
        this.$_vuexable_shouldUpdatePagination(
          newPagination,
          vuex.modules.USER
        ) ||
        force
      ) {
        this.$_user_mixin_pagination = {
          ...original,
          ...newPagination
        };

        await this.$_user_mixin_fetchUser({
          pagination: this.$_user_mixin_pagination
        });

        this.$router.push({
          name: views.USER.INDEX,
          query: {
            page: newPagination.page,
            descending: newPagination.descending
          }
        });
      }
    },

    async onItemEdit(item) {
      try {
        await this.$_user_mixin_onEditUser(item);
      } catch (error) {
        throw error;
      }

      this.$_user_mixin_dialog = true;
    },

    async onItemDelete(item) {
      try {
        await this.$_user_mixin_deleteUser(item);
      } catch (error) {
        throw error;
      }

      this.$_alertable_alert("delete_success", { item });
    }
  },

  async created() {
    this.onPaginationChange(
      {
        sortBy: "name",
        page: _.toInteger(this.$route.query.page) || 1,
        descending: this.$route.query.descending === "true" || false
      },
      { force: true }
    );
  }
};
</script>
