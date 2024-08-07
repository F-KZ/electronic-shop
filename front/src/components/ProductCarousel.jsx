import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
//import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
 import Loader from './Loader/Loader';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  

  if (isLoading || products === 'pending') return  <Loader/>;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
     <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right pr-20'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
};

export default ProductCarousel;
