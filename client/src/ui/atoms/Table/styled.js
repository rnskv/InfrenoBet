import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';

export const TableContainer = styled.table`
width: 100%;
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
  }
`;
