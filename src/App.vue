<template>
    <v-app>
        <div class="main-wrapper">
            <div class="main-container">
                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="group in groups" :key="group.id">
                        <v-expansion-panel-header>
                            <h4>{{group.name}}</h4>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <PlantsGroup
                                v-bind:plants="group.plants"
                                v-on:change="onGroupChange($event, group.id)"
                                v-on:deleteGroup="onGroupDelete(group.id)"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div class="new-group-container">
                    <v-text-field
                        placeholder="New group name"
                        solo
                        :append-icon="'mdi-plus'"
                        v-model="newGroupNameModel"
                        @click:append="addGroup"
                    ></v-text-field>
                </div>
                <AppInformation />
            </div>
        </div>
    </v-app>
</template>

<script>
import PlantsGroup from "./components/PlantsGroup.vue";
import AppInformation from "./components/AppInformation.vue";

export default {
    name: "App",

    components: {
        PlantsGroup,
        AppInformation
    },

    data: () => ({
        // groups: [
        //     {
        //         id: 1,
        //         name: "Красные ягоды",
        //         plants: [
        //             { id: 1, gens: "GGGWYX" },
        //             { id: 2, gens: "YYYGGG" },
        //             { id: 3, gens: "WXGYHH" },
        //         ],
        //     },
        //     {
        //         id: 2,
        //         name: "Синие ягоды",
        //         plants: [
        //             { id: 1, gens: "GGGWYX" },
        //             { id: 2, gens: "YYYGGG" },
        //             { id: 3, gens: "WXGYHH" },
        //         ],
        //     },
        // ],
        groups: [],
        newGroupNameModel: "",
    }),
    created: function () {
        this.loadData();
    },
    methods: {
        loadData() {
            try {
                this.groups = JSON.parse(localStorage.getItem("groups")) || [];
            } catch {
                this.groups = [];
            }
        },
        saveData() {
            localStorage.setItem("groups", JSON.stringify(this.groups));
        },
        addGroup() {
            const lastItem = this.groups[this.groups.length - 1];
            const id = lastItem ? lastItem.id + 1 : 1;
            this.groups.push({
                id,
                name: this.newGroupNameModel || id,
                plants: [],
            });
            this.newGroupNameModel = "";
            this.saveData();
        },
        onGroupChange(newPlants, id) {
            this.groups.find((group) => group.id === id).plants = newPlants;
            this.saveData();
        },
        onGroupDelete(id) {
            const index = this.groups.findIndex((group) => group.id === id);
            this.groups.splice(index, 1);
            this.saveData();
        },
    },
};
</script>

<style>
.main-wrapper {
    background-color: #9fbb92 !important;
    padding: 20px;
    min-height: 100vh;
}
.main-container {
    max-width: 1024px;
    margin: 0 auto;
}
.new-group-container {
    margin-top: 20px;
    max-width: 400px;
}
</style>
