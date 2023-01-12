import { HeadCell } from "../components/DataTable/DataTable";

export const ProductHeaders: HeadCell[] = [
  {
    id: "productName",
    label: "Product Name",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "favorite",
    label: "Favorite",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "productDes",
    label: "Product Description",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "edit",
    label: "Action",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "delete",
    label: "Action",
    numeric: false,
    disablePadding: false,
  },
];

export const ProductFavoriteHeaders: HeadCell[] = [
  {
    id: "productName",
    label: "Product Name",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "productDes",
    label: "Product Description",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "favorite",
    label: "Action",
    numeric: false,
    disablePadding: false,
  },
];
