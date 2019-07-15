import {
    vuex,
    vuexable
} from "./vuexable";

export const DEFAULT_AVATAR_SRC = '/images/default-avatar.png';

export const userItemMixin = {
    mixins: [vuexable],

    props: {
        userId: {
            type: [String, Number],
            default: null
        },

        color: {
            type: String,
            default: "accent"
        },

        size: {
            type: Number,
            default: 48
        },

        auth: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...vuex.mapState({
            authUser: 'auth'
        }),

        user() {
            return this.auth ? this.authUser :
                this.$_vuexable_getByKey(
                    this.userId,
                    vuex.modules.USER
                )
        },

        userAvatar() {
            const {
                user = null
            } = this;

            return user && user.avatar ? user.avatar : "";
        },

        // userNameAvatar() {
        //   const { user = null } = this,
        //     nameAvatar = !_.isNull(user) ? user.get("email") : this.avatarName;

        //   return nameAvatar;
        // },

        // avatarImg() {
        //   let { avatar, userAvatar } = this;

        //   if (this.user && userAvatar) {
        //     avatar = userAvatar;
        //   }

        //   return avatar;
        // },

        userAvatarName() {
            let {
                name = "", username
            } = this.user;

            if (!name.length) {
                name = username;
            }

            return _.capitalize(name.substr(0, 1));
        },

        hasAvatar() {
            return this.userAvatar.length > 0;
        },

        avatarBg() {
            return this.hasAvatar ? "transparent" : this.color;
        },

        avatarClassName() {
            return [this.avatarBg];
        }
    }
}
