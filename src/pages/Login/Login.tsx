/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Use navigate for redirect

import { FormWrapper } from "../../components/common/Form/FormWrapper";
import InputField from "../../components/common/Form/InputField";
import SubmitButton from "../../components/common/Form/SubmitButton";
import { ILoginUser } from "../../interface/formData/loginuser.interface";
import { useLoginUserMutation } from "../../redux/api/authApi/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { decodeToken } from "../../lib/utils/decodeToken";
import { JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import { setUser } from "../../redux/features/authSlice";
import { IApiResponse } from "../../interface/apiResponse.interface";

const Login: React.FC = () => {
  const [userLogin] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize navigate for routing

  const defaultValues: ILoginUser = {
    email: "",
    password: "",
  };

  const onSubmit = async (data: ILoginUser) => {
    console.log("User Login Data:", data);

    const res = (await userLogin(data)) as IApiResponse<any>;

    if (res.data?.success) {
      toast.success(res.data.message);
      const userData = decodeToken(res.data.data?.token) as JwtPayload & {
        role: string;
        userEmail: string;
      };

      dispatch(setUser({ user: userData, token: res.data.data?.token }));
      navigate("/");
    }

    // Handle user login (authentication logic here)
    // After successful login, navigate to the dashboard or home page
    // navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Login
      </h2>
      <FormWrapper<ILoginUser>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
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
        <div className="flex justify-center mt-4">
          <SubmitButton label="Login"></SubmitButton>
        </div>
      </FormWrapper>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
