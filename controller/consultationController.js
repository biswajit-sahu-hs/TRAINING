const Consultation = require('../models/consultation');
const User = require('../models/User'); // Adjust as per your project structure


exports.book = async (req, res) => {
  try {
    const userId = req.userId; 

   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'member') {
      return res.status(403).json({ error: 'Unauthorized: Only members can book consultations' });
    }

   
    const { disease, description, time } = req.body;

    const consultation = new Consultation({
      member: userId,
      doctor: null,
      disease,
      description,
      time
    });

    await consultation.save();

    res.status(201).json({ message: 'Consultation booked successfully' });
  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
};

exports.lists = async (req, res) => {
  try {
    const role = req.role; 

    
    if (role != "member") {
      
      const consultations = await Consultation.find();

     
      res.status(200).json(consultations);
    } else {
     
      return res.status(404).json({ error: 'User does not have access to this.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations.' });
  }
};

//doctor
exports.action = async (req, res) => {
  try {
    const role = req.role; 
    const userId = req.userId; 
    const { consultationId, status } = req.body;
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    

     
    const consultation = await Consultation.findById(consultationId);

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    
    if (role == "doctor") {
      
      
      consultation.doctor = userId; 
      consultation.status = status; 

      
      await consultation.save();

      return res.json(consultation);
     
      
    } else {
     
      return res.status(404).json({ error: 'User does not have access to this.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations.' });
  }
};

//admin
exports.doctorAssign = async (req, res) => {
  try {
    const role = req.role; 
    const userId = req.userId; 
    const { consultationId, doctorId } = req.body;
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    if (role == "admin") {
      
         
    const consultation = await Consultation.findById(consultationId);

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }  
      consultation.doctor = doctorId; 
    
      await consultation.save();

      return res.json(consultation);
    
    } else {
     
      return res.status(404).json({ error: 'User does not have access to this.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations.' });
  }
};


//doctor,admin
exports.prescription = async (req, res) => {
  try {
    const role = req.role; 
    const userId = req.userId; 
    const { consultationId, doctorId, prescription} = req.body;
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    if (role == "admin" || userId == doctorId) {
      
      const consultation = await Consultation.findById(consultationId);
      
        consultation.prescription = prescription; 
    
        await consultation.save();
  
        return res.json(consultation);
     

     
      
    } else {
     
      return res.status(404).json({ error: 'User does not have access to this.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations.' });
  }
};

//admin
// exports.editConsulation = async (req, res) => {
//   try {
//     const role = req.role; 
//     const userId = req.userId; 

   
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

    
//     if (role == "doctor") {
      
//       //change prescription value and

     
      
//     } else {
     
//       return res.status(404).json({ error: 'User does not have access to this.' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch consultations.' });
//   }
// };

//member,admin, doctor
exports.consultationDetails = async (req, res) => {
  try {
    const { consultationId } = req.query;
    const userId = req.userId; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const consultation = await Consultation.findById(consultationId);

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    
    const member = await User.findById(consultation.member);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    
    const consultationDetails = {
      _id: consultation._id,
      member: {
        _id: member._id,
        firstName: member.firstname,  
        lastName: member.lastname,
        email: member.email,
        member_address: consultation.address,
        phone: consultation.address.phone,
      },
      address: consultation.address,
      time: consultation.time,
      disease: consultation.disease,
      description: consultation.description,
      status: consultation.status,
      prescription: consultation.prescription
    };

  
    res.json(consultationDetails);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultation details.' });
  }
};

//admin,member,doctor
exports.cancel = async (req, res) => {
  try {
    const role = req.role; 
    const userId = req.userId; 
    const { consultationId} = req.body;
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
   
      
      const consultation = await Consultation.findById(consultationId);
      if(consultation.member == userId || consultation.doctor == userId || role == "admin"){
        consultation.status = 'cancel'; 
    
        await consultation.save();
  
        return res.json(consultation.status);
      }else{
        return res.status(404).json({ error: 'User does not have access to this.' });
      }
        
     

     
      
    
     
     
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations.' });
  }
};








