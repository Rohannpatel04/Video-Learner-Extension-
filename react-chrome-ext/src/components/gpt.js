const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const duration = 'any'; 

async function run(filePath, maxDuration, minDuration) {
  console.log("Current working directory:", process.cwd());

  if (!fs.existsSync(filePath)) {
    console.log("File does not exist.");
    return;
  }

  // set the type of model we are using 
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // change the text file to a string 
  const content = fs.readFileSync(filePath, 'utf-8');
  const prompt = content;

  try {

    // call the generative ai model to summarize withing 10 words 
    const result = await model.generateContent(prompt, { length: 10 });
    const response = await result.response;
    const text = await response.text();

    // condence the summary to 10 words 
    const summary = text.trim().split(/\s+/).slice(0, 10).join(' ');

    const apiKey = process.env.YT_API_KEY;

    // conduect a youtube search 
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        part: 'snippet',
        q: summary,
        maxResults: 10,
        videoDuration: duration
      }
    });

    let foundVideo = null;

    if (searchResponse.data && searchResponse.data.items && searchResponse.data.items.length > 0) {
      for (const item of searchResponse.data.items) {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;

        const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            key: apiKey,
            part: 'contentDetails',
            id: videoId
          }
        });

        const videoDuration = videoDetailsResponse.data.items[0].contentDetails.duration;
        const durationSeconds = parseDurationToSeconds(videoDuration);

        if (durationSeconds >= minDuration && durationSeconds <= maxDuration) {
          foundVideo = {
            id: videoId,
            title: videoTitle,
            duration: videoDuration
          };
          break;
        }
      }
      
      // If the youtube video is found we save the youtube video link to the varible: video URL 
      if (foundVideo) {
        const videoUrl = `https://www.youtube.com/watch?v=${foundVideo.id}`;
        console.log("Found video:", foundVideo.title);
        console.log("Video URL:", videoUrl);

      //If there are no youtube videos within the time frame
      } else {
        console.error('No YouTube video found within the specified duration range.');
      }

      //If there are no youtube videos on the topic 
    } else {
      console.error('No YouTube video found for the summary:', summary);
    }
  
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      console.error('Error searching for YouTube video:', error.response.data.error.message);
    } else {
      console.error('Error searching for YouTube video:', error.message);
    }
  }
}


// convert the duration that the youtube api gets to seconds 
function parseDurationToSeconds(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] ? parseInt(match[1]) : 0);
  const minutes = (match[2] ? parseInt(match[2]) : 0);
  const seconds = (match[3] ? parseInt(match[3]) : 0);
  return hours * 3600 + minutes * 60 + seconds;
}

run(filePath, maxDuration, minDuration);
