const axios = require('axios');
const fetchEvents = async (username, token) => {
    // 토큰을 헤더에 달기
    console.log('fetchEvents 함수 호출');
    const config = {
        headers: { "Authorization": token }
    }
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`, config);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

const fetchUserInfo = async (username) => {
    // 토큰을 헤더에 달기
    console.log('fetchUserInfo 함수 호출');
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (e) {
        console.log("유효하지 않는 사용자를 참조하였습니다");
    }
};

const getDate = () => {
    let today = new Date();
    return `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`
}

exports.fetchEvents = fetchEvents;
exports.fetchUserInfo = fetchUserInfo;
exports.getDate = getDate;