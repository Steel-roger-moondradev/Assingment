import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RelevanceChart({ data }) {
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

    const validData = data
      .map((item) => ({
        year: item.end_year,
        relevance: Number(item.relevance),
      }))
      .filter((item) => item.year && Number.isFinite(item.relevance));

    if (validData.length === 0) return;

    const groupedData = d3.rollups(
      validData,
      (values) => d3.mean(values, (item) => item.relevance),
      (item) => item.year,
    );

    const chartData = groupedData
      .map(([year, relevance]) => ({
        year,
        relevance,
      }))
      .sort((a, b) => a.year - b.year);

    const x = d3
      .scaleBand()
      .domain(chartData.map((item) => item.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (item) => item.relevance)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

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
      .text("Year");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Average Relevance");

    svg
      .selectAll(".bar")
      .data(chartData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (item) => x(item.year))
      .attr("y", (item) => y(item.relevance))
      .attr("width", x.bandwidth())
      .attr("height", (item) => y(0) - y(item.relevance))
      .attr("fill", "#9333ea");
  }, [data]);

  return (
    <section className="chart-card">
      <h2>Average Relevance by Year</h2>

      {!data || data.length === 0 ? (
        <p>No relevance data available.</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </section>
  );
}

export default RelevanceChart;
