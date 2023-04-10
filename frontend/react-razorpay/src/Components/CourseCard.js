import React from 'react'
import Axios from 'axios';

const paymentHandler = async (e) => {
  const App_Url = 'http://localhost:8000/'
  e.preventDefault();
  const orderUrl = `${App_Url}order`;
  const response = await Axios.get(orderUrl);
  console.log(response);
  const { data } = response;
  const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "Starc Software Ltd",
      description: "Course For Freshers",
      order_id: data.id,
      handler: async (response) => {
          try {
              const paymentId = response.razorpay_payment_id;
              const url = `${App_Url}capture/${paymentId}`;
              const captureResponse = await Axios.post(url, {})
              console.log(captureResponse.data);
          } catch (err) {
              console.log(err);
          }
      },
      theme: {
          color: "black",
      },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

const CourseCard = ({
  courseName, courseThumbnail, courseDetails,
  coursePrice, courseDiscountedPrice, courseDiscount,
}) => {
  return (
    <div><article className="card">
      <img src={courseThumbnail} alt={courseName} />
      <div className="card-content">
        <header className="card-header">
          <h5>{courseName}</h5>
        </header>
        <p>{courseDetails}</p>
        <h4>
         Discount Price: ₹{courseDiscountedPrice}{" "}<br/>
          <span className="course-price">Course Price: ₹{coursePrice}</span>{" "}<br/>
          <span className="course-discount-percentage">
            {courseDiscount}% OFF
          </span>
        </h4>
        <button
          type="button"
          className="course-payment-button"
          onClick={paymentHandler}
        >
          Buy Now
        </button>
      </div>
    </article></div>
  )
}

export default CourseCard