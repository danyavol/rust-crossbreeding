<template>
    <div>
        <div class="plant-gens-input" v-if="editMode">
            <v-text-field
                placeholder="X X X X X X"
                solo
                :rules="[validation.gens]"
                :append-icon="'mdi-content-save-outline'"
                :append-outer-icon="'mdi-delete'"
                v-mask="genMask"
                v-model="gensModel"
                @click:append="saveGen"
                @click:append-outer="deleteGen"
            ></v-text-field>
        </div>
        <div class="plant-gens-container" v-if="!editMode" >
            <div class="plant-gens">
                <span
                    v-for="gen of gensModel"
                    :key="gen.id"
                    v-bind:class="[
                        'gen',
                        {
                            'bad-gen': isBadGen(gen),
                            'good-gen': !isBadGen(gen),
                        },
                    ]"
                    >{{ gen }}</span
                >
            </div>
            <v-btn icon small color="indigo" @click="editGen">
                <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        gens: String,
    },
    data: () => ({
        genRegEx: /(W|X|H|G|Y)|(w|x|h|g|y)/,
        gensModel: '',
        editMode: true,
        validation: {
            gens: (value) => (value && value.length >= 6) || "Enter all 6 gens",
        },
    }),
    methods: {
        saveGen() {
            if (this.validation.gens(this.gensModel) === true) {
                this.editMode = false;
                this.$emit('change', this.gensModel);
            }
        },
        editGen() {
            this.editMode = true;
        },
        deleteGen() {
            this.$emit('deleteGen');
        },
        isBadGen(gen) {
            return gen === "X" || gen === "W";
        },
    },
    computed: {
        genMask: {
            get: function () {
                const mask = [];
                for (let i = 0; i < 6; i++)
                    mask.push(this.genRegEx);
                return mask;
            },
        },
    },
    watch: {
        gens: {
            immediate: true,
            handler: function (newGens) {
                this.gensModel = newGens;
                if (this.validation.gens(newGens) === true) this.editMode = false;
            }
        },
        gensModel: function (newGens) {
            this.gensModel = newGens.toUpperCase();
        }
    },
};
</script>

<style>
.plant-gens-input {
    max-width: 225px;
}

.plant-gens-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.plant-gens {
    padding: 3px;
    background-color: #e7e7e7;
    border-radius: 25px;
}

.gen {
    display: inline-block;
    margin: 3px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
}

.good-gen {
    background-color: #70d376;
    color: white;
}

.bad-gen {
    background-color: #f16868;
    color: white;
}
</style>