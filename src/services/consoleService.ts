const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:3002/api/v1' : '/api/v1');

interface ConsoleUser {
  id: string; 
  email: string;
  guawId?: string;
  companyName?: string;
  role?: string;
  streak?: number;
}

interface LoginResponse {
    token: string;
    account: ConsoleUser; // Backend returns 'account'
}

interface KeyResponse {
  rawKey: string; // The secret key (sk_live_...)
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
}

export const consoleService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/guardians/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json.data;
  },

  async register(data: { email: string; password: string; companyName?: string }): Promise<void> {
    const res = await fetch(`${API_BASE}/guardians/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Registration failed');
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getKeys(token: string | null): Promise<any[]> {
    const res = await fetch(`${API_BASE}/guardians/keys`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    // Safety check for empty body or errors
    if (!res.ok) {
        // Return empty array just to be safe or throw. 
        // Dashboard handles 401 via status check, but let's pass the raw json if error
        return []; 
    }

    const json = await res.json();
    // Return the internal array
    return Array.isArray(json.data) ? json.data : [];
  },

  // Helper to get headers with authorization
  getHeaders(token: string | null) {
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async getPlans(token: string | null) {
    const response = await fetch(`${API_BASE}/guardians/billing/plans`, {
      headers: this.getHeaders(token)
    });
    return response.json();
  },

  async createCheckout(token: string | null, planId: string) {
    const response = await fetch(`${API_BASE}/guardians/billing/checkout`, {
      method: 'POST',
      headers: {
        ...this.getHeaders(token),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ planId })
    });
    return response.json();
  },

  async createKey(token: string | null, name: string): Promise<KeyResponse> {
    const res = await fetch(`${API_BASE}/guardians/keys`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    });
    
    const json = await res.json();
    
    if (!res.ok) {
        throw new Error(json.message || 'Failed to create key');
    }
    
    return json.data;
  },

  async revokeKey(token: string | null, id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/guardians/keys/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || 'Failed to revoke key');
    }
  },

  /**
   * 🦅 ADMIN: Get platform-wide economic health
   */
  async getEconomicHealth(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/admin/economic-health`, {
          headers: this.getHeaders(token),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch economic health');
      return json.data;
  },

  /**
   * 🦅 ADMIN: Get billing audit trail
   */
  async getAuditTrail(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/admin/audit-trail`, {
          headers: this.getHeaders(token),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch audit trail');
      return json.data;
  },

  /**
   * 🦅 Log audit request for forensic export
   */
  async logAuditRequest(token: string | null) {
      await fetch(`${API_BASE}/guardians/billing/audit-request`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reason: 'Dashboard Button Click' })
      });
      // Fire and forget
  },

  /**
   * 🦅 ADMIN: Get detailed account snapshot (Profile + Ledger + Usage)
   */
  async getAccountDetails(token: string | null, accountId: string): Promise<Record<string, unknown>> {
      const res = await fetch(`${API_BASE}/guardians/admin/accounts/${accountId}`, {
          headers: this.getHeaders(token),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch account details');
      return json.data;
  },

  /**
   * 🦅 ADMIN: Manually extend a trial
   */
  async extendTrial(token: string | null, accountId: string, days: number, reason: string) {
      const res = await fetch(`${API_BASE}/guardians/admin/extend-trial`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ accountId, days, reason })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to extend trial');
      return json.data;
  },

  /**
   * 🦅 ADMIN: Force Downgrade Account
   */
  async forceDowngrade(token: string | null, accountId: string, reason: string) {
      const res = await fetch(`${API_BASE}/guardians/admin/force-downgrade`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ accountId, reason })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to downgrade account');
      return json.data;
  },

  /**
   * 🪙 ADMIN: Get crypto payment intents
   */
  async getCryptoIntents(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/admin/crypto-intents`, {
          headers: this.getHeaders(token),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch crypto intents');
      return json.data;
  },

  /**
   * 🪙 CLIENT: Create USDT Payment Intent
   */
  async createCryptoIntent(token: string | null, planId: string, network: 'ERC20' | 'TRC20' | 'BEP20') {
      const res = await fetch(`${API_BASE}/guardians/billing/crypto/intent`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ planId, network })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to create crypto intent');
      return json.data;
  },

  /**
   * 🪙 CLIENT: Confirm USDT Payment
   */
  async confirmCryptoPayment(token: string | null, intentId: string, txHash: string) {
      const res = await fetch(`${API_BASE}/guardians/billing/crypto/confirm`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ intentId, txHash })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to confirm payment');
      return json.data;
  },

  /**
   * 💳 CLIENT: Create Mercado Pago Preference (Checkout)
   */
  async createPreferenceMP(token: string | null, planId: string) {
      const res = await fetch(`${API_BASE}/guardians/billing/mp/preference`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ planId })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to create MP preference');
      return json.data; // Returns { init_point: 'https://...' }
  },

  /**
   * 🦅 ADMIN: Get Sovereign Asset Content
   */
  async getSovereignAsset(token: string | null, assetName: string) {
      const res = await fetch(`${API_BASE}/guardians/admin/assets/${assetName}`, {
          headers: this.getHeaders(token),
      });
      const json = await res.json();
      if (!res.ok) {
          const detail = json.message || json.error || 'Unknown Error';
          throw new Error(`[HTTP ${res.status}] ${detail}`);
      }
      return json.data;
  },

  /**
   * 🦅 Trigger Sovereign Quota Check (Simulation/Real Event)
   */
  async checkSovereignQuota(token: string | null, used: number, limit: number, reset: boolean = false) {
      const res = await fetch(`${API_BASE}/guardians/billing/quota-check`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ used, limit, reset })
      });
      return res.json();
  },

  /**
   * 🛡️ MULTIMODAL: Verify Audio Integrity
   */
  async verifyMultimodalAudio(token: string | null, file: File, contextId?: string) {
      const formData = new FormData();
      formData.append('audio', file);
      if (contextId) formData.append('contextId', contextId);

      const res = await fetch(`${API_BASE}/integrity/multimodal/audio/verify`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`
          },
          body: formData
      });
      return res.json();
  },

  /**
   * 🛡️ MULTIMODAL: Verify Video Temporal Integrity
   */
  async verifyMultimodalVideo(token: string | null, files: File[], contextId?: string) {
      const formData = new FormData();
      files.forEach(file => formData.append('frames', file));
      if (contextId) formData.append('contextId', contextId);

      const res = await fetch(`${API_BASE}/integrity/multimodal/video/verify`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`
          },
          body: formData
      });
      return res.json();
  },

  /**
   * 🛡️ MULTIMODAL: Verify Biological Telemetry
   */
  async verifyMultimodalTelemetry(token: string | null, telemetry: { heartRate: number; oxygen: number }) {
      const res = await fetch(`${API_BASE}/integrity/multimodal/telemetry/verify`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ telemetry })
      });
      return res.json();
  },

  // ═══════════════════════════════════════════════════════════════
  // 🏆 SOVEREIGN PERSISTENCE LEADERBOARD
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get the public persistence leaderboard (pseudonymous)
   */
  async getLeaderboard(token: string | null, options?: { limit?: number; offset?: number; tier?: string | null }) {
      const params = new URLSearchParams();
      if (options?.limit) params.append('limit', String(options.limit));
      if (options?.offset) params.append('offset', String(options.offset));
      if (options?.tier) params.append('tier', options.tier);

      const res = await fetch(`${API_BASE}/guardians/leaderboard?${params}`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch leaderboard');
      return json.data;
  },

  /**
   * Get my position on the leaderboard
   */
  async getMyLeaderboardPosition(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/leaderboard/me`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch position');
      return json.data;
  },

  /**
   * Get leaderboard statistics (tier distribution, averages)
   */
  async getLeaderboardStats(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/leaderboard/stats`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch stats');
      return json.data;
  },

  /**
   * Reveal identity on the leaderboard (requires signature)
   */
  async revealLeaderboardIdentity(token: string | null, signature: string) {
      const res = await fetch(`${API_BASE}/guardians/leaderboard/reveal`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ signature })
      });
      return res.json();
  },

  /**
   * 🏛️ CLEARING: Get Sovereign Economy Status (Tier 46)
   */
  /**
   * 🦅 SAAS: Get Profile (Keys, Origins, Counters)
   */
  async getSaaSProfile(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/saas/profile`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch SaaS profile');
      return json.data;
  },

  /**
   * 🔒 SAAS: Reveal Secret Key (Decrypted)
   */
  async revealSaaSSecret(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/saas/reveal`, {
          method: 'POST',
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to reveal secret');
      return json.data.secretKey;
  },

  /**
   * 🌐 SAAS: Update CORS Origins
   */
  async updateSaaSOrigins(token: string | null, origins: string[]) {
      const res = await fetch(`${API_BASE}/guardians/saas/origins`, {
          method: 'POST',
          headers: {
              ...this.getHeaders(token),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ origins })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update origins');
      return json.data;
  },

  /**
   * 👁️ SAAS: Get Recent Verifications
   */
  async getVerifications(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/saas/verifications`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch verifications');
      return json.data;
  },

  /**
   * 📈 SAAS: Get Usage Trend
   */
  async getSaaSTrend(token: string | null) {
      const res = await fetch(`${API_BASE}/guardians/saas/metrics/trend`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch trend');
      return json.data;
  },

  /**
   * 🏛️ CLEARING: Get Sovereign Economy Status (Tier 46)
   */
  async getClearingStatus(token: string | null) {
      const res = await fetch(`${API_BASE}/clearing/me`, {
          headers: this.getHeaders(token)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch clearing status');
      return json.data;
  }
};

