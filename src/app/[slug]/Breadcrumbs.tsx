import Link from "next/link";

const Breadcrumbs = ({ sign }: { sign: string }) => {
  return (
    <div className="breadcrumbs">
      <ul>
        <li>
          <Link href="/" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            All scopes
          </Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2 capitalize">
            {sign}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
