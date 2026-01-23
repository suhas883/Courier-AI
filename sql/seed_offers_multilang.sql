-- LiveTrackings Empire: 18 Partners × 5 Languages = 90 Affiliate Offers
-- Run this in Neon Console SQL Editor

-- Step 1: Clear existing data
TRUNCATE TABLE offers;

-- Step 2: Insert all 90 offers (TravelPayouts Marker: 605475)

-- ===========================================
-- COMPENSAIR (Claims) - 5 Languages
-- ===========================================
INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'flight delay compensation claim', 'Global', 'claims', 'pending', 'en'),
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'Flugverspätung Entschädigung', 'Germany', 'claims', 'pending', 'de'),
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'indemnisation retard vol', 'France', 'claims', 'pending', 'fr'),
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'compensación retraso vuelo', 'Spain', 'claims', 'pending', 'es'),
('Compensair', 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', 'उड़ान देरी मुआवजा', 'India', 'claims', 'pending', 'hi'),

-- ===========================================
-- AIRALO eSIM (Connectivity) - 5 Languages
-- ===========================================
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'international esim data plan', 'Global', 'connectivity', 'pending', 'en'),
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'internationale eSIM Datenplan', 'Germany', 'connectivity', 'pending', 'de'),
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'forfait données eSIM international', 'France', 'connectivity', 'pending', 'fr'),
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'plan datos eSIM internacional', 'Spain', 'connectivity', 'pending', 'es'),
('Airalo eSIM', 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', 'अंतर्राष्ट्रीय ईसिम डेटा प्लान', 'India', 'connectivity', 'pending', 'hi'),

-- ===========================================
-- YESIM (Connectivity) - 5 Languages
-- ===========================================
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'global sim card for travelers', 'Global', 'connectivity', 'pending', 'en'),
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'globale SIM-Karte für Reisende', 'Germany', 'connectivity', 'pending', 'de'),
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'carte SIM mondiale pour voyageurs', 'France', 'connectivity', 'pending', 'fr'),
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'tarjeta SIM global para viajeros', 'Spain', 'connectivity', 'pending', 'es'),
('Yesim', 'https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224', 'यात्रियों के लिए वैश्विक सिम कार्ड', 'India', 'connectivity', 'pending', 'hi'),

-- ===========================================
-- DRIMSIM (Connectivity) - 5 Languages
-- ===========================================
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'roaming sim international travel', 'Global', 'connectivity', 'pending', 'en'),
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'Roaming SIM internationale Reisen', 'Germany', 'connectivity', 'pending', 'de'),
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'SIM roaming voyage international', 'France', 'connectivity', 'pending', 'fr'),
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'SIM roaming viaje internacional', 'Spain', 'connectivity', 'pending', 'es'),
('DrimSim', 'https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102', 'रोमिंग सिम अंतरराष्ट्रीय यात्रा', 'India', 'connectivity', 'pending', 'hi'),

-- ===========================================
-- EKTA INSURANCE (Insurance) - 5 Languages
-- ===========================================
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'travel cargo insurance protection', 'Global', 'insurance', 'pending', 'en'),
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'Reise Frachtversicherung Schutz', 'Germany', 'insurance', 'pending', 'de'),
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'assurance voyage cargo protection', 'France', 'insurance', 'pending', 'fr'),
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'seguro viaje carga protección', 'Spain', 'insurance', 'pending', 'es'),
('EKTA Insurance', 'https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225', 'यात्रा कार्गो बीमा सुरक्षा', 'India', 'insurance', 'pending', 'hi'),

