const mongoose = require('mongoose');

/////////////////////////////////////SCHEMA FOR BUYER
const buyerSchema = mongoose.Schema({
    userRole: String,
    username: String,
    userAddress: String,
    userContact: Number,
    email: String,
    password: String
})

/////////////////////////////////////MODEL FOR BUYER
const Buyer = new mongoose.model("buyer", buyerSchema);

/////////////////////////////////////ADDING BUYER TO DATABASE
module.exports.addBuyer = (buyerDetail) =>{
    const newBuyer = new Buyer(buyerDetail);

    newBuyer.save((err)=>{
        if(err) throw err;
    })
}

/////////////////////////////////////SCHEMA FOR SELLER
const sellerSchema = mongoose.Schema({
    userRole: String,
    showroomName: String,
    showroomAddress: String,
    showroomContact: Number,
    showroomId: String,
    email: String,
    password: String,
    carCompany: String
})

/////////////////////////////////////MODEL FOR SELLER
const Seller = new mongoose.model("seller", sellerSchema);

/////////////////////////////////////ADDING SELLER TO DATABASE
module.exports.addSeller = (sellerDetail) =>{
    const newSeller = new Seller(sellerDetail);

    newSeller.save((err)=>{
        if(err) throw err;
    })
}

/////////////////////////////////////FINDING USER
module.exports.userLogin = (userDetail) =>{
    const email = userDetail.email;
    const password = userDetail.password;
    return new Promise((resolve) => {
        Buyer.findOne({email:email, password:password}, function(err, foundBuyer){
            if(err) throw err;
            else{
                if(foundBuyer){
                    resolve(foundBuyer);
                } else{
                    Seller.findOne({email:email, password:password}, function(err, foundSeller){
                        if(err) throw err;
                        resolve(foundSeller)
                    });
                }
            } 
        });
    })
}