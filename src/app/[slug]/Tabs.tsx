export type Tab = {
  label: string;
  content: React.ReactNode;
  defaultChecked?: boolean;
};

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  return (
    <div className="tabs tabs-box">
      {tabs.map((t) => (
        <Tab {...t} key={t.label} />
      ))}
    </div>
  );
};

const Tab = ({ label, content, defaultChecked = false }: Tab) => {
  return (
    <>
      <input
        type="radio"
        name="tab-group"
        className="tab"
        aria-label={label}
        defaultChecked={defaultChecked}
      />
      <div className="tab-content bg-base-100 border-base-300 p-6">
        {content}
      </div>
    </>
  );
};

export default Tabs;