-- ===========================================
-- KIWITAXI (Transfers) - 5 Languages
-- ===========================================
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'airport taxi transfer booking', 'Global', 'transfers', 'pending', 'en'),
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'Flughafen Taxi Transfer Buchung', 'Germany', 'transfers', 'pending', 'de'),
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'réservation transfert taxi aéroport', 'France', 'transfers', 'pending', 'fr'),
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'reserva taxi traslado aeropuerto', 'Spain', 'transfers', 'pending', 'es'),
('KiwiTaxi', 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', 'हवाई अड्डा टैक्सी ट्रांसफर बुकिंग', 'India', 'transfers', 'pending', 'hi'),

-- ===========================================
-- GETTRANSFER (Transfers) - 5 Languages
-- ===========================================
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'private transfer airport hotel', 'Global', 'transfers', 'pending', 'en'),
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'privater Transfer Flughafen Hotel', 'Germany', 'transfers', 'pending', 'de'),
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'transfert privé aéroport hôtel', 'France', 'transfers', 'pending', 'fr'),
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'traslado privado aeropuerto hotel', 'Spain', 'transfers', 'pending', 'es'),
('GetTransfer', 'https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147', 'निजी ट्रांसफर हवाई अड्डा होटल', 'India', 'transfers', 'pending', 'hi'),

-- ===========================================
-- INTUI TRAVEL (Transfers) - 5 Languages
-- ===========================================
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'shuttle bus airport city center', 'Global', 'transfers', 'pending', 'en'),
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'Shuttlebus Flughafen Stadtzentrum', 'Germany', 'transfers', 'pending', 'de'),
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'navette aéroport centre ville', 'France', 'transfers', 'pending', 'fr'),
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'bus lanzadera aeropuerto centro ciudad', 'Spain', 'transfers', 'pending', 'es'),
('Intui Travel', 'https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22', 'शटल बस हवाई अड्डा शहर केंद्र', 'India', 'transfers', 'pending', 'hi'),

-- ===========================================
-- WELCOME PICKUPS (Transfers) - 5 Languages
-- ===========================================
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'meet greet airport pickup service', 'Global', 'transfers', 'pending', 'en'),
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'Empfang Begrüßung Flughafen Abholung', 'Germany', 'transfers', 'pending', 'de'),
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'accueil aéroport service transfert', 'France', 'transfers', 'pending', 'fr'),
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'servicio recogida aeropuerto bienvenida', 'Spain', 'transfers', 'pending', 'es'),
('Welcome Pickups', 'https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627', 'स्वागत पिकअप हवाई अड्डा सेवा', 'India', 'transfers', 'pending', 'hi'),

-- ===========================================
-- KLOOK (Activities) - 5 Languages
-- ===========================================
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'travel activities tours booking', 'Global', 'activities', 'pending', 'en'),
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'Reiseaktivitäten Touren Buchung', 'Germany', 'activities', 'pending', 'de'),
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'réservation activités tours voyage', 'France', 'activities', 'pending', 'fr'),
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'reserva actividades tours viaje', 'Spain', 'activities', 'pending', 'es'),
('Klook', 'https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137', 'यात्रा गतिविधियां टूर बुकिंग', 'India', 'activities', 'pending', 'hi'),

-- ===========================================
-- TIQETS (Activities) - 5 Languages
-- ===========================================
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'museum attraction tickets online', 'Global', 'activities', 'pending', 'en'),
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'Museum Attraktion Tickets online', 'Germany', 'activities', 'pending', 'de'),
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'billets musée attractions en ligne', 'France', 'activities', 'pending', 'fr'),
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'entradas museo atracciones online', 'Spain', 'activities', 'pending', 'es'),
('Tiqets', 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89', 'संग्रहालय आकर्षण टिकट ऑनलाइन', 'India', 'activities', 'pending', 'hi'),

-- ===========================================
-- WEGOTRIP (Activities) - 5 Languages
-- ===========================================
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'audio tour guides self guided', 'Global', 'activities', 'pending', 'en'),
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'Audio Führungen selbstgeführt', 'Germany', 'activities', 'pending', 'de'),
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'audioguide visite autoguidée', 'France', 'activities', 'pending', 'fr'),
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'audioguía tour autoguiado', 'Spain', 'activities', 'pending', 'es'),
('WeGoTrip', 'https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150', 'ऑडियो टूर गाइड स्व-निर्देशित', 'India', 'activities', 'pending', 'hi'),

