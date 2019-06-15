import {
    vuexable
} from './vuexable';

export const paginatable = {
    mixins: [vuexable],

    data() {
        return {
            paginatable_rowsPerPage: [
                10, 15, 20, 25, 50, 100
            ]
        };
    },

    computed: {
        $_paginatable_module() {
            return '';
        },

        $_paginatable_pagination: {
            get() {
                return this.$_paginatable_module ?
                    this.$_vuexable_getState("pagination", this.$_paginatable_module) : {};
            },
            set(value) {
                this.$_vuexable_setPagination(value, this.$_paginatable_module);
            }
        },

        $_paginatable_total: {
            get() {
                return this.$_paginatable_module ?
                    this.$_vuexable_getState("totalItems", this.$_paginatable_module) : {};
            },
            set(value) {
                this.$_vuexable_setState({
                    key: "totalItems",
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_currentPage: {
            get() {
                const {
                    page = 1
                } = this.$_paginatable_pagination;

                return page;
            },
            set(value) {
                this.$_vuexable_updatePagination({
                    key: 'page',
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_isFirstPage() {
            return this.$_paginatable_currentPage === 1;
        },

        $_paginatable_isLastPage() {
            const {
                rowsPerPage = 10,
                    page = 1
            } = this.$_paginatable_pagination;

            return page * rowsPerPage > this.$_paginatable_total;
        },

        $_paginatable_rowsPerPage: {
            get() {
                const {
                    rowsPerPage = 10
                } = this.$_paginatable_pagination;

                return rowsPerPage;
            },
            set(value) {
                this.$_vuexable_updatePagination({
                    key: 'rowsPerPage',
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_sortBy: {
            get() {
                const {
                    sortBy = 'id'
                } = this.$_paginatable_pagination;

                return sortBy;
            },
            set(value) {
                this.$_vuexable_updatePagination({
                    key: 'sortBy',
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_descending: {
            get() {
                const {
                    descending = false
                } = this.$_paginatable_pagination;

                return descending;
            },
            set(value) {
                console.log({
                    key: 'descending',
                    value
                });

                this.$_vuexable_updatePagination({
                    key: 'descending',
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_currentPaginatedList() {
            return this.$_vuexable_getPaginatedValues(
                this.$_paginatable_currentPage,
                this.$_paginatable_module
            );
        },

        $_paginatable_startOfPage() {
            const {
                rowsPerPage = 10,
                    page = 1
            } = this.$_paginatable_pagination;

            return (page - 1) * rowsPerPage;
        },

        $_paginatable_endOfPage() {
            const {
                rowsPerPage = 10,
                    page = 1
            } = this.$_paginatable_pagination;

            return this.$_paginatable_isLastPage ? this.$_paginatable_total : (page * rowsPerPage);
        },

        $_paginatable_currentPageRange() {
            const {
                $_paginatable_startOfPage,
                $_paginatable_endOfPage,
                $_paginatable_total
            } = this;

            return `${$_paginatable_startOfPage}-${$_paginatable_endOfPage} of ${$_paginatable_total}`;
        },

        $_paginatable_isSelectedAll() {
            return _.every(
                this.$_paginatable_currentPaginatedList,
                ['selected', true]
            );
        },

        $_paginatable_someSelected() {
            return _.some(
                this.$_paginatable_currentPaginatedList,
                ['selected', true]
            );
        }
    },

    methods: {
        $_paginatable_toPrevPage() {
            return this.$_paginatable_toPage(
                this.$_paginatable_currentPage - 1
            );
        },

        $_paginatable_toNextPage() {
            return this.$_paginatable_toPage(
                this.$_paginatable_currentPage + 1
            );
        },

        $_paginatable_toPage(value) {
            this.$_vuexable_updatePagination({
                key: 'page',
                value
            }, this.$_paginatable_module);
        },

        $_paginatable_selectAll(value) {
            this.$_paginatable_currentPaginatedList.map(({
                id = null
            }) => {
                if (id) {
                    this.$_vuexable_update({
                        key: 'selected',
                        id,
                        value
                    }, this.$_paginatable_module);
                }
            });
        }
    }
};

export default paginatable;
