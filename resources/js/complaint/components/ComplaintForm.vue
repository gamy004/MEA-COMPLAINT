<template>
    <v-layout v-if="dialog" class="complaint-form__wrapper" :class="complaintFormClasses">
        <v-flex xs12>
            <v-card class="complaint-form">
                <v-toolbar
                    card
                    dense
                    color="blue-grey darken-2"
                    dark
                    class="complaint-form__head-toolbar"
                >
                    <v-toolbar-title>Complaint</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip v-if="!isMobile" bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                small
                                v-on="on"
                                class="clickable mx-2"
                                @click.prevent.stop="toggleFullScreen"
                            >{{ fullScreenIcon }}</v-icon>
                        </template>
                        <span>Full-screen</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                small
                                v-on="on"
                                class="clickable"
                                @click.prevent.stop="closeComplaintForm"
                            >close</v-icon>
                        </template>
                        <span>Save &amp; close</span>
                    </v-tooltip>
                </v-toolbar>
                <v-form>
                    <v-layout>
                        <v-flex xs4>
                            <v-autocomplete
                                class="complaint-form__input-recipient"
                                v-model="form.issue_category_id"
                                :items="storeCategories"
                                label="Category"
                                cache-items
                                :loading="isFetchingFormCategory"
                                full-width
                                hide-details
                                hide-no-data
                                hide-selected
                                single-line
                                @focus="onFocusInputCategory"
                                @change="onChange"
                            ></v-autocomplete>
                        </v-flex>

                        <v-flex xs8>
                            <v-autocomplete
                                class="complaint-form__input-recipient"
                                v-model="form.recipients"
                                :items="storeRecipients"
                                small-chips
                                label="To"
                                cache-items
                                :loading="isFetchingFormRecipient"
                                full-width
                                :hide-details="!form.errors.has('recipients')"
                                hide-no-data
                                hide-selected
                                multiple
                                single-line
                                :error="form.errors.has('recipients')"
                                :error-messages="form.errors.getError('recipients')"
                                @focus="onFocusInputRecipient"
                                @change="onChange"
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider>

                    <v-text-field
                        label="Subject"
                        v-model="form.subject"
                        single-line
                        full-width
                        hide-details
                        @change="onChange"
                    ></v-text-field>

                    <v-divider></v-divider>

                    <custom-editor
                        v-model="formDescription"
                        :show-toolbar.sync="showFormatting"
                        :full-screen="fullScreen"
                        @editor:drop="dropFiles"
                        @editor:dragover="dragover"
                        @editor:dragleave="dragleave"
                        @change="onChange"
                    >
                        <!-- file list here -->
                        <file-list
                            class="editor__filelist editor__filelist--front px-2"
                            v-if="uploadable_uploader"
                            :files="uploadable_uploadedFiles"
                            :uploader="uploadable_uploader"
                        />

                        <file-list
                            class="editor__filelist editor__filelist--back px-2"
                            v-if="uploadable_uploader"
                            :files="$_uploadable_uploaderFiles"
                            :uploader="uploadable_uploader"
                        />
                    </custom-editor>

                    <v-layout row wrap class="complaint-form__footer">
                        <v-flex xs12>
                            <v-layout align-center>
                                <custom-toolbar :items="customToolbarItems" class="elevation-0">
                                    <template v-slot:left>
                                        <v-btn
                                            small
                                            color="primary"
                                            class="mr-2 complaint-form__btn-submit"
                                            @click.prevent.stop="onSubmit"
                                            :loading="form.isSubmitting"
                                            :disabled="uploadable_uploading"
                                        >send</v-btn>

                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-icon
                                                    medium
                                                    v-on="on"
                                                    class="clickable mr-2"
                                                    @click.prevent.stop="toggleshowFormatting"
                                                >text_format</v-icon>
                                            </template>
                                            <span>Formatting options</span>
                                        </v-tooltip>

                                        <uploader
                                            :ref="uploadable_uploaderRef"
                                            :end-point="endpoint"
                                            :multipart="multipart"
                                            :show-errors="false"
                                            :max-uploads="999"
                                            multiple
                                            @startUpload="onStartUpload"
                                            @chunkUploaded="onChunkUploaded"
                                            @fileUploaded="onFileUploaded"
                                            @error="onUploadError"
                                        >
                                            <template slot="browse-btn">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">attach_file</v-icon>
                                                    </template>
                                                    <span>Upload files</span>
                                                </v-tooltip>
                                            </template>
                                        </uploader>

                                        <v-spacer></v-spacer>

                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-icon v-on="on" class="clickable">delete</v-icon>
                                            </template>
                                            <span>Discard draft</span>
                                        </v-tooltip>
                                    </template>
                                </custom-toolbar>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card>
        </v-flex>

        <warning-dialog :dialogable-visible.sync="warning" @click:accept="onDiscard">
            <template v-slot:header>Discard draft?</template>

            <template v-slot:message>Your draft will be permanently deleted.</template>
        </warning-dialog>

        <warning-dialog
            :dialogable-visible.sync="warningSubmit"
            @click:accept="submitComplaintForm"
            cancel-text="No"
            accept-text="Yes"
        >
            <template v-slot:header>Submit without subject and description?</template>

            <template v-slot:message>You want to create complaint without subject and description.</template>
        </warning-dialog>

        <message-alert :dialogable-visible.sync="alertable_alert" :type="alertable_type">
            <template v-slot:message>{{ $_alertable_message }}</template>
        </message-alert>
    </v-layout>
