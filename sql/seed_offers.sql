-- LiveTrackings Empire: 18 Real TravelPayouts Affiliate Offers
-- Run this directly in Neon Console SQL Editor

-- Step 1: Clear old fake data
TRUNCATE TABLE offers;

-- Step 2: Insert real TravelPayouts offers (Marker: 605475)
INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES

-- Claims
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'flight delay compensation claim', 'Germany', 'claims', 'pending', 'en'),

-- Connectivity
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'international esim data plan', 'Global', 'connectivity', 'pending', 'en'),
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'global sim card for travelers', 'Europe', 'connectivity', 'pending', 'en'),
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'roaming sim international travel', 'USA', 'connectivity', 'pending', 'en'),

-- Insurance
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'travel cargo insurance protection', 'India', 'insurance', 'pending', 'en'),

-- Transfers
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'airport taxi transfer booking', 'France', 'transfers', 'pending', 'en'),
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'private transfer airport hotel', 'Spain', 'transfers', 'pending', 'en'),
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'shuttle bus airport city center', 'Italy', 'transfers', 'pending', 'en'),
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'meet greet airport pickup service', 'Greece', 'transfers', 'pending', 'en'),

-- Activities
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'travel activities tours booking', 'Asia', 'activities', 'pending', 'en'),
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'museum attraction tickets online', 'Netherlands', 'activities', 'pending', 'en'),
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'audio tour guides self guided', 'UK', 'activities', 'pending', 'en'),
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'concert sports events tickets', 'USA', 'activities', 'pending', 'en'),

-- Flights
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'cheap flights comparison search', 'Russia', 'flights', 'pending', 'en'),

-- Storage
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'luggage storage near me city', 'Global', 'storage', 'pending', 'en'),

-- Rentals
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'yacht boat rental charter', 'Mediterranean', 'rentals', 'pending', 'en'),

-- Security
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'secure vpn travel public wifi', 'Global', 'security', 'pending', 'en'),
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'password manager travel security', 'Global', 'security', 'pending', 'en');

-- Verify
SELECT partner_name, affiliate_link, subdirectory FROM offers;
