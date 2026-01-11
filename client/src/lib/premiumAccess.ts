const STORAGE_KEY = 'lt_premium_usage';
const LICENSE_KEY = 'lt_license_key';
const MAX_FREE_PREMIUM = 2;

interface PremiumUsage {
  count: number;
  fingerprint: string;
  trackingNumbers: string[];
}

function generateFingerprint(): string {
  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
  ].join('|');
  
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function getUsage(): PremiumUsage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Storage not available
  }
  return {
    count: 0,
    fingerprint: generateFingerprint(),
    trackingNumbers: [],
  };
}

function saveUsage(usage: PremiumUsage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch {
    // Storage not available
  }
}

export function canUsePremiumFree(trackingNumber: string): boolean {
  // If they have a valid license, always allow
  if (isPremiumSubscriber()) {
    return true;
  }
  
  const usage = getUsage();
  
  // Already used premium for this tracking number? Allow it (re-track)
  if (usage.trackingNumbers.includes(trackingNumber)) {
    return true;
  }
  
  // Under limit?
  return usage.count < MAX_FREE_PREMIUM;
}

export function usePremiumCredit(trackingNumber: string): void {
  // Don't count if they're a subscriber
  if (isPremiumSubscriber()) {
    return;
  }
  
  const usage = getUsage();
  
  // Already tracked? Don't count again
  if (usage.trackingNumbers.includes(trackingNumber)) {
    return;
  }
  
  usage.count += 1;
  usage.trackingNumbers.push(trackingNumber);
  saveUsage(usage);
}

export function getFreePremiumRemaining(): number {
  if (isPremiumSubscriber()) {
    return Infinity;
  }
  const usage = getUsage();
  return Math.max(0, MAX_FREE_PREMIUM - usage.count);
}

export function hasUsedAllFreePremium(): boolean {
  if (isPremiumSubscriber()) {
    return false;
  }
  return getFreePremiumRemaining() === 0;
}

export function isPremiumSubscriber(): boolean {
  // All users get full premium features for now
  return true;
}

export function getStoredLicenseKey(): string | null {
  try {
    return localStorage.getItem(LICENSE_KEY);
  } catch {
    return null;
  }
}

export function storeLicenseKey(key: string): void {
  try {
    localStorage.setItem(LICENSE_KEY, key);
  } catch {
    // Storage not available
  }
}

export function clearLicenseKey(): void {
  try {
    localStorage.removeItem(LICENSE_KEY);
  } catch {
    // Storage not available
  }
}

export async function validateLicenseKey(key: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const response = await fetch('/api/license/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey: key }),
    });
    
    const data = await response.json();
    
    if (data.valid) {
      storeLicenseKey(key);
      return { valid: true };
    }
    
    return { valid: false, error: data.error || 'Invalid license key' };
  } catch {
    return { valid: false, error: 'Failed to validate license key' };
  }
}
