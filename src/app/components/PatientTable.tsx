import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  header : {
      backgroundColor : 'rgba(245,245,245,1) ',
      color :'var(--blue)',
      fontFamily: "var(--font)",
      fontWeight : "lighter"
  },
  cell : {
      color : 'inherit',
      backgroundColor : 'rgba(245,245,245,1)',
      fontFamily: "inherit",
      fontWeight : "inherit",
      padding : "20px"
  }
});

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}
export interface PatientData {
    uid : string
}
export interface TableProps {
    style : React.CSSProperties,
    paginationStyle : React.CSSProperties,
    columns : Column[],
    data :  PatientData[],
}
export default function StickyHeadTable({style,paginationStyle,columns,data} : TableProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value));
    setPage(0);
  };

  return (
      <>
      <TableContainer style={style} className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.header}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                    className={classes.cell}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uid}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={paginationStyle}
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </>
  );
}
