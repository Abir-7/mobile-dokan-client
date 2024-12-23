import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cartSlice";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleQuantityChange = (
    productId: string,
    ram: string,
    storage: string,
    color: string,
    quantity: number
  ) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, ram, storage, color, quantity }));
    }
  };

  const handleRemoveItem = (
    productId: string,
    ram: string,
    storage: string,
    color: string
  ) => {
    dispatch(removeFromCart({ productId, ram, storage, color }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-lg text-center">Your cart is empty!</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr key={item.variant._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <img
                          src={item.image}
                          alt={item.model}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-bold">{item.brand}</p>
                          <p>{item.model}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>
                          {item.variant.ram}/{item.variant.storage}
                        </p>
                        <p>Color: {item.variant.color}</p>
                      </div>
                    </td>
                    <td>${item.variant.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="input input-bordered w-20"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            item.variant.ram,
                            item.variant.storage,
                            item.variant.color,
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>${item.quantity * item.variant.price}</td>
                    <td>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() =>
                          handleRemoveItem(
                            item.productId,
                            item.variant.ram,
                            item.variant.storage,
                            item.variant.color
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Responsive Summary Section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <button
              className="btn btn-error w-full sm:w-auto"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <h2 className="text-xl font-bold text-center sm:text-right">
              Total Amount: ${cart.totalAmount}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
