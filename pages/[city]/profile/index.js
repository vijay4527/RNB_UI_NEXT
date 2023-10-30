import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { axiosPost } from "@/api";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid Contact format (10 digits required)")
    .required("THis field is required"),
  address1: yup.string().required("Apartment is required"),
  address2: yup.string().required("Street is required"),
  userCity: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string().required("Pin code is required"),
  country: yup.string().required("Country is required"),
});

const Index = () => {
  const { data } = useSession();
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    contact: "",
    address1: "",
    address2: "",
    userCity: "",
    state: "",
    pinCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
    const userInfo =
      typeof window !== "undefined"
        ? sessionStorage.getItem("userData")
        : data
        ? data.user
        : "";
    setUser(userInfo);
  }, []);

  const saveUserProfile = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const obj = {
        user_id: user ? user.user_id : "",
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        user_email: formValues.userEmail,
        contact_details: formValues.contact,
        city: formValues.userCity,
        state: formValues.state,
        address_1: formValues.address1,
        address_2: formValues.address2,
        pincode: formValues.pinCode,
        country: formValues.country,
      };
      const data = await axiosPost("UserProfile/SaveUserProfile", obj);
      if (data.resp === true) {
        console.log("Address added successfully");
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(validationError);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="m-4">
          <div className="text-center p-4">
            <h4>Update Your Profile</h4>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="userEmail"
                value={formValues.userEmail}
                onChange={handleInputChange}
              />
              {errors.userEmail && (
                <div className="text-danger">{errors.userEmail}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Contact</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={formValues.contact}
                onChange={handleInputChange}
              />
              {errors.contact && (
                <div className="text-danger">{errors.contact}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Apartment</label>
              <input
                type="text"
                className="form-control"
                name="address1"
                value={formValues.address1}
                onChange={handleInputChange}
              />
              {errors.address1 && (
                <div className="text-danger">{errors.address1}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Street</label>
              <input
                type="text"
                className="form-control"
                name="address2"
                value={formValues.address2}
                onChange={handleInputChange}
              />
              {errors.address2 && (
                <div className="text-danger">{errors.address2}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="userCity"
                value={formValues.userCity}
                onChange={handleInputChange}
              />
              {errors.userCity && (
                <div className="text-danger">{errors.userCity}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={formValues.state}
                onChange={handleInputChange}
              />
              {errors.state && (
                <div className="text-danger">{errors.state}</div>
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-6">
              <label>Pin Code</label>
              <input
                type="text"
                className="form-control"
                name="pinCode"
                value={formValues.pinCode}
                onChange={handleInputChange}
              />
              {errors.pinCode && (
                <div className="text-danger">{errors.pinCode}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
              />
              {errors.country && (
                <div className="text-danger">{errors.country}</div>
              )}
            </div>
          </div>
          <button className="btn btn-primary" onClick={saveUserProfile}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
