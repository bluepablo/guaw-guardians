/**
 * 🛡️ SOVEREIGN GUARDIANS SDK (Client-Side)
 * -----------------------------------------
 * The official high-performance bridge between the Client Application (Product)
 * and the Sovereign Infrastructure (Guardians Engine).
 * 
 * "Optimization at the highest level" means:
 * 1. Fail-Closed by default (Safety First).
 * 2. Typed Interfaces for all Sovereign interactions.
 * 3. Direct mapping to the Backend SovereignBridge.
 */

const API_BASE = 'http://localhost:3002/api/v1';

export interface SignalMetadata {
    entropy: number;
    jitter: number;
    payloadSize: number;
    timestamp: number;
    sourceStr: string;
}

export interface VerificationResult {
    allowed: boolean;
    status: 'OPTIMISTIC_APPROVAL' | 'VERIFIED' | 'REJECTED' | 'BLOCK_IMMEDIATE';
    ticket?: string; // Cryptographic receipt from the Bridge
    reason?: string;
}

export class SovereignSDK {
    private static instance: SovereignSDK;
    private token: string | null = null;
    private isConnected: boolean = false;

    private constructor() {}

    public static getInstance(): SovereignSDK {
        if (!SovereignSDK.instance) {
            SovereignSDK.instance = new SovereignSDK();
        }
        return SovereignSDK.instance;
    }

    /**
     * 🔌 Handshake with the Sovereign Bridge.
     * Establishes the trust channel.
     */
    public async connect(authToken: string): Promise<boolean> {
        this.token = authToken;
        try {
            // Ping the bridge to ensure it's alive and accepts our token
            // This endpoint corresponds to the "heartbeat" of the handshake
            const res = await fetch(`${API_BASE}/guardians/bridge/handshake`, {
                headers: this.getHeaders()
            });
            
            if (res.ok) {
                this.isConnected = true;
                console.log("🛡️ [SovereignSDK] Bridge Connected. Reality is aligned.");
                return true;
            }
        } catch (e) {
            console.error("⚠️ [SovereignSDK] Bridge unresponsive.", e);
        }
        
        this.isConnected = false;
        return false;
    }

    /**
     * ⚡ VERIFY SIGNAL (The Core Optimization)
     * 
     * Instead of generic API calls, we use this strict method to asking
     * the Guardians if a 'Physical Event' (Signal) is valid.
     * 
     * This maps directly to `SovereignBridge.requestVerification` on backend.
     */
    public async verifySignal(signal: SignalMetadata): Promise<VerificationResult> {
        if (!this.isConnected) {
            console.warn("🚫 [SovereignSDK] Fail-Closed: Bridge not connected.");
            return { allowed: false, status: 'REJECTED', reason: 'BRIDGE_DISCONNECTED' };
        }

        try {
            const res = await fetch(`${API_BASE}/guardians/bridge/verify`, {
                method: 'POST',
                headers: { 
                    ...this.getHeaders(),
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(signal)
            });

            const json = await res.json();
            
            if (!res.ok) {
                return { 
                    allowed: false, 
                    status: 'REJECTED', 
                    reason: json.message || 'BRIDGE_REJECTION' 
                };
            }

            return json.data as VerificationResult;

        } catch {
            // Fail-Closed Logic provided by SDK
            return { 
                allowed: false, 
                status: 'BLOCK_IMMEDIATE', 
                reason: 'NETWORK_ENTROPY_FAILURE' 
            };
        }
    }

    /**
     * 🚨 REPORT ANOMALY (Edge Verification)
     * 
     * Seals a physical integrity violation (Jitter/Jerk mismatch) 
     * in the backend Lazarus Ledger.
     */
    public async reportAnomaly(anomalyData: Record<string, unknown>, metadata: Record<string, unknown> = {}): Promise<boolean> {
        // We use the direct sovereign integrity endpoint
        const ANOMALY_ENDPOINT = 'http://localhost:3002/api/sovereign/integrity/anomaly';
        
        try {
            const res = await fetch(ANOMALY_ENDPOINT, {
                method: 'POST',
                headers: { 
                    ...this.getHeaders(),
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ anomalyData, metadata })
            });

            return res.ok;
        } catch (e) {
            console.error("⚠️ [SovereignSDK] Failed to seal anomaly in Lazarus.", e);
            return false;
        }
    }

    /**
     * 🔍 Get the status of the Guardian Network (Consensus Health)
     */
    public async getConsensusStatus(): Promise<'HEALTHY' | 'DEGRADED' | 'HALTED'> {
        try {
            const res = await fetch(`${API_BASE}/guardians/status`, {
                 headers: this.getHeaders()
            });
            const json = await res.json();
            return json.data.status;
        } catch {
            return 'HALTED';
        }
    }

    private getHeaders(): HeadersInit {
        return {
            'Authorization': `Bearer ${this.token}`,
            'X-Client-Version': 'GUAW_CLIENT_V6',
            'X-Sovereign-Agent': 'GUAW_SDK'
        };
    }
}
