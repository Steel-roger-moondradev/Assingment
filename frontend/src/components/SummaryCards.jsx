function SummaryCards() {
  const cards = [
    {
      title: "Total Records",
      value: "—",
      description: "Records in current dataset",
    },
    {
      title: "Average Intensity",
      value: "—",
      description: "Across all records",
    },
    {
      title: "Average Likelihood",
      value: "—",
      description: "Across all records",
    },
    {
      title: "Average Relevance",
      value: "—",
      description: "Across all records",
    },
  ];

  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.title}>
          <p className="summary-card-title">{card.title}</p>
          <h3 className="summary-card-value">{card.value}</h3>
          <p className="summary-card-description">{card.description}</p>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
