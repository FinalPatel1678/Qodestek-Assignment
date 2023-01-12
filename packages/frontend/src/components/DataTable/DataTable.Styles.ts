import { TableSortLabel } from "@mui/material";
import styled from "@emotion/styled";

export const DataTableStyles = styled.div({
  ".TableCell": {
    paddingLeft: 32,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 0,
    background: "transparent",
  },
  ".TableRow": {
    background: "transparent",
  },
  ".TableHead": {
    background: "transparent",
  },
  ".TableBody": {
    background: "transparent",
  },
  ".Paper": {
    background: "transparent",
  },
  ".TableContainer": {
    background: "transparent",
    width: "100%",
  },
  ".Table": {
    background: "transparent",
  },
  ".mobile": {
    display: "none",
  },
  ".desktop": {
    display: "contents",
  },
  ".mobileTableWrapper": {
    padding: 10,
  },
  ".divider": {
    marginTop: 10,
  },
  ".formControlLabel": {
    paddingLeft: 20,
  },
  ".noDataText": {
    color: "grey",
  },
  ".textAlignCenter": {
    textAlign: "center",
  },
});

export const StyledTableSortLabel = styled(TableSortLabel)({
  ".icon": {
    color: "#000000 !important",
  },
  ".root": {
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: 0,
    fontSize: 13,
    "&:hover": {
      color: "#000000",
    },
  },
});
