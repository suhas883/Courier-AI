-- MASTER SEED DATA FOR TRIPRT PROTOCOL
-- Optimized for INSTANT APPROVAL & DIRECT LINKS (No Impact Radius Friction)

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
    status TEXT NOT NULL DEFAULT 'pending',
    payout_category TEXT -- 'high', 'medium', 'volume'
);

INSERT INTO offers (partner_name, affiliate_link, primary_keyword, subdirectory, target_country, payout_category, status) VALUES

-- ✈️ FLIGHTS (Travelpayouts - Instant Approval)
('Aviasales', 'https://aviasales.tp.st/YOUR_ID', 'cheap flights', 'flights', 'Global', 'volume', 'pending'),
('Kiwi.com', 'https://kiwi.tp.st/YOUR_ID', 'hacker fare flights', 'flights', 'Global', 'volume', 'pending'),
('Trip.com', 'https://trip.tp.st/YOUR_ID', 'airline tickets', 'flights', 'Asia', 'volume', 'pending'),
('Omio', 'https://omio.tp.st/YOUR_ID', 'bus and train booking', 'transport', 'Europe', 'volume', 'pending'),

-- 🏨 STAYS (Travelpayouts - Instant Approval)
('Booking.com', 'https://booking.tp.st/YOUR_ID', 'hotel booking', 'hotels', 'Global', 'high', 'pending'),
('Hostelworld', 'https://hostelworld.tp.st/YOUR_ID', 'youth hostels', 'stays', 'Global', 'medium', 'pending'),
('Vrbo', 'https://vrbo.tp.st/YOUR_ID', 'vacation rentals', 'stays', 'USA', 'high', 'pending'),

-- 🛡️ INSURANCE (Direct / Easy)
('SafetyWing', 'https://safetywing.com/target/YOUR_ID', 'digital nomad insurance', 'insurance', 'Global', 'high', 'pending'),
('Ekta', 'https://ekta.tp.st/YOUR_ID', 'travel insurance', 'insurance', 'Global', 'high', 'pending'),

-- 📱 MOBILE DATA (Travelpayouts - Instant)
('Airalo', 'https://airalo.tp.st/YOUR_ID', 'esim data plan', 'connectivity', 'Global', 'medium', 'pending'),
('Drimsim', 'https://drimsim.tp.st/YOUR_ID', 'international sim card', 'connectivity', 'Global', 'medium', 'pending'),

-- 🔐 VPN / SECURITY (Direct / Easier than Impact)
('Surfshark', 'https://surfshark.club/friend/YOUR_ID', 'unblock netflix vpn', 'security', 'Global', 'high', 'pending'),
('NordVPN', 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_ID', 'secure vpn', 'security', 'Global', 'high', 'pending'),
('ProtonVPN', 'https://protonvpn.com/secure?aid=YOUR_ID', 'privacy vpn', 'security', 'Global', 'medium', 'pending'),

-- 💳 FINTECH (Direct Referral Programs)
('Wise', 'https://wise.com/invite/YOUR_ID', 'money transfer', 'finance', 'Global', 'high', 'pending'),
('Revolut', 'https://revolut.com/referral/YOUR_ID', 'travel banking', 'finance', 'Europe', 'high', 'pending'),
('Binance', 'https://www.binance.com/en/register?ref=YOUR_ID', 'crypto travel card', 'finance', 'Global', 'high', 'pending'),
('Coinbase', 'https://www.coinbase.com/join/YOUR_ID', 'buy crypto', 'finance', 'USA', 'high', 'pending'),

-- 💻 DIGITAL NOMAD TOOLS (Direct / Affiliate.Watch)
('Bluehost', 'https://www.bluehost.com/track/YOUR_ID', 'start travel blog', 'tools', 'Global', 'high', 'pending'),
('Mangools', 'https://mangools.com#aYOUR_ID', 'seo for travel bloggers', 'tools', 'Global', 'medium', 'pending'),
('ConvertKit', 'https://convertkit.com?lmref=YOUR_ID', 'email marketing for nomads', 'tools', 'Global', 'medium', 'pending'),

-- 🎟️ EXPERIENCES (Travelpayouts - Instant)
('GetYourGuide', 'https://getyourguide.tp.st/YOUR_ID', 'city tours', 'experiences', 'Global', 'medium', 'pending'),
('Viator', 'https://viator.tp.st/YOUR_ID', 'attraction tickets', 'experiences', 'Global', 'medium', 'pending'),
('Tiqets', 'https://tiqets.tp.st/YOUR_ID', 'museum entry', 'experiences', 'Europe', 'medium', 'pending');

-- Generate variations for pSEO domination
INSERT INTO offers (partner_name, affiliate_link, primary_keyword, subdirectory, target_country, payout_category, status)
SELECT partner_name, affiliate_link, 'best ' || primary_keyword || ' 2026', subdirectory, target_country, payout_category, 'pending'
FROM offers;
