import LocaleSelector from "../LocaleSelector";

type HeaderProps = {
  sign?: string;
};

const Header = ({ sign }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1>
        Rektor &apos;scopes
        <br />
        {new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        {sign && <span className="capitalize">: {sign}</span>}
      </h1>
      <LocaleSelector />
    </div>
  );
};

export default Header;
