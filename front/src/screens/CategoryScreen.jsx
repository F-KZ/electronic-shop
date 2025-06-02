import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message';

const CategoryScreen = () => {
  const { category } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [selectedBrands, setSelectedBrands] = useState([]);

  const categoryProducts = products?.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  // Get unique brands from products
  const brands = [...new Set(categoryProducts?.map(product => product.brand) || [])];

  const categoryTitles = {
    smartphones: 'Smartphones & Mobile Devices',
    laptops: 'Laptops & Computers',
    tablets: 'Tablets & iPads',
    accessories: 'Accessories & Peripherals',
    audio: 'Audio & Headphones',
    gaming: 'Gaming & Consoles'
  };

  // Filter products based on price range and selected brands
  const filteredProducts = categoryProducts?.filter(product => {
    const priceInRange = product.price >= priceRange.min && product.price <= priceRange.max;
    const brandSelected = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return priceInRange && brandSelected;
  });

  // Sort products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{categoryTitles[category] || category}</h1>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <Form.Select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Form.Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                <Form.Range
                  min="0"
                  max="3000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <Form.Check
                    key={brand}
                    type="checkbox"
                    id={brand}
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts?.length === 0 ? (
              <Message>No products found in this category</Message>
            ) : (
              <Row>
                {sortedProducts?.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryScreen; 