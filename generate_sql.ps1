
$partners = @(
    @{name = 'Compensair'; link = 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86'; keyword = 'flight delay compensation'; subdir = 'claims' },
    @{name = 'Airalo eSIM'; link = 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541'; keyword = 'esim data plan'; subdir = 'connectivity' },
    @{name = 'KiwiTaxi'; link = 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1'; keyword = 'airport transfer'; subdir = 'transfers' },
    @{name = 'Tiqets'; link = 'https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89'; keyword = 'museum tickets'; subdir = 'activities' },
    @{name = 'Aviasales'; link = 'https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100'; keyword = 'cheap flights'; subdir = 'flights' }
)

$cities = @('London', 'Paris', 'New York', 'Tokyo', 'Dubai', 'Singapore', 'Berlin', 'Rome', 'Barcelona', 'Bangkok', 'Mumbai', 'Delhi', 'Sydney', 'Toronto', 'Lagos', 'Cairo', 'Istanbul', 'Seoul', 'Mexico City', 'Sao Paulo')

$sql = "INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES`n"
$values = @()

foreach ($p in $partners) {
    foreach ($c in $cities) {
        $v1 = "('{0}', '{1}', '{2} in {3}', '{3}', '{4}', 'pending', 'en')" -f $p.name, $p.link, $p.keyword, $c, $p.subdir
        $values += $v1
        
        $v2 = "('{0}', '{1}', 'Best {2} for {3} trip', '{3}', '{4}', 'pending', 'en')" -f $p.name, $p.link, $p.keyword, $c, $p.subdir
        $values += $v2
    }
}

$sql += ($values -join ",`n") + ";"
$sql | Out-File -FilePath "seed_bulk.sql" -Encoding utf8
Write-Host "Generated $($values.Count) rows"
