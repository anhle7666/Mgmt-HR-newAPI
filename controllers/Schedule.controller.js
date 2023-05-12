const Schedule = require("../models/Schedule");

exports.getAllSchedule = async () => {
    try {
        const result = await Schedule.find();
        return result;
    } catch (err) {
        throw err;
    }
};

exports.getSchedule = async () => {
    try {
        const result = await Schedule.find();
        let arr = [];
        result.map((schedule) => {
            arr = arr.concat(schedule.events);
        });
        return arr;
    } catch (err) {
        throw err;
    }
};

exports.addSchedule = async (data) => {
    try {
        const { IDEmployee, event } = data;
        const schedule = await Schedule.findOne({ IDEmployee: IDEmployee });
        if (schedule) {
            //tìm lịch làm của nhân viên xem đã tồn tại ca giống nhau hay không
            // const findEvent = schedule.events.find((e) => e.title === data.event.title && e.start === data.event.start);
            const findEvent = schedule.events.find((e) => {
                const eventStart = new Date(e.start);
                const eventEnd = new Date(e.end);
                const newStart = new Date(data.event.start);
                const newEnd = new Date(data.event.end);
                return (
                    (newStart >= eventStart && newStart < eventEnd) ||
                    (newEnd > eventStart && newEnd <= eventEnd) ||
                    (newStart <= eventStart && newEnd >= eventEnd)
                );
            });
            //trả về lỗi cho client nếu tìm thấy

            if (findEvent) {
                return new Error("Schedule is exitsing");
            }
            schedule.events.push(event);
            await Schedule.updateOne({ IDEmployee: IDEmployee }, schedule);
        } else {
            const newSchedule = new Schedule(data);
            newSchedule.events.push(event);
            await newSchedule.save();
        }
        return schedule;
    } catch (err) {
        throw err;
    }
};
