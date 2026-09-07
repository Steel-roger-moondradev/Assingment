import { useEffect, useState } from "react";
import axios from "axios";
import FilterPanel from "./components/FilterPanel";
import StatCard from "./components/StatCard";
import IntensityChart from "./components/IntensityChart";
import LikelihoodChart from "./components/LikelihoodChart";
import RelevanceChart from "./components/RelevanceChart";
import CountryChart from "./components/CountryChart";
import "./App.css";

const API_URL = import.meta.env.BACKEND_URL;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
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

  useEffect(() => {
    fetchData();
  }, [filters]);

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== ""),
      );

      const response = await axios.get(API_URL, { params });

      setData(response.data.data || response.data);
    } catch (err) {
      setError("Failed to load dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function updateFilter(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function clearFilters() {
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
  }

  const totalRecords = data.length;

  const avgIntensity = data.length
    ? (
        data.reduce((sum, item) => sum + Number(item.intensity || 0), 0) /
        data.length
      ).toFixed(2)
    : 0;

  const avgLikelihood = data.length
    ? (
        data.reduce((sum, item) => sum + Number(item.likelihood || 0), 0) /
        data.length
      ).toFixed(2)
    : 0;

  const avgRelevance = data.length
    ? (
        data.reduce((sum, item) => sum + Number(item.relevance || 0), 0) /
        data.length
      ).toFixed(2)
    : 0;

  return (
    <div className="app">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">BLACKCOFFER · DATA INTELLIGENCE</p>
          <h1>Insight Analytics Dashboard</h1>
          <p className="subtitle">
            Explore intensity, likelihood, relevance, and geographic trends.
          </p>
        </div>

        <button className="reset-btn" onClick={clearFilters}>
          Reset filters
        </button>
      </header>

      <FilterPanel
        filters={filters}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <>
          <section className="stats-grid">
            <StatCard title="Total Records" value={totalRecords} icon="◈" />
            <StatCard title="Average Intensity" value={avgIntensity} icon="↗" />
            <StatCard
              title="Average Likelihood"
              value={avgLikelihood}
              icon="◎"
            />
            <StatCard title="Average Relevance" value={avgRelevance} icon="✦" />
          </section>

          <section className="charts-grid">
            <div className="chart-card chart-wide">
              <div className="chart-heading">
                <div>
                  <h2>Intensity by Year</h2>
                  <p>Average intensity across available years</p>
                </div>
              </div>
              <IntensityChart data={data} />
            </div>

            <div className="chart-card">
              <div className="chart-heading">
                <div>
                  <h2>Likelihood Distribution</h2>
                  <p>Average likelihood by year</p>
                </div>
              </div>
              <LikelihoodChart data={data} />
            </div>

            <div className="chart-card">
              <div className="chart-heading">
                <div>
                  <h2>Relevance by Year</h2>
                  <p>Average relevance across years</p>
                </div>
              </div>
              <RelevanceChart data={data} />
            </div>

            <div className="chart-card chart-wide">
              <div className="chart-heading">
                <div>
                  <h2>Top Countries</h2>
                  <p>Records grouped by country</p>
                </div>
              </div>
              <CountryChart data={data} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
