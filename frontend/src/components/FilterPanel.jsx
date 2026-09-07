const fields = [
  ["end_year", "End Year", "number"],
  ["topic", "Topic", "text"],
  ["sector", "Sector", "text"],
  ["region", "Region", "text"],
  ["pestle", "PESTLE", "text"],
  ["source", "Source", "text"],
  ["swot", "SWOT", "text"],
  ["country", "Country", "text"],
  ["city", "City", "text"],
];

function FilterPanel({ filters, onChange, onClear }) {
  return (
    <section className="filter-panel">
      <div className="filter-header">
        <div>
          <h2>Filters</h2>
          <p>Refine the analysis using available data fields.</p>
        </div>

        <button className="clear-btn" onClick={onClear}>
          Clear all
        </button>
      </div>

      <div className="filters-grid">
        {fields.map(([name, label, type]) => (
          <div className="filter-group" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type={type}
              placeholder={`Search ${label.toLowerCase()}...`}
              value={filters[name]}
              onChange={(e) => onChange(name, e.target.value)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FilterPanel;
