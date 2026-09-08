import { useEffect, useRef } from "react";
import * as d3 from "d3";

function YearChart({ data }) {
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
      left: 50,
    };

    svg.attr("width", width).attr("height", height);

    // X-axis: years
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.year))
      .range([margin.left, width - margin.right]);

    // Y-axis: record count
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

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

    // Create line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.count));

    // Draw line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Draw points
    svg
      .selectAll(".point")
      .data(data)
      .join("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.count))
      .attr("r", 4)
      .attr("fill", "#2563eb");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Records by Year</h2>
      <svg ref={svgRef}></svg>
    </section>
  );
}

export default YearChart;