</template>

<script>
    import CustomEditor from "../../components/CustomEditor";
    import WarningDialog from "../../components/WarningDialog";
    import MessageAlert from "../../components/MessageAlert";
    import uploadable from "../../mixins/uploadable";
    import CustomToolbar from "../../components/CustomToolbar";
    import FileList from "../../components/FileList";
    import { toggle, mapTextValue } from "../../helpers";
    import { vuex } from "../../mixins/vuexable";
    import alertable from "../../mixins/alertable";
    import managable from "../../mixins/managable";

    export default {
        mixins: [alertable, managable, uploadable],

        components: {
            CustomEditor,
            WarningDialog,
            MessageAlert,
            CustomToolbar,
            FileList
        },

        data() {
            return {
                form: vuex.models.FORM.make({
                    subject: "",
                    description: "",
                    issue_category_id: null,
                    recipients: [],
                    uploaded_files: []
                }),
                uploadable_uploaderRef: "complaintForm__uploadable_uploader",
                customToolbarItems: [],
                showFormatting: false,
                fullScreen: false,
                warning: false,
                warningSubmit: false,
                alertable_messages: {
                    error: "Cannot create complaint, please check error message.",
                    success: "Create complaint success."
                }
            };
        },

        watch: {
            dialog(v) {
                if (v) {
                    this.$_uploadable_UpdateUploader();
                }
            },

            isMobile: {
                immediate: true,
                handler(v) {
                    this.fullScreen = v;
                }
            }
        },

        computed: {
            ...vuex.mapGetters(["isMobile"]),

            ...vuex.mapWaitingGetters({
                isFetchingFormRecipient: "fetching form recipients",
                isFetchingFormCategory: "fetching form categories"
            }),

            dialog: {
                get() {
                    return this.$_vuexable_getState(
                        "dialog",
                        vuex.modules.COMPLAINT
                    );
                },

                set(value) {
                    this.$_vuexable_setState(
                        {
                            key: "dialog",
                            value
                        },
                        vuex.modules.COMPLAINT
                    );
                }
            },

            formDescription: {
                get(v) {
                    return this.form.description;
                },

                set(v) {
                    if (this.form) {
                        this.form.set("description", v);
                    }
                }
            },

            storeCategories() {
                const categories = this.$_vuexable_getter(
                    vuex.getters.SORTED_VALUES,
                    vuex.modules.COMPLAINT_CATEGORY
                );

                return mapTextValue(categories, "category", "id");
            },

            storeRecipients() {
                const recipients = this.$_vuexable_getter(
                    vuex.getters.SORTED_VALUES,
                    vuex.modules.GROUP
                );

                return mapTextValue(recipients, "name", "id");
            },

            fullScreenIcon() {
                return this.fullScreen ? "fullscreen_exit" : "fullscreen";
            },

            complaintFormClasses() {
                return {
                    "is-fullscreen": this.fullScreen || this.isMobile
                };
            }
        },

        methods: {
            ...vuex.mapWaitingActions(vuex.modules.GROUP, {
                [vuex.actions.GROUP.FETCH]: "fetching form recipients"
            }),

            ...vuex.mapWaitingActions(vuex.modules.COMPLAINT_CATEGORY, {
                [vuex.actions.COMPLAINT_CATEGORY.FETCH]: "fetching form categories"
            }),

            toggleshowFormatting() {
                toggle(this, "showFormatting");

                return this;
            },
            toggleFullScreen() {
                toggle(this, "fullScreen");

                return this;
            },

            closeComplaintForm() {
                if (this.form.id && this.form.isChanged) {
                    this.warning = true;
                } else {
                    this.dialog = false;
                    this.form = null;
                }
            },

            onDiscard() {
                this.warning = false;
                this.closeComplaintForm();
            },

            onFocusInputRecipient(event) {
                this.form.errors.clear("recipients");
                this.fetchRecipient();
            },

            async fetchRecipient() {
                let response,
                    filters = {},
                    select = ["groups:id,name"],
                    sort = ["name"];

                try {
                    response = await this[vuex.actions.GROUP.FETCH]({
                        filters,
                        select,
                        sort
                    });
                } catch (error) {}
            },

            onFocusInputCategory() {
                this.fetchCategory();
            },

            onChange() {},

            async fetchCategory() {
                let response,
                    filters = {},
                    select = ["issue_categories:id,category"],
                    sort = ["category"];

                try {
                    response = await this[vuex.actions.COMPLAINT_CATEGORY.FETCH]({
                        filters,
                        select,
                        sort
                    });
                } catch (error) {}
            },

            onSubmit() {
                if (this.validateSubjectAndDescription()) {
                    return this.submitComplaintForm();
                }
            },

            async submitComplaintForm() {
                const { form, $_uploadable_metaData = [] } = this;

                if ($_uploadable_metaData.length) {
                    form.set("uploaded_files", $_uploadable_metaData);
                }

                let v;

                try {
                    v = await this.$_managable_submitForm(form, [
                        "id",
                        "subject",
                        "description",
                        "issue_category_id",
                        "recipients",
                        "uploaded_files"
                    ]);
                } catch (error) {
                    this.$_alertable_alert("error");

                    throw error;
                }

                this.$_alertable_alert("success");

                return this.resetComplaintForm();
            },

            validateSubjectAndDescription() {
                if (!this.form.subject.length && !this.form.description.length) {
                    this.warningSubmit = true;
                }

                return !this.warningSubmit;
            },

            resetComplaintForm() {
                this.form.reset();
                this.$_uploadable_reset();
            }
        }
    };
