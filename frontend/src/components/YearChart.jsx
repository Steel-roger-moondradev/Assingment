import { useEffect, useRef } from "react";
import * as d3 from "d3";

function YearChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (!data || data.length === 0) return;

    const validYears = data
      .map((item) => Number(item.end_year))
      .filter((year) => Number.isFinite(year));

    if (validYears.length === 0) return;

    const yearCounts = d3.rollups(
      validYears,
      (values) => values.length,
      (year) => year,
    );

    const chartData = yearCounts
      .map(([year, count]) => ({
        year,
        count,
      }))
      .sort((a, b) => a.year - b.year);

    const width = 700;
    const height = 350;

    const margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: 50,
    };

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

    const x = d3
      .scalePoint()
      .domain(chartData.map((item) => item.year))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (item) => item.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((item) => x(item.year))
      .y((item) => y(item.count));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg
      .selectAll(".point")
      .data(chartData)
      .join("circle")
      .attr("class", "point")
      .attr("cx", (item) => x(item.year))
      .attr("cy", (item) => y(item.count))
      .attr("r", 5)
      .attr("fill", "#2563eb");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Year");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Number of Records");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Records by Year</h2>

      {!data || data.length === 0 ? (
        <p>No year data available.</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </section>
  );
}

export default YearChart;
