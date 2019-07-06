import {
    vuexable
} from './vuexable';

export const paginatable = {
    mixins: [vuexable],

    data() {
        return {
            paginatable_rowsPerPage: [
                10, 15, 20, 25, 50, 100
            ],
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

        $_paginatable_totalPage() {
            return Math.ceil(this.$_paginatable_total / this.$_paginatable_rowsPerPage);
        },

        $_paginatable_prevPage() {
            let prevPage = this.$_paginatable_currentPage - 1;

            if (prevPage < 1) {
                prevPage = 1;
            }

            return prevPage;
        },

        $_paginatable_nextPage() {
            let nextPage = this.$_paginatable_currentPage + 1;

            if (nextPage > this.$_paginatable_totalPage) {
                nextPage = this.$_paginatable_totalPage;
            }

            return nextPage;
        },

        $_paginatable_isFirstPage() {
            return _.toInteger(this.$_paginatable_currentPage) == 1;
        },

        $_paginatable_isLastPage() {
            return _.toInteger(this.$_paginatable_currentPage) == this.$_paginatable_totalPage;
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

        $_paginatable_selected: {
            get() {
                return this.$_vuexable_getState(
                    "selected",
                    this.$_paginatable_module
                )
            },

            set(value) {
                this.$_vuexable_setState({
                        key: "selected",
                        value
                    },
                    this.$_paginatable_module
                )
            }
        },

        $_paginatable_paginatedSelected() {
            const {
                $_paginatable_currentPaginatedList = []
            } = this;
            return _.map($_paginatable_currentPaginatedList, "id").reduce(
                (res, id) => {
                    this.$set(res, id, this.$_paginatable_selected[id]);

                    return res;
                }, {}
            )
        },

        $_paginatable_isSelectedAll() {
            return _.every(
                Object.values(this.$_paginatable_paginatedSelected),
                Boolean
            );
        },

        $_paginatable_someSelected() {
            return _.some(
                Object.values(this.$_paginatable_paginatedSelected),
                Boolean
            );
        },
    },

    methods: {
        $_paginatable_toPrevPage() {
            return this.$_paginatable_toPage(this.$_paginatable_prevPage);
        },

        $_paginatable_toNextPage() {
            return this.$_paginatable_toPage(this.$_paginatable_nextPage);
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
                    // this.$_vuexable_update({
                    //     key: id,
                    //     value,
                    //     attr: 'selected'
                    // }, this.$_paginatable_module);

                    this.$_vuexable_updateState({
                        key: "selected",
                        attr: id,
                        value
                    }, this.$_paginatable_module);
                }
            });
        },

        $_paginatable_updatedSelected() {
            this.$_paginatable_currentPaginatedList.map(({
                id = null
            }) => {
                if (id) {
                    const stateSeletected = this.$_paginatable_selected.hasOwnProperty(id) ?
                        this.$_paginatable_selected[id] : false;

                    // this.$_vuexable_update({
                    //     key: id,
                    //     value: stateSeletected,
                    //     attr: "selected"
                    // }, this.$_paginatable_module);

                    this.$_vuexable_updateState({
                        key: "selected",
                        attr: id,
                        value: stateSeletected
                    }, this.$_paginatable_module);
                }
            });
        },

        // $_paginatable_attachSelected(value = []) {
        //     value.forEach(v => this.$set(this.paginatable_selected, v, true));
        // },

        // $_paginatable_detachSelected(value) {
        //     value.forEach(v => this.$set(this.paginatable_selected, v, false));
        // },

        $_paginatable_syncSelected(arr = [], value = null) {
            const selected = {
                ...this.$_paginatable_selected
            };

            arr.forEach(v => this.$set(selected, v, value !== null ? value : !selected[v]));

            this.$_paginatable_selected = {
                ...selected
            };
        },
    }
};

export default paginatable;
