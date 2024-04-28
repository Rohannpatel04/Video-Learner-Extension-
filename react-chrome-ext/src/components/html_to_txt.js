import { run } from './gpt.js';


const axios = require('axios');
const cheerio = require('cheerio');


async function fetchContent(url) {
    try {
        if (url.startsWith('http')) {
            const response = await axios.get(url);
            return response.data;
        } else if (url.startsWith('file:///')) {
            console.error("Local file access not supported in browser.");
            return null;
        } else if (url.endsWith('.pdf')) {
            console.error("PDF file access not supported in browser.");
            return null;
        } else {
            console.error("Unsupported URL format.");
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return null;
    }
}

function extractArticleText(html) {
    const $ = cheerio.load(html);

    // Try to find article content within <article> tags
    const articleContent = $('article').text().trim();
    if (articleContent) {
        return articleContent;
    }

    // If <article> tags are not found, try to extract text from the entire body
    return $('body').text().trim();
}

export async function runConvert(url, minDuration, maxDuration) {
    console.error("Reached the conversion");
    try {
        const content = await fetchContent(url);

        if (content) {
            const text = extractArticleText(content);
            if (text) {
                return run(text, minDuration, maxDuration);
            } else {
                console.error("Failed to extract content text.");
            }
        } else {
            console.error("Failed to fetch content from the provided URL or PDF file.");
        }
    } catch (error) {
        console.error("Error in runConvert:", error);
        return null;
    }
}