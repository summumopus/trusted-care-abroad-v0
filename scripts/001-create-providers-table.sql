CREATE TABLE IF NOT EXISTS providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location JSONB NOT NULL,
  procedure TEXT NOT NULL,
  priceRange TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  tags TEXT[] NOT NULL,
  availability TEXT NOT NULL,
  contact JSONB NOT NULL,
  services TEXT[] NOT NULL,
  reviews JSONB[],
  mapEmbedUrl TEXT
);

-- Optional: You can insert your mock data here as initial data
-- For example:
/*
INSERT INTO providers (id, name, location, procedure, priceRange, languages, tags, availability, contact, services, reviews, mapEmbedUrl)
VALUES
('1', 'Istanbul Hair Clinic', '{"city": "Istanbul", "country": "Turkey", "address": "Barbaros Blv. No:145, Besiktas"}', 'Hair Transplant', '$2,500 - $4,000', ARRAY['English', 'Turkish', 'Arabic'], ARRAY['Accredited', 'Airport pickup', 'Accommodation'], 'Next 2 weeks', '{"phone": "+90 555 123 4567", "email": "info@istanbulhairclinic.com", "website": "https://www.istanbulhairclinic.com"}', ARRAY['FUE Hair Transplant', 'DHI Hair Transplant', 'Beard Transplant'], '[{"source": "Trustpilot", "url": "https://www.trustpilot.com/review/istanbulhairclinic.com", "score": "4.8/5"}, {"source": "Google", "url": "https://maps.app.goo.gl/example1", "score": "4.7/5"}]', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.7000000000005!2d29.00000000000000!3d41.00000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU5JzU5LjkiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus');
-- Add other providers similarly
*/
