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
      className={`${isFav ? "text-blue-400" : ""} cursor-pointer hover:text-red-400 group relative`}
      title={isFav ? "You have favorited this sign" : "Click to favorite"}
    >
      <h2 className="font-bold uppercase">{scope.sign}</h2>
      <p>{scope.scope}</p>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:scale-110 hover:text-blue-400"
        title="Copy to clipboard"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-500" />
        ) : (
          <ClipboardDocumentIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default SingleScope;
