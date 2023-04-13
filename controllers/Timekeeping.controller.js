const Timekeeping = require("../models/Timekeeping");

exports.getAllTime = async () => {
    try {
        const list = await Timekeeping.find();
        return list;
    } catch (err) {
        throw err;
    }
};

exports.checkIn = async (data) => {
    try {
        console.log(data);
        const { IDEmployee } = data;
        const time = new Date(data.time);
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        const Id = await Timekeeping.find({
            IDEmployee: IDEmployee,
            time: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        })
            .sort({ time: -1 })
            .limit(2);
        if (Id.length < 2) {
            const newTimekeep = new Timekeeping(data);
            await newTimekeep.save();
        } else {
            console.log("Không thêm dữ liệu");
        }
    } catch (err) {
        throw err;
    }
};
