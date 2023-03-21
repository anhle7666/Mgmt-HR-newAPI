const config = {
    app: {
        port: process.env.PORT || 8080,
    },

    //Connect to Database HR_Mgmt
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://admin:admin@hrmgmt.bnuzzir.mongodb.net/HR_Mgmt",
    },
};

module.exports = config;
