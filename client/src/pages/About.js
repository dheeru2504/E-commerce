import React from "react";
import Layout from "../components/layouts/Layout";

const About = () => {
  return (
    <Layout title={"About - Helping Hand"}>
      <div className="container_section align-items-center justify-content-center">
        <div class="row  contactus ">
          {/* <div class="col-md-12 col-lg-4">
            <img
              src="/images/about.jpg"
              alt="about us"
              style={{ width: "100%" }}
              About
              Us
            />
          </div> */}
          {/* <div class=" "> */}
          <h1 className="text-center"> About Us</h1>
          <p >Welcome to H Square Decor, where your dream space becomes a reality. Born from a passion for blending artistry with functionality, we are your dedicated partners in the journey of transformation. At H Square Decor, we believe that every space tells a story, and every piece you choose is a character in that narrative.
            Our story began with a simple yet profound mission: to bring sophisticated, designer-quality interior decor within easy reach. Founded on principles of excellence and a relentless pursuit for beauty, H Square Decor emerged as a beacon for those seeking to infuse their homes and offices with a sense of elegance and style.
            Our collection is a testament to our commitment to quality and aesthetics. Sourced from the finest artisans and designers around the globe, each product in our catalog is selected with the utmost care, ensuring that it meets our high standards of craftsmanship and design. From timeless classics to contemporary masterpieces, our range is designed to cater to diverse tastes and preferences, ensuring there's something for everyone.</p>
          <p>At H Square Decor, we are more than just a retailer; we are curators of beautiful spaces. Our team of experienced interior design enthusiasts is always on hand to offer personalized advice and insights, helping you make the perfect choices for your unique space. We understand that trust is the cornerstone of any relationship, and we are committed to earning yours through transparent practices, exceptional customer service, and a dedication to your satisfaction.</p>
          <p>For our discerning clients, it's important to note that H Square Decor is a fully registered and compliant business, proudly displaying our GST number: <span className="fw-bold">09MAVPS3871E1ZP</span>. The Goods and Services Tax (GST) number is a unique identifier for businesses in India, ensuring compliance with tax laws and regulations. This reflects our commitment to transparency and legality in all our operations, ensuring you can shop with confidence and trust.</p>
          <p>Join us on this exquisite journey of transformation. Let H Square Decor be your guide to a world where beauty and functionality coalesce, creating spaces that not only look magnificent but feel like home. Together, let's make your vision a reality.</p>
          <p>Welcome to the H Square Decor family.</p>
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default About;
