const fs = require("fs");
const VideoData = require("../video-data.json");

module.exports = {
    getComments: function(video) {
        if (!video) {
            console.log("Error: Video is null.");
            return;
        }

        if (!VideoData.Videos[video]) {
            VideoData.Videos[video] = {
                Comments: [
                    {
                        author: "Yochran",
                        content: "what song"
                    },
                    {
                        author: "Stupid Poop",
                        content: "bruh moment"
                    }
                ]
            };

            fs.writeFile("video-data.json", JSON.stringify(VideoData, null, 2), (err) => {
                if (err) {
                    console.log("Error: Couldn't write to video data file.");
                }
            });
        }

        const comments = VideoData.Videos[video].Comments;

        if (!comments) {
            console.log("Error: Video has no comments.");
            return;
        }

        return comments;
    }
}