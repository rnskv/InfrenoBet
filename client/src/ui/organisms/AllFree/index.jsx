import React from 'react';
import { Background, Container } from './styled';

const AllFree = () => {
    return (
        <Background>
            <Container>
                <h1>Раздел отключен.</h1>
                До <b>01.01.2021</b> все игры полностью бесплатны! Каждое воскресенье, люди, которым посчастливилось накопить на балансе <b>5000</b> монет, получат выплату в размере <b>1000</b> рублей.
            </Container>
        </Background>
    )
}

export default AllFree;