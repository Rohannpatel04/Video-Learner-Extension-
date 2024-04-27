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

    // call the generative ai model to summarize within 10 words
    const result = await model.generateContent(prompt, { length: 10 });
    const response = await result.response;
    const text = await response.text();

    // condense the summary to 10 words 
    const summary = text.trim().split(/\s+/).slice(0, 10).join(' ');

    const apiKey = process.env.YT_API_KEY;

    // conduct a youtube search 
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
        const thumbnails = item.snippet.thumbnails;
        const thumbnailUrl = thumbnails.default.url; // Extract thumbnail URL

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
            duration: videoDuration,
            thumbnail: thumbnailUrl
          };
          const finalVideoUrl = `https://www.youtube.com/watch?v=${foundVideo.id}`;
          const finalThumbnailUrl = foundVideo.thumbnail;
          break;
        }
      }
      
      // If the youtube video is found we save the youtube video link to the variable: video URL 
      if (foundVideo) {
        const videoUrl = `https://www.youtube.com/watch?v=${foundVideo.id}`;
        console.log("Found video:", foundVideo.title);
        console.log("Video URL:", videoUrl);
        console.log("Thumbnail URL:", foundVideo.thumbnail);

      // If there are no youtube videos within the time frame
      } else {
        console.error('No YouTube video found within the specified duration range.');
      }

      // If there are no youtube videos on the topic 
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
const filePath = process.argv[2];
const minDuration = parseInt(process.argv[3]);
const maxDuration = parseInt(process.argv[4]);

// Check if all required arguments are provided
if (!filePath || isNaN(minDuration) || isNaN(maxDuration)) {
  console.error("Usage: node your_script.js <file_path> <min_duration> <max_duration>");
  process.exit(1); // Exit with a non-zero code to indicate an error
}

// Ensure minDuration is less than maxDuration
if (minDuration >= maxDuration) {
  console.error("Minimum duration must be less than maximum duration.");
  process.exit(1);
}

run(filePath, minDuration, maxDuration);