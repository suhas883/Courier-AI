
# Define the base offers with English keywords
$offers = @(
    @{ name = "Compensair"; link = "https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86"; sub = "claims"; kw_en = @("flight delay compensation", "airline refund help", "cancelled flight claim") },
    @{ name = "Airalo eSIM"; link = "https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541"; sub = "connectivity"; kw_en = @("esim for international travel", "cheap travel data plan", "best esim for europe") },
    @{ name = "KiwiTaxi"; link = "https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1"; sub = "transfers"; kw_en = @("airport transfer service", "private car service airport", "taxi transfer booking") },
    @{ name = "EKTA Insurance"; link = "https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225"; sub = "insurance"; kw_en = @("travel insurance for digital nomads", "covid travel insurance", "medical travel insurance") },
    @{ name = "NordVPN"; link = "https://tp.media/r?marker=605475&trs=488170&p=8986&u=https%3A%2F%2Fnordvpn.com&campaign_id=631"; sub = "security"; kw_en = @("best travel vpn", "secure public wifi", "access blocked websites") }
)

# Simplified translations for demo (In real scenario, would have full 10 keywords per partner per language)
# This script generates 4 files: mega_seed_fr.sql, mega_seed_es.sql, mega_seed_de.sql, mega_seed_it.sql

$languages = @(
    @{ code = "fr"; name = "French"; translations = @{ 
            "claims"       = @("indemnisation vol retard", "aide remboursement avion", "reclamation vol annule");
            "connectivity" = @("esim voyage international", "forfait donnees voyage pas cher", "meilleur esim europe");
            "transfers"    = @("service transfert aeroport", "voiture privee aeroport", "reservation taxi transfert");
            "insurance"    = @("assurance voyage nomades", "assurance voyage covid", "assurance medicale voyage");
            "security"     = @("meilleur vpn voyage", "wifi public securise", "acces sites bloques")
        }
    },
    @{ code = "es"; name = "Spanish"; translations = @{ 
            "claims"       = @("compensacion vuelo retrasado", "ayuda reembolso aerolinea", "reclamacion vuelo cancelado");
            "connectivity" = @("esim viaje internacional", "plan datos viaje barato", "mejor esim europa");
            "transfers"    = @("servicio traslado aeropuerto", "coche privado aeropuerto", "reserva taxi traslado");
            "insurance"    = @("seguro viaje nomadas", "seguro viaje covid", "seguro medico viaje");
            "security"     = @("mejor vpn viaje", "wifi publico seguro", "acceso sitios bloqueados")
        }
    },
    @{ code = "de"; name = "German"; translations = @{ 
            "claims"       = @("flugverspaetung entschaedigung", "flugerstattung hilfe", "annullierter flug anspruch");
            "connectivity" = @("esim internationale reisen", "guenstiger reise datentarif", "beste esim europa");
            "transfers"    = @("flughafentransfer service", "privater flughafentransfer", "taxi transfer buchung");
            "insurance"    = @("reiseversicherung digitale nomaden", "covid reiseversicherung", "medizinische reiseversicherung");
            "security"     = @("bestes reise vpn", "sicheres oeffentliches wifi", "zugriff blockierte seiten")
        }
    },
    @{ code = "it"; name = "Italian"; translations = @{ 
            "claims"       = @("risarcimento ritardo volo", "aiuto rimborso aereo", "reclamo volo cancellato");
            "connectivity" = @("esim viaggi internazionali", "piano dati viaggio economico", "migliore esim europa");
            "transfers"    = @("servizio trasferimento aeroporto", "auto privata aeroporto", "prenotazione taxi transfer");
            "insurance"    = @("assicurazione viaggio nomadi", "assicurazione viaggio covid", "assicurazione medica viaggio");
            "security"     = @("miglior vpn viaggio", "wifi pubblico sicuro", "accesso siti bloccati")
        }
    }
)

foreach ($lang in $languages) {
    $filename = "mega_seed_$($lang.code).sql"
    $sql = "INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES"
    $values = @()

    foreach ($offer in $offers) {
        # Get translated keywords for this category (using subdirectory as key)
        $trans_keywords = $lang.translations[$offer.sub]
        
        if ($null -ne $trans_keywords) {
            foreach ($kw in $trans_keywords) {
                # Add 3 variations per keyword to simulate the "10 per partner" scale
                # In full version we would have distinct lists, here we append suffixes for volume
                $variations = @($kw, "$kw guide", "best $kw")
                
                foreach ($v in $variations) {
                    $p_name = $offer.name.Replace("'", "''")
                    $link = $offer.link
                    $k_word = $v.Replace("'", "''")
                    $sub = $offer.sub
                    $l_code = $lang.code
                    
                    $values += "`n('$p_name', '$link', '$k_word', 'Global', '$sub', 'pending', '$l_code')"
                }
            }
        }
    }
    
    $sql += ($values -join ",") + ";"
    $sql | Out-File -FilePath $filename -Encoding utf8
    Write-Host "Generated $filename with $(($values.Count)) offers."
}
