const contactModel = require('../model/contactModel');

const createContact = async (req, res) => {
    const { Name, Email, Subject, Message } = req.body;

    try {
        const newContact = new contactModel({ Name, Email, Subject, Message });
        await newContact.save();
            res.render('contact', { message: 'Your message has been sent. Thank you!' });  
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createContact
};
