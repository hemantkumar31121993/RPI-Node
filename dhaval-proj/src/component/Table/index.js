import React from 'react';
import PropTypes from 'prop-types';
import {TableContainer, Table as MTable, TableBody, TableHead, TableRow, TableCell, Paper, TextField} from '@material-ui/core';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortKey: null,
            direction: null,
        }

        this.handleSort = this.handleSort.bind(this);
    }
    // props: {data: Array, columns:Array[{title, key, renderer}]}

    handleSort(key) {
        this.setState(prevState => ({
            sortKey: key,
            direction: (prevState.sortKey === key)?!prevState.direction:true,
        }), () => this.props.sortFunction(this.state.sortKey, this.state.direction) );
    }

    render() {
        const {data, onRowClick} = this.props;
        const columns = this.props.children.map(c => c.props);
        const {sortKey, direction} = this.state;
        return(
            <TableContainer component={Paper} >
                <MTable>
                    <TableHead>
                        <TableRow>
                            {columns && columns.map(column => 
                                <TableCell onClick={() => column.isSortable && this.handleSort(column.columnKey)} key={`th-${column.columnKey}`}>
                                    <div style={{display: 'flex'}}>
                                        {column.title || ''}
                                        
                                        {column.isSortable && column.columnKey !== sortKey && <UnfoldMoreIcon/> }
                                        {column.isSortable && column.columnKey === sortKey && direction && <KeyboardArrowUpIcon/>}
                                        {column.isSortable && column.columnKey === sortKey && !direction && <KeyboardArrowDownIcon/>}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {columns && columns.map((column) => 
                                <TableCell key={`th-search-${column.columnKey}`}><TextField defaultValue={column.title || ''} /></TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        {data && data.map( (row, rowIndex) => 
                            <TableRow onClick={() => onRowClick && onRowClick(row)} key={rowIndex}>
                            {columns.map((column) =>
                                <TableCell key={`tr-${rowIndex}td-${column.columnKey}`}>
                                    {(column.renderer && column.renderer(row)) || (row.get && row.get(column.columnKey)) || row[column.columnKey] }
                                </TableCell>
                            )}
                            </TableRow>
                        )}
                    </TableBody>
                </MTable>
            </TableContainer>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array,
    onRowClick: PropTypes.func,
    sortFunction: PropTypes.func,
}

class Column extends React.Component {};

Column.propTypes = {
    columnKey: PropTypes.string.isRequired,
    title: PropTypes.string,
    renderder: PropTypes.func,
    isSortable: PropTypes.bool,
}

export {Table, Column};