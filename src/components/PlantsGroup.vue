<template>
    <div>
        <div class="gens-container">
            <Plant
                v-for="plant of plantsModel"
                :key="plant.id"
                v-bind:gens="plant.gens"
                v-bind:best="bestPlants.includes(plant.id)"
                v-on:deleteGen="deletePlant(plant.id)"
                v-on:change="onPlantChange($event, plant.id)"
            />
        </div>
        <div class="controls-wrapper">
            <v-btn elevation="2" @click="addPlant"><v-icon left>mdi-plus</v-icon>Add gen</v-btn>
            <v-btn elevation="2" @click="deleteGroup"><v-icon left>mdi-delete</v-icon>Delete group</v-btn>
        </div>
    </div>
</template>

<script>
import Plant from "./Plant.vue";
import getBestPlants from '../services/crossbreeding.service';

export default {
    props: {
        plants: Array 
    },
    data: () => ({
        plantsModel: [],
        bestPlants: []
    }),
    components: {
        Plant,
    },
    methods: {
        deletePlant(id) {
            const index = this.plantsModel.findIndex(plant => plant.id === id);
            this.plantsModel.splice(index, 1);
            this.$emit('change', this.plantsModel);
            this.updateBestPlants();
        },
        addPlant() {
            const lastItem = this.plantsModel[this.plantsModel.length-1];
            const id = lastItem ? lastItem.id + 1 : 1;
            this.plantsModel.push({ id, gens: null });
            this.$emit('change', this.plantsModel);
            this.updateBestPlants();
        },
        onPlantChange(newGens, id) {
            this.plantsModel.find(plant => plant.id === id).gens = newGens;
            this.$emit('change', this.plantsModel);
            this.updateBestPlants();
        },
        deleteGroup() {
            this.$emit('deleteGroup');
        },
        updateBestPlants() {
            this.bestPlants = getBestPlants(this.plantsModel);
        }
    },
    watch: {
        plants: {
            immediate: true,
            handler: function(newPlants) {
                this.plantsModel = newPlants || [];
                this.updateBestPlants();
            }
        }
    }
};
</script>

<style>
.gens-container {
    margin-bottom: 20px;
}

.gens-container > *:not(:last-child) {
    margin-bottom: 10px;
}

.controls-wrapper {
    display: flex;
    justify-content: space-between;
}
</style>