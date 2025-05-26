import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const currency = "$";
  const delivery_fee = 10;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders"));
    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      toast.success("Item Removed From The Cart");

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      let itemInfo = products.find((product) => product._id === productId);
      for (const size in cartItems[productId]) {
        totalAmount += itemInfo.price * cartItems[productId][size];
      }
    }
    return totalAmount;
  };

  const placeOrder = () => {
    const newOrders = [];

    Object.keys(cartItems).forEach((productId) => {
      const item = products.find((p) => p._id === productId);
      if (!item) return;

      Object.entries(cartItems[productId]).forEach(([size, quantity]) => {
        if (quantity > 0) {
          newOrders.push({
            id: Date.now().toString() + Math.random(),
            productId,
            quantity,
            size,
            date: new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          });
        }
      });
    });

    if (newOrders.length > 0) {
      setOrders((prev) => [...prev, ...newOrders]);
      setCartItems({});
      toast.success("Order placed successfully!");
    } else {
      toast.error("No items to order.");
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    orders,
    placeOrder,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
