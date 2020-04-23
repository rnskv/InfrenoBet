import PropTypes from 'prop-types';

import React, { useState } from 'react';
import Button from 'ui/atoms/Button';
import { Vertical } from 'ui/organisms/LevelsAwards/styled';
import { useProfile } from 'src/redux/user/hooks/selectors';
import { getLevelIndexByExperience } from 'shared/helpers/levels';
import { useLevelActions } from 'src/redux/user/hooks/actions';

function AwardButton({ lvl }) {
    const [isLoading, setIsLoading] = useState(false);
    const profile = useProfile();
    const { receivedAwards } = profile;

    const currentExperience = profile.experience;

    const currentLevel = getLevelIndexByExperience(currentExperience) + 1;

    const actions = useLevelActions();

    const getAward = async () => {
        setIsLoading(true);
        await actions.getAward({ lvl });
        setIsLoading(false);
    };
    return (
        <>
            <Button
                isVisible={currentLevel > lvl}
                type="transparent"
                disabled={receivedAwards !== lvl - 1}
                onClick={getAward}
                isLoading={isLoading}
            >
                { receivedAwards > lvl - 1 ? 'Получено' : 'Получить'}
            </Button>
            <Button
                isVisible={lvl >= currentLevel}
                type="black"
                disabled
            >
                Мало опыта
            </Button>
        </>
    )
}

AwardButton.propTypes = {
    lvl: PropTypes.number.isRequired,
};

AwardButton.defaultProps = {
};

export default AwardButton;
