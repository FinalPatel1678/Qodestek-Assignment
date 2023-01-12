import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import { FileNotFound } from "../views/FileNotFound";
import PrivateRoute from "./PrivateRoute";
import { RoutePaths } from "../util/enum";

// component lazy loading
const SignIn = lazy(() => import("../views/SignIn/SignIn"));
const Product = lazy(() => import("../views/Product/Product"));
const ProductFavorite = lazy(
  () => import("../views/ProductFavorite/ProductFavorite")
);

export const MainNavigation: React.FC<{}> = () => {
  return (
    <Suspense fallback={<>Loading....</>}>
      <Routes>
        <Route path={RoutePaths.SignIn} element={<SignIn />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path={RoutePaths.Product} element={<Product />} />
          <Route
            path={RoutePaths.ProductFavorite}
            element={<ProductFavorite />}
          />
          <Route path="" element={<Navigate to={RoutePaths.Product} />} />
        </Route>
        <Route path={RoutePaths.NotFound} element={<FileNotFound />} />
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    </Suspense>
  );
};
