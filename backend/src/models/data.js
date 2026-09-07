import mongoose from "mongoose";

const dataschema = new mongoose.Schema(
  {
    end_year: {
      type: Number,
      default: null,
    },

    intensity: {
      type: Number,
      default: null,
    },

    sector: {
      type: String,
      trim: true,
      default: "",
    },

    topic: {
      type: String,
      trim: true,
      default: "",
    },

    insight: {
      type: String,
      trim: true,
      default: "",
    },

    region: {
      type: String,
      trim: true,
      default: "",
    },

    start_year: {
      type: Number,
      default: null,
    },

    impact: {
      type: Number,
      default: null,
    },

    added: {
      type: Date,
      default: null,
    },

    published: {
      type: Date,
      default: null,
    },

    country: {
      type: String,
      trim: true,
      default: "",
    },

    relevance: {
      type: Number,
      default: null,
    },

    pestle: {
      type: String,
      trim: true,
      default: "",
    },

    source: {
      type: String,
      trim: true,
      default: "",
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    likelihood: {
      type: Number,
      default: null,
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    swot: {
      type: String,
      trim: true,
      default: "",
    },

    url: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Data = mongoose.model("Data", dataschema);

export default Data;
