import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RelevanceChart({ data }) {
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
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    // Y-axis: relevance values
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.relevance)])
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
      .attr("y", (d) => y(d.relevance))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.relevance))
      .attr("fill", "#9333ea");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Relevance by Year</h2>
      <svg ref={svgRef}></svg>
    </section>
  );
}

export default RelevanceChart;
