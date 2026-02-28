# 💰 GUAW SPRINT 3: MONETIZATION OPERATIONS MANUAL

**Status:** ACTIVE (Manual Billing)
**Enforcement:** LIVE (Gatekeeper V2)
**Integration:** STRIPE DECOUPLED (Sovereign Authority)
**Legal Reference:** `dist/.../33_OPERACION_COMERCIAL_GUAW_GUARDIANS_V1.md`

---

## 💎 Pricing Tiers (Sugerido)

_Nota: Los precios son comerciales y no afectan la lógica técnica._

| Plan           | Quota Daily | Price (Monthly) | Target Audience |
| -------------- | ----------- | --------------- | --------------- |
| **Free**       | 1,000       | $0              | Devs / Trials   |
| **Starter**    | 10,000      | $29             | Small SaaS      |
| **Team**       | 100,000     | $99             | Scale-ups       |
| **Enterprise** | Unlimited   | Custom          | Banks / Gov     |

---

## 🛠️ Procedimiento Operativo

### 1. Nuevo Cliente (Alta)

1.  Acordar pago y recibir comprobante.
2.  Crear cuenta en GUAW (si no existe) o identificar email.
3.  Ejecutar comando para establecer plan.

### 2. Upgrade de Plan (Pago Recibido)

**Cuándo:** El cliente ha pagado la diferencia o la suscripción superior.
**Acción:** Ejecutar script administrativo.

```bash
# Ejemplo: Upgrade a Starter
node scripts/guardian-admin.js set-plan cliente@empresa.com starter
```

**Resultado:**

- Efecto INMEDIATO (sin reinicios).
- El cliente recibe el nuevo límite en su siguiente request.

### 3. Downgrade / Impago (Revocación Parcial)

**Cuándo:** El cliente deja de pagar o pide bajar de nivel.
**Acción:**

```bash
# Ejemplo: Downgrade a Free
node scripts/guardian-admin.js set-plan cliente@empresa.com free
```

**Resultado:**

- Si el cliente ya consumió >1000 requests hoy, quedará **bloqueado (429)** inmediatamente hasta mañana.
- Esto incentiva la renovación.

### 4. Revocación Total (Ban Hammer)

**Cuándo:** Abuso severo o terminación de contrato.
**Acción:** (Requiere acceso a DB o script específico `revoke-key` si disponible, por ahora vía DB o marcando plan inactivo).

_Temporal:_ Cambiar a plan `free` es suficiente para limitar daño.
_Definitivo:_ Revocar API Key.

(TODO: Agregar comando `revoke-key` a CLI en Sprint 4 si se requiere frecuente).

---

## 🚨 SOBERANÍA: REGLA DE ORO

> **El Gatekeeper decide. El pago solo habilita.**
> Ningún proveedor externo (Stripe/PayPal) tiene autoridad técnica sobre el sistema.
> Si Stripe cae, GUAW sigue funcionando (y cobrando en diferido o manteniendo servicio).

---

**⚠️ MANTENIMIENTO**
Los archivos `services/guardians/gatekeeper.service.js` y `middlewares/guardian.auth.js` son **SOVEREIGN CORE**. No modificar sin decisión comercial explícita.
