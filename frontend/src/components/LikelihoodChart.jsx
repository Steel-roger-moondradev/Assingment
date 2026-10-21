import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LikelihoodChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (!data || data.length === 0) return;

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

    const likelihoodValues = data
      .map((item) => Number(item.likelihood))
      .filter((value) => Number.isFinite(value));

    if (likelihoodValues.length === 0) return;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(likelihoodValues)])
      .nice()
      .range([margin.left, width - margin.right]);

    const bins = d3.bin().domain(x.domain()).thresholds(10)(likelihoodValues);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (bin) => bin.length)])
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

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Likelihood");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Number of Records");

    svg
      .selectAll(".bar")
      .data(bins)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (bin) => x(bin.x0) + 1)
      .attr("y", (bin) => y(bin.length))
      .attr("width", (bin) => Math.max(0, x(bin.x1) - x(bin.x0) - 2))
      .attr("height", (bin) => y(0) - y(bin.length))
      .attr("fill", "#16a34a");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Likelihood Distribution</h2>

      {!data || data.length === 0 ? (
        <p>No likelihood data available.</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </section>
  );
}

export default LikelihoodChart;
