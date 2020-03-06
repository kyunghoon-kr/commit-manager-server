const axios = require('axios');
const fetchEvents = async (username, token) => {
    // 토큰을 헤더에 달기
    console.log('fetchEvents 함수 호출');
    const tokenHeader = `token ${token}`
    const config = {
        headers: { "Authorization": tokenHeader }
    }
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`, config);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

exports.fetchEvents = fetchEvents;