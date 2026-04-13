const User = require('./Userschema');
// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const user = new User({ name, email, phone, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({
            message: "Registration failed",
            error: err.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({
            ok: true,
            message: "Login successful",
            data: { id: user._id, email: user.email, name: user.name }
        });

    } catch (err) {
        res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🔐 hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({
            message: "Error updating password",
            error: err.message
        });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            message: "Users fetched successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            error: err.message
        });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User fetched",
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching user",
            error: err.message
        });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User updated",
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating user",
            error: err.message
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting user",
            error: err.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};