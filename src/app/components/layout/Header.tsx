import LocaleSelector from "../LocaleSelector";

type HeaderProps = {
  sign?: string;
};

const Header = ({ sign }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold">Rektor &apos;scopes</h1>
        <p className="text-base text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {sign && (
            <span className="font-semibold text-gray-300 capitalize">
              : {sign}
            </span>
          )}
        </p>
      </div>
      <LocaleSelector />
    </header>
  );
};

export default Header;
