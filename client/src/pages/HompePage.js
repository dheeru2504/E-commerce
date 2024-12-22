import React, { useState, useEffect } from "react";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/layouts/Layout";
import { AiOutlineReload } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Homepage.css";
import { BiCartAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import carousel1 from "../assets/carousel1.jpg"
import carousel2 from "../assets/carousel2.jpg"
import carousel3 from "../assets/carousel3.jpg"




const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      fetch(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Use the 'data' variable here
          setCategories(data?.category);
        })
      // const { data } = await axios.get("/api/v1/category/get-category");
      // if (data?.success) {
      //   setCategories(data?.category);
      // }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      console.log("get all products")
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      console.log("data : ", data)
      setProducts(data.products);
      console.log("products are ", products)
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (page === 1) return;
      loadMore();
    },
    // eslint-disable-next-line
    [page]
  );
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(
    () => {
      if (!checked.length || !radio.length) getAllProducts();
    }, // eslint-disable-next-line
    [checked.length, radio.length]
  );

  useEffect(
    () => {
      if (checked.length || radio.length) filterProduct();
    }, // eslint-disable-next-line
    [checked, radio]
  );

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Layout title={"Helping Hand"}>
      {/* banner image */}
      {/* <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* <div className="carousel-section">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlaySpeed={5000}
          autoPlay={true}
        // arrows={false}

        // customTransition="all .5"
        >

          <div className="row carousel-content">
            <div className="carousel-text col-6 ">
              <h6>Flat 40% discount <span className="strikethrough">₹8999</span></h6>
              <h1>₹4499</h1>
              <p>Large Metal Wall Clock</p>
            </div>
            <img className="carousel-img col-6" src={carousel1} alt="" />
          </div>
          <div className=" row carousel-content">
            <div className="col-6 carousel-text">
              <h6>Flat 40% discount <span className="strikethrough">₹8999</span></h6>
              <h1>₹4499</h1>
              <p>Large Metal Wall Clock</p>
            </div>
            <img className="col-6 carousel-img" src={carousel2} alt="" />
          </div>
          <div className="row carousel-content">
            <div className="col-6 carousel-text">
              <h6>Flat 40% discount <span className="strikethrough">₹8999</span></h6>
              <h1>₹4499</h1>
              <p>Large Metal Wall Clock</p>
            </div>
            <img className="col-6 carousel-img" src={carousel3} alt="" />
          </div>


        </Carousel>
      </div> */}
      {/* banner image */}
      <div className="container-fluid row home-page ">
        <h1 className="text-center ">Shop Now</h1>

        {/* <div className="col-md-2 filters">
          <h4 className="text-center ">Filter By Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-outline-info"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div> */}

        <div className=" align-items-center" >
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <Link to={`/product/${p.slug}`} style={{ color: "grey", textDecoration: "none" }}>
                <div className="card text-center m-2" key={p._id}>

                  <img
                    src={p.photo}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price  ">
                      <h5 className="card-title title">
                        {/* <Link to={`/product/${p.slug}`}>{p.name}</Link> */}
                        {p.name.substring(0, 60)}
                      </h5>
                      <h5 className="card-title card-price">
                        ₹ {p.price}
                        {/* {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })} */}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price">
                      {/* <button
                      className="btn btn-outline-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button> */}
                      {/* <button
                      className="btn btn-outline-info addToCart"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Add To Cart"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      <BiCartAdd size={25} />
                    </button> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    More <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