-- ===========================================
-- TICKETNETWORK (Activities) - 5 Languages
-- ===========================================
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'concert sports events tickets', 'Global', 'activities', 'pending', 'en'),
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'Konzert Sport Veranstaltung Tickets', 'Germany', 'activities', 'pending', 'de'),
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'billets concert sports événements', 'France', 'activities', 'pending', 'fr'),
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'entradas concierto deportes eventos', 'Spain', 'activities', 'pending', 'es'),
('TicketNetwork', 'https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72', 'कॉन्सर्ट खेल इवेंट टिकट', 'India', 'activities', 'pending', 'hi'),

-- ===========================================
-- AVIASALES (Flights) - 5 Languages
-- ===========================================
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'cheap flights comparison search', 'Global', 'flights', 'pending', 'en'),
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'günstige Flüge Vergleich Suche', 'Germany', 'flights', 'pending', 'de'),
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'comparaison vols pas cher recherche', 'France', 'flights', 'pending', 'fr'),
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'vuelos baratos comparación búsqueda', 'Spain', 'flights', 'pending', 'es'),
('Aviasales', 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100', 'सस्ती उड़ानें तुलना खोज', 'India', 'flights', 'pending', 'hi'),

-- ===========================================
-- RADICAL STORAGE (Storage) - 5 Languages
-- ===========================================
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'luggage storage near me city', 'Global', 'storage', 'pending', 'en'),
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'Gepäckaufbewahrung in meiner Nähe', 'Germany', 'storage', 'pending', 'de'),
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'consigne bagages près de moi', 'France', 'storage', 'pending', 'fr'),
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'consigna equipaje cerca de mí', 'Spain', 'storage', 'pending', 'es'),
('Radical Storage', 'https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209', 'सामान भंडारण मेरे पास शहर', 'India', 'storage', 'pending', 'hi'),

-- ===========================================
-- SEARADAR (Rentals) - 5 Languages
-- ===========================================
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'yacht boat rental charter', 'Global', 'rentals', 'pending', 'en'),
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'Yacht Boot Vermietung Charter', 'Germany', 'rentals', 'pending', 'de'),
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'location yacht bateau charter', 'France', 'rentals', 'pending', 'fr'),
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'alquiler yate barco charter', 'Spain', 'rentals', 'pending', 'es'),
('SeaRadar', 'https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258', 'नौका नाव किराए पर चार्टर', 'India', 'rentals', 'pending', 'hi'),

-- ===========================================
-- NORDVPN (Security) - 5 Languages
-- ===========================================
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'secure vpn travel public wifi', 'Global', 'security', 'pending', 'en'),
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'sicheres VPN Reise öffentliches WLAN', 'Germany', 'security', 'pending', 'de'),
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'VPN sécurisé voyage wifi public', 'France', 'security', 'pending', 'fr'),
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'VPN seguro viaje wifi público', 'Spain', 'security', 'pending', 'es'),
('NordVPN', 'https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170', 'सुरक्षित VPN यात्रा सार्वजनिक वाईफाई', 'India', 'security', 'pending', 'hi'),

-- ===========================================
-- NORDPASS (Security) - 5 Languages
-- ===========================================
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'password manager travel security', 'Global', 'security', 'pending', 'en'),
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'Passwort Manager Reise Sicherheit', 'Germany', 'security', 'pending', 'de'),
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'gestionnaire mot de passe voyage', 'France', 'security', 'pending', 'fr'),
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'gestor contraseñas viaje seguridad', 'Spain', 'security', 'pending', 'es'),
('NordPass', 'https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170', 'पासवर्ड मैनेजर यात्रा सुरक्षा', 'India', 'security', 'pending', 'hi');

-- Verify: Should show 90 rows
SELECT COUNT(*) as total_offers, language_code, COUNT(*) as per_language 
FROM offers 
GROUP BY language_code;
