const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const UserPayment = require('../model/userpaymentModel');
const Payment = require('../model/paymentModel');

const renderBuyPage = async (req, res) => {
    try {
        res.render('paymentbuy', {
            key: STRIPE_PUBLISHABLE_KEY,
            amount: 25
        });
    } catch (error) {
        console.log(error.message);
    }
};

const payment = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Ensure this is in paise
            currency: 'INR',
            payment_method_types: ['card'], // Payment method
            receipt_email: req.body.stripeEmail, // Customer email
        });

        console.log('Payment Intent created:', paymentIntent);
        // Save user and payment information
        let user = await UserPayment.findOne({ email: req.body.stripeEmail });
        if (!user) {
            user = new UserPayment({
                name: req.body.name,
                email: req.body.stripeEmail,
                stripeCustomerId: paymentIntent.customer
            });
            await user.save();
        }

        const payment = new Payment({
            userId: user._id,
            amount: req.body.amount,
            currency: 'INR',
            paymentIntentId: paymentIntent.id,
            status: 'pending'
        });

        await payment.save();

        // Pass the Payment Intent client secret to the client
        res.json({
            clientSecret: paymentIntent.client_secret,
            successUrl: '/success',
            failureUrl: '/failure'
        });
    } catch (error) {
        console.error('Error during payment:', error);
        res.redirect("/failure");
    }
};

const success = async (req, res) => {
    try {
        res.render('paymentsuccess');
    } catch (error) {
        console.log(error.message);
    }
};

const failure = async (req, res) => {
    try {
        res.render('paymentfailure');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure
};
