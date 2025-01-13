"use client";

import React from "react";
import { Database } from "@/supabase/database.types";
import { useUserPreferencesStore } from "../state/user-preferences-provider";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";

export type Scope = Database["public"]["Views"]["scopes_today"]["Row"];

const SingleScope = ({ scope }: { scope: Scope }) => {
  const { signId, setSignId } = useUserPreferencesStore((state) => state);
  const [copied, setCopied] = React.useState(false);

  const isFav = scope.signId === signId;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${scope.sign.toUpperCase()}\n${scope.scope}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setSignId(scope.signId)}
      className={`relative pb-4 px-4 cursor-pointer transition-all rounded-lg group hover:bg-white/5 ${
        isFav 
          ? "ring-1 ring-blue-500" 
          : ""
      }`}
      title={isFav ? "This is your favorited sign" : "Click to favorite"}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className={`text-lg font-medium uppercase ${isFav ? "text-blue-400" : "text-white"}`}>{scope.sign}</h2>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-400 hover:text-white"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{scope.scope}</p>
    </div>
  );
};

export default SingleScope;
