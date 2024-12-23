import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [SKU, setSKU] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  // const [priority, setPriority] = useState("");

  // const [productData, setProductData] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   SKU: '',
  //   quantity: '',
  //   shipping: '',
  //   category: '',
  //   photo: null
  // });

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData =
        new FormData(); /*form data is browser property to get form data*/
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('SKU', SKU);
      formData.append('quantity', quantity);
      formData.append('shipping', shipping);
      formData.append('category', category);
      formData.append('isFeatured', isFeatured);

      // Append the photo file (if selected) to the formData object
      if (photo) {
        formData.append('photo', photo);
      }
      // const productData = {
      //   name,
      //   description,
      //   price,
      //   SKU,
      //   category,
      //   quantity,
      //   photo
      // };
      // console.log(formData)

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Create Product"}>
      <div className="container-fluid p-4 m-3">
        <div className="row ">
          <div className="col-md-3 p-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="font-type">Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(
                        photo
                      )} /* to show the uploaded photo simultaneously*/
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  style={{ border: "1px solid grey" }}
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  style={{ border: "1px solid grey" }}
                  type="text"
                  value={SKU}
                  placeholder="SKU"
                  className="form-control"
                  onChange={(e) => setSKU(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  style={{ border: "1px solid grey" }}
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  style={{ border: "1px solid grey" }}
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  style={{ border: "1px solid grey" }}
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Is Featured"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setIsFeatured(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-outline-info" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
