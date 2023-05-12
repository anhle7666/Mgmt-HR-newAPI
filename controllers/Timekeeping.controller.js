const Timekeeping = require("../models/Timekeeping");
const Schedule = require("../models/Schedule");
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
        const { IDEmployee } = data;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

        // Tìm kiếm tất cả các dữ liệu chấm công của nhân viên trong ngày
        const attendanceRecords = await Timekeeping.find({
            IDEmployee: IDEmployee,
            time: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        })
            .sort({ time: -1 })
            .limit(2);

        // Nếu số lượng bản ghi chấm công trong ngày của nhân viên chưa đủ 2 bản ghi
        if (attendanceRecords.length < 2) {
            console.log("Dưới 2 bản ghi, thêm");
            const newTimekeepingRecord = new Timekeeping(data);
            await newTimekeepingRecord.save();
        } else {
            console.log("Quá bản ghi");
        }
    } catch (err) {
        throw err;
    }
};
