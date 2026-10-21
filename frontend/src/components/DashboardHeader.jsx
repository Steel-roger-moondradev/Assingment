function DashboardHeader({ onRefresh, loading }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Visualization Dashboard</h1>
        <p>Explore insights from the provided data.</p>
      </div>

      <button type="button" onClick={onRefresh} disabled={loading}>
        {loading ? "Loading..." : "Refresh"}
      </button>
    </header>
  );
}

export default DashboardHeader;
