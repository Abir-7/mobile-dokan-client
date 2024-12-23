import { useFormContext, useFieldArray } from "react-hook-form";
import { FormWrapper } from "../../../components/common/Form/FormWrapper";
import InputField from "../../../components/common/Form/InputField";
import CheckboxField from "../../../components/common/Form/CheckboxField";
import { IProductForm } from "../../../interface/formData/createProduct.interface";
import { useAddProductMutation } from "../../../redux/api/productApi/productApi";
import { toast } from "sonner";

const AddProductPage = () => {
  const defaultValues: IProductForm = {
    brand: "Samsung",
    model: "Galaxy S23",
    variants: [
      {
        storage: "128GB",
        ram: "8GB",
        color: ["Black", "Blue"],
        price: 799,
        stockQuantity: 50,
      },
    ],
    features: {
      screenSize: "6.1 inches",
      battery: "3900mAh",
      camera: "50MP",
      processor: "Snapdragon 8 Gen 2",
      os: "Android 13",
    },
    releaseDate: "2023-02-17",
    isAvailable: true,
  };

  const [addProduct] = useAddProductMutation();
  const onSubmit = async (data: IProductForm) => {
    const response = await addProduct(data);

    if (response?.data?.success) {
      toast.success(response?.data?.message);
    }

    console.log("Form Data:", data);
  };

  return (
    <FormWrapper<IProductForm>
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Add New Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            name="brand"
            label="Brand"
            validation={{ required: "Brand is required" }}
            placeholder="Enter product brand"
          />
          <InputField
            name="model"
            label="Model"
            validation={{ required: "Model is required" }}
            placeholder="Enter product model"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <InputField
            name="features.screenSize"
            label="Screen Size"
            placeholder="e.g., 6.5 inches"
          />
          <InputField
            name="features.battery"
            label="Battery"
            placeholder="e.g., 5000mAh"
          />
          <InputField
            name="features.camera"
            label="Camera"
            placeholder="e.g., 108MP + 12MP + 5MP"
          />
          <InputField
            name="features.processor"
            label="Processor"
            placeholder="e.g., Snapdragon 888"
          />
          <InputField
            name="features.os"
            label="Operating System"
            placeholder="e.g., Android 12"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-8">Variants</h2>
        <VariantsSection />

        <h2 className="text-xl font-semibold text-gray-700 mt-8">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <InputField name="releaseDate" label="Release Date" type="date" />
          <CheckboxField name="isAvailable" label="Available for Sale" />
        </div>

        <button type="submit" className="btn btn-primary mt-8 w-full md:w-auto">
          Submit Product
        </button>
      </div>
    </FormWrapper>
  );
};

export default AddProductPage;

export const VariantsSection = () => {
  const { control } = useFormContext<IProductForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="mt-4 space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          <h3 className="font-medium text-gray-800 mb-4">
            Variant {index + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name={`variants.${index}.storage`}
              label="Storage"
              validation={{ required: "Storage is required" }}
              placeholder="e.g., 128GB"
            />
            <InputField
              name={`variants.${index}.ram`}
              label="RAM"
              validation={{ required: "RAM is required" }}
              placeholder="e.g., 8GB"
            />
            <InputField
              name={`variants.${index}.price`}
              label="Price"
              type="number"
              validation={{
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              }}
              placeholder="e.g., 799"
            />
            <InputField
              name={`variants.${index}.stockQuantity`}
              label="Stock Quantity"
              type="number"
              validation={{ required: "Stock quantity is required" }}
              placeholder="e.g., 50"
            />
          </div>
          <button
            type="button"
            className="btn btn-error btn-sm mt-4"
            onClick={() => remove(index)}
          >
            Remove Variant
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-6"
        onClick={() =>
          append({
            storage: "",
            ram: "",
            color: [],
            price: 0,
            stockQuantity: 0,
          })
        }
      >
        Add Variant
      </button>
    </div>
  );
};
