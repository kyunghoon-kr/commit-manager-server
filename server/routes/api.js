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
    console.log('fetchUserInfo 함수 호출');
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (e) {
        console.log("유효하지 않는 사용자를 참조하였습니다");
    }
};

const fetchUserEventInfo = async (username, page) => {
    // Page, username을 입력받아 이벤트 통계에 접근한다
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events?page=${page}`);
        return response.data;
    } catch (e) {
        console.log("유효하지 않는 사용자를 참조하거나 최대 페이지 수를 초과하였습니다.");
    }
}

const getDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() >= 10 ? '' : 0}${date.getMonth()+1}-${date.getDate() >= 10 ? '' : 0}${date.getDate()}`;
}

exports.fetchEvents = fetchEvents;
exports.fetchUserInfo = fetchUserInfo;
exports.fetchUserEventInfo = fetchUserEventInfo;
exports.getDate = getDate;