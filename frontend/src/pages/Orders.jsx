import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orders, products, currency, placeOrder } = useContext(ShopContext);

  const getProductDetails = (id) => products.find(p => p._id === id);

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>

      {/* Test Place Order button (can be removed in production) */}
      <div className="text-right mb-4">
        <button
          onClick={placeOrder}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Confirm Order
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No orders placed yet.</p>
      ) : (
        orders.map((order) => {
          const product = getProductDetails(order.productId);
          if (!product) return null;

          return (
            <div
              key={order.id}
              className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20'
                  src={product.image[0]}
                  alt={product.name}
                />
                <div>
                  <p className='font-medium sm:text-base'>{product.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>
                      {currency}&nbsp;
                      {(product.price * order.quantity).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Size: {order.size}</p>
                  </div>
                  <p className='mt-2'>
                    Date: <span className='text-gray-400'>{order.date}</span>
                  </p>
                </div>
              </div>
              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-2'>
                  <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                  <p className='text-sm md:text-base'>Ready for Shipping</p>
                </div>

                <Link to={`/track-order/${order.id}`}>
                  <button className='px-4 py-2 text-sm font-medium border rounded-sm'>
                    TRACK ORDER
                  </button>
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
