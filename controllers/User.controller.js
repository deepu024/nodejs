const User = require('../schemas/User.schema');

const {z} = require('zod');

const userObj = z.object({
    name: z.string().min(1, "Name is required").max(20, "Name can't be longer than 20 characters"),
    age: z.number().int().min(18, "Age must be at least 18").max(100, "Age must be 100 or less"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
});

const GetUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.send(users);
    } catch (error) {
        return res.send(500).send({message: error.message});
    }
};

const GetUserById = (req, res) => {
    const { id } = req.params;

    return res.send({"id": id});
}

const CreateUser = async (req, res) => {
    try {
        const { name, age, email, phoneNumber } = req.body;

        const user = userObj.parse({name, age, email, phoneNumber});

        if(!user) {
            return res.status(400).send({
                message: "Invalid user data",
            });
        }

        await User.create({
            name, age, email, phoneNumber
        });      

        return res.status(201).send({
            "message": "User created successfully",
            "user": {
                name,
                age,
                email,
                phoneNumber
            }
        });
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => ({
                field: err.path[0],
                message: err.message,
            }));
            
            return res.status(400).send({
                message: "Validation failed",
                errors: errorMessages,
            });
        }

        return res.status(500).send({
            message: error.message,
        });
    }
    
}

const UpdateUser = (req, res) => {
    const { id } = req.params;
    return res.status(200).send({"id": id});
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({_id: id});
        return res.status(200).send(user);   
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
    
}

module.exports = {DeleteUser, UpdateUser, CreateUser,GetUserById,GetUsers}