import SingleScope, { Scope } from "./Scope";

type ScopesProps = {
  data: Scope[] | null;
};

const Scopes = ({ data }: ScopesProps) => {
  if (!data) {
    return <div>No &apos;scopes...</div>;
  }

  return (
    <div>
      <ul className="mt-2 space-y-2">
        {data.map((s) => (
          <li key={s.id} className="list-none">
            <SingleScope scope={s} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scopes;
