import PropTypes from 'prop-types';
import React from 'react';

import { TableContainer, EmptyText } from './styled';

function Table({
    children, heads, rows, getRowItemColor, getRowItemValue, emptyText, ...props
}) {
    const generatedRows = [];

    rows.forEach((row, index) => {
        generatedRows[index] = [];

        heads.forEach((head, id) => {
            generatedRows[index][id] = {
                value: getRowItemValue(row, head.key),
                color: getRowItemColor(row, head.key),
            };
            generatedRows[index].keyIndex = index;
        });
    });


    return (
        <>
            <TableContainer {...props}>
                <tbody>
                    <tr>
                        {
                            heads.map((head, index) => <td key={index}>{ head.name }</td>)
                        }
                    </tr>
                    {
                        generatedRows.map((row) => (
                            <tr key={row.keyIndex}>
                                {
                                    row.map((item, index) => (
                                        <td
                                            key={index}
                                            style={{ color: item.color }}
                                        >
                                            <div>
                                                { item.value }
                                            </div>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    { children }
                </tbody>
            </TableContainer>
            { rows.length === 0 ? (
                <EmptyText>
                    { emptyText }
                </EmptyText>
            ) : null}
        </>
    );
}

Table.propTypes = {
    emptyText: PropTypes.string,
    heads: PropTypes.array,
    rows: PropTypes.array,
    getRowItemColor: PropTypes.func,
    getRowItemValue: PropTypes.func,
};

Table.defaultProps = {
    emptyText: 'Нет данных',
    heads: [],
    rows: [],
    getRowItemColor: () => 'white',
    getRowItemValue: (row, key) => row[key],
};

export default Table;
