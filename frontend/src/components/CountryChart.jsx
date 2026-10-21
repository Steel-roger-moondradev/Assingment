import { useEffect, useRef } from "react";
import * as d3 from "d3";

function CountryChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (!data || data.length === 0) return;

    const validCountries = data
      .map((item) => item.country)
      .filter((country) => country && country.trim() !== "");

    if (validCountries.length === 0) return;

    const countryCounts = d3.rollups(
      validCountries,
      (values) => values.length,
      (country) => country,
    );

    const chartData = countryCounts
      .map(([country, count]) => ({
        country,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const width = 700;
    const height = 350;

    const margin = {
      top: 20,
      right: 30,
      bottom: 40,
      left: 130,
    };

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (item) => item.count)])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(chartData.map((item) => item.country))
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(chartData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr("y", (item) => y(item.country))
      .attr("width", (item) => x(item.count) - margin.left)
      .attr("height", y.bandwidth())
      .attr("fill", "#f59e0b");

    svg
      .selectAll(".bar-label")
      .data(chartData)
      .join("text")
      .attr("class", "bar-label")
      .attr("x", (item) => x(item.count) + 5)
      .attr("y", (item) => y(item.country) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((item) => item.count);
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Records by Country</h2>

      {!data || data.length === 0 ? (
        <p>No country data available.</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </section>
  );
}

export default CountryChart;
