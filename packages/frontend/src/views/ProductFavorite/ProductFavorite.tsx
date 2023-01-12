import { Button, Grid, Pagination, Paper } from "@mui/material";
import DataTable, { DataItemRow } from "../../components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { PagedResult } from "../../models/PagedResult";
import { ProductFavoriteHeaders } from "../../util/tableHeaders";
import { ProductModel } from "../../models/ProductModel";
import { ProductStyles } from "./ProductFavorite.Styles";
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
  const column = ProductFavoriteHeaders;

  const [productList, setProductList] = useState<PagedResult<ProductModel[]>>({
    count: 0,
    items: [],
  });

  const [selected, setSelected] = useState<string[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);

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

  const getProductDetails = async (page: number): Promise<void> => {
    appContext.setLoading(true, "get-favorite-product");
    try {
      const productList = await productService.getList(page, {
        favorite: true,
      });
      setProductList(productList);
    } catch (error) {
      if (Shared.isApiError(error)) {
        notificationContext.showMessage({
          message: error.error,
          type: "error",
        });
      }
    } finally {
      appContext.setLoading(false, "get-favorite-product");
    }
  };

  const onClickRemove = async (product: ProductModel): Promise<void> => {
    try {
      appContext.setLoading(true, "remove-product");
      await productService.upsertProduct({
        ...product,
        favorite: false,
      });

      getProductDetails(pageNumber);

      notificationContext.showMessage({
        message: "Product has been removed from favorite successfully",
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
      appContext.setLoading(false, "remove-product");
    }
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
          name: "productDes",
          type: "string",
          value: c.productDes,
          render: c.productDes ? c.productDes : "-",
        },
        {
          name: "favorite",
          type: "string",
          value: "",
          render: (
            <Button
              onClick={() => onClickRemove(c)}
              color="secondary"
              variant="contained"
            >
              Remove
            </Button>
          ),
        },
      ],
    }));
    return list;
  }, [productList]);

  return (
    <ProductStyles>
      <PageWrapper pageTitle="Favorite Products" showBackButton={true}>
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
      </PageWrapper>
    </ProductStyles>
  );
};

export default Product;
