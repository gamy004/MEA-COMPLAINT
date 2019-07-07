<template>
  <v-btn color="deep-orange" flat dark small @click="$_user_mixin_dialog = true">
    <v-icon class="mr-1">add</v-icon>
    <span>New User</span>
  </v-btn>
</template>

<script>
import { userMixin } from "../../mixins/user-mixin";

export default {
  mixins: [userMixin]
};
</script>

