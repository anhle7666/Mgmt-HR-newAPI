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
        // Lấy IDEmployee từ dữ liệu truyền vào
        console.log(data);
        const { IDEmployee } = data;
        // Lấy thời gian hiện tại
        const today = new Date();
        // Tạo đối tượng Date cho thời điểm bắt đầu ngày hiện tại
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // Tạo đối tượng Date cho thời điểm kết thúc ngày hiện tại
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        // Tìm kiếm tất cả các dữ liệu chấm công của nhân viên trong ngày
        const attendanceRecords = await Timekeeping.find({
            IDEmployee: IDEmployee,
            time: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        })
            .sort({ time: -1 }) // Sắp xếp theo thời gian giảm dần để lấy 2 bản ghi mới nhất
            .limit(2);

        // Nếu số lượng bản ghi chấm công trong ngày của nhân viên chưa đủ 2 bản ghi
        if (attendanceRecords.length < 2) {
            // Tìm kiếm lịch làm việc của nhân viên trong ngày
            const schedules = await Schedule.find({
                IDEmployee: IDEmployee,
                events: {
                    $elemMatch: {
                        start: { $gte: startOfDay.toISOString() },
                        end: { $lt: endOfDay.toISOString() },
                    },
                },
            });
            // Nếu lịch làm việc của nhân viên tồn tại trong ngày
            if (schedules.length !== 0) {
                // Lưu dữ liệu chấm công mới
                const newTimekeepingRecord = new Timekeeping(data);
                await newTimekeepingRecord.save();
            }
        } else {
            console.log("Không thêm dữ liệu");
        }
    } catch (err) {
        throw err;
    }
};
