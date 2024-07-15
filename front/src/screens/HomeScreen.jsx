import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productApiSlice';
import  Loader  from '../components/Loader/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Product from '../components/Product';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  console.log(data);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading || data === 'pending' ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="text-2xl font-bold mb-6">Latest Products</h1>
          <div className="flex flex-wrap -mx-2">
            {data.map((product) => (
              <div key={product._id} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
