const mongoose = require('mongoose');

/////////////////////////////////////SCHEMA FOR ADD CATALOGUE
const catalogueSchema = mongoose.Schema({
    email: String,
    carCompany: String,
    companyAbout: String,
    companyLogo: String,
    showroomContact: String,
    showroomAddress: String,
})

/////////////////////////////////////MODEL FOR CATALOGUE
const Catalogue = new mongoose.model("catalogue", catalogueSchema);

/////////////////////////////////////ADDING CATALOGUE TO DATABASE
module.exports.addCatalogue = (brandDetail) =>{
    const newCatalogue = new Catalogue(brandDetail);

    newCatalogue.save((err)=>{
        if(err) throw err;
    })
}

/////////////////////////////////////DISPLAY OF FULL CATALOGUE
module.exports.getCatalogue = () => {
    return new Promise((resolve) => {
        Catalogue.find({}, function(err, foundData){
            if(err) throw err;
            console.log(foundData);
            resolve(foundData)
        });
    });
}

/////////////////////////////////////GETIING SINGLE COMPANY DETAILS
module.exports.findCompany = (email)=>{
    return new Promise((resolve) => {
        Catalogue.findOne({email: email}, (err, result)=>{
            if(err) throw err;
            resolve(result)
        })
    })
}

/////////////////////////////////////UPDATING COMPANY DETAILS
module.exports.updateCompany = (email, details)=>{
    let newDetails = {}
    newDetails.carCompany = details.carCompany;
    newDetails.companyAbout = details.companyAbout;
    newDetails.companyLogo = details.companyLogo;
    newDetails.showroomContact = details.showroomContact;
    newDetails.showroomAddress = details.showroomAddress;
    Catalogue.updateOne({email:email}, newDetails, (err, result)=>{
        if(err) throw err;
    });
}