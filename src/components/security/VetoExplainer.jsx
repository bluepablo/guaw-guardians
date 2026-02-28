import { useState } from "react";

/**
 * 🛡️ VetoExplainer React Component
 * 
 * Warm, clear, and actionable UI for GUAW workers who encounter a security flag.
 * Prioritizes accessibility and user transparency.
 */

// ─── Icons (inline SVG) ──────────────────────────────────
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconAlertCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const IconChevronDown = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Sub-components ────────────────────────────────────────────────────────
function StatusBadge({ shouldSuspend, suspensionDays }) {
  if (!shouldSuspend) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "4px 10px", borderRadius: "20px",
        background: "#ecfdf5", color: "#065f46",
        fontSize: "12px", fontWeight: "600", letterSpacing: "0.01em"
      }}>
        <IconCheckCircle />
        Under Review — No Suspension
      </span>
    );
  }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "4px 10px", borderRadius: "20px",
      background: "#fff7ed", color: "#9a3412",
      fontSize: "12px", fontWeight: "600", letterSpacing: "0.01em"
    }}>
      <IconAlertCircle />
      {suspensionDays === 1 ? "1-Day Pause" : `${suspensionDays}-Day Pause`}
    </span>
  );
}

function ExpandableSection({ title, accentColor, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderRadius: "10px",
      border: `1px solid ${accentColor}22`,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: open ? `${accentColor}0d` : "transparent",
          border: "none", cursor: "pointer",
          color: "#374151", fontWeight: "500", fontSize: "13.5px",
          textAlign: "left", transition: "background 0.2s",
        }}
      >
        <span style={{ color: accentColor }}>{title}</span>
        <IconChevronDown open={open} />
      </button>
      {open && (
        <div style={{
          padding: "0 16px 14px",
          background: `${accentColor}06`,
          borderTop: `1px solid ${accentColor}18`,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export function VetoExplainer({ veto, onAppeal }) {
  const accentColor = veto.shouldSuspend ? "#ea580c" : "#2563eb";
  const headerBg = veto.shouldSuspend
    ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
    : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      maxWidth: "480px",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      overflow: "hidden",
      background: "#fff",
      border: "1px solid #e5e7eb",
    }}>
      {/* Header */}
      <div style={{ background: headerBg, padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: veto.shouldSuspend ? "#fed7aa" : "#bfdbfe",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: accentColor, flexShrink: 0,
          }}>
            <IconShield />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
              <span style={{ fontWeight: "700", fontSize: "15px", color: "#111827" }}>
                Security Review
              </span>
              <StatusBadge shouldSuspend={veto.shouldSuspend} suspensionDays={veto.suspensionDays} />
            </div>
            <p style={{ margin: 0, color: "#4b5563", fontSize: "13.5px", lineHeight: "1.55" }}>
              {veto.userMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>

        {/* Action Item — Top Priority */}
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: "10px",
          padding: "12px 14px",
        }}>
          <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "12px", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            What to do now
          </p>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#166534", lineHeight: "1.55" }}>
            {veto.recoveryAction}
          </p>
        </div>

        {/* Legitimate causes */}
        <ExpandableSection title="Common Legitimate Causes" accentColor={accentColor}>
          <ul style={{ margin: "10px 0 0", padding: "0 0 0 16px", listStyle: "none" }}>
            {veto.legitimateCauses.map((cause, i) => (
              <li key={i} style={{
                display: "flex", gap: "8px", alignItems: "flex-start",
                padding: "5px 0",
                fontSize: "13px", color: "#374151", lineHeight: "1.5",
                borderBottom: i < veto.legitimateCauses.length - 1 ? "1px solid #f3f4f6" : "none",
              }}>
                <span style={{ color: accentColor, marginTop: "3px", flexShrink: 0 }}>•</span>
                {cause}
              </li>
            ))}
          </ul>
        </ExpandableSection>

        {/* Appeal section */}
        <ExpandableSection title="How to appeal this decision" accentColor="#7c3aed">
          <div style={{ paddingTop: "10px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#4b5563", lineHeight: "1.55" }}>
              {veto.appealGuidance}
            </p>
            <div style={{
              background: "#f5f3ff", borderRadius: "8px", padding: "10px 12px",
              fontSize: "12px", color: "#6d28d9", fontWeight: "500",
            }}>
              Session ID: <code style={{ fontFamily: "monospace", background: "#ede9fe", padding: "1px 5px", borderRadius: "4px" }}>{veto.sessionId}</code>
            </div>
          </div>
        </ExpandableSection>

        {/* CTA */}
        <button
          onClick={() => onAppeal && onAppeal(veto)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            width: "100%", padding: "11px",
            background: accentColor, color: "#fff",
            border: "none", borderRadius: "10px",
            fontWeight: "600", fontSize: "14px", cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Contact Support or File Appeal
          <IconArrowRight />
        </button>

        <p style={{ margin: 0, textAlign: "center", fontSize: "11.5px", color: "#9ca3af" }}>
          Automated systems never have the final word. You always have the right to human review.
        </p>
      </div>
    </div>
  );
}
