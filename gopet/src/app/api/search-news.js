const axios = require('axios');
const cheerio = require('cheerio');

async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

async function crawl() {
    
    const $ = await fetchHTML(url);

    const title = $('title').text();
    console.log(`Title: ${title}`);
    
}


crawl();


// cheerio node.js모듈 -> 브라우저에서 동작 x
// 
