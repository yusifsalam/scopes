"use client";

import { Database } from "@/supabase/database.types";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { useUserPreferencesStore } from "../state/user-preferences-provider";

export type Scope = Database["public"]["Views"]["scopes_today"]["Row"];

const SingleScope = ({ scope }: { scope: Scope }) => {
  const { signId, setSignId } = useUserPreferencesStore((state) => state);
  const [copied, setCopied] = React.useState(false);

  const isFav = scope.signId === signId;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${scope.sign.toUpperCase()}\n${scope.scope}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative cursor-pointer rounded-lg px-4 pb-4 transition-all hover:bg-white/5 ${
        isFav ? "ring-1 ring-blue-500" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <h2
            className={`text-lg font-medium uppercase ${isFav ? "text-blue-400" : "text-base-content"}`}
          >
            <Link href={`/${scope.sign}`} className="not-prose">
              {scope.sign}
            </Link>
          </h2>
          <button
            onClick={() => setSignId(scope.signId)}
            className="relative mt-[2em] mb-[1em] cursor-pointer pl-1 opacity-0 transition-all duration-200 group-hover:opacity-100"
            title={isFav ? "This is your favorited sign" : "Click to favorite"}
          >
            <SolidHeartIcon
              className={`absolute h-5 w-5 text-red-500 transition-all duration-200 ${
                isFav ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            />
            <HeartIcon
              className={`h-5 w-5 transition-all duration-200 hover:text-red-500 ${
                isFav ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="relative cursor-pointer opacity-0 transition-all duration-200 group-hover:opacity-100"
          title="Copy to clipboard"
        >
          <div className="relative">
            <CheckIcon
              className={`absolute h-5 w-5 text-green-500 transition-all duration-200 ${
                copied ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            />
            <ClipboardDocumentIcon
              className={`h-5 w-5 transition-all duration-200 ${
                copied ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          </div>
        </button>
      </div>
      <p className="text-base-content text-sm leading-relaxed">{scope.scope}</p>
    </div>
  );
};

export default SingleScope;
