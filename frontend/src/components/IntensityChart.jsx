import { useEffect, useRef } from "react";
import * as d3 from "d3";

function IntensityChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

    const grouped = d3.rollups(
      data,
      (values) => d3.mean(values, (d) => +d.intensity || 0),
      (d) => d.end_year || "Unknown",
    );

    const chartData = grouped
      .map(([year, intensity]) => ({
        year: String(year),
        intensity,
      }))
      .sort((a, b) => a.year.localeCompare(b.year));

    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.intensity) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("rect")
      .data(chartData)
      .join("rect")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.intensity))
      .attr("rx", 6)
      .attr("fill", "#2563eb");
  }, [data]);

  return <svg ref={svgRef} />;
}

export default IntensityChart;
