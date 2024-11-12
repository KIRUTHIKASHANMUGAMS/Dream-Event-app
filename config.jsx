const base = {
    headers: {
        "Content-Type": "application/json",
    },
};

const server = {
    baseURL: "http://192.168.0.98:8000",
};

const config = {
    ...base,
    ...server,
};

const combine = {
    register: `${config.baseURL}/register`,
    login: `${config.baseURL}/login`,
    forgotpassword: `${config.baseURL}/forgotpassword`,
    verifyotp: `${config.baseURL}/verify-otp`,
    resetpassword: `${config.baseURL}/reset-password`,
    chooseEvent: `${config.baseURL}/choose-event`,
    allowLocation: `${config.baseURL}/allow-location`,
    upcomingEvent: `${config.baseURL}/event-list-view`,
    upcomingEventById: `${config.baseURL}/eventById`,
    nearByEventList: `${config.baseURL}/nearByEvent-list`,
    seatBooking: `${config.baseURL}/seatBooking`,
    popularEvent: `${config.baseURL}/dashboard`,
    ticketBookingStatus: `${config.baseURL}/ticketbooking-status`,
    Image:`${config.baseURL}`










};

export default combine;
