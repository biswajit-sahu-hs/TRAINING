
const User = require('../models/User'); 
const Doctor = require('../models/Doctor');

//doctor,admin
exports.members = async (req, res) => {
  try {
    const userId = req.userId; 

   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role == 'member') {
      return res.status(403).json({ error: 'Unauthorized: Only utherized people access this.' });
    }

    const userList = await User.find({ role: 'member' });

    res.status(200).json(userList);
   

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
};

//doctor,admin,member
exports.doctors = async (req, res) => {
  try {
    const userId = req.userId; 

   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userList = await User.find({ role: 'doctor' });

    res.status(200).json(userList);
   

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
};

//doctor,admin
exports.admin = async (req, res) => {
  try {
    const userId = req.userId; 

   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role == 'member') {
      return res.status(403).json({ error: 'Unauthorized: Only utherized people access this.' });
    }

    const userList = await User.find({ role: 'admin' });

    res.status(200).json(userList);
   

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
};

//doctor,admin
exports.doctorDetail = async (req, res) => {
  try {
    const userId = req.userId;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    if (user.role == 'member') { 
      return res.status(403).json({ error: 'Unauthorized: Only admin can add doctor details.' });
    }

    
    const { doctorId, degree, college, regno, description, specialization } = req.body;

    const newDoctor = new Doctor({
      doctorId,
      degree,
      college,
      regno,
      description,
      specialization,
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor details added successfully.', doctor: newDoctor });

  } catch (error) {
    console.error('Error adding doctor details:', error);
    res.status(500).json({ error: 'Failed to add doctor details.' });
  }
};

//member,admin
exports.memberAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const { street, city, state, country,zipCode } = req.body;

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.role !== 'doctor') { 
      return res.status(403).json({ error: 'Unauthorized: Only doctors can edit user details.' });
    }

    user.address.street = street;
    user.address.city = city;
    user.address.state = state;
    user.address.country = country;
    user.address.zipCode = zipCode;
    
    
    await user.save();

    res.status(200).json({ message: 'Member address updated successfully.', user });

  } catch (error) {
    console.error('Error updating member address:', error);
    res.status(500).json({ error: 'Failed to update member address.' });
  }
};


