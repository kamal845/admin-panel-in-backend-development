const TableX = require('../model/tableXModel');

exports.renderHome = async (req, res) => {
    const perPage = 5; // प्रति पृष्ठ आइटमों की संख्या
    const page = parseInt(req.query.page) || 1;
    let searchQuery = req.query.search || ''; 
    const searchType = req.query.type || 'name';
    try {
        const query = searchQuery !== ''
            ? { name: { $regex: new RegExp(searchQuery, 'i') } } 
            : {};

        const totalItems = await TableX.countDocuments(query);
        const totalPages = Math.ceil(totalItems / perPage);

        const tables = await TableX.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.render('tableX', {
            tables,
            currentPage: page,
            totalPages,
            perPage,
            totalItems,
            searchQuery,
            searchType
        });
    } catch (error) {
        res.status(500).send('internal server error');
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
    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    let searchQuery = req.query.search || ''; 
    const searchType = req.query.type || 'name'; 
    try {
        let query = {};

        if (searchQuery && typeof searchQuery === 'string') {
            if (searchType === 'name') {
                query = { name: { $regex: new RegExp(searchQuery, 'i') } };
            } else if (searchType === 'age') {
                const age = parseInt(searchQuery);
                if (!isNaN(age)) {
                    query = { Age: age }; 
                }
            }
        }

        const totalItems = await TableX.countDocuments(query);
        const totalPages = Math.ceil(totalItems / perPage);

        const tables = await TableX.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.render('tableX', {
            tables,
            currentPage: page,
            totalPages,
            perPage,
            totalItems,
            searchQuery,
            searchType
        });
    } catch (error) {
        res.status(500).send('internal server error');
    }
};