</script>

<style lang="scss">
    .complaint-form {
        overflow: hidden;

        &__wrapper {
            width: 625px;
            height: auto !important;
            position: absolute;
            right: 15px;
            bottom: 0;
            z-index: 5;
        }

        .mce-content-body {
            min-height: 266px;
            height: 30vw;
            overflow: auto;
            padding: 0 8px;
        }

        .vuejs-uploader {
            &__btn--clear,
            &__btn--upload,
            &__queue {
                display: none;
            }
        }
        .custom-toolbar {
            background: white !important;
            padding-bottom: 8px;
            z-index: 1;
        }

        .editor {
            &__progress {
                width: 20%;
            }

            &__filename {
                max-width: 45%;
            }

            &__filelist {
                max-height: 30vw;
                overflow: auto;
                width: 100%;
                background: white;

                &--front {
                    z-index: 2;
                }

                &--back {
                    z-index: 1;
                }
            }
        }

        .v-toolbar {
            border-bottom: none !important;

            &__content {
                padding: 8px 24px;
            }
        }

        &__head-toolbar {
            .v-toolbar {
                &__content {
                    height: 40px;
                }
            }
        }

        &__wrapper {
            &.is-fullscreen {
                background-color: rgba(0, 0, 0, 0.5);
                height: 100%;
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 4;

                .complaint-form {
                    position: fixed;
                    top: 0 !important;
                    left: 0 !important;
                    bottom: 0 !important;
                    right: 0 !important;
                    width: 80vw !important;
                    height: 88vh !important;
                    margin: auto;

                    &__footer {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }

                    .v-select {
                        __selections {
                            max-height: 100px;
                            overflow: auto;
                        }
                    }
                }

                .editor {
                    &__filelist {
                        max-height: 20vh !important;
                        align-items: flex-end;
                        position: absolute;
                        bottom: 50px;
                    }
                }
            }
        }

        &__btn-submit {
            margin-top: 4px !important;
        }
    }
</style>


