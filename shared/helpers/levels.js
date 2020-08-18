const lvlCoefficient = 1.3;
const awardCoefficient = 1.3;

export const getExperienceForLevel = (index) => {
    const firstLevelExperience = 100;
    if (index === -1) return 0;

    return  (firstLevelExperience * Math.pow(lvlCoefficient, index)).toFixed(0);
};

export const getAwardForLevel = (index) => {
    if (index === -1) return 0;
    const levelExperience = getExperienceForLevel(index);
    const prevLevelExperience = getExperienceForLevel(index - 1);

    const totalExperience = levelExperience - prevLevelExperience;
    return totalExperience / 100 * 0.01;
};

export const getLevelIndexByExperience = (experience) => {
    let levelIndex = 0;

    while (levelIndex < 999) {
        if (
            getExperienceForLevel(levelIndex) <= experience &&
            getExperienceForLevel(levelIndex + 1) > experience
        ) {
            return levelIndex;
        }

        levelIndex++;
    }

    return -1;
};
