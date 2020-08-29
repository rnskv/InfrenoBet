import React from 'react';
import { Background, Container } from './styled';

const AllFree = () => {
    return (
        <Background>
            <Container>
                <h1>Раздел отключен.</h1>
                <p>
                    Играй бесплатно и получай реальные деньги!<br/>
                    До <b>01.01.2021</b>, каждую неделю, <br/>все игроки,
                    попавшие в <b>ТОП-3</b> игроков недели, <br/>
                    получат подарок - до <b>1000</b> рублей
                </p>
            </Container>
        </Background>
    )
}

export default AllFree;