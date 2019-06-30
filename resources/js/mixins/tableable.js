const tableable = {
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        pagination: {
            type: Object,
            default: () => ({})
        },
        items: {
            type: Array,
            default: () => []
        },
        vModelSelected: {
            type: Array,
            default: () => []
        },
        totalItems: {
            type: Number,
            default: 0
        },
        itemKey: {
            type: String,
            default: 'id'
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        searchLabel: {
            type: String,
            default: 'Search'
        },
        hideItemActions: {
            type: Boolean,
            default: () => false
        },
        actions: {
            type: Array,
            default: () => [
                "edit",
                "delete"
            ]
        },
        showTitle: {
            type: Boolean,
            default: () => true
        },
        showSearch: {
            type: Boolean,
            default: () => true
        },
        hideActions: {
            type: Boolean,
            default: () => false
        },
        hideHeaders: {
            type: Boolean,
            default: () => false
        },
        selectable: {
            type: [Number, Boolean],
            default: () => false
        },
        multipleSelect: {
            type: Boolean,
            default: () => true
        },
        paginatable: {
            type: Boolean,
            default: () => false
        }
    },

    model: {
        prop: "vModelSelected",
        event: "change"
    },

    data() {
        return {
            showProgress: this.loading,
            keyword: this.pagination.search && this.pagination.search.keyword ?
                this.pagination.search.keyword : '',
            paginationSync: {
                search: {
                    keyword: '',
                    fields: []
                },
                descending: false,
                rowsPerPage: 10,
                page: this.$route.query.page || 1,
                ...this.pagination
            },
            selected: this.vModelSelected
        };
    },

    computed: {
        computedTotalItems() {
            const {
                length
            } = this.items;

            return !this.totalItems && length ? length : this.totalItems;
        },

        $_tableable_mixin_pagination_pages() {
            return this.computedTotalItems > 0 ?
                _.round(this.computedTotalItems / this.paginationSync.rowsPerPage) :
                0;
        },

        $_tableable_mixin_pagination_page: {
            get() {
                const {
                    page
                } = this.paginationSync;

                return page;
            },

            set(page) {
                this.paginationSync = {
                    ...this.paginationSync,
                    page
                };
            }
        },

        searchKeyword: {
            get() {
                const {
                    keyword
                } = this.paginationSync.search;

                return keyword;
            },

            set(keyword) {
                let search = {
                    ...this.paginationSync.search,
                    keyword
                };

                this.paginationSync = {
                    ...this.paginationSync,
                    search
                };
            }
        },

        searchFields: {
            get() {
                const {
                    fields
                } = this.paginationSync.search;

                return fields;
            },

            set(fields) {
                let search = {
                    ...this.paginationSync.search,
                    fields
                };

                this.paginationSync = {
                    ...this.paginationSync,
                    search
                };
            }
        }
    },

    watch: {
        pagination: {
            handler(v) {
                this.paginationSync = {
                    ...v
                };
            },
            deep: true
        },
        paginationSync: {
            handler(v) {
                this.emitUpdatePagination(v);
            },
            deep: true
        },
        vModelSelected(v) {
            if (v && !_.isEqual(this.selected, v)) {
                this.selected = [...v];

            }
        },
        selected(v) {
            if (v.length > 1 && !this.multipleSelect) {
                this.selected = [_.last(v)];

                return;
            }

            this.$emit("change", v);
        },
        loading(v) {
            this.showProgress = v;
        }
    },

    methods: {
        getHeaderThClass({
            value,
            align = 'right',
            sortable = true
        }) {
            return [
                "column",
                this.getAlignClass(align),
                sortable ? "sortable" : "",
                this.paginationSync.descending ? "desc" : "asc",
                value === this.paginationSync.sortBy ? "active" : ""
            ];
        },
        getAlignClass(align = 'right') {
            return `text-xs-${align}`;
        },
        isSortable({
            sortable = true
        }) {
            return sortable;
        },
        isAlign({
            align = 'right'
        }, value) {
            return align === value;
        },
        toggleAll() {
            if (this.selected.length) {
                this.selected = [];
            } else {
                this.selected = this.items.slice();
            }
        },
        changeSort({
            value,
            sortable = true
        }) {
            if (!sortable) return;

            if (this.paginationSync.sortBy === value) {
                this.$set(
                    this.paginationSync,
                    "descending",
                    !this.paginationSync.descending
                );
            } else {
                this.$set(this.paginationSync, "sortBy", value);
                this.$set(this.paginationSync, "descending", false);
            }
        },
        updateKeywordPagination() {
            this.searchKeyword = this.keyword;

            return this;
        },
        emitUpdatePagination(v) {
            this.$emit("update:pagination", v);
        },
        emitAction(action, ...v) {
            this.$emit(`action:${_.camelCase(action)}`, ...v);
        },

        onClickRow(event, props) {
            this.$emit('click:item', event, props.item);
        }
    },

    created() {
        this.emitUpdatePagination = _.debounce(this.emitUpdatePagination, 300);
    }
}

export default tableable;
