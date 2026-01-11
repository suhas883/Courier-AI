import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header
      "nav.features": "Features",
      "nav.blogs": "Blogs",
      "nav.premium": "Get Premium",
      
      // Hero
      "hero.title": "Track Any Package, Anywhere",
      "hero.subtitle": "AI-powered tracking for 1,500+ carriers worldwide. Know where your package is, when it arrives, and what to do if there's a problem.",
      "hero.placeholder": "Enter tracking number",
      "hero.button": "Track Package",
      "hero.carriers": "Supporting 1,500+ carriers including",
      
      // Tracking Results
      "tracking.status": "Status",
      "tracking.carrier": "Carrier",
      "tracking.lastUpdate": "Last Update",
      "tracking.estimatedDelivery": "Estimated Delivery",
      "tracking.origin": "Origin",
      "tracking.destination": "Destination",
      "tracking.events": "Tracking Events",
      "tracking.latestUpdate": "LATEST UPDATE",
      "tracking.notFound": "Tracking not found",
      "tracking.notFoundDesc": "Unable to find tracking information. Please verify your tracking number.",
      "tracking.poweredByAI": "Live data powered by AI",
      "tracking.updates": "updates",
      "tracking.daysTransit": "Days Transit",
      "tracking.emailUpdates": "Email Updates",
      "tracking.smsAlerts": "SMS Alerts",
      "tracking.share": "Share",
      "tracking.print": "Print",
      "tracking.whatToDoNext": "What to do next",
      "tracking.packageJourney": "Package Journey",
      "tracking.from": "FROM",
      "tracking.to": "TO",
      "tracking.originPending": "Origin pending",
      "tracking.destinationPending": "Destination pending",
      "tracking.timeline": "Tracking Timeline",
      "tracking.notFoundBadge": "NOT FOUND",
      "tracking.liveBadge": "LIVE",
      
      // AI Features
      "ai.prediction": "AI Delivery Prediction",
      "ai.confidence": "Confidence",
      "ai.delayRisk": "Delay Risk",
      "ai.weatherImpact": "Weather Impact",
      "ai.recommendations": "Recommendations",
      "ai.escalation": "Need Help?",
      "ai.escalationBtn": "Generate Complaint Draft",
      
      // Premium
      "premium.title": "Upgrade to Premium",
      "premium.subtitle": "Get AI predictions, delay alerts, and escalation assistance",
      "premium.price": "$9/month",
      "premium.feature1": "AI Delivery Predictor",
      "premium.feature2": "Delay Radar Alerts",
      "premium.feature3": "Escalation Assistant",
      "premium.feature4": "Priority Support",
      "premium.cta": "Subscribe Now",
      "premium.unlock": "Unlock",
      "premium.unlockTitle": "Unlock Premium AI Features",
      "premium.unlockSubtitle": "Get AI-powered predictions, delay alerts, weather analysis, and priority notifications.",
      "premium.subscribe": "Subscribe Now",
      "premium.billed": "Billed monthly",
      "premium.benefit1": "Cancel anytime",
      "premium.benefit2": "7-day free trial",
      "premium.feature.aiPredictionDesc": "Get accurate delivery date predictions powered by machine learning",
      "premium.feature.delayRiskDesc": "Know potential delays before they happen",
      "premium.feature.weatherAlertsDesc": "Real-time weather alerts affecting your delivery",
      "premium.feature.notificationsDesc": "Instant SMS & email alerts for every status change",
      
      // Footer
      "footer.tagline": "AI-Powered Package Tracking",
      "footer.copyright": "All rights reserved.",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.tryAgain": "Try Again",
      "common.close": "Close",
      "common.copy": "Copy",
      "common.copied": "Copied!"
    }
  },
  es: {
    translation: {
      // Header
      "nav.features": "Funciones",
      "nav.blogs": "Blog",
      "nav.premium": "Obtener Premium",
      
      // Hero
      "hero.title": "Rastrea Cualquier Paquete, En Cualquier Lugar",
      "hero.subtitle": "Seguimiento impulsado por IA para mas de 1,500 transportistas en todo el mundo. Sabe donde esta tu paquete, cuando llega y que hacer si hay un problema.",
      "hero.placeholder": "Ingresa numero de seguimiento",
      "hero.button": "Rastrear Paquete",
      "hero.carriers": "Soportando mas de 1,500 transportistas incluyendo",
      
      // Tracking Results
      "tracking.status": "Estado",
      "tracking.carrier": "Transportista",
      "tracking.lastUpdate": "Ultima Actualizacion",
      "tracking.estimatedDelivery": "Entrega Estimada",
      "tracking.origin": "Origen",
      "tracking.destination": "Destino",
      "tracking.events": "Eventos de Seguimiento",
      "tracking.latestUpdate": "ULTIMA ACTUALIZACION",
      "tracking.notFound": "Seguimiento no encontrado",
      "tracking.notFoundDesc": "No se puede encontrar informacion de seguimiento. Verifica tu numero de seguimiento.",
      "tracking.poweredByAI": "Datos en vivo impulsados por IA",
      "tracking.updates": "actualizaciones",
      "tracking.daysTransit": "Dias en Transito",
      "tracking.emailUpdates": "Alertas por Email",
      "tracking.smsAlerts": "Alertas SMS",
      "tracking.share": "Compartir",
      "tracking.print": "Imprimir",
      "tracking.whatToDoNext": "Que hacer ahora",
      "tracking.packageJourney": "Viaje del Paquete",
      "tracking.from": "DESDE",
      "tracking.to": "HASTA",
      "tracking.originPending": "Origen pendiente",
      "tracking.destinationPending": "Destino pendiente",
      "tracking.timeline": "Linea de Tiempo",
      "tracking.notFoundBadge": "NO ENCONTRADO",
      "tracking.liveBadge": "EN VIVO",
      
      // AI Features
      "ai.prediction": "Prediccion de Entrega IA",
      "ai.confidence": "Confianza",
      "ai.delayRisk": "Riesgo de Retraso",
      "ai.weatherImpact": "Impacto del Clima",
      "ai.recommendations": "Recomendaciones",
      "ai.escalation": "Necesitas Ayuda?",
      "ai.escalationBtn": "Generar Borrador de Queja",
      
      // Premium
      "premium.title": "Actualiza a Premium",
      "premium.subtitle": "Obtiene predicciones IA, alertas de retraso y asistencia de escalamiento",
      "premium.price": "$9/mes",
      "premium.feature1": "Predictor de Entrega IA",
      "premium.feature2": "Alertas de Radar de Retraso",
      "premium.feature3": "Asistente de Escalamiento",
      "premium.feature4": "Soporte Prioritario",
      "premium.cta": "Suscribirse Ahora",
      
      // Footer
      "footer.tagline": "Seguimiento de Paquetes con IA",
      "footer.copyright": "Todos los derechos reservados.",
      
      // Common
      "common.loading": "Cargando...",
      "common.error": "Algo salio mal",
      "common.tryAgain": "Intentar de Nuevo",
      "common.close": "Cerrar",
      "common.copy": "Copiar",
      "common.copied": "Copiado!"
    }
  },
  fr: {
    translation: {
      // Header
      "nav.features": "Fonctionnalites",
      "nav.blogs": "Blog",
      "nav.premium": "Obtenir Premium",
      
      // Hero
      "hero.title": "Suivez N'importe Quel Colis, N'importe Ou",
      "hero.subtitle": "Suivi alimente par l'IA pour plus de 1 500 transporteurs dans le monde. Sachez ou se trouve votre colis, quand il arrive et quoi faire en cas de probleme.",
      "hero.placeholder": "Entrez le numero de suivi",
      "hero.button": "Suivre le Colis",
      "hero.carriers": "Prise en charge de plus de 1 500 transporteurs, dont",
      
      // Tracking Results
      "tracking.status": "Statut",
      "tracking.carrier": "Transporteur",
      "tracking.lastUpdate": "Derniere Mise a Jour",
      "tracking.estimatedDelivery": "Livraison Estimee",
      "tracking.origin": "Origine",
      "tracking.destination": "Destination",
      "tracking.events": "Evenements de Suivi",
      "tracking.latestUpdate": "DERNIERE MISE A JOUR",
      "tracking.notFound": "Suivi non trouve",
      "tracking.notFoundDesc": "Impossible de trouver les informations de suivi. Veuillez verifier votre numero.",
      "tracking.poweredByAI": "Donnees en direct par IA",
      "tracking.updates": "mises a jour",
      "tracking.daysTransit": "Jours en Transit",
      "tracking.emailUpdates": "Alertes Email",
      "tracking.smsAlerts": "Alertes SMS",
      "tracking.share": "Partager",
      "tracking.print": "Imprimer",
      "tracking.whatToDoNext": "Que faire ensuite",
      "tracking.packageJourney": "Voyage du Colis",
      "tracking.from": "DE",
      "tracking.to": "VERS",
      "tracking.originPending": "Origine en attente",
      "tracking.destinationPending": "Destination en attente",
      "tracking.timeline": "Chronologie du Suivi",
      "tracking.notFoundBadge": "NON TROUVE",
      "tracking.liveBadge": "EN DIRECT",
      
      // AI Features
      "ai.prediction": "Prediction de Livraison IA",
      "ai.confidence": "Confiance",
      "ai.delayRisk": "Risque de Retard",
      "ai.weatherImpact": "Impact Meteo",
      "ai.recommendations": "Recommandations",
      "ai.escalation": "Besoin d'Aide?",
      "ai.escalationBtn": "Generer un Brouillon de Plainte",
      
      // Premium
      "premium.title": "Passer a Premium",
      "premium.subtitle": "Obtenez des predictions IA, des alertes de retard et une assistance d'escalade",
      "premium.price": "4,99$/mois",
      "premium.feature1": "Predicteur de Livraison IA",
      "premium.feature2": "Alertes Radar de Retard",
      "premium.feature3": "Assistant d'Escalade",
      "premium.feature4": "Support Prioritaire",
      "premium.cta": "S'abonner Maintenant",
      
      // Footer
      "footer.tagline": "Suivi de Colis par IA",
      "footer.copyright": "Tous droits reserves.",
      
      // Common
      "common.loading": "Chargement...",
      "common.error": "Une erreur s'est produite",
      "common.tryAgain": "Reessayer",
      "common.close": "Fermer",
      "common.copy": "Copier",
      "common.copied": "Copie!"
    }
  },
  de: {
    translation: {
      // Header
      "nav.features": "Funktionen",
      "nav.blogs": "Blog",
      "nav.premium": "Premium Holen",
      
      // Hero
      "hero.title": "Verfolgen Sie Jedes Paket, Uberall",
      "hero.subtitle": "KI-gestutzte Verfolgung fur uber 1.500 Spediteure weltweit. Wissen Sie, wo Ihr Paket ist, wann es ankommt und was bei Problemen zu tun ist.",
      "hero.placeholder": "Sendungsnummer eingeben",
      "hero.button": "Paket Verfolgen",
      "hero.carriers": "Unterstutzt uber 1.500 Spediteure, darunter",
      
      // Tracking Results
      "tracking.status": "Status",
      "tracking.carrier": "Spediteur",
      "tracking.lastUpdate": "Letzte Aktualisierung",
      "tracking.estimatedDelivery": "Geschatzte Lieferung",
      "tracking.origin": "Ursprung",
      "tracking.destination": "Ziel",
      "tracking.events": "Tracking-Ereignisse",
      "tracking.latestUpdate": "NEUESTE AKTUALISIERUNG",
      "tracking.notFound": "Sendung nicht gefunden",
      "tracking.notFoundDesc": "Tracking-Informationen nicht gefunden. Bitte uberprufen Sie Ihre Sendungsnummer.",
      "tracking.poweredByAI": "Live-Daten durch KI",
      "tracking.updates": "Aktualisierungen",
      "tracking.daysTransit": "Tage im Transit",
      "tracking.emailUpdates": "E-Mail-Benachrichtigungen",
      "tracking.smsAlerts": "SMS-Benachrichtigungen",
      "tracking.share": "Teilen",
      "tracking.print": "Drucken",
      "tracking.whatToDoNext": "Was als nachstes",
      "tracking.packageJourney": "Paketreise",
      "tracking.from": "VON",
      "tracking.to": "NACH",
      "tracking.originPending": "Ursprung ausstehend",
      "tracking.destinationPending": "Ziel ausstehend",
      "tracking.timeline": "Tracking-Zeitleiste",
      "tracking.notFoundBadge": "NICHT GEFUNDEN",
      "tracking.liveBadge": "LIVE",
      
      // AI Features
      "ai.prediction": "KI-Liefervorhersage",
      "ai.confidence": "Vertrauen",
      "ai.delayRisk": "Verzogerungsrisiko",
      "ai.weatherImpact": "Wetterauswirkung",
      "ai.recommendations": "Empfehlungen",
      "ai.escalation": "Brauchen Sie Hilfe?",
      "ai.escalationBtn": "Beschwerde-Entwurf Erstellen",
      
      // Premium
      "premium.title": "Auf Premium Upgraden",
      "premium.subtitle": "Erhalten Sie KI-Vorhersagen, Verzogerungswarnungen und Eskalationsunterstutzung",
      "premium.price": "4,99$/Monat",
      "premium.feature1": "KI-Lieferprediktor",
      "premium.feature2": "Verzogerungs-Radar-Warnungen",
      "premium.feature3": "Eskalationsassistent",
      "premium.feature4": "Prioritats-Support",
      "premium.cta": "Jetzt Abonnieren",
      
      // Footer
      "footer.tagline": "KI-Gestutzte Paketverfolgung",
      "footer.copyright": "Alle Rechte vorbehalten.",
      
      // Common
      "common.loading": "Laden...",
      "common.error": "Etwas ist schief gelaufen",
      "common.tryAgain": "Erneut Versuchen",
      "common.close": "Schliessen",
      "common.copy": "Kopieren",
      "common.copied": "Kopiert!"
    }
  },
  pt: {
    translation: {
      // Header
      "nav.features": "Recursos",
      "nav.blogs": "Blog",
      "nav.premium": "Obter Premium",
      
      // Hero
      "hero.title": "Rastreie Qualquer Pacote, Em Qualquer Lugar",
      "hero.subtitle": "Rastreamento com IA para mais de 1.500 transportadoras em todo o mundo. Saiba onde esta seu pacote, quando chega e o que fazer se houver problemas.",
      "hero.placeholder": "Digite o numero de rastreamento",
      "hero.button": "Rastrear Pacote",
      "hero.carriers": "Suportando mais de 1.500 transportadoras, incluindo",
      
      // Tracking Results
      "tracking.status": "Status",
      "tracking.carrier": "Transportadora",
      "tracking.lastUpdate": "Ultima Atualizacao",
      "tracking.estimatedDelivery": "Entrega Estimada",
      "tracking.origin": "Origem",
      "tracking.destination": "Destino",
      "tracking.events": "Eventos de Rastreamento",
      "tracking.latestUpdate": "ULTIMA ATUALIZACAO",
      "tracking.notFound": "Rastreamento nao encontrado",
      "tracking.notFoundDesc": "Nao foi possivel encontrar informacoes de rastreamento. Verifique seu numero.",
      "tracking.poweredByAI": "Dados ao vivo por IA",
      "tracking.updates": "atualizacoes",
      "tracking.daysTransit": "Dias em Transito",
      "tracking.emailUpdates": "Alertas por Email",
      "tracking.smsAlerts": "Alertas SMS",
      "tracking.share": "Compartilhar",
      "tracking.print": "Imprimir",
      "tracking.whatToDoNext": "O que fazer agora",
      "tracking.packageJourney": "Jornada do Pacote",
      "tracking.from": "DE",
      "tracking.to": "PARA",
      "tracking.originPending": "Origem pendente",
      "tracking.destinationPending": "Destino pendente",
      "tracking.timeline": "Linha do Tempo",
      "tracking.notFoundBadge": "NAO ENCONTRADO",
      "tracking.liveBadge": "AO VIVO",
      
      // AI Features
      "ai.prediction": "Previsao de Entrega IA",
      "ai.confidence": "Confianca",
      "ai.delayRisk": "Risco de Atraso",
      "ai.weatherImpact": "Impacto do Clima",
      "ai.recommendations": "Recomendacoes",
      "ai.escalation": "Precisa de Ajuda?",
      "ai.escalationBtn": "Gerar Rascunho de Reclamacao",
      
      // Premium
      "premium.title": "Atualizar para Premium",
      "premium.subtitle": "Obtenha previsoes de IA, alertas de atraso e assistencia de escalacao",
      "premium.price": "R$24,99/mes",
      "premium.feature1": "Previsor de Entrega IA",
      "premium.feature2": "Alertas de Radar de Atraso",
      "premium.feature3": "Assistente de Escalacao",
      "premium.feature4": "Suporte Prioritario",
      "premium.cta": "Assinar Agora",
      
      // Footer
      "footer.tagline": "Rastreamento de Pacotes com IA",
      "footer.copyright": "Todos os direitos reservados.",
      
      // Common
      "common.loading": "Carregando...",
      "common.error": "Algo deu errado",
      "common.tryAgain": "Tentar Novamente",
      "common.close": "Fechar",
      "common.copy": "Copiar",
      "common.copied": "Copiado!"
    }
  },
  it: {
    translation: {
      // Header
      "nav.features": "Funzionalita",
      "nav.blogs": "Blog",
      "nav.premium": "Ottieni Premium",
      
      // Hero
      "hero.title": "Traccia Qualsiasi Pacco, Ovunque",
      "hero.subtitle": "Tracciamento alimentato dall'IA per oltre 1.500 corrieri in tutto il mondo. Scopri dove si trova il tuo pacco, quando arriva e cosa fare in caso di problemi.",
      "hero.placeholder": "Inserisci numero di tracciamento",
      "hero.button": "Traccia Pacco",
      "hero.carriers": "Supporta oltre 1.500 corrieri, tra cui",
      
      // Tracking Results
      "tracking.status": "Stato",
      "tracking.carrier": "Corriere",
      "tracking.lastUpdate": "Ultimo Aggiornamento",
      "tracking.estimatedDelivery": "Consegna Stimata",
      "tracking.origin": "Origine",
      "tracking.destination": "Destinazione",
      "tracking.events": "Eventi di Tracciamento",
      "tracking.latestUpdate": "ULTIMO AGGIORNAMENTO",
      "tracking.notFound": "Tracciamento non trovato",
      "tracking.notFoundDesc": "Impossibile trovare informazioni di tracciamento. Verifica il tuo numero.",
      "tracking.poweredByAI": "Dati live con IA",
      "tracking.updates": "aggiornamenti",
      "tracking.daysTransit": "Giorni in Transito",
      "tracking.emailUpdates": "Avvisi Email",
      "tracking.smsAlerts": "Avvisi SMS",
      "tracking.share": "Condividi",
      "tracking.print": "Stampa",
      "tracking.whatToDoNext": "Cosa fare dopo",
      "tracking.packageJourney": "Viaggio del Pacco",
      "tracking.from": "DA",
      "tracking.to": "A",
      "tracking.originPending": "Origine in attesa",
      "tracking.destinationPending": "Destinazione in attesa",
      "tracking.timeline": "Cronologia Tracciamento",
      "tracking.notFoundBadge": "NON TROVATO",
      "tracking.liveBadge": "LIVE",
      
      // AI Features
      "ai.prediction": "Previsione Consegna IA",
      "ai.confidence": "Affidabilita",
      "ai.delayRisk": "Rischio Ritardo",
      "ai.weatherImpact": "Impatto Meteo",
      "ai.recommendations": "Raccomandazioni",
      "ai.escalation": "Hai Bisogno di Aiuto?",
      "ai.escalationBtn": "Genera Bozza Reclamo",
      
      // Premium
      "premium.title": "Passa a Premium",
      "premium.subtitle": "Ottieni previsioni IA, avvisi di ritardo e assistenza per escalation",
      "premium.price": "4,99$/mese",
      "premium.feature1": "Predittore Consegna IA",
      "premium.feature2": "Avvisi Radar Ritardo",
      "premium.feature3": "Assistente Escalation",
      "premium.feature4": "Supporto Prioritario",
      "premium.cta": "Abbonati Ora",
      
      // Footer
      "footer.tagline": "Tracciamento Pacchi con IA",
      "footer.copyright": "Tutti i diritti riservati.",
      
      // Common
      "common.loading": "Caricamento...",
      "common.error": "Qualcosa e andato storto",
      "common.tryAgain": "Riprova",
      "common.close": "Chiudi",
      "common.copy": "Copia",
      "common.copied": "Copiato!"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', flag: 'GB' },
  { code: 'es', name: 'Espanol', flag: 'ES' },
  { code: 'fr', name: 'Francais', flag: 'FR' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'pt', name: 'Portugues', flag: 'BR' },
  { code: 'it', name: 'Italiano', flag: 'IT' }
];
