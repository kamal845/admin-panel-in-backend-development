const TableX = require('../model/tableXModel');

// Render home page with tables
exports.renderHome = async (req, res) => {
    try {
        const tables = await TableX.find();
        res.render('tableX', { tables });
    } catch (error) {
        console.log('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Render create page
exports.renderCreate = (req, res) => {
    res.render('tableXcreate');
};

// Render edit page
exports.renderEditPage = async (req, res) => {
    const id = req.params.id;
    try {
        const record = await TableX.findById(id);
        if (record) {
            res.render('tableXedit', { record });
        } else {
            res.status(404).send('Record not found');
        }
    } catch (error) {
        console.log('Error fetching record:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new table entry
exports.createTable = async (req, res) => {
    const { name, Age,  school } = req.body;
    try {
        const newTable = new TableX({ name, Age, school });
        await newTable.save();
        res.redirect('/tableX/home');
    } catch (error) {
        console.log('Error saving data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update a table entry
exports.updateTable = async (req, res) => {
    const id = req.params.id;
    const updatedData = {
        name: req.body.name,
        Age: req.body.Age,
        school: req.body.school
    };

    try {
        await TableX.findByIdAndUpdate(id, updatedData);
        res.redirect('/tableX/home');
    } catch (error) {
        console.log('Error updating record:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a table entry
exports.deleteTable = async (req, res) => {
    const id = req.params.id;
    try {
        await TableX.findByIdAndDelete(id);
        const tables = await TableX.find();
        res.render('tableX', { tables });
    } catch (error) {
        console.log('Error deleting record:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.searchTables = async (req, res) => {
    const { query, type } = req.query; // 'type' can be 'name' or 'age'

    let matchStage = {};

    if (type === 'name') {
        matchStage = {
            name: { $regex: query, $options: 'i' }
        };
    } else if (type === 'age') {
        matchStage = {
            Age: parseInt(query, 10)
        };
    }

    try {
        const tables = await TableX.aggregate([
            { $match: matchStage }
        ]);
        res.render('tableX', { tables });
    } catch (error) {
        console.log('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};