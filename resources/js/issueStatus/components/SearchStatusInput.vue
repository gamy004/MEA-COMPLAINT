<template>
    <div>
        <v-text-field
            flat
            solo
            color="deep-orange"
            hide-details
            label="Search status"
            prepend-inner-icon="search"
            :loading="isSearchingStatus"
            v-model="searchKeyword"
            class="search-status__input"
            @keyup.enter.prevent="search"
        >
        </v-text-field>
    </div>
</template>

<script>
import { vuex, vuexable } from '../../mixins/vuexable';
import issueStatusMixin from '../../mixins/issue-status-mixin';
export default {
    mixins: [issueStatusMixin, vuexable],

    data() {
        return {
            searchKeyword: "",
        }
    },

    computed: {
        ...vuex.mapWaitingGetters({
            isSearchingStatus: "search status fetching"
        })
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE_STATUS, {
            searchStatus: {
                action: vuex.actions.ISSUE_STATUS.FETCH,
                loader: "search status fetching"
            }
        }),

        search() {
            let value = {
                keyword: "",
                fields: []
            };

            if (this.searchKeyword.length) {
                value = {
                    keyword: this.searchKeyword,
                    fields: [
                        "status"
                    ]
                };
            }

            this.$_vuexable_updatePagination({
                key: "search",
                value
            }, vuex.modules.ISSUE_STATUS);

            return this.searchStatus({
                pagination: this.$_issue_status_mixin_pagination
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.search-status {
    &__input {
        width: 300px;
    }
}
</style>
