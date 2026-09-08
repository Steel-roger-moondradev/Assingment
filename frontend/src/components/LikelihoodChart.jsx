import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LikelihoodChart({ data }) {
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

    // X-axis: likelihood values
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.likelihood)])
      .nice()
      .range([margin.left, width - margin.right]);

    // Create histogram bins
    const bins = d3.bin().domain(x.domain()).thresholds(10)(
      data.map((d) => d.likelihood),
    );

    // Y-axis: number of records
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
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

    // Draw histogram bars
    svg
      .selectAll(".bar")
      .data(bins)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr("height", (d) => y(0) - y(d.length))
      .attr("fill", "#16a34a");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Likelihood Distribution</h2>
      <svg ref={svgRef}></svg>
    </section>
  );
}

export default LikelihoodChart;
