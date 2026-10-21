import "./index.css";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import FilterPanel from "./components/FilterPanel";
import SummaryCards from "./components/SummaryCards";
import IntensityChart from "./components/IntensityChart";
import LikelihoodChart from "./components/LikelihoodChart";
import RelevanceChart from "./components/RelevanceChart";
import YearChart from "./components/YearChart";
import CountryChart from "./components/CountryChart";
import TopicChart from "./components/TopicChart";
import RegionChart from "./components/RegionChart";
import CityChart from "./components/CityChart";
import DataTable from "./components/DataTable";
import { useEffect, useMemo, useState } from "react";
import { fetchRecords } from "./services/api.jsx";

async function loadRecords() {
  try {
    setLoading(true);
    setError("");

    const result = await fetchRecords(filters);

    const receivedRecords = Array.isArray(result)
      ? result
      : result.records || result.data || [];

    setRecords(receivedRecords);
  } catch (error) {
    setError(error.message || "Unable to load records");
  } finally {
    setLoading(false);
  }
}

const sampleLikelihoodData = [
  { likelihood: 20 },
  { likelihood: 35 },
  { likelihood: 40 },
  { likelihood: 55 },
  { likelihood: 60 },
  { likelihood: 70 },
  { likelihood: 75 },
  { likelihood: 80 },
  { likelihood: 90 },
  { likelihood: 95 },
];

const sampleRelevanceData = [
  { year: 2018, relevance: 30 },
  { year: 2019, relevance: 50 },
  { year: 2020, relevance: 25 },
  { year: 2021, relevance: 70 },
  { year: 2022, relevance: 45 },
];

const sampleYearData = [
  { year: 2018, count: 12 },
  { year: 2019, count: 25 },
  { year: 2020, count: 18 },
  { year: 2021, count: 35 },
  { year: 2022, count: 28 },
];
const sampleCountryData = [
  { country: "United States", count: 45 },
  { country: "India", count: 32 },
  { country: "United Kingdom", count: 25 },
  { country: "China", count: 18 },
  { country: "Germany", count: 12 },
];
const sampleTopicData = [
  { topic: "Technology", count: 40 },
  { topic: "Energy", count: 30 },
  { topic: "Environment", count: 25 },
  { topic: "Healthcare", count: 20 },
  { topic: "Finance", count: 15 },
];
const sampleRegionData = [
  { region: "North America", count: 45 },
  { region: "Europe", count: 35 },
  { region: "Asia", count: 30 },
  { region: "Middle East", count: 20 },
  { region: "Africa", count: 15 },
];
const sampleCityData = [
  { city: "New York", count: 35 },
  { city: "London", count: 28 },
  { city: "Mumbai", count: 22 },
  { city: "Delhi", count: 18 },
  { city: "Singapore", count: 12 },
];

function App() {
  const [records, setRecords] = useState([]);
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
    loadRecords();
  }, [filters]);

  useEffect(() => {
    async function loadRecords() {
      try {
        setLoading(true);
        setError("");

        const result = await fetchRecords(filters);

        // Supports either a direct array or an object containing records/data
        const receivedRecords = Array.isArray(result)
          ? result
          : result.records || result.data || [];

        setRecords(receivedRecords);
      } catch (err) {
        setError(err.message || "Unable to load records");
      } finally {
        setLoading(false);
      }
    }

    loadRecords();
  }, [filters]);

  const intensityData = useMemo(() => {
    const grouped = {};

    records.forEach((record) => {
      const year = record.end_year;

      if (!year || record.intensity === undefined) return;

      if (!grouped[year]) {
        grouped[year] = {
          year,
          total: 0,
          count: 0,
        };
      }

      grouped[year].total += Number(record.intensity) || 0;
      grouped[year].count += 1;
    });

    return Object.values(grouped).map((item) => ({
      year: item.year,
      intensity: item.count ? item.total / item.count : 0,
    }));
  }, [records]);

  return (
    <div className="app">
      {loading && <p className="status-message">Loading records...</p>}

      {error && <p className="error-message">{error}</p>}
      <Sidebar />

      <main className="main-content">
        <DashboardHeader onRefresh={loadRecords} loading={loading} />
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          records={records}
        />
        <SummaryCards data={records} />
        <IntensityChart data={intensityData} />
        <LikelihoodChart data={records} />
        <RelevanceChart data={records} />
        <YearChart data={records} />
        <CountryChart data={records} />
        <TopicChart data={records} />
        <RegionChart data={records} />
        <CityChart data={records} />
        <DataTable data={records} />
        <section className="dashboard-content"></section>
      </main>
    </div>
  );
}

export default App;
