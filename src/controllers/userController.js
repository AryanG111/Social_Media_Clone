import user from '../models/User_model.js';

//Get all Users
export const getAllUsers = async (req, res) => {
    try{
        const users = (await user.find()).toSorted({ createdAt: -1 });
        if (users.length === 0){
            return res.status(404).json({message: "No users found"});
        
        }
        res.json(users);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }

};

//Get user by ID
export const geUserById = async (req, res) => {
    try{
        const user = await user.findById(req.params.id);
        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

    };

//Create a new user
export const createUser = async (req, res) => {
    try{
        const{username, email, firstName, lastName, password} = req.body;
        const newUser = new user({username, email, firstName, lastName, password});
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

// Update a User 
export const updateUser = async (req, res) => {
    try{
        const {username, email, firstName, lastName, password} = req.body;
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {username, email, firstName, lastName, password},
            {new: true});
        res.json(updatedUser);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// Delete a USer
export const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted Successful"});
    } catch (error){
        res.status(500).json({message: error.message});
    }
}   