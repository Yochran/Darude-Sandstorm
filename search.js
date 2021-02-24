const YouTube = require("./Classes/YouTube.js");
const Videos = require("./Classes/Video.js");

const AccountData = require("./account-data.json");
const VideoData = require("./video-data.json");
const fs = require("fs");
const Video = require("./Classes/Video.js");

scan();

function scan() {
    if (!AccountData.Initialized || !VideoData.Initialized) {
        setupData();
        return;
    }

    const accountDetails = {
        Email: "SandstormerEmail@gmail.com",
        Password: "DarudeSandstorm123",
        Username: "Darude Sandstormer"
    };

    var accountID = AccountData.TotalAccounts;

    if (!accountID) {
        console.log("Error: Couldn't find total accounts module in account-data.json. Set account ID to 1.");
        accountID = 0;
        AccountData.TotalAccounts = 1;
    }

    if (!AccountData.Accounts[accountID]) {
        YouTube.registerNewUser(accountDetails, null);

        const video = "Test-Video";

        if (!video) {
            VideoData.Videos[video] = {};
            VideoData.Videos[video]["Comments"] = [
                {
                    content: "what song",
                },
                {
                    content: "bruh momento"
                }
            ];

            fs.writeFile("video-data.json", JSON.stringify(VideoData, null, 2), (err) => {
                if (err) {
                    console.log("Error: Couldn't write to video data file.");
                }
            });
        }

        for (var comment in Videos.getComments(video)) {
            if (Videos.getComments(video)[comment].content.toLowerCase().includes("what") && Videos.getComments(video)[comment].content.toLowerCase().includes("song")) {
                if (!Videos.getComments(video)[comment].replies) {
                    Videos.getComments(video)[comment].replies = [];
                    fs.writeFile("video-data.json", JSON.stringify(VideoData, null, 2), (err) => {
                        if (err) {
                            console.log("Error: Couldn't write to video data file.");
                        }
                    });
                }

                Videos.getComments(video)[comment].replies.push({content: "Darude Sandstorm", author: accountDetails.Username});

                fs.writeFile("video-data.json", JSON.stringify(VideoData, null, 2), (err) => {
                    if (err) {
                        console.log("Error: Couldn't write to video data file.");
                    }
                });
            }
        }
    } else {
        console.log("This user is already registered.");
    }
}

function setupData() {
    AccountData.Accounts = {};
    AccountData.TotalAccounts = 0;
    AccountData.Initialized = true;

    VideoData.Videos = {};
    VideoData.Initialized = true;

    fs.writeFile("account-data.json", JSON.stringify(AccountData, null, 2), (err) => {
        if (err) {
            console.log("Error: Couldn't write to account data file.");
        }
    });

    fs.writeFile("video-data.json", JSON.stringify(VideoData, null, 2), (err) => {
        if (err) {
            console.log("Error: Couldn't write to video data file.");
        }
    });
}