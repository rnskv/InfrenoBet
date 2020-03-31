import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'ui/atoms/Loader';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import {
    Container,
    StyledForm,
    Label,
    Name,
    StyledButton,
} from './styled';
import LogupForm from '../LogupForm';
import { useShallowEqualSelector } from 'src/helpers/hooks';

function Inventory() {
    const profile = useSelector((state) => state.user.profile);

    if (profile.isLoading) {
        return <Loader />
    }

    console.log(profile);

    return (<div>
       <h1>Тестовый инвентарь</h1>
        {
            profile.inventory.map(item => {
                return <div>{ item.name }</div>})
        }
   </div>)
}

Inventory.propTypes = {

};

Inventory.defaultProps = {
};

export default Inventory;
