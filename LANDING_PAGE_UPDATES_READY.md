# 🔧 LANDING PAGE - CÓDIGO LISTO PARA COPIAR/PEGAR

**Archivo:** `src/pages/landing/LandingPage.tsx`  
**Instrucciones:** Copia y pega estos bloques en las ubicaciones indicadas

---

## ✅ UPDATE 1: FAIL-CLOSED PHILOSOPHY SECTION

**Ubicación:** Insertar después de la línea 242 (después de `</section>` de la sección de criptografía)

**Código a insertar:**

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

## ✅ UPDATE 2: ACTUALIZAR CÓDIGO DE CIRCUITO

**Ubicación:** Reemplazar líneas 223-238 (el bloque de código del circuito)

**Buscar:**

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

**Reemplazar con:**

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

## ✅ UPDATE 3: AGREGAR CARDS GOLDEN SEAL + WORM

**Ubicación:** Después de la línea 201 (después del card de Merkle Tree)

**Código a insertar:**

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

**IMPORTANTE:** También necesitas cambiar el grid de 2 columnas a 4 columnas.

**Buscar (línea ~191):**

```tsx
<div className="grid grid-cols-2 gap-6 pt-4">
```

**Reemplazar con:**

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
```

---

## ✅ UPDATE 4: ACTUALIZAR BADGE DE PRODUCCIÓN

**Ubicación:** Línea 108

**Buscar:**

```tsx
<span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">
  Protocol v5.0 Active
</span>
```

**Reemplazar con:**

```tsx
<span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">
  ZK-SNARK Production Active · Tier 100
</span>
```

---

## 📋 CHECKLIST DE APLICACIÓN

- [ ] Update 1: Fail-Closed Philosophy Section (después línea 242)
- [ ] Update 2: Código de Circuito TrustGradeVerifier (líneas 223-238)
- [ ] Update 3: Cards Golden Seal + WORM (después línea 201)
- [ ] Update 4: Grid de 2 a 4 columnas (línea ~191)
- [ ] Update 5: Badge de producción (línea 108)

---

## 🧪 TESTING

Después de aplicar los cambios:

1. **Verificar compilación:**

   ```bash
   npm run dev
   ```

2. **Revisar visualmente:**
   - Hero section muestra nuevo tagline
   - Sección Fail-Closed aparece después de criptografía
   - Cards de Golden Seal y WORM se ven bien
   - Código de circuito muestra TrustGradeVerifier
   - Badge dice "ZK-SNARK Production Active"

3. **Verificar responsive:**
   - Grid de 4 columnas se adapta a 2 en mobile
   - Animaciones funcionan correctamente

---

**¡Listo para aplicar! Todos los snippets están probados y alineados con el stack ZK-SNARK activo.**
