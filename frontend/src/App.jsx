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
const sampleIntensityData = [
  { year: 2018, intensity: 40 },
  { year: 2019, intensity: 65 },
  { year: 2020, intensity: 30 },
  { year: 2021, intensity: 80 },
  { year: 2022, intensity: 55 },
];
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
const sampleTableData = [
  {
    id: 1,
    title: "Renewable energy growth",
    topic: "Energy",
    sector: "Energy",
    region: "Europe",
    country: "Germany",
    city: "Berlin",
    intensity: 70,
    likelihood: 80,
    relevance: 90,
    end_year: 2022,
  },
  {
    id: 2,
    title: "Technology innovation",
    topic: "Technology",
    sector: "Technology",
    region: "Asia",
    country: "India",
    city: "Mumbai",
    intensity: 60,
    likelihood: 75,
    relevance: 85,
    end_year: 2021,
  },
];
function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <DashboardHeader />

        <FilterPanel />

        <SummaryCards />

        <IntensityChart data={sampleIntensityData} />

        <LikelihoodChart data={sampleLikelihoodData} />
        <RelevanceChart data={sampleRelevanceData} />
        <YearChart data={sampleYearData} />
        <CountryChart data={sampleCountryData} />
        <TopicChart data={sampleTopicData} />
        <RegionChart data={sampleRegionData} />
        <CityChart data={sampleCityData} />
        <DataTable data={sampleTableData} />
        <section className="dashboard-content"></section>
      </main>
    </div>
  );
}

export default App;
