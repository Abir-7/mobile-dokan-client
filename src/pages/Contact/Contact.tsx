// src/pages/ContactPage.tsx
import React from "react";
import { FormWrapper } from "../../components/common/Form/FormWrapper";
import InputField from "../../components/common/Form/InputField";
import TextareaField from "../../components/common/Form/TextareaField";
import SubmitButton from "../../components/common/Form/SubmitButton";
import { IContact } from "../../interface/formData/contact.interface";

const Contact: React.FC = () => {
  // Use the hook to handle form submission

  const onSubmit = async (data: IContact) => {
    console.log("Contact Form Data:", data);
    // Handle form submission logic (e.g., sending an email, saving to the database)
    alert("Your message has been sent successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Contact Us
      </h2>
      <FormWrapper<IContact>
        defaultValues={{ name: "", email: "", message: "" }}
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
        <TextareaField
          name="message"
          label="Message"
          placeholder="Enter your message"
          validation={{ required: "Message is required" }}
        />
        <div className="flex justify-center mt-4">
          <SubmitButton label="Send Message" />
        </div>
      </FormWrapper>
    </div>
  );
};

export default Contact;
