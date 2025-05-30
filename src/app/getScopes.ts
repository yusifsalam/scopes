import { createClient } from "@/supabase/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import * as cheerio from "cheerio";
import { signIds, ZodiacSign } from "./consts";

interface Scopes {
  [key: string]: string;
}

type TranslatedScopes = {
  [key in ZodiacSign]: string;
};

export async function getScopes() {
  try {
    const sourceURL = `${process.env.BASE_URL}${process.env.SCOPES_ROUTE}`;
    const initialResponse = await fetch(sourceURL);
    const initialHtml = await initialResponse.text();

    const $ = cheerio.load(initialHtml);

    const today = new Date()
      .toLocaleDateString("fi-FI", {
        day: "2-digit",
        month: "2-digit",
      })
      .replace(/\b0/g, "");
    const targetLink = $("h2.teaser-m__title")
      .filter((_i, el) => {
        const text = $(el).text();
        console.log("text", text, "today", today);
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

    const translatedScopes: TranslatedScopes = JSON.parse(translatedScopeText);

    const client = await createClient("admin");
    const { error: scopeError } = await client
      .from("horoscopes")
      .insert(
        Object.entries(translatedScopes).map(([sign, scope]) => ({
          sign_id: signIds[sign as keyof typeof signIds],
          date: new Date().toISOString().split("T")[0],
          scope,
        })),
      )
      .select();
    if (scopeError) {
      return { error: scopeError };
    }

    const { error: updateTableError } = await client
      .from("scope_updates")
      .insert([{}])
      .select()
      .single();

    if (updateTableError) {
      return { error: updateTableError };
    }
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
