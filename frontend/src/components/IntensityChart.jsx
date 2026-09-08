import { useEffect, useRef } from "react";
import * as d3 from "d3";

function IntensityChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);

    // Clear previous chart
    svg.selectAll("*").remove();

    // Chart dimensions
    const width = 700;
    const height = 350;
    const margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: 50,
    };

    // Create SVG
    svg.attr("width", width).attr("height", height);

    // X-axis scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    // Y-axis scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
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

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.intensity))
      .attr("fill", "#2563eb");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Intensity by Year</h2>

      <svg ref={svgRef}></svg>
    </section>
  );
}

export default IntensityChart;
