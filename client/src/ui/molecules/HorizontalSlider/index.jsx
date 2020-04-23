import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    Container,
    Next,
    Prev,
    Content,
} from './styled';

function HorizontalSlider({ children, step, initialPage }) {
    const contentRef = useRef(null);
    const [page, setPage] = useState(0);
    const [prevIsActive, setPrevIsActive] = useState(false);
    const [nextIsActive, setNextIsActvie] = useState(true);

    const move = (nextPage) => {
        const scrolledElementsWidth = contentRef.current.children[0].offsetWidth;
        const visibleContentWidth = contentRef.current.offsetWidth;
        const totalPages = Math.round(scrolledElementsWidth / visibleContentWidth);

        setNextIsActvie(nextPage < totalPages - 1);
        setPrevIsActive(nextPage > 0);

        setPage(nextPage);
    };

    const goNext = () => {
        move(page + step);
    };

    const goPrev = () => {
        move(page - step);
    };

    useEffect(() => {
        move(initialPage);
    }, []);

    return (
        <Container>
            <Prev role="button" onClick={goPrev} isActive={prevIsActive} />
            <Content ref={contentRef} translatePercent={page * 100}>
                { children }
            </Content>
            <Next role="button" onClick={goNext} isActive={nextIsActive} />
        </Container>
    );
}

HorizontalSlider.propTypes = {
    step: PropTypes.number,
    anchorRef: PropTypes.object,
};

HorizontalSlider.defaultProps = {
    step: 1,
    anchorRef: null,
};

export default HorizontalSlider;
