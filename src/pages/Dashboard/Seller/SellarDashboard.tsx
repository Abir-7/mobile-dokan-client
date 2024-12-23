import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetSellerProductQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi/productApi";
import { IProduct } from "../../../interface/product.interface";
import { toast } from "sonner";

import InputField from "../../../components/common/Form/InputField";
import CheckboxField from "../../../components/common/Form/CheckboxField";
import { IProductForm } from "../../../interface/formData/createProduct.interface";
import { FormWrapper } from "../../../components/common/Form/FormWrapper";

const SellerDashboard = () => {
  const { data } = useGetSellerProductQuery("");
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const products = data?.data as IProduct[];

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (product: IProduct) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const response = await deleteProduct(selectedProduct._id);
      if (response.data?.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSubmit = async (data: IProductForm) => {
    if (selectedProduct) {
      const response = await updateProduct({
        data: data,
        id: selectedProduct._id,
      });
      if (response.data?.success) {
        toast.success("Product updated successfully");
        setEditModalOpen(false);
      } else {
        toast.error("Failed to update product");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image[0]}
                    alt={product.model}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>${product.variants[0]?.price}</td>
                <td>{product.variants[0]?.stockQuantity}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedProduct.model}</strong>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-error"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="btn btn-sm"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <FormWrapper<IProductForm>
              defaultValues={{}}
              onSubmit={handleEditSubmit}
            >
              <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    name="model"
                    label="Model"
                    validation={{ required: false }}
                    placeholder="Enter product model"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mt-8">
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <InputField
                    name="features.screenSize"
                    label="Screen Size"
                    validation={{ required: false }}
                    placeholder="e.g., 6.5 inches"
                  />
                  <InputField
                    name="features.battery"
                    label="Battery"
                    validation={{ required: false }}
                    placeholder="e.g., 5000mAh"
                  />
                  <InputField
                    name="features.camera"
                    label="Camera"
                    validation={{ required: false }}
                    placeholder="e.g., 108MP + 12MP + 5MP"
                  />
                  <InputField
                    name="features.processor"
                    label="Processor"
                    validation={{ required: false }}
                    placeholder="e.g., Snapdragon 888"
                  />
                  <InputField
                    name="features.os"
                    label="Operating System"
                    validation={{ required: false }}
                    placeholder="e.g., Android 12"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mt-8">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <InputField
                    name="releaseDate"
                    label="Release Date"
                    type="date"
                    validation={{ required: false }}
                  />
                  <CheckboxField
                    name="isAvailable"
                    label="Available for Sale"
                    validation={{ required: false }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-8 w-full md:w-auto"
                >
                  Update Product
                </button>
              </div>
            </FormWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
