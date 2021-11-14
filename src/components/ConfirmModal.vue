<template>
    <v-dialog v-model="show" persistent max-width="400">
        <v-card>
            <v-card-title class="text-h5">
                {{ title }}
            </v-card-title>
            <v-card-text>
                {{ description }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="onCancel">
                    Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="onConfirm">
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean,
        title: String,
        description: String,
    },
    methods: {
        onConfirm: function () {
            this.$emit("confirm");
            this.show = false;
        },
        onCancel: function () {
            this.$emit("cancel");
            this.show = false;
        },
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
};
</script>

<style>
.v-card__title {
    word-break: break-word;
}
</style>