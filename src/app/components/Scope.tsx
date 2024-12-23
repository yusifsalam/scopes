"use client";

import { useUserPreferencesStore } from "../state/user-preferences-provider";

export type Scope = {
  id: number;
  scope: string;
  date: string;
  sign: string;
};

const SingleScope = ({ scope }: { scope: Scope }) => {
  const { signId, setSignId } = useUserPreferencesStore((state) => state);

  const isFav = scope.id === signId;
  return (
    <div
      onClick={() => setSignId(scope.id)}
      className={`${isFav ? "text-blue-400" : ""} cursor-pointer hover:text-red-400`}
      title={isFav ? "You have favorited this sign" : "Click to favorite"}
    >
      <h2 className="font-bold uppercase">{scope.sign}</h2>
      <p>{scope.scope} </p>
    </div>
  );
};

export default SingleScope;
