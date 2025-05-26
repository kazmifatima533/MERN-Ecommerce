import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Checkout = () => {
  const { cartItems, products, currency, getCartAmount, delivery_fee, placeOrder } = useContext(ShopContext);

  const getProductDetails = (id) => products.find((p) => p._id === id);
  const cartAmount = getCartAmount();

  return (
    <div className='pt-16 px-4'>
      <div className='text-2xl'>
        <Title text1={'CHECKOUT'} text2={'SUMMARY'} />
      </div>

      <div className='mt-6 space-y-4'>
        {Object.entries(cartItems).map(([productId, sizes]) =>
          Object.entries(sizes).map(([size, quantity]) => {
            const product = getProductDetails(productId);
            if (!product) return null;

            return (
              <div key={productId + size} className='flex items-start justify-between border-b pb-4'>
                <div className='flex gap-4'>
                  <img src={product.image[0]} alt={product.name} className='w-16 sm:w-20 rounded' />
                  <div>
                    <p className='font-medium'>{product.name}</p>
                    <p>Size: {size}</p>
                    <p>Quantity: {quantity}</p>
                  </div>
                </div>
                <p className='text-right text-lg'>
                  {currency}{(product.price * quantity).toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className='mt-6 border-t pt-4 text-right space-y-2'>
        <p>Subtotal: {currency}{cartAmount.toFixed(2)}</p>
        <p>Delivery Fee: {currency}{delivery_fee.toFixed(2)}</p>
        <p className='font-bold text-xl'>Total: {currency}{(cartAmount + delivery_fee).toFixed(2)}</p>
      </div>

      <div className='mt-6 text-center'>
        <button onClick={placeOrder} className='px-6 py-3 bg-black text-white rounded hover:bg-gray-800'>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
