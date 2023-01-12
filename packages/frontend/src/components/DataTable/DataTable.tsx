import {
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";

import { StyledTableSortLabel } from "./DataTable.Styles";

export interface DataItem {
  name: string;
  type: "string" | "number" | "boolean";
  value: any;
  render: any;
  width?: number | string;
}

export interface DataItemRow {
  key: string;
  items: DataItem[];
}

function descendingComparator(
  a: DataItemRow,
  b: DataItemRow,
  orderBy: string
): number {
  const aValue = a.items.find((x) => x.name === orderBy);
  const bValue = b.items.find((x) => x.name === orderBy);

  if (!aValue) {
    return -1;
  }
  if (!bValue) {
    return 1;
  }

  if (bValue.value < aValue.value) {
    return -1;
  }

  if (bValue.value > aValue.value) {
    return 1;
  }

  return 0;
}

function getComparator(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: DataItemRow, b: DataItemRow) => descendingComparator(a, b, orderBy)
    : (a: DataItemRow, b: DataItemRow) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: DataItemRow[],
  comparator: (a: DataItemRow, b: DataItemRow) => number
) {
  const stabilizedThis = array.map((el, index) => ({ el, index }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) {
      return order;
    }
    return a.index - b.index;
  });
  return stabilizedThis.map((s) => s.el);
}

export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  align?: "left" | "right" | "justify";
}

function getAlignment(headCell: HeadCell): "left" | "right" | "justify" {
  return headCell.numeric ? "right" : "left";
}

function getRandomString(): string {
  return Math.random().toString(36).substring(5);
}

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: any, property: string) => void;
  onSelectAllClick: (event: any) => void;
  order: "asc" | "desc";
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  bulkDeleteEnabled?: boolean;
  hideShowAll: boolean;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    hideShowAll,
  } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="TableHead">
      <TableRow className="TableRow">
        {!hideShowAll && (
          <TableCell className="TableCell" width="1%">
            <Checkbox
              size="small"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={`${getRandomString()}-${headCell.id}`}
            className="TableCell"
            align={getAlignment(headCell)}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </StyledTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export interface MultiSelectTableProps {
  rows: DataItemRow[];
  columns: HeadCell[];
  selected?: string[];
  showHeader: boolean;
  setSelected?: (selected: string[]) => void;
  onEdit?: (oldRow: DataItemRow) => void;
  hideShowAll?: boolean;
  noDataText?: string;
  loading?: boolean;
}

const DataTable: React.FC<MultiSelectTableProps> = (props) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const {
    rows,
    columns,
    selected,
    setSelected,
    showHeader,
    hideShowAll,
    noDataText,
    loading,
  } = props;

  const handleRequestSort = (event: any, property: string): void => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any): void => {
    if (setSelected) {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.key);

        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    }
  };

  const handleSelectClick = (event: any, key: string): void => {
    if (setSelected) {
      const selectedIndex = selected?.indexOf(key) || 0;

      if (event.target.checked) {
        if (selectedIndex === -1) {
          setSelected([...(selected || []), key]);
        } else {
          // nothing to do
        }
      } else {
        if (selectedIndex === -1) {
          // nothing to do
        } else {
          const newSelected = [...(selected || [])];
          newSelected.splice(selectedIndex, 1);
          setSelected(newSelected);
        }
      }
    }
  };

  const isSelected = (key: string) => selected?.indexOf(key) !== -1;

  const columnLength: number = useMemo((): number => {
    return columns.length + 1;
  }, [columns.length]);

  return (
    <div>
      <TableContainer component={Paper} className="TableContainer">
        <Table
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
          className="Table"
        >
          {showHeader && (
            <EnhancedTableHead
              numSelected={selected?.length || 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={columns}
              hideShowAll={hideShowAll || false}
            />
          )}
          <TableBody className="TableBody">
            {loading ? (
              <TableRow className="TableRow">
                <TableCell colSpan={columnLength} className="TableCell">
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : (
              stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.key);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`tableRow-${getRandomString()}-${row.key}`}
                      selected={isItemSelected}
                      className="TableRow"
                    >
                      {!hideShowAll && (
                        <TableCell padding="checkbox" className="TableCell">
                          <Checkbox
                            size="small"
                            color="secondary"
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            onChange={(event) =>
                              handleSelectClick(event, row.key)
                            }
                          />
                        </TableCell>
                      )}
                      {columns.map((c) => {
                        const key = `tableCell-${getRandomString()}-${c.id}`;
                        const item = row.items.find((i) => i.name === c.id);
                        return (
                          <TableCell
                            width={item?.width}
                            align={getAlignment(c)}
                            key={key}
                            className="TableCell"
                          >
                            {item?.render || ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              )
            )}
            {!rows.length && (
              <TableRow className="TableRow">
                <TableCell colSpan={columnLength} className="TableCell">
                  <Typography align="center" className="noDataText">
                    {noDataText}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
