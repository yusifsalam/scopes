import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const config = {
  runtime: "edge",
};

interface Scopes {
  [key: string]: string;
}

export async function GET() {
  try {
    const sourceURL = `${process.env.BASE_URL}${process.env.SCOPES_ROUTE}`;
    console.log("sourceURL", sourceURL);
    const initialResponse = await fetch(sourceURL);
    const initialHtml = await initialResponse.text();

    const $ = cheerio.load(initialHtml);

    const today = new Date().toLocaleDateString("fi-FI", {
      day: "2-digit",
      month: "2-digit",
    });
    const targetLink = $("h2.teaser-m__title")
      .filter((_i, el) => {
        const text = $(el).text();
        return (
          text.match(/Päivän horoskooppi .* \d{1,2}\.\d{1,2}\./) !== null &&
          text.includes(today)
        );
      })
      .closest("a")
      .attr("href");

    if (!targetLink) {
      return NextResponse.json(
        {
          error: "Link not found",
        },
        { status: 404 },
      );
    }

    const targetUrl = new URL(
      targetLink,
      process.env.BASE_URL as string,
    ).toString();
    const targetResponse = await fetch(targetUrl);
    const targetHtml = await targetResponse.text();

    const targetPage = cheerio.load(targetHtml);

    const scopes: Scopes = {};

    targetPage("h3.article-subtitle-20").each((i, element) => {
      const sign = targetPage(element).text().trim();
      const text = targetPage(element).next("p.article-body").text().trim();

      if (sign && text) {
        scopes[sign] = text;
      }
    });

    // const { text } = await generateText({
    //   model: openai("gpt-4-turbo"),
    //   system:
    //     "Your task is to translate horoscopes from Finnish to English given input JSON.",
    //   prompt: JSON.stringify(scopes),
    // });

    return NextResponse.json({
      scopes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to process request",
      },
      { status: 500 },
    );
  }
}
