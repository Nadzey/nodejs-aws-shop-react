import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Products from "./components/Products";
import { useAvailableProducts } from "~/queries/products";

export default function PageProducts() {
  const { isLoading, error } = useAvailableProducts();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box py={3}>
      <Products /> {}
    </Box>
  );
}
