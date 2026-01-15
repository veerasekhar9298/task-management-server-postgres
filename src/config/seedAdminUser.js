const User = require("../dbModel/user/schema");

const seedAdminUser = async () => {
    const adminEmail = "muthakaniveerashekahr@gmail.com";
    const adminPassword = "Veera@1234";
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
        password: adminPassword,
        role: "admin",
    });

    console.log("👑 Admin user created");
};

module.exports = { seedAdminUser };
