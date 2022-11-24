var express = require('express');
const {
    check,
    validationResult
} = require('express-validator');

const catalogueDB = require('../models/cataloguedb')

const urlencoded = express.urlencoded({
    extended: false
});

/////////////////////////////////////BUYER CATALOGUE PAGE DISPLAY
module.exports.getCataloguePageBuyer = async function (req, res, next) {
    const userEmail = req.cookies.user_email;
    let catalogueData = await catalogueDB.getCatalogue();
    res.render("cataloguePage", {
        userEmail: userEmail,
        user: "buyer",
        catalogueData: catalogueData
    })
}

/////////////////////////////////////SELLER CATALOGUE PAGE DISPLAY
module.exports.getCataloguePageSeller = async function (req, res, next) {
    const userEmail = req.cookies.user_email;
    let catalogueData = await catalogueDB.getCatalogue();
    res.render("cataloguePage", {
        userEmail: userEmail,
        user: "seller",
        catalogueData: catalogueData
    })
}

/////////////////////////////////////ADD-CATALOGUE PAGE DISPLAY
module.exports.getAddCataologue = function (req, res, next) {
    const userEmail = req.cookies.user_email;
    res.render("addCatalogue", {
        userEmail: userEmail,
        user: "seller"
    })
}

let catalogueCheck = [check('carCompany', 'Car Company cannot be empty').notEmpty(),
    check('companyAbout', 'Maximum 150 characters are allowed').notEmpty().isLength({
        max: 125
    }),
    check('companyLogo', 'Insert company logo').notEmpty(),
    check('showroomContact', 'Fill contact details').notEmpty(),
    check('showroomAddress', 'Enter showroom address').notEmpty()
]

/////////////////////////////////////ADDING CATALOGUE TO DATABASE
module.exports.postAddCataologue = [urlencoded, catalogueCheck, async function (req, res, next) {
    const userEmail = req.cookies.user_email;

    let data = {};
    data.email = userEmail;
    data.carCompany = req.body.carCompany;
    data.companyAbout = req.body.companyAbout;
    data.companyLogo = req.body.companyLogo;
    data.showroomContact = req.body.showroomContact;
    data.showroomAddress = req.body.showroomAddress;

    let errorData = validationResult(req);
    let errorArray = errorData.errors;
    if (errorArray.length === 0) {
        catalogueDB.addCatalogue(data);
        res.render("userHomePage", {
            userEmail: userEmail,
            user: "seller"
        })
    } else {
        const errorInput = errorArray[0].param;
        const errorMessage = errorArray[0].msg;
        res.render('addCatalogue', {
            errorInput: errorInput,
            message: errorMessage,
            userEmail: userEmail
        });
    }
}];

/////////////////////////////////////DISPLAY UPDATE COMPANY CATALOGUE PAGE
module.exports.getUpdateCatalogue = async function (req, res) {
    let companyEmail = req.cookies.user_email;
    let companyDetail = await catalogueDB.findCompany(companyEmail);
    res.render('updateCatalogue', {
        companyDetail: companyDetail
    })
}

/////////////////////////////////////UPDATE COMPANY CATALOGUE
module.exports.updateCatalogue = [urlencoded, catalogueCheck, async function (req, res) {
    let companyEmail = req.cookies.user_email;
    let updateDetail = req.body;
    await catalogueDB.updateCompany(companyEmail, updateDetail);
    res.render("userHomePage", {
        userEmail: companyEmail,
        user: "seller"
    })
}]