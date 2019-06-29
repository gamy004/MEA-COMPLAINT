<template>
    <v-menu>
        <template #activator="{ on: menu }">
            <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
                <v-btn
                icon
                :small="small"
                v-on="{ ...tooltip, ...menu }"
                >
                <v-icon :small="small">more_vert</v-icon>
                </v-btn>
            </template>
            <span>Actions</span>
            </v-tooltip>
        </template>
        <v-list>
            <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="item.handler ? item.handler(item, index) : () => {}"
            >
            <v-list-tile-title>{{ item.action }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-menu>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },

        small: {
            type: Boolean,
            default: false
        }
    }
}
</script>
