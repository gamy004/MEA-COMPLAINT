<template>
    <v-btn
        v-if="isMobile"
        :round="!isMobile"
        large
        color="grey lighten-5"
        :fab="isMobile"
        :fixed="isMobile"
        :bottom="isMobile"
        :right="isMobile"
        dark
        class="btn-complaint has-gradient"
        :class="isMobileClasses"
        @click="openComplaintDialog"
    >
        <v-icon>add_comment</v-icon>
    </v-btn>

    <v-btn
        v-else
        round
        large
        color="grey lighten-5"
        dark
        class="btn-complaint has-gradient"
        @click="openComplaintDialog"
    >
        <v-icon>add_comment</v-icon>
        <span class="subheading font-weight-medium text-capitalize mx-2" v-t="complaint.addBtn"></span>
    </v-btn>
</template>

<script>
    import { vuex, vuexable } from "../../mixins/vuexable";

    export default {
        mixins: [vuexable],

        computed: {
            ...vuex.mapGetters(["isMobile", "isMobileClasses"])
        },

        methods: {
            openComplaintDialog(event) {
                this.$_vuexable_setState(
                    {
                        key: "dialog",
                        value: true
                    },
                    vuex.modules.ISSUE
                );

                this.$emit("click", event);
            }
        }
    };
</script>


<style lang="scss" scoped>
    .btn-complaint {
        margin-bottom: 8px;

        &:not(.is-mobile) {
            height: 48px;
            padding: 10px 24px 10px 16px;
        }
    }
</style>
