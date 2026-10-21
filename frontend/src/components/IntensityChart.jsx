import { useEffect, useRef } from "react";
import * as d3 from "d3";

function IntensityChart({ data = [] }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 350;

    const margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: 60,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Convert values to numbers and sort by year
    const chartData = data
      .map((d) => ({
        year: String(d.year),
        intensity: Number(d.intensity) || 0,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));

    // ---------------- SCALES ----------------

    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.year))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.intensity) || 1])
      .nice()
      .range([innerHeight, 0]);

    // ---------------- SVG GROUP ----------------

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // ---------------- X AXIS ----------------

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px");

    // ---------------- Y AXIS ----------------

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // ---------------- GRIDLINES ----------------

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(""));

    // ---------------- BARS ----------------

    g.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.intensity))
      .attr("fill", "#6366f1")
      .attr("rx", 4);

    // ---------------- LABELS ----------------

    g.selectAll(".label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.year) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.intensity) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#374151")
      .text((d) => d.intensity.toFixed(1));

    // ---------------- AXIS LABELS ----------------

    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Average Intensity");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Intensity by Year</h2>

      <p className="chart-description">
        Average intensity of records for each year.
      </p>

      {data.length ? (
        <svg ref={svgRef}></svg>
      ) : (
        <p className="no-data">No intensity data available.</p>
      )}
    </section>
  );
}

export default IntensityChart;
