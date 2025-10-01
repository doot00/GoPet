
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const url ='https://news.naver.com/';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();

        return NextResponse.json({ title });
    } catch (error: any) {
        return NextResponse.json({ error : '크롤링 실패', details: error.message}, {status: 500});
    }
}

export default GET;