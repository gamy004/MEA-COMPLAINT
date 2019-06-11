<template>
  <layout-full-screen>
    <v-layout>
      <v-flex xs6 fill-height id="loginLeftColumn">
        <v-layout column justify-end fill-height id="loginLeftColumnInner" class="white--text">
          <div class="overlay-text"></div>
          <div class="content">
            <div class="display-3 font-weight-bold mb-4">MEA COMPAINT</div>
            <div class="headline">Welcome back</div>
          </div>
        </v-layout>
        <!-- <v-img transition="fade-transition" src="/images/bg-auth.jpg">
                    <v-layout pa-2 column fill-height class="lightbox white--text">
                        <v-spacer></v-spacer>
                        <v-flex shrink>
                            <div class="subheading">Jonathan Lee</div>
                            <div class="body-1">heyfromjonathan@gmail.com</div>
                        </v-flex>
                    </v-layout>
        </v-img>-->
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

              <v-btn
                :loading="form.isSubmitting"
                raised
                large
                round
                class="has-gradient white--text btn__sign-in"
                @click="signIn"
              >Sign in</v-btn>
              <!-- <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>

                            <v-btn color="error" @click="reset">Reset Form</v-btn>

              <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>-->
            </v-form>
          </v-flex>
        </v-layout>
        <!-- <v-container fill-height>
                    <v-layout align-center justify-center fill-height>
                        <v-flex xs8>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="name"
                                    :counter="10"
                                    :rules="nameRules"
                                    label="Name"
                                    required
                                ></v-text-field>

                                <v-text-field
                                    v-model="username"
                                    :rules="usernameRules"
                                    label="E-mail"
                                    required
                                ></v-text-field>

                                <v-select
                                    v-model="select"
                                    :items="items"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Item"
                                    required
                                ></v-select>

                                <v-checkbox
                                    v-model="checkbox"
                                    :rules="[v => !!v || 'You must agree to continue!']"
                                    label="Do you agree?"
                                    required
                                ></v-checkbox>

                                <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>

                                <v-btn color="error" @click="reset">Reset Form</v-btn>

                                <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
                            </v-form>
                        </v-flex>
                    </v-layout>
        </v-container>-->
      </v-flex>
    </v-layout>
  </layout-full-screen>
</template>

<script>
import LayoutFullScreen from "../../layouts/FullScreen";
import Form from "../../models/Form";

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
        showPassword: false
      })
    };
  },

  methods: {
    async signIn() {
      let v,
        { username, password } = this.form;

      try {
        v = await this.form.post("login", {
          params: ["username", "password"]
        });
      } catch (error) {
        throw error;
      }

      return this.onSignInSuccess(v);
    },

    onSignInSuccess(response) {
      console.log(response);
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
// .has-bg {
//     &__auth {
//         position: relative;
//         // background-image: url("/images/bg-auth.jpg");
//         // background-repeat: no-repeat;
//         // background-size: cover;
//         @include background-tint($primary, "/images/bg-auth.jpg");
//     }
// }
</style>


