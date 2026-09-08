import { useEffect, useRef } from "react";
import * as d3 from "d3";

function CountryChart({ data }) {
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
      bottom: 40,
      left: 120,
    };

    svg.attr("width", width).attr("height", height);

    // X-axis: record count
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([margin.left, width - margin.right]);

    // Y-axis: country names
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    // Draw X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Draw Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr("y", (d) => y(d.country))
      .attr("width", (d) => x(d.count) - margin.left)
      .attr("height", y.bandwidth())
      .attr("fill", "#f59e0b");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Records by Country</h2>
      <svg ref={svgRef}></svg>
    </section>
  );
}

export default CountryChart;
