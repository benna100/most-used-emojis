"use strict";

const HttpError = require("../lib/utils/http-error");
var request = require("request-promise");
const extractEmoji = require("extract-emoji");

async function getTimelineTweets(username) {
  const timelineTweetsRequest = await request.get(
    "https://api.twitter.com/1.1/statuses/user_timeline.json",
    {
      oauth: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token: process.env.TOKEN,
        token_secret: process.env.TOKEN_SECRET,
      },
      qs: { screen_name: username, count: "200" },
    }
  );
  return JSON.parse(timelineTweetsRequest);
}

function getEmoijs(tweets) {
  const emojis = [];

  tweets.forEach(({ text }) => {
    const extractedEmojis = extractEmoji.extractEmoji(text);
    extractedEmojis.forEach((emoji) => emojis.push(emoji));
  });

  return emojis;
}

function analyzeEmojis(emojis) {
  const emojiAnalysis = {};
  emojis.forEach((emoji) => {
    if (emoji in emojiAnalysis) {
      emojiAnalysis[emoji]++;
    } else {
      emojiAnalysis[emoji] = 1;
    }
  });

  const emojiAnalysisArray = [];
  for (var emoji in emojiAnalysis) {
    emojiAnalysisArray.push({ emoji, count: emojiAnalysis[emoji] });
  }

  return emojiAnalysisArray;
}

function getMostUsedEmojis(tweets) {
  const emojis = getEmoijs(tweets);

  const mostUsedEmojisArray = analyzeEmojis(emojis);

  return mostUsedEmojisArray;
}

const getModules = async (req) => {
  const timelineTweets = await getTimelineTweets(req.query.username);
  console.log(req.query.username);

  return getMostUsedEmojis(timelineTweets);
};

module.exports = {
  getModules,
};
