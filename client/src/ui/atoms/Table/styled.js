import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';

export const EmptyText = styled.div`
  color: var(--color-white);
  text-align: center;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-grey-600);
`;

export const TableContainer = styled.table`
  width: 100%;
  background-color: var(--color-grey-600);
  tr {
    color: var(--color-white);
    font-size: 12px;
    display: table-row;    
    
    &:first-child {
      font-weight: 700;
    }
  }
  
  td {
    padding: 10px;
    text-align: center;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    img {
      padding: 10px;
      display: inline;
      border-radius: 50%;
    }
  }
`;
