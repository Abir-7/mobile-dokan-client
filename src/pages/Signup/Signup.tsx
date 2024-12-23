/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/RegistrationPage.tsx
import React from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate hook for navigation

import { ICreateUser } from "../../interface/formData/createUser.interface";
import { FormWrapper } from "../../components/common/Form/FormWrapper";
import InputField from "../../components/common/Form/InputField";
import SelectField from "../../components/common/Form/SelectField";
import SubmitButton from "../../components/common/Form/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/api/authApi/authApi";
import { IApiResponse } from "../../interface/apiResponse.interface";
import { toast } from "sonner";

const userRole = ["customer", "seller"]; // Define user roles

const Signup: React.FC = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const defaultValues: ICreateUser = {
    email: "",
    name: "",
    address: "",
    role: "customer",
    mobile: 0,
    password: "",
  };

  const onSubmit = async (data: ICreateUser) => {
    const response = (await createUser(data)) as IApiResponse<any>;
    if (response?.data?.success) {
      toast.success(response.data.message);
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Register
      </h2>
      <FormWrapper<ICreateUser>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <InputField
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          validation={{ required: "Name is required" }}
        />
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
        />
        <InputField
          name="mobile"
          label="Mobile"
          type="number"
          placeholder="Enter your mobile number"
          validation={{
            required: "Mobile is required",
            minLength: {
              value: 10,
              message: "Mobile number should be 10 digits",
            },
          }}
        />
        <InputField
          name="address"
          label="Address"
          type="text"
          placeholder="Enter your address"
          validation={{ required: "Address is required" }}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />
        <SelectField
          name="role"
          label="Role"
          options={userRole.map((role) => ({ value: role, label: role }))}
          validation={{ required: "Role is required" }}
        />
        <div className="flex justify-center">
          <SubmitButton label="Signup"></SubmitButton>
        </div>
      </FormWrapper>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
