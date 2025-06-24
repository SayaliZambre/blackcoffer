-- Create the main data table
CREATE TABLE IF NOT EXISTS insights_data (
    id SERIAL PRIMARY KEY,
    end_year VARCHAR(10),
    intensity INTEGER DEFAULT 0,
    sector VARCHAR(100),
    topic VARCHAR(100),
    insight TEXT,
    url TEXT,
    region VARCHAR(100),
    start_year VARCHAR(10),
    impact VARCHAR(10),
    added VARCHAR(50),
    published VARCHAR(50),
    country VARCHAR(100),
    relevance INTEGER DEFAULT 0,
    pestle VARCHAR(50),
    source VARCHAR(100),
    title TEXT,
    likelihood INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sector ON insights_data(sector);
CREATE INDEX IF NOT EXISTS idx_region ON insights_data(region);
CREATE INDEX IF NOT EXISTS idx_country ON insights_data(country);
CREATE INDEX IF NOT EXISTS idx_topic ON insights_data(topic);
CREATE INDEX IF NOT EXISTS idx_pestle ON insights_data(pestle);
CREATE INDEX IF NOT EXISTS idx_source ON insights_data(source);
CREATE INDEX IF NOT EXISTS idx_end_year ON insights_data(end_year);
CREATE INDEX IF NOT EXISTS idx_intensity ON insights_data(intensity);
CREATE INDEX IF NOT EXISTS idx_likelihood ON insights_data(likelihood);
CREATE INDEX IF NOT EXISTS idx_relevance ON insights_data(relevance);
