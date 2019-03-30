const axios = require('axios');

function getMp4ForVideo(videoId) {
    return new Promise(async(resolve, reject) => {
        const videoInfoRequestConfig = {
            agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/46.0',
            headers: {
                connection: 'keep-alive',
            },
            responseType: 'text'        
        }
        try {
            let responseSchema = {};
            const videoInfoResponse = await axios.get(`https://www.youtube.com/watch?v=${videoId}`, videoInfoRequestConfig)
            const dataHtml = videoInfoResponse.data;
            const start = dataHtml.indexOf('ytplayer.config = ') + 18;
            const end = dataHtml.indexOf(';ytplayer.load');
            const subString = dataHtml.substring(start, end)
            const subJson = JSON.parse(subString);
            const stringSub = subJson.args.player_response;
            const stringSubJson = JSON.parse(stringSub);
            const adaptiveFormats = stringSubJson.streamingData.adaptiveFormats;
            const videoDetails = stringSubJson.videoDetails
            responseSchema["adaptiveFormats"] = adaptiveFormats;
            responseSchema["videoDetails"] = videoDetails;
            resolve(responseSchema)
        }
        catch (err) {
            console.log(`
            --- Youtube ---
            Function: getMp4ForVideo
            Error: `, err)
            reject(err)
        }
    })
} 

 getMp4ForVideo("LspZCNNP6aE").then((mp4) => {
    console.log(mp4);
}).catch(e => {
    //
});