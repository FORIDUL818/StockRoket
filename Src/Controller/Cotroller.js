const userModel = require("../Models/UserModel");
const jwt =require('jsonwebtoken');
const SendEmailUtility = require("../Utility/SendMailUtility");
const OtpModel = require("../Models/OtpModel");
const bcrypt = require('bcrypt');


// ragistration start 
exports.Registration=async(req,res) => {
    try{
        const {fristName,lastName,email,password}=req.body;
        const user=await userModel.create({fristName,lastName,email,password})
           res.status(200).json({status:"success",data:user})
        res.status(200).json({data:details})
        }catch(err){
           res.status(200).json({status:"fail",data:err})
        }

};
// ragistration end
// login start
exports.login= async function(req,res){ 
    try {
        let reqbody = req.body;
        let userData = await userModel.findOne({ email: reqbody.email });
        if (!userData){ 
            return res.status(200).json({ status: "email not match" });
        }
        const isPasswordValid = await bcrypt.compare(reqbody.password, userData.password);
        if (!isPasswordValid) {
            return res.status(200).json({ status: "password not match" });
        }
        else{
        let payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60*24), data: userData.email };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ status: "success", data: userData, Token: token});
        }
       
    } catch (err) {
        res.status(200).json({ status: "failed", data: err.message });
    }
}
// login end
// profileUpdate start
 // Replace with actual path to your user model
exports.profileUpdate = async function(req, res) {
    try {
        let email = req.headers.email;
        let body = req.body;
        let query = { email: email };

        // Log the query and body for debugging

        let user = await userModel.updateOne(query, body);
        
        if (user.matchedCount === 0) { // No document was matched
            return res.status(200).json({status: "fail", message: "User not found"});
        }
        res.status(200).json({status: "success", data: user});
    } catch (err) {
        res.status(200).json({status: "fail", message: err.message});
    }
}

// profileUpdate end
// profiledetails start

exports.profileDetails = async function(req, res) {
    try {
        let email= req.headers.email;
        let query = { email: email }; // Construct the query object
        let user = await userModel.findOne(query); // Retrieve the user based on the email
        if (user) {
            res.status(200).json({ status: "success", data: user });
        } else {
            res.status(200).json({ status: "fail", message: "User not found" });
        }
    } catch(err) {
        res.status(200).json({ status: "fail", error: err.message });
    }
}

// profiledetails end

// emailrecovary start
exports.RecoverVaryfyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const otp = Math.floor(Math.random() * 1000000); // Generate a random OTP

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ status: "fail", data:"User not found" });
        }

        // Create a new entry in the OtpModel to store the OTP
        const createdOtp = await OtpModel.create({email,otp});

        // Send the OTP via email
        const sendMailResult = await SendEmailUtility(email, `Your OTP for account recovery: ${otp}`, "Account Recovery OTP");

        return res.status(200).json({
            status: "success",
            data: "Email and OTP verification sent successfully",
             sendMailResult: sendMailResult,
             createdOtp:createdOtp
        });
    } catch (err) {
        res.status(200).json({ status: "failed", data: err.message });
    }
};
// emailrecovary end

// otp Varification start
exports.OtpVarification = async (req, res) => {
    try {
       const email=req.params.email;
       const otp=req.params.otp;
        const status = 0; // Assuming default status
        const statusUpdate = 1; // Assuming status update value

        const otpCheck = await OtpModel.aggregate([
            {
                $match: {
                    email: email,
                    otp: otp,
                    status: status
                }
            },
            {
                $count: "total"
            }
        ]);

        // If OTP record found, update its status and send success response
        if (otpCheck.length>0) {
            const otpUpdate = await OtpModel.updateOne(
                { email: email, otp: otp },
                { status: statusUpdate }
            );
            return res.status(200).json({ status: "success", data: otpUpdate });
        } else {
            // If OTP record not found, send failure response
            return res.status(200).json({ status: "failed", data: "Invalid OTP" });
        }
    } catch (err) {
        // Handle any unexpected errors
        return res.status(200).json({ status: "failed", data: err.message });
    }
};
// otp Varification end


// reset password start
exports.passwordReset=async(req,res)=>{
    let email=req.body.email;
    let otp=req.body.otp;
    let statusUpdate=1
    let newPassword=req.body.password
  try{
let otpchack=await OtpModel.aggregate(
    [
        {$match:{email:email,otp:otp,status:statusUpdate}},
        {$count:"total"}
      ]
     )
     if(otpchack.length>0){
     let updatePassword=await userModel.updateOne({email:email},{password:newPassword})
     res.status(200).json({status:"success",data:updatePassword})
    }
}
catch(err){
res.status(200).status({status:"faild",data:err})
}
}
// reset password end
  
