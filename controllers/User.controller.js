const User = require('../schemas/User.schema');

const {z} = require('zod');

const userObj = z.object({
    name: z.string().min(1, "Name is required").max(20, "Name can't be longer than 20 characters"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits").optional(true),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password can not greater than 20 characters long"),
    profilePhoto: z.string().url("Invalid profile photo URL").optional(true)
});

const GetUsers = async (req, res) => {
    try {
        const users = await User.find({});

        console.log(req);

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
        const { name, email, password, phoneNumber, profilePhoto } = req.body;

        const user = userObj.parse({name, email, password, phoneNumber, profilePhoto});

        if(!user) {
            return res.status(400).send({
                message: "Invalid user data",
            });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).send({
                message: "Email already exists",
            });
        }

        if(phoneNumber){
            const existingPhoneNumber = await User.findOne({ phoneNumber });
            if(existingPhoneNumber) {
                return res.status(400).send({
                    message: "Phone number already exists",
                });
            }
        }

        const newUser = await User.create({
            name,
            email,
            password,
            profilePhoto
        });

        return res.status(201).send({
            "message": "User created successfully",
            data: newUser
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