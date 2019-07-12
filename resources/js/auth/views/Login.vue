<template>
  <layout-full-screen>
    <v-layout>
      <v-flex xs6 fill-height id="loginLeftColumn">
        <v-layout column justify-end fill-height id="loginLeftColumnInner" class="white--text">
          <div class="overlay-text"></div>
          <div class="content">
            <div class="display-3 font-weight-bold mb-4">MEA ISSUE</div>
            <div class="headline">Welcome back</div>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs6 id="loginFormContainer">
        <v-layout align-center justify-center fill-height>
          <v-flex xs8 md6>
            <div class="display-3">Sign in</div>
            <div class="subheading">with your MEA provided account</div>

            <v-form ref="form" v-model="form.valid" lazy-validation class="mt-4">
              <v-text-field
                v-model="form.username"
                type="text"
                name="username"
                label="Username"
                outline
                :error="form.errors.has('username')"
                :error-messages="form.errors.getError('username')"
                @input="form.errors.clear('username')"
                @keydown.enter="signIn"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                :append-icon="form.showPassword ? 'visibility' : 'visibility_off'"
                :type="form.showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                autocomplete="new-password"
                outline
                :error="form.errors.has('password')"
                :error-messages="form.errors.getError('password')"
                @input="form.errors.clear('password')"
                @click:append="form.toggle('showPassword')"
                @keydown.enter="signIn"
              ></v-text-field>

              <v-layout align-center>
                <v-btn
                  :loading="isAuthorizing"
                  raised
                  large
                  round
                  class="has-gradient white--text btn__sign-in"
                  @click="signIn"
                >Sign in</v-btn>

                <transition name="slide-x-transition" appear>
                  <div v-show="form.success" class="subheading">Sign in success</div>
                </transition>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </layout-full-screen>
</template>

<script>
import LayoutFullScreen from "../../layouts/FullScreen";
import Form from "../../models/Form";
import { vuex } from "../../mixins/vuexable";
import { views } from "../../constants";

export default {
  components: {
    LayoutFullScreen
  },

  data() {
    return {
      form: Form.make({
        username: "",
        password: "",
        valid: false,
        showPassword: false,
        success: false
      })
    };
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isAuthorizing: [vuex.actions.USER.SIGN_IN]
    })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.USER, [vuex.actions.USER.SIGN_IN]),

    async signIn() {
      let v;

      try {
        v = await this.form.persist(this[vuex.actions.USER.SIGN_IN]);
      } catch (error) {
        throw error;
      }

      return this.onSignInSuccess(v);
    },

    onSignInSuccess({ id = null, username = "" } = {}) {
      if (id) {
        this.form.set("success", true);

        setTimeout(() => {
          this.form.set("success", false);

          this.goToComplaintPage();
        }, 700);
      }
    },

    goToComplaintPage() {
      return setTimeout(() => {
        const { href } = this.$router.resolve({
          name: views.ISSUE.INDEX
        });

        window.location = href;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables";
@import "../../../sass/_mixins";

#loginLeftColumn {
  @include background-tint(darken($primary, 10%), "/images/bg-auth.jpg");
}

#loginLeftColumnInner {
  position: relative;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 10%;
}

.content {
  z-index: 2;
}

.overlay-text {
  @include overlay;
  height: 40%;
  top: 60%;
  background-image: linear-gradient(
    to top,
    rgba(23, 23, 23, 0.6),
    rgba(51, 51, 51, 0)
  );
}

.btn__sign-in {
  left: -10px;
}
</style>
