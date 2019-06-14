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
                console.log(value);

                this.$_vuexable_setPagination(value, this.$_paginatable_module);
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

        $_paginatable_rowsPerPage: {
            get() {
                const {
                    rowsPerPage = 10
                } = this.$_paginatable_pagination;

                return page;
            },
            set(value) {
                this.$_vuexable_updatePagination({
                    key: 'rowsPerPage',
                    value
                }, this.$_paginatable_module);
            }
        },

        $_paginatable_currentPaginatedList() {
            return this.$_vuexable_getPaginatedValues(
                this.$_paginatable_currentPage,
                this.$_paginatable_module
            );
        }


    }
};

export default paginatable;
