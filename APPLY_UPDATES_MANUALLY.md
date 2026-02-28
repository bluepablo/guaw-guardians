# 🔧 LANDING PAGE - APLICACIÓN MANUAL DE UPDATES

**IMPORTANTE:** Debido a caracteres especiales en el archivo, estas actualizaciones deben aplicarse manualmente.

---

## ✅ UPDATE 1: GRID DE 4 COLUMNAS + GOLDEN SEAL + WORM

**Ubicación:** Línea 191

**BUSCAR:**

```tsx
<div className="grid grid-cols-2 gap-6 pt-4">
```

**REEMPLAZAR CON:**

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
```

---

**Ubicación:** Después de la línea 201 (después del card de Merkle Tree, antes de `</div>`)

**AGREGAR ESTOS DOS CARDS:**

```tsx
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:bg-white/[0.04] transition-colors group">
                          <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest group-hover:text-amber-300 transition-colors">Golden Seal</div>
                          <div className="text-2xl font-bold text-white">Immutable Snapshots</div>
                          <p className="text-[10px] text-gray-500 font-mono">Cryptographic System Versioning</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:bg-white/[0.04] transition-colors group">
                          <div className="text-green-400 font-mono text-xs font-bold uppercase tracking-widest group-hover:text-green-300 transition-colors">WORM Storage</div>
                          <div className="text-2xl font-bold text-white">Forensic Integrity</div>
                          <p className="text-[10px] text-gray-500 font-mono">Write-Once-Read-Many Evidence</p>
                      </div>
```

---

## ✅ UPDATE 2: CÓDIGO DE CIRCUITO TRUSTGRADEVERIFIER

**Ubicación:** Líneas 223-238 (dentro del bloque de código)

**BUSCAR:**

```tsx
<div className="space-y-2 text-gray-400 font-mono leading-relaxed">
  <div>
    <span className="text-purple-400">template</span> Verifier() {"{"}
  </div>
  <div className="pl-4">
    <span className="text-blue-400">signal input</span> public_hash;
  </div>
  <div className="pl-4">
    <span className="text-blue-400">signal input</span> proof_pi_a[3];
  </div>
  <div className="pl-4">
    <span className="text-gray-600 italic">
      // Verify physical entropy without revealing raw input
    </span>
  </div>
  <div className="pl-4 opacity-50">...</div>
  <div className="pl-4">
    component hasher = <span className="text-yellow-400">Poseidon(2)</span>;
  </div>
  <div className="pl-4">hasher.inputs[0] {"<=="} private_signal;</div>
  <div className="pl-4">public_hash {"==="} hasher.out;</div>
  <div>{"}"}</div>
  <br />
  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 font-bold flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
    {">>"} ZK-PROOF VERIFIED: VALID_HUMAN
  </div>
</div>
```

**REEMPLAZAR CON:**

```tsx
<div className="space-y-2 text-gray-400 font-mono leading-relaxed">
  <div>
    <span className="text-purple-400">template</span> TrustGradeVerifier() {"{"}
  </div>
  <div className="pl-4">
    <span className="text-blue-400">signal input</span> actualScore;{" "}
    <span className="text-gray-600">// Private</span>
  </div>
  <div className="pl-4">
    <span className="text-blue-400">signal input</span> minThreshold;{" "}
    <span className="text-gray-600">// Public</span>
  </div>
  <div className="pl-4">
    <span className="text-blue-400">signal output</span> isQualified;
  </div>
  <div className="pl-4 opacity-50">...</div>
  <div className="pl-4">
    component gt = <span className="text-yellow-400">GreaterThan(64)</span>;
  </div>
  <div className="pl-4">gt.in[0] {"<=="} actualScore;</div>
  <div className="pl-4">gt.in[1] {"<=="} minThreshold;</div>
  <div className="pl-4">isQualified {"<=="} gt.out;</div>
  <div>{"}"}</div>
  <br />
  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 font-bold flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
    {">>"} ZK-PROOF VERIFIED: TRUST_SCORE_VALID
  </div>
</div>
```

---

## ✅ UPDATE 3: SECCIÓN FAIL-CLOSED PHILOSOPHY

**Ubicación:** Después de la línea 242 (después de `</section>` de la sección de criptografía)

**AGREGAR ESTA SECCIÓN COMPLETA:**

```tsx
{
  /* Fail-Closed Philosophy */
}
<section className="py-32 px-4 relative bg-gradient-to-b from-[#050505] to-[#0A0A0A] border-t border-white/5">
  <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        Sovereign Principle
      </div>
      <h2 className="text-5xl font-bold tracking-tighter text-white leading-tight">
        If we can't prove it,
        <br />
        <span className="text-gray-600">we don't run it.</span>
      </h2>
      <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto mt-6">
        SAREI operates in <strong className="text-white">FAIL-CLOSED</strong>{" "}
        mode. If cryptographic artifacts are missing or invalid, the system
        halts. No degraded modes. No simulation. No compromise.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-3 gap-6 pt-8"
    >
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:bg-white/[0.04] transition-colors">
        <div className="text-4xl font-bold text-white">0</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          Simulation Modes
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:bg-white/[0.04] transition-colors">
        <div className="text-4xl font-bold text-white">100%</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          Cryptographic Proofs
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:bg-white/[0.04] transition-colors">
        <div className="text-4xl font-bold text-primary">∞</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          Legal Defensibility
        </div>
      </div>
    </motion.div>
  </div>
</section>;
```

---

## ✅ UPDATE 4: BADGE DE PRODUCCIÓN

**Ubicación:** Línea 108

**BUSCAR:**

```tsx
<span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">
  Protocol v5.0 Active
</span>
```

**REEMPLAZAR CON:**

```tsx
<span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">
  ZK-SNARK Production Active · Tier 100
</span>
```

---

## 📋 CHECKLIST

- [ ] Update 1: Grid 4 columnas + Golden Seal + WORM (línea 191-201)
- [ ] Update 2: Código TrustGradeVerifier (líneas 223-238)
- [ ] Update 3: Sección Fail-Closed (después línea 242)
- [ ] Update 4: Badge producción (línea 108)

---

## 🧪 TESTING

Después de aplicar:

```bash
cd C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians
npm run dev
```

Verificar:

- ✅ Hero muestra "ZK-SNARK Production Active · Tier 100"
- ✅ Hero tagline muestra "Zero-Knowledge (Groth16) · Golden Seal · WORM Storage · Epoch System"
- ✅ 4 cards en sección de criptografía (Groth16, Merkle, Golden Seal, WORM)
- ✅ Código muestra TrustGradeVerifier
- ✅ Sección Fail-Closed aparece después de criptografía
- ✅ Responsive funciona (4 cols → 2 cols en mobile)

---

**¡Listo para aplicar manualmente! Copia y pega cada bloque en las ubicaciones indicadas.**
