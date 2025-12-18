const Doctor = require("../models/Doctor"); 
const Patient = require("../models/Patient"); 
const User = require("../models/User"); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs"); 
 

const generateToken = (user) => { 
    return jwt.sign( 
        { id: user.entityId, role: user.role,entityId: user.entityId }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN } 
    ); 
}; 
 

exports.registerDoctor = async (req, res) => { 
    try { 
        
        const { name, email, password } = req.body; 
 
        const userExists = await User.findOne({ email }); 
        if (userExists) return res.status(400).json({ message: "Email already exists" }); 
 
        const hashed = await bcrypt.hash(password, 10); 
 
       
        const doctor = await Doctor.create({ 
            name, email, password: hashed, role: "Doctor" 
            
        }); 
 
       
        const user = await User.create({ 
            name, email, password: hashed, role: "Doctor", entityId: doctor._id 
        }); 
 
       
        const token = generateToken(user); 
 
        res.status(201).json({ 
            message: "Doctor Registered and Logged In. Please update your profile details.", 
            token, 
            role: user.role, 
            id: doctor._id 
    }); 
 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}; 
 

exports.registerPatient = async (req, res) => { 
    try { 
        
        const { name, email, password } = req.body; 
 
        
        const userExists = await User.findOne({ email }); 
        if (userExists) return res.status(400).json({ message: "Email already exists" }); 
 
        const hashed = await bcrypt.hash(password, 10); 
 
        
        const patient = await Patient.create({ 
            name, email, password: hashed, role: "Patient" 
            
        }); 
 
        
        const user = await User.create({ 
            name, email, password: hashed, role: "Patient", entityId: 
patient._id 
        }); 
        
        
        const token = generateToken(user); 
 
        res.status(201).json({ 
            message: "Patient Registered and Logged In. Please update your profile details.", 
            token, 
            role: user.role, 
            id: patient._id 
        }); 
 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}; 
  
exports.login = async (req, res) => { 
    try { 
        const { email, password, userType } = req.body; 
 
        const user = await User.findOne({ email }); 
 
        if (!user) return res.status(404).json({ message: "User not found" 
}); 
        
        if (user.role.toLowerCase() !== userType.toLowerCase()) { 
             return res.status(403).json({ message: `Access denied. 
Expected role: ${userType}` }); 
        } 
        
        const match = await bcrypt.compare(password, user.password); 
        if (!match) return res.status(401).json({ message: "Invalid Credentials" }); 
 
        const token = generateToken(user); 
 
        res.json({ 
            message: "Login Successful", 
            id: user.entityId,
            email: user.email,
            token, 
            role: user.role 
        }); 
 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}; 