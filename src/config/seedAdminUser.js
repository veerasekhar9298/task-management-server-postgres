const User = require("../models/user");

const seedAdminUser = async () => {
    const adminEmail = "muthakaniveerashekahr@gmail.com";

    const existingAdmin = await User.findOne({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log("👤 Admin user already exists");
        return;
    }

    await User.create({
        name: "veerashekhar",
        email: adminEmail,
        role: "admin",
    });

    console.log("👑 Admin user created");
};

module.exports = { seedAdminUser };
