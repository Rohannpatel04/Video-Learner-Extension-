const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const PDFParser = require('pdf-parse');

async function fetchContent(url) {
    try {
        if (url.startsWith('http')) {
            const response = await axios.get(url);
            return response.data;
        } else if (url.startsWith('file:///')) {
            const filePath = decodeURI(url.substring(8)); // Remove 'file://'
            const pdfBuffer = fs.readFileSync(filePath);
            return await extractTextFromPDF(pdfBuffer);
        } else if (url.endsWith('.pdf')) {
            const pdfBuffer = fs.readFileSync(url);
            return await extractTextFromPDF(pdfBuffer);
        } else {
            console.error("Unsupported URL format.");
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return null;
    }
}



async function extractTextFromPDF(pdfBuffer) {
    try {
        const data = await PDFParser(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error("Failed to extract text from PDF:", error);
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

function saveToTxt(text, filename = "page.txt") {
    fs.writeFile(filename, text, (err) => {
        if (err) {
            console.error("Failed to save text:", err);
            return;
        }
        console.log(`Text saved to ${filename}`);
    });
}

export async function runConvert(url) {
    const content = await fetchContent(url);
    if (content) {
        const text = content.startsWith('<') ? extractArticleText(content) : content;
        if (text) {
            saveToTxt(text);
        } else {
            console.error("Failed to extract content text.");
        }
    } else {
        console.error("Failed to fetch content from the provided URL or PDF file.");
    }
}

// Accept URL or local file path as a command-line argument
// const input = process.argv[2];
// if (!input) {
//     console.error("Please provide a URL or local PDF file path.");
// } else {
//     runConvert(input);
// }