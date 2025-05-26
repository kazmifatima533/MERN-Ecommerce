import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.info(response.data.message);
        fetchListProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 px-2">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[80px_1fr_2fr_1fr_1fr_1fr_60px] items-center py-2 px-3 border bg-gray-200 text-md font-semibold text-center">
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
        <div>Category</div>
        <div>SubCategory</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      {/* Product List */}
      {listProducts.length === 0 ? (
        <p className="text-center py-4">No products available.</p>
      ) : (
        listProducts.map((item, index) => (
          <div
            className="grid grid-cols-[80px_1fr_2fr_1fr_1fr_1fr_60px] items-center gap-2 py-2 px-3 border text-sm text-center"
            key={item._id || index}
          >
            <img
              className="w-12 h-12 object-cover rounded mx-auto"
              src={
                item.image?.[0]?.startsWith("http")
                  ? item.image[0]
                  : `${backendUrl}/${item.image?.[0]}`
              }
              alt="Product"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
              }}
            />
            <p className="text-left">{item.name}</p>
            <p className="text-left line-clamp-2">{item.description}</p>
            <p>{item.category}</p>
            <p>{item.subCategory}</p>
            <p>{currency(item.price)}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="bg-red-500 text-white font-bold px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
