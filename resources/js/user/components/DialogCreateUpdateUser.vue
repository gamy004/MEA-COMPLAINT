<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="deep-orange">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="onSubmit">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout justify-space-around row wrap :reverse="isMobile">
            <v-flex class="mt-5" shrink>
              <avatar-uploader @fileUploaded="onFileUploaded" :uploadable-avatar.sync="mockAvatar" />
            </v-flex>

            <v-flex xs12 sm8 md6>
              <v-form lazy-validation>
                <v-subheader class="px-0">Credential</v-subheader>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Username (required)"
                      v-model="form.username"
                      color="indigo accent-2"
                      :error="form.errors.has('username')"
                      :error-messages="form.errors.getError('username')"
                      @input="form.errors.clear('username')"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-switch
                      v-if="$_user_mixin_edit"
                      color="indigo accent-2"
                      v-model="updatePassword"
                      label="Update Password"
                    ></v-switch>

                    <v-text-field
                      v-if="!$_user_mixin_edit || updatePassword"
                      label="Password (required)"
                      v-model="form.password"
                      color="indigo accent-2"
                      autocomplete="new-password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      @click:append="showPassword = !showPassword"
                      :error="form.errors.has('password')"
                      :error-messages="form.errors.getError('password')"
                      @input="form.errors.clear('password')"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field
                      v-if="!$_user_mixin_edit || updatePassword"
                      label="Password Confirmation (required)"
                      v-model="form.password_confirmation"
                      color="indigo accent-2"
                      autocomplete="new-password"
                      :type="showPasswordConfirm ? 'text' : 'password'"
                      :append-icon="showPasswordConfirm ? 'visibility' : 'visibility_off'"
                      @click:append="showPasswordConfirm = !showPasswordConfirm"
                      :error="form.errors.has('password_confirmation')"
                      :error-messages="form.errors.getError('password_confirmation')"
                      @input="form.errors.clear('password_confirmation')"
                    ></v-text-field>
                  </v-flex>

                  <v-subheader class="px-0">General Information</v-subheader>

                  <v-flex xs12>
                    <v-text-field
                      label="Name (required)"
                      v-model="form.name"
                      color="indigo accent-2"
                      :error="form.errors.has('name')"
                      :error-messages="form.errors.getError('name')"
                      @input="form.errors.clear('name')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Email"
                      v-model="form.email"
                      color="indigo accent-2"
                      :error="form.errors.has('email')"
                      :error-messages="form.errors.getError('email')"
                      @input="form.errors.clear('email')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="Phone"
                      mask="phone"
                      v-model="form.phone"
                      color="indigo accent-2"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      :items="$_user_mixin_availableRoles"
                      label="Role"
                      v-model="form.role"
                      color="indigo accent-2"
                      hide-no-data
                      :loading="$_user_mixin_fetchingRole"
                      :error="form.errors.has('role')"
                      :error-messages="form.errors.getError('role')"
                      @input="form.errors.clear('role')"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>

                <transition name="slide-y-reverse-transition" appear mode="out-in">
                  <v-layout row wrap v-if="showGroupSelector">
                    <v-subheader class="px-0 mt-3">Group</v-subheader>

                    <v-flex xs12>
                      <v-combobox
                        :items="$_user_mixin_fetchingGroup ? [] : $_user_mixin_availableGroups"
                        label="Group"
                        :value="groupInput"
                        color="indigo accent-2"
                        hide-no-data
                        :loading="$_user_mixin_fetchingGroup"
                        :error="form.errors.has('group')"
                        :error-messages="form.errors.getError('group')"
                        @input="form.errors.clear('group')"
                        @focus="fetchGroup"
                        @update:searchInput="updateGroupInput"
                      >
                        <template v-slot:item="{ index, item }">
                          <group-item
                            :item="item"
                            :index="index"
                            managable-edit
                            :managable-module="vuex.modules.GROUP"
                            :managable-route-param="{ group: item.value }"
                            v-model="groupInput"
                          />
                        </template>
                      </v-combobox>
                    </v-flex>
                  </v-layout>
                </transition>

                <transition name="slide-y-reverse-transition" appear mode="out-in">
                  <v-layout row wrap v-if="showSubGroupSelector">
                    <v-flex xs12>
                      <v-combobox
                        :items="$_user_mixin_fetchingSubGroup ? [] : availableSubGroups"
                        label="Sub Group"
                        :value="subGroupInput"
                        color="indigo accent-2"
                        hide-no-data
                        :loading="$_user_mixin_fetchingSubGroup"
                        :error="form.errors.has('sub_group')"
                        :error-messages="form.errors.getError('sub_group')"
                        @input="form.errors.clear('sub_group')"
                        @focus="onFocusSubGroupInput"
                        @update:searchInput="updateSubGroupInput"
                      >
                        <template v-slot:item="{ index, item }">
                          <group-item
                            :item="item"
                            :index="index"
                            managable-edit
                            :managable-module="vuex.modules.SUB_GROUP"
                            :managable-route-param="{ group: item.value }"
                            v-model="subGroupInput"
                          />
                        </template>
                      </v-combobox>
                    </v-flex>
                  </v-layout>
                </transition>

                <v-layout wrap>
                  <!-- <v-flex sm12>
                    <v-switch v-model="form.available" label="Activate"></v-switch>
                  </v-flex>-->
                  <!-- <v-flex xs12>
                    <v-layout wrap>
                      <v-flex shrink>
                        <v-switch v-model="expire" label="Expire"></v-switch>
                      </v-flex>
                      <v-flex v-if="expire" grow offset-sm1>
                        <v-menu
                          v-model="showDatePicker"
                          :close-on-content-click="false"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="form.expire_at"
                              label="Expire Date"
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.expire_at"
                            @input="showDatePicker = false"
                            :landscape="!isMobile"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-flex>-->
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import { vuex } from "../../mixins/vuexable";
import managable from "../../mixins/managable";
import { userMixin } from "../../mixins/user-mixin";
import AvatarUploader from "./AvatarUploader";
import uploadable from "../../mixins/uploadable";
import GroupItem from "../../group/components/GroupItem";

