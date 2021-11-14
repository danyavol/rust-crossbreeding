const VALUE = {
    Y: 1,
    G: 1,
    H: 0.5,
    X: 0,
    W: -0.2
};

const PRIORITY = {
    BAD_GEN: 5,
    GOOD_GEN: 3
};

export default function getBestPlants(plants) {
    const pl = plants.filter(p => p.gens != null);
    if (pl.length < 3) return [];

    let bestTrio = [];
    let bestValue = null;
    
    for (let p1 = 0; p1 < pl.length; p1++) {
        for (let p2 = 0; p2 < pl.length; p2++) {
            for (let p3 = 0; p3 < pl.length; p3++) {
                if (pl[p1].id === pl[p2].id || pl[p1].id === pl[p3].id || pl[p2].id === pl[p3].id) continue;
                const currentPlants = [pl[p1], pl[p2], pl[p3]];
                let crossbreedingValue = getCrossbreedingValue(currentPlants.map(p => p.gens));

                if (bestValue == null || bestValue.avg < crossbreedingValue.avg) {
                    bestValue = crossbreedingValue;
                    bestTrio = currentPlants.map(g => g.id);
                }
            }
        }
    }

    return bestTrio;
}

function getCrossbreedingValue(gensArray) {
    let result = {
        min: 0,
        avg: 0,
        max: 0
    };

    for (let n = 0; n < 6; n++) {
        const gens = [];
        for (let i = 0; i < gensArray.length; i++) {
            gens.push(gensArray[i][n]);
        }
        const res = getGensCrossbreedingValue(gens);
        result.min += res.min;
        result.max += res.max;
    }

    result.avg = (result.min + result.max) / 2;
    return result;
}

function getGensCrossbreedingValue(gens) {
    let result = {
        min: null,
        max: null
    };
    let scores = [
        { gen: 'Y', value: gens.filter(g => g === 'Y').length * PRIORITY.GOOD_GEN },
        { gen: 'G', value: gens.filter(g => g === 'G').length * PRIORITY.GOOD_GEN },
        { gen: 'H', value: gens.filter(g => g === 'H').length * PRIORITY.GOOD_GEN },
        { gen: 'X', value: gens.filter(g => g === 'X').length * PRIORITY.BAD_GEN },
        { gen: 'W', value: gens.filter(g => g === 'W').length * PRIORITY.BAD_GEN }
    ];
    scores = scores.sort((a, b) => b.value - a.value);
    const bestScore = scores[0].value;
    scores = scores.filter(item => item.value === bestScore);

    scores.forEach(item => {
        const potentialValue = VALUE[item.gen];
        result.max == null || result.min > potentialValue ? result.min = potentialValue : null;
        result.max == null || result.max < potentialValue ? result.max = potentialValue : null;
    });

    return result;
}