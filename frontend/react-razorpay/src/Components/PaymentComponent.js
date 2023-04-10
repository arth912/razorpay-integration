import React from 'react'
import logo from './logo.svg';
import Axios from 'axios';

const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:8000/'
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    const options = {
        key: process.env.RAZOR_PAY_KEY_ID,
        name: "Your App Name",
        description: "Some Description",
        order_id: data.id,
        handler: async (response) => {
            try {
                const paymentId = response.razorpay_payment_id;
                const url = `${API_URL}capture/${paymentId}`;
                const captureResponse = await Axios.post(url, {})
                console.log(captureResponse.data);
            } catch (err) {
                console.log(err);
            }
        },
        theme: {
            color: "#686CFD",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

const PaymentComponent = () => {
    return (
        <div>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className='App-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
            >
                Learn React
            </a>
            <br/>
            <button onClick={paymentHandler}>Pay Now</button>
        </div>
    )
}

export default PaymentComponent
