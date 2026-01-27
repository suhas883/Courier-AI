DROP TABLE IF EXISTS offers;

CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_name TEXT NOT NULL,
    affiliate_link TEXT NOT NULL,
    primary_keyword TEXT NOT NULL,
    target_country TEXT NOT NULL,
    subdirectory TEXT NOT NULL,
    language_code TEXT NOT NULL DEFAULT 'en',
    slug TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
);

INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES
