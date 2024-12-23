"use client";

export type Scope = {
  id: number;
  scope: string;
  date: string;
  sign: string;
};

const SingleScope = ({ scope }: { scope: Scope }) => {
  return (
    <div>
      <h2 className="font-bold uppercase">{scope.sign}</h2>
      <p>{scope.scope} </p>
    </div>
  );
};

export default SingleScope;
