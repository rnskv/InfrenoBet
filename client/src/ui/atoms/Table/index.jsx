import React from 'react';

import { TableContainer } from './styled';

function Table({
    children, heads, rows, getRowItemColor, ...props
}) {
    const generatedRows = [];

    rows.forEach((row, index) => {
        generatedRows[index] = [];

        heads.forEach((head, id) => {
            generatedRows[index][id] = {
                value: row[head.key] !== undefined ? row[head.key] : 'x',
                color: getRowItemColor(row, head.key),
            };
            generatedRows[index].keyIndex = index;
        });
    });


    return (
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
                                row.map((item, index) => <td
                                    key={index}
                                    style={{ color: item.color }}
                                >
                                    { item.value }
                                </td>)
                            }
                        </tr>
                    ))
                }
                { children }
            </tbody>
        </TableContainer>
    );
}

export default Table;
