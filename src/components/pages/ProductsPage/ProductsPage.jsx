import { useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import ProductList from "@/components/organisms/ProductList";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Silk Scarf",
    price: 29.99,
    image: "https://placeholder.com/400",
    description: "Beautiful handmade silk scarf with traditional patterns.",
  },
  {
    id: "2",
    name: "Silk Dress",
    price: 99.99,
    image: "https://placeholder.com/400",
    description: "Elegant silk dress perfect for special occasions.",
  },
  // Add more mock products as needed
];

const ProductsPage = () => {
  const [products] = useState(MOCK_PRODUCTS);

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement cart functionality
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our collection of high-quality silk products.
          </p>
        </div>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
