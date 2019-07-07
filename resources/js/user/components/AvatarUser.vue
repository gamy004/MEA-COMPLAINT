<template>
  <v-avatar :class="avatarClassName" :size="size">
    <img v-if="hasAvatar" :src="userAvatar" />

    <span v-else class="white--text">{{ userAvatarName }}</span>

    <slot></slot>
  </v-avatar>
</template>

<script>
import { userItemMixin } from "../../mixins/user-item-mixin";
export default {
  mixins: [userItemMixin]
};
</script>