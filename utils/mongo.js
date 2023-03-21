const mongoose = require("mongoose");

class MongoDB {
    static connect = async (uri) => {
        if (this.client) return this.client;
        this.client = await mongoose.connect(uri, { useNewUrlParser: true });
        return this.client;
    };

    static disconnect = async () => {
        mongoose.disconnect();
    };
}

module.exports = MongoDB;