export default {
  mixins: [dialogable, managable, userMixin, uploadable],

  components: {
    AvatarUploader,
    GroupItem
  },

  data() {
    return {
      vuex,
      mockAvatar: "",
      updatePassword: false,
      showPassword: false,
      showPasswordConfirm: false,
      groupInput: null,
      subGroupInput: null,
      form: vuex.models.FORM.make({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: null,
        group: null,
        sub_group: null
      })
    };
  },

  watch: {
    // "form.group": "onFormGroupChange",
    dialog(v) {
      if (!v) {
        this.mockAvatar = "";
        this.showPassword = false;
        this.showPasswordConfirm = false;
        this.updatePassword = false;
        this.groupInput = null;
        this.subGroupInput = null;
        this.form = vuex.models.FORM.make({
          name: "",
          username: "",
          email: null,
          password: "",
          password_confirmation: "",
          role: null
        });
        this.$_user_mixin_edit = null;
      } else {
        setTimeout(() => {
          this.fetchRole();
          this.fetchGroup();
        }, 500);
      }
    },

    $_user_mixin_edit: {
      async handler(edittedUser) {
        if (edittedUser) {
          const {
            id = null,
            name = "",
            username = "",
            email = "",
            password = "",
            password_confirmation = "",
            role_id: role = null,
            group_id: group = null,
            group_name = null,
            sub_group_id: sub_group = null,
            sub_group_name = null,
            avatar = null
          } = _.cloneDeep(edittedUser);

          this.form.record({
            id,
            name,
            username,
            email,
            password,
            password_confirmation,
            role,
            group,
            sub_group
          });

          if (group_name) {
            this.groupInput = group_name;
            // const selectedGroup = _.find(
            //   this.$_user_mixin_availableGroups,
            //   ["text", group_name]
            // );

            // if (selectedGroup) {
            //   this.groupInput = selectedGroup.text;

            //   await this.fetchSubGroup(selectedGroup);
            //   console.log("fetched");

            //   if (sub_group_name) {
            //     const selectedSubGroup = _.find(
            //       this.availableSubGroups,
            //       ["text", sub_group_name]
            //     );

            //     if (selectedSubGroup) {
            //       this.subGroupInput = selectedSubGroup.text;
            //     }
            //   }
            // }

            if (sub_group_name) {
              this.subGroupInput = sub_group_name;
            }

            if (avatar) {
              this.mockAvatar = avatar;
            }
          }
        }
      }
    }
  },

  computed: {
    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    dialogTitle() {
      return _.capitalize(`${this.$_managable_actionButton} User`);
    },

    selectedRoleAdmin() {
      if (!this.form.role) return false;

      const selectedRole = this.$_user_mixin_findRole(this.form.role);

      return selectedRole && selectedRole.role === "admin";
    },

    showGroupSelector() {
      return this.form.role && !this.selectedRoleAdmin;
    },

    showSubGroupSelector() {
      return this.showGroupSelector && this.groupInput !== null;
    },

    availableSubGroups() {
      return this.selectedGroup ? this.$_user_mixin_availableSubGroups : [];
    },

    selectedGroup() {
      return _.find(this.$_user_mixin_availableGroups, [
        "text",
        this.groupInput
      ]);
    },

    selectedSubGroup() {
      return _.find(this.availableSubGroups, ["text", this.subGroupInput]);
    }
  },

  methods: {
    async fetchRole() {
      let response;

      try {
        response = await this.$_user_mixin_fetchRole();
      } catch (error) {
        throw error;
      }

      return response;
    },

    async fetchGroup() {
      let response;

      try {
        response = await this.$_user_mixin_fetchGroup();
      } catch (error) {
        throw error;
      }

      return response;
    },

    async fetchSubGroup({ text, value }) {
      let response;
      console.log(this.groupInput, text, value);

      if (this.groupInput !== text) {
        this.onFormGroupChange();
      }

      try {
        response = await this.$_user_mixin_fetchSubGroup({
          filters: [
            {
              key: "parent_id",
              value
            }
          ]
        });
      } catch (error) {
        throw error;
      }

      return response;
    },

    onFormGroupChange() {
      this.subGroupInput = null;
    },

    onRoleChange(value) {
      // console.log(value, this.selectedRoleAdmin);
      if (this.selectedRoleAdmin) {
        this.groupInput = null;
        this.subGroupInput = null;
      }
    },

    onFocusSubGroupInput() {
      const { selectedGroup } = this;
      console.log(selectedGroup);

      if (selectedGroup) {
        this.fetchSubGroup(selectedGroup);
      }
    },

    updateGroupInput(value) {
      const oldSelectedGroup = this.selectedGroup;
      console.log(value, oldSelectedGroup);

      this.groupInput = value;

      if (!this.groupInput) {
        console.log("subGroupInput was cleared due to empty groupInput");

        this.subGroupInput = null;
      }

      if (oldSelectedGroup && this.groupInput !== oldSelectedGroup.text) {
        console.log("subGroupInput was cleared due to changed selected group");

        this.subGroupInput = null;
      }
    },

    // onGroupChange(data) {
    //   if (!data.text && !data.value) {
    //     this.form.set("group", data);
    //   } else {
    //     const { text, value } = data;

    //     this.form.set("group", { text, value });
    //   }

    //   console.log(this.form.group);
    // },

    updateSubGroupInput(value) {
      this.subGroupInput = value;
    },

    async onSubmit() {
      const { form, $_uploadable_metaData = [] } = this;
      let submitFields = ["username", "name", "email", "role", "avatar"];

      let v;

      if (!this.$_user_mixin_edit || this.updatePassword) {
        submitFields = [...submitFields, "password", "password_confirmation"];
      }

      if ($_uploadable_metaData.length) {
        const avatar = _.find($_uploadable_metaData, ["url", this.mockAvatar]);

        form.set("avatar", avatar);
      }

      if (!this.selectedRoleAdmin) {
        if (this.groupInput) {
          if (!this.selectedGroup) {
            form.set("group", this.groupInput);
            submitFields.push("group");
          } else {
            form.set("group_id", this.selectedGroup.value);
            submitFields.push("group_id");
          }
        }

        if (this.subGroupInput) {
          if (!this.selectedGroup || !this.selectedSubGroup) {
            form.set("sub_group", this.subGroupInput);
            submitFields.push("sub_group");
          } else {
            form.set("sub_group_id", this.selectedSubGroup.value);
            submitFields.push("sub_group_id");
          }
        }
      }

      try {
        v = await this.$_managable_submitForm(form, submitFields);
      } catch (error) {
        throw error;
      }

      this.closeForm();
    },

    closeForm() {
      this.dialog = false;
      this.$_user_mixin_edit = null;
    }
  }
};
</script>
