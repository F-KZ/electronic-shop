import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import Loader from './Loader/Loader';
import SliderSales from './SwiperSales';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const { width } = useWindowDimensions();

  if (isLoading || products === 'pending') return <Loader/>;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
        <SliderSales />
      </section>
      <section>
        <h1 className="text-2xl font-bold mb-6">Latest Products</h1>
        <Carousel pause='hover' className='bg-primary mb-4'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                {width > 768 ? (
                  <div className='flex flex-row-reverse w-full justify-between items-center'>
                    <div className='w-1/2'>
                      <h2 className='text-white text-right pr-10 text-2xl max-w-[400px]'>
                        {product.description}
                      </h2>
                    </div>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fluid 
                      className='d-block'
                      style={{objectFit: 'contain', height: '500px', width: '500px', backgroundColor:'white'}}
                    />
                  </div>
                ) : (
                  <div className='flex flex-col items-center p-4 h-[500px]'>
                    <div className='flex-1 flex items-center justify-center'>
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fluid 
                        className='d-block'
                        style={{objectFit: 'contain', height: '300px', width: '300px', backgroundColor:'white', borderRadius: '8px'}}
                      />
                    </div>
                    <div className='h-[150px] overflow-y-auto'>
                      <h2 className='text-white text-center sm:mt-10 text-lg'>
                        {product.description}
                      </h2>
                    </div>
                  </div>
                )}
                <Carousel.Caption className='carousel-caption'>
                  <h2 className='text-white text-right pr-20'>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default ProductCarousel;
