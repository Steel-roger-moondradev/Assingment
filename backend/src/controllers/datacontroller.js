import Data from "../models/data.js";

export const getData = async (req, res) => {
  try {
    const {
      country,
      city,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      end_year,
    } = req.query;
    const filter = {};

    if (country) filter.country = country;
    if (city) filter.city = city;
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;

    if (end_year) {
      filter.end_year = Number(end_year);
    }

    const data = await Data.find(filter);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
};
