const {z} = require('zod');

const userObj = z.object({
    name: z.string().min(1, "Name is required").max(20, "Name can't be longer than 20 characters"),
    age: z.number().int().min(18, "Age must be at least 18").max(100, "Age must be 100 or less"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
});

const GetUsers = (req, res) => {
    return res.send({
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com"
    });
};

const GetUserById = (req, res) => {
    const { id } = req.params;

    return res.send({"id": id});
}

const CreateUser = (req, res) => {
    try {
        const { name, age, email, phoneNumber } = req.body;

        const user = userObj.parse({name, age, email, phoneNumber});

        console.log(user);

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
    }
    
}

const UpdateUser = (req, res) => {
    const { id } = req.params;
    return res.status(200).send({"id": id});
}

const DeleteUser = (req, res) => {
    const { id } = req.params;

    return res.status(200).send({"id": id});
}

module.exports = {DeleteUser, UpdateUser, CreateUser,GetUserById,GetUsers}