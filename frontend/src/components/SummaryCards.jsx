import { useMemo } from "react";

function SummaryCards({ data = [] }) {
  const summary = useMemo(() => {
    const getAverage = (field) => {
      const values = data
        .map((record) => Number(record[field]))
        .filter((value) => Number.isFinite(value));

      if (!values.length) return 0;

      return values.reduce((sum, value) => sum + value, 0) / values.length;
    };

    return {
      totalRecords: data.length,
      averageIntensity: getAverage("intensity"),
      averageLikelihood: getAverage("likelihood"),
      averageRelevance: getAverage("relevance"),
    };
  }, [data]);

  const cards = [
    {
      title: "Total Records",
      value: summary.totalRecords,
      description: "Records matching filters",
    },
    {
      title: "Average Intensity",
      value: summary.averageIntensity.toFixed(2),
      description: "Across filtered records",
    },
    {
      title: "Average Likelihood",
      value: summary.averageLikelihood.toFixed(2),
      description: "Across filtered records",
    },
    {
      title: "Average Relevance",
      value: summary.averageRelevance.toFixed(2),
      description: "Across filtered records",
    },
  ];

  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.title}>
          <h3>{card.title}</h3>
          <p className="summary-value">{card.value}</p>
          <p className="summary-description">{card.description}</p>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
