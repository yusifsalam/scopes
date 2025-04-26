type HistoryProps = {
  date: string;
  scope: string;
}[];

const History = ({ data, sign }: { data: HistoryProps; sign: string }) => {
  return (
    <div>
      <h2>Historical values for {sign}</h2>
      <Table data={data} />
    </div>
  );
};

const Table = ({ data }: { data: HistoryProps }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} className="hover:bg-base-300">
              <td className="whitespace-nowrap">
                {new Date(r.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td>{r.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
