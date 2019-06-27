<template>
    <v-app id="meaDefault">
        <add-complaint-btn v-if="isMobile"/>

        <v-navigation-drawer
            v-model="drawer"
            fixed
            clipped
            class="grey lighten-4"
            app
            :mobile-break-point="mobileBreakPoint"
        >
            <v-list dense class="grey lighten-4">
                <add-complaint-btn v-if="!isMobile"/>

                <template v-for="(item, i) in items">
                    <v-layout v-if="item.heading" :key="i" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-right">
                            <v-btn small flat>edit</v-btn>
                        </v-flex>
                    </v-layout>

                    <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

                    <v-list-tile v-else :key="i" @click>
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar id="toolbarLayoutDefault" class="elevation-0" app fixed clipped-left>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

            <span class="title ml-3 mr-5">
                MEA
                <span class="font-weight-light">Complaint</span>
            </span>

            <v-text-field
                flat
                solo
                color="deep-orange"
                hide-details
                label="Search complaint"
                prepend-inner-icon="search"
            ></v-text-field>

            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <v-container fluid fill-height pa-0 class="grey lighten-4" v-resize="onResize">
                <slot/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import layoutable from "../mixins/layoutable";
    import AddComplaintBtn from "../complaint/components/AddComplaintBtn";

    export default {
        mixins: [layoutable],

        components: {
            AddComplaintBtn
        },

        data() {
            return {
                items: [
                    { icon: "inbox", text: "Inbox" },
                    { icon: "start", text: "Starred" },
                    { icon: "lightbulb_outline", text: "Notes" },
                    { divider: true },
                    { heading: "Labels" },
                    { icon: "add", text: "Create new label" },
                    { divider: true },
                    { icon: "send", text: "Sent" },
                    { icon: "drafts", text: "Drafts" },
                    { icon: "archive", text: "Archive" },
                    { icon: "delete", text: "Trash" },
                    { divider: true },
                    { icon: "settings", text: "Settings" }
                    //   { icon: "chat_bubble", text: "Trash" },
                    //   { icon: "help", text: "Help" },
                    //   { icon: "phonelink", text: "App downloads" },
                    //   { icon: "keyboard", text: "Keyboard shortcuts" }
                ]
            };
        }
    };
</script>

<style lang="stylus">
    #meaDefault {
        .v-navigation-drawer__border {
            display: none;
        }

        .v-toolbar {
            border-bottom: 1px solid #E0E0E0;
        }

        #toolbarLayoutDefault {
            .title + * {
                margin-left: 4rem;
            }
        }
    }
</style>