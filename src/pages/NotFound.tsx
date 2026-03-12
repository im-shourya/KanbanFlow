import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [theme] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kf_theme_v2") || '"light"');
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const bg = theme === "dark" ? "#202124" : "#FFFFFF";
  const textTitle = theme === "dark" ? "#E8EAED" : "#202124";
  const textBody = theme === "dark" ? "#9AA0A6" : "#5F6368";

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: bg, color: textTitle, fontFamily: "'DM Sans', sans-serif",
      padding: "48px 24px"
    }}>
      {/* Google-esque "Logo" / Branding Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, paddingLeft: "10%" }}>
        <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
          <rect x="0" y="0" width="11" height="11" rx="3" fill="#4285F4" />
          <rect x="15" y="0" width="11" height="11" rx="3" fill="#EA4335" />
          <rect x="0" y="15" width="11" height="11" rx="3" fill="#34A853" />
          <rect x="15" y="15" width="11" height="11" rx="3" fill="#FBBC04" />
        </svg>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "1.2px", color: textTitle }}>
          KANBANFLOW
        </span>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%", marginTop: "8vh" }}>
        <h1 style={{ fontSize: 42, fontWeight: 500, marginBottom: 8, fontFamily: "'Product Sans', 'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
          <b>404.</b> <span style={{ color: textBody, fontSize: 32, fontWeight: 400 }}>That's an error.</span>
        </h1>

        <p style={{ color: textBody, fontSize: 16, lineHeight: 1.6, marginBottom: 32, marginTop: 16 }}>
          The requested task or board <code style={{ background: theme === "dark" ? "#303134" : "#F1F3F4", padding: "2px 6px", borderRadius: 4, color: theme === "dark" ? "#F8F9FA" : "#202124", fontSize: 14 }}>{location.pathname}</code> was not found on this server. <br /><br />
          <span style={{ color: textBody, opacity: 0.8 }}>That’s all we know.</span>
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 24px", background: "transparent",
            color: "#4285F4", border: "1px solid #4285F4", borderRadius: 4,
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "all 0.15s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(66, 133, 244, 0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          Return to Board
        </a>
      </div>
    </div>
  );
};

export default NotFound;
