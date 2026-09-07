import Data from "../models/data.js";

export const getData = async (req, res) => {
  try {
    const { country, city, topic, sector, region, end_year } = req.query;

    const filter = {};

    if (country) {
      filter.country = {
        $regex: country,
        $options: "i",
      };
    }

    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    if (topic) {
      filter.topic = topic;
    }

    if (sector) {
      filter.sector = sector;
    }

    if (region) {
      filter.region = region;
    }

    if (end_year) {
      filter.end_year = {
        $lte: Number(end_year),
      };
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
