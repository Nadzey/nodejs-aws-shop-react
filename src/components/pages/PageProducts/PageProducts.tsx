import React, { useEffect, useState } from "react";
import  API_PATHS from "../../../constants/apiPaths";
import { Box, CircularProgress, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

interface Product {
  id: string;
  title: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      fetch(API_PATHS.product)
          .then(response => {
              if (!response.ok) {
                  throw new Error("Failed to fetch products");
              }
              return response.json();
          })
          .then((data: Product[]) => {
              setProducts(data);
              setLoading(false);
          })
          .catch(err => {
              setError(err.message);
              setLoading(false);
          });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              sx={{ height: 200 }}
              image={`https://source.unsplash.com/200x200/?product&sig=${index}`}
              title={product.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1">${product.price}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}