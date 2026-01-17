import User from "../models/User.js";

/* ================= GET USER ================= */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "profileImage",
        "email",
        "phone",
        "isActive",
        "createdAt"
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error("GET USERS ERROR:", error); // 👈 CRITICAL

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= CREATE USER ================= */
export const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required"
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      phone
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user
    });

  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= UPDATE USER ================= */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await user.update(req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= DELETE USER ================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};