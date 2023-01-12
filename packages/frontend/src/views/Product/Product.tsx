import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DataTable, { DataItemRow } from "../../components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { PagedResult } from "../../models/PagedResult";
import { ProductHeaders } from "../../util/tableHeaders";
import { ProductModel } from "../../models/ProductModel";
import { ProductStyles } from "./Product.Styles";
import Shared from "../../util/shared";
import { useAppContext } from "../../context/app";
import { useAuthContext } from "../../context/auth";
import { useNotificationContext } from "../../context/notification";
import { useProductService } from "../../services/prduct.service";

const Product: React.FC = () => {
  const authContext = useAuthContext();
  const appContext = useAppContext();
  const productService = useProductService(authContext.getToken());
  const notificationContext = useNotificationContext();
  const column = ProductHeaders;

  const [productList, setProductList] = useState<PagedResult<ProductModel[]>>({
    count: 0,
    items: [],
  });

  const [selected, setSelected] = useState<string[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDes, setProductDes] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [editProductID, setEditProductID] = useState<string>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (!editProductID) {
        setExpanded(isExpanded ? panel : false);
      }
    };

  const onChangeProductDes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductDes(event.target.value);
  };

  const onChangeProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleChangeFavorite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(event.target.checked);
  };

  useEffect(() => {
    getProductDetails(pageNumber);
  }, []);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setPageNumber(page);
    if (page !== pageNumber) {
      getProductDetails(page);
    }
  };

  const setEditMode = (product: ProductModel) => {
    if (product._id) {
      setEditProductID(product._id);
      setProductDes(product.productDes);
      setProductName(product.productName);
      setFavorite(product.favorite);
      setExpanded("panel1");
    }
  };

  const getProductDetails = async (page: number): Promise<void> => {
    appContext.setLoading(true, "get-product");
    try {
      const productList = await productService.getList(page);
      setProductList(productList);
    } catch (error) {
      if (Shared.isApiError(error)) {
        notificationContext.showMessage({
          message: error.error,
          type: "error",
        });
      }
    } finally {
      appContext.setLoading(false, "get-product");
    }
  };

  const onClickSave = async (): Promise<void> => {
    try {
      appContext.setLoading(true, "add-product");
      await productService.upsertProduct({
        _id: productId,
        productName,
        productDes,
        favorite,
      });

      getProductDetails(pageNumber);
      onClickClear();

      notificationContext.showMessage({
        message: "Product has been added successfully",
        type: "success",
      });
    } catch (error) {
      if (Shared.isApiError(error)) {
        notificationContext.showMessage({
          message: error.error,
          type: "error",
        });
      }
    } finally {
      appContext.setLoading(false, "add-product");
    }
  };

  const editProduct = async (): Promise<void> => {
    if (editProductID) {
      appContext.setLoading(true, "edit-product");
      try {
        await productService.upsertProduct({
          _id: editProductID,
          productDes,
          productName,
          favorite,
        });

        getProductDetails(pageNumber);

        onClickClear();
        notificationContext.showMessage({
          message: "Product has been updated successfully",
          type: "success",
        });
      } catch (error) {
        if (Shared.isApiError(error)) {
          notificationContext.showMessage({
            message: error.error,
            type: "error",
          });
        }
      } finally {
        appContext.setLoading(false, "edit-product");
      }
    }
  };

  const deleteProduct = async (id?: string): Promise<void> => {
    if (id) {
      appContext.setLoading(true, "delete-product");
      try {
        await productService.deleteProduct(id);

        getProductDetails(pageNumber);

        notificationContext.showMessage({
          message: "Product has been deleted successfully",
          type: "success",
        });
      } catch (error) {
        if (Shared.isApiError(error)) {
          notificationContext.showMessage({
            message: error.error,
            type: "error",
          });
        }
      } finally {
        appContext.setLoading(false, "delete-product");
      }
    }
  };

  const onClickClear = (): void => {
    setEditProductID("");
    setProductId("");
    setProductName("");
    setProductDes("");
    setFavorite(false);
    setExpanded(false);
  };

  const rows: DataItemRow[] = useMemo((): DataItemRow[] => {
    const list: DataItemRow[] = productList.items.map((c: ProductModel) => ({
      key: c._id as string,
      items: [
        {
          name: "productName",
          type: "string",
          value: c.productName,
          render: c.productName ? c.productName : "-",
        },
        {
          name: "favorite",
          type: "string",
          value: c.favorite,
          render: c.favorite ? "Yes" : "NO",
        },
        {
          name: "productDes",
          type: "string",
          value: c.productDes,
          render: c.productDes ? c.productDes : "-",
        },
        {
          name: "edit",
          type: "boolean",
          value: "",
          render: (
            <Button
              onClick={() => setEditMode(c)}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          ),
        },
        {
          name: "delete",
          type: "boolean",
          value: "",
          render: (
            <Button
              onClick={() => deleteProduct(c._id)}
              color="secondary"
              variant="contained"
            >
              Delete
            </Button>
          ),
        },
      ],
    }));
    return list;
  }, [productList]);

  return (
    <ProductStyles>
      <PageWrapper pageTitle="Products">
        <Grid container>
          <Grid item xs={12}>
            <Accordion
              elevation={4}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="summary"
              >
                <Typography>
                  {editProductID ? "Update" : "Add"} Product
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={favorite}
                            onChange={handleChangeFavorite}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Favorite"
                        labelPlacement="top"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Product Name"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      name="company"
                      value={productName}
                      onChange={onChangeProductName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Product Des"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      name="company"
                      value={productDes}
                      onChange={onChangeProductDes}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>

              <Divider />
              <AccordionActions>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={onClickClear}
                >
                  Clear
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={editProductID ? editProduct : onClickSave}
                >
                  {editProductID ? "Update" : "Add"}
                </Button>
              </AccordionActions>
            </Accordion>
          </Grid>
        </Grid>
        {!editProductID && (
          <Paper className="paper" elevation={4}>
            <Grid container>
              <Grid item xs={12}>
                <DataTable
                  rows={rows}
                  columns={column}
                  hideShowAll={true}
                  showHeader={true}
                  selected={selected}
                  setSelected={setSelected}
                  noDataText={Shared.messages.NO_DATA_AVAILABLE}
                />
              </Grid>

              <Grid container justifyContent="center" className="pagination">
                <Pagination
                  page={pageNumber}
                  count={Math.ceil(productList.count / 10)}
                  onChange={onChangePage}
                  color="primary"
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </PageWrapper>
    </ProductStyles>
  );
};

export default Product;
