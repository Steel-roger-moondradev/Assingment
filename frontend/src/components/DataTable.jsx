function DataTable({ data }) {
  return (
    <section className="data-table-card">
      <div className="data-table-header">
        <h2>Data Records</h2>
        <span>{data.length} records</span>
      </div>

      {data.length === 0 ? (
        <p className="empty-message">No records found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Sector</th>
                <th>Region</th>
                <th>Country</th>
                <th>City</th>
                <th>Intensity</th>
                <th>Likelihood</th>
                <th>Relevance</th>
                <th>Year</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{item.title || "—"}</td>
                  <td>{item.topic || "—"}</td>
                  <td>{item.sector || "—"}</td>
                  <td>{item.region || "—"}</td>
                  <td>{item.country || "—"}</td>
                  <td>{item.city || "—"}</td>
                  <td>{item.intensity ?? "—"}</td>
                  <td>{item.likelihood ?? "—"}</td>
                  <td>{item.relevance ?? "—"}</td>
                  <td>{item.end_year || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DataTable;
