<template>
    <div class="message-alert__wrapper">
        <v-alert transition="slide-x-reverse-transition" :value="dialog" :type="type">
            <slot name="message">This is an alert message.</slot>
        </v-alert>
    </div>
</template>

<script>
    import dialogable from "../mixins/dialogable";

    export default {
        mixins: [dialogable],

        props: {
            type: {
                type: String,
                default: "info"
            },
            dialogableAutoClose: {
                type: Boolean,
                default: () => true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .message-alert {
        &__wrapper {
            position: fixed;
            top: 0;
            right: 10px;
        }
    }
</style>


