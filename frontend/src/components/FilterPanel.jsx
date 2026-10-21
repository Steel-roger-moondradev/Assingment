import { useMemo } from "react";

function FilterPanel({ filters, setFilters, records = [] }) {
  // Get unique values for each filter from the loaded records
  const options = useMemo(() => {
    const getUniqueValues = (field) => {
      return [
        ...new Set(
          records
            .map((record) => record[field])
            .filter(
              (value) => value !== null && value !== undefined && value !== "",
            ),
        ),
      ].sort();
    };

    return {
      end_year: getUniqueValues("end_year"),
      topic: getUniqueValues("topic"),
      sector: getUniqueValues("sector"),
      region: getUniqueValues("region"),
      pestle: getUniqueValues("pestle"),
      source: getUniqueValues("source"),
      swot: getUniqueValues("swot"),
      country: getUniqueValues("country"),
      city: getUniqueValues("city"),
    };
  }, [records]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      end_year: "",
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      source: "",
      swot: "",
      country: "",
      city: "",
    });
  };

  const filterConfig = [
    { name: "end_year", label: "End Year" },
    { name: "topic", label: "Topic" },
    { name: "sector", label: "Sector" },
    { name: "region", label: "Region" },
    { name: "pestle", label: "PESTLE" },
    { name: "source", label: "Source" },
    { name: "swot", label: "SWOT" },
    { name: "country", label: "Country" },
    { name: "city", label: "City" },
  ];

  return (
    <section className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>

        <button type="button" className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="filter-grid">
        {filterConfig.map((filter) => (
          <div className="filter-group" key={filter.name}>
            <label htmlFor={filter.name}>{filter.label}</label>

            <select
              id={filter.name}
              name={filter.name}
              value={filters[filter.name]}
              onChange={handleChange}
            >
              <option value="">All {filter.label}</option>

              {options[filter.name].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FilterPanel;
