import { createClient } from "@/supabase/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import * as cheerio from "cheerio";

interface Scopes {
  [key: string]: string;
}

export async function getScopes() {
  try {
    const sourceURL = `${process.env.BASE_URL}${process.env.SCOPES_ROUTE}`;
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
      return { error: "Link not found" };
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
        scopes[sign.toLowerCase()] = text;
      }
    });

    const { text: translatedScopeText } = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        "Your task is to translate horoscopes from Finnish to English given input JSON.",
      prompt: JSON.stringify(scopes),
    });

    const signIds = {
      capricorn: 1,
      aquarius: 2,
      pisces: 3,
      aries: 4,
      taurus: 5,
      gemini: 6,
      cancer: 7,
      leo: 8,
      virgo: 9,
      libra: 10,
      scorpio: 11,
      sagittarius: 12,
    };
    type ZodiacSign = keyof typeof signIds;
    type TranslatedScopes = {
      [key in ZodiacSign]: string;
    };
    const translatedScopes: TranslatedScopes = JSON.parse(translatedScopeText);

    console.log(translatedScopes);
    const client = await createClient();

    const { data, error } = await client
      .from("horoscopes")
      .insert(
        Object.entries(translatedScopes).map(([sign, scope]) => ({
          sign_id: signIds[sign as keyof typeof signIds],
          date: new Date().toISOString().split("T")[0],
          scope,
        })),
      )
      .select();

    console.log("data", data, "error", error);

    return {
      scopes,
      translatedScopes,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to process request",
    };
  }
}
