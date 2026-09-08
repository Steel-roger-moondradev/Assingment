function FilterPanel() {
  return (
    <section className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button>Reset</button>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label>End Year</label>
          <select>
            <option value="">All Years</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Topics</label>
          <select>
            <option value="">All Topics</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sector</label>
          <select>
            <option value="">All Sectors</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Region</label>
          <select>
            <option value="">All Regions</option>
          </select>
        </div>

        <div className="filter-group">
          <label>PEST</label>
          <select>
            <option value="">All PEST</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Source</label>
          <select>
            <option value="">All Sources</option>
          </select>
        </div>

        <div className="filter-group">
          <label>SWOT</label>
          <select>
            <option value="">All SWOT</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Country</label>
          <select>
            <option value="">All Countries</option>
          </select>
        </div>

        <div className="filter-group">
          <label>City</label>
          <select>
            <option value="">All Cities</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default FilterPanel;
