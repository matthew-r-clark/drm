import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  TableSortLabel,
  TablePagination,
} from '@material-ui/core';
import {
  always,
  concat,
  ifElse,
  join,
  length,
  lt,
  path,
  pipe,
  prop,
  sort,
  tail,
} from 'ramda';
import styled from '@emotion/styled';

import { DesktopOnly, MobileOnly } from 'components/MediaQuery';
import colors from 'styles/colors';

const TableRow = styled(MuiTableRow)(({ nohover }) => ({
  height: 33,
  '&:hover': {
    cursor: nohover ? 'auto' : 'pointer',
  },
}));

const generateAkaString = pipe(
  prop('aliases'),
  ifElse(
    pipe(
      length,
      lt(1),
    ),
    pipe(
      tail,
      join(', '),
      concat('aka: '),
    ),
    always(''),
  ),
);

function descendingComparator(a, b, orderBy) {
  if (Array.isArray(a[orderBy])) {
    return a[orderBy].length - b[orderBy].length;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const getInitialCharCode = (word) => word.toLowerCase().charCodeAt();
const alphaSortName = (a, b) => getInitialCharCode(a) - getInitialCharCode(b);

const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headers,
  sortDisabled,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow nohover={sortDisabled}>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align="left"
            sortDirection={orderBy === header.id ? order : false}
            style={{ fontWeight: 'bold' }}
          >
            {sortDisabled
              ? header.label
              : (
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : 'asc'}
                  onClick={createSortHandler(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function EnhancedTable({
  headers,
  mobileHeaders,
  rows,
  setIsModalOpen,
  setSelectedPartnerId,
  defaultOrder,
  defaultOrderBy,
  sortDisabled,
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setOrderBy(defaultOrderBy);
  }, [defaultOrderBy]);

  useEffect(() => {
    setOrder(defaultOrder);
  }, [defaultOrder]);

  useEffect(() => {
    setPage(0);
    if (sortDisabled) {
      setOrder(defaultOrder);
    }
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, partnerId) => {
    setSelectedPartnerId(partnerId);
    setIsModalOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer style={{ marginBottom: 53 }}>
        <Table size="small" padding="checkbox">
          <DesktopOnly>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headers={headers}
              sortDisabled={sortDisabled}
            />
          </DesktopOnly>
          <MobileOnly>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headers={mobileHeaders}
              sortDisabled={sortDisabled}
            />
          </MobileOnly>
          <TableBody>
            {sort(getComparator(order, orderBy), rows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    title={generateAkaString(row)}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {path(['aliases', '0'], row)}
                    </TableCell>
                    <DesktopOnly>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                    </DesktopOnly>
                    <TableCell align="left">
                      {row.connected_ministers && pipe(
                        sort(alphaSortName),
                        join(', '),
                      )(row.connected_ministers)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 15, 20, 25, 50, 100]}
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          backgroundColor: colors.white,
        }}
      />
    </div>
  );
}
