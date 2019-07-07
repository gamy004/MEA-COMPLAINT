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
          <v-layout justify-space-between row wrap :reverse="isMobile">
            <v-flex xs12 sm8 md6>
              <v-form lazy-validation>
                <v-subheader class="px-0">General Information</v-subheader>
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
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Phone"
                      mask="phone"
                      v-model="form.phone"
                      color="indigo accent-2"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
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
                      @focus="fetchRole"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>

                <v-subheader v-if="!selectRoleAdmin" class="px-0 mt-3">Group</v-subheader>

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
            <v-flex class="mt-5" shrink>
              <!-- <avatar-uploader @fileUploaded="onFileUploaded" :avatar.sync="mockAvatar"/> -->
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
export default {
  mixins: [dialogable, managable, userMixin],

  data() {
    return {
      form: vuex.models.FORM.make({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: null
      })
    };
  },

  computed: {
    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    dialogTitle() {
      return _.capitalize(`${this.$_managable_actionButton} User`);
    },

    selectRoleAdmin() {
      return false;
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
    },

    async onSubmit() {
      const { form } = this;

      let v;

      try {
        v = await this.$_managable_submitForm(form, [
          "username",
          "name",
          "email",
          "role",
          "group",
          "sub_group",
          "avatar"
        ]);
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

