"use client";
import React from "react";
import Link from "next/link";

const contactItems = [
  {
    icon: "fa-solid fa-location-dot",
    label: "Our Office",
    value: "Office 715, 7th Floor, IT Plaza,\nDubai Silicon Oasis, Dubai, UAE",
    color: "#caab4d",
    href: "https://maps.google.com/?q=Dubai+Silicon+Oasis+IT+Plaza",
  },
  {
    icon: "fa-solid fa-phone",
    label: "Phone",
    value: "+971 4 557 2500",
    color: "#074da3",
    href: "tel:+97145572500",
  },
  {
    icon: "fa-brands fa-instagram",
    label: "Instagram",
    value: "@snow.real.estate",
    color: "#e1306c",
    href: "https://www.instagram.com/snow.real.estate",
  },
  {
    icon: "fa-solid fa-envelope",
    label: "General Inquiries",
    value: "Send us a DM or\nvisit our office",
    color: "#009868",
    href: "#",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];
export default function ContactSnow() {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const api_url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3201/gql").replace("/gql", "/api/contact/submit");
      const res = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", text: "Thank you! Your message has been sent successfully." });
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", text: data.error || "Failed to send message. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "A network error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-us"
      style={{ background: "#f7f8fc", padding: "96px 0" }}
    >
      <div className="container">
        {/* ── Section Header ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 text-center">
            <span
              style={{
                display: "inline-block",
                background: "rgba(202,171,77,0.1)",
                color: "#caab4d",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "6px 20px",
                borderRadius: "30px",
                border: "1px solid rgba(202,171,77,0.25)",
                marginBottom: "20px",
              }}
            >
              Get In Touch
            </span>
            <h2
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                fontWeight: 800,
                color: "#1a1a2e",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              We&apos;re Here to Help You
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.8 }}>
              Whether you are looking to invest, buy, or manage a property, our team at Dubai Silicon Oasis is ready to assist you every step of the way.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* ── Left: Contact Cards ── */}
          <div className="col-lg-5">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {contactItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "18px",
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "14px",
                    padding: "22px 24px",
                    textDecoration: "none",
                    transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#eee";
                  }}
                >
                  <div
                    style={{
                      minWidth: "48px",
                      height: "48px",
                      background: `${item.color}15`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={item.icon} style={{ color: item.color, fontSize: "20px" }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {item.value}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Business Hours */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "14px",
                padding: "24px",
                marginTop: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <h6 style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-clock" style={{ color: "#caab4d" }}></i>
                Business Hours
              </h6>
              {hours.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: i < hours.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#555", fontWeight: 500 }}>{h.day}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: h.time === "Closed" ? "#a70a29" : "#009868",
                    }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Inquiry Form ── */}
          <div className="col-lg-7">
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "18px",
                padding: "40px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                height: "100%",
              }}
            >
              <h4 style={{ fontWeight: 800, color: "#1a1a2e", marginBottom: "8px", fontSize: "22px" }}>
                Send Us a Message
              </h4>
              <p style={{ color: "#888", fontSize: "14px", marginBottom: "30px" }}>
                Fill out the form below and one of our specialists will get back to you within 24 hours.
              </p>

              {status && (
                <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} mb-4`} role="alert">
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={labelStyle}>Full Name</label>
                    <input required type="text" placeholder="Your full name" style={inputStyle}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label style={labelStyle}>Phone Number</label>
                    <input required type="tel" placeholder="+971 XX XXX XXXX" style={inputStyle}
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label style={labelStyle}>Email Address</label>
                    <input required type="email" placeholder="your@email.com" style={inputStyle}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label style={labelStyle}>Inquiry Type</label>
                    <select required style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                      <option value="">Select type</option>
                      <option value="Buy a Property">Buy a Property</option>
                      <option value="Rent a Property">Rent a Property</option>
                      <option value="Investment Consultation">Investment Consultation</option>
                      <option value="Off-Plan Projects">Off-Plan Projects</option>
                      <option value="Property Management">Property Management</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label style={labelStyle}>Message</label>
                    <textarea
                      required
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      style={{ ...inputStyle, height: "auto", resize: "none" }}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "15px",
                        background: loading ? "#ccc" : "linear-gradient(135deg, #caab4d, #caab4d)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: loading ? "not-allowed" : "pointer",
                        letterSpacing: "0.4px",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => !loading && ((e.target as HTMLElement).style.opacity = "0.88")}
                      onMouseLeave={(e) => !loading && ((e.target as HTMLElement).style.opacity = "1")}
                    >
                      {loading ? "Sending..." : "Send Inquiry"}
                      {!loading && <i className="fa-solid fa-paper-plane ms-2"></i>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── Map Embed Banner ── */}
        <div
          style={{
            marginTop: "40px",
            borderRadius: "16px",
            overflow: "hidden",
            height: "280px",
            border: "1px solid #eee",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.6!2d55.3740!3d25.1175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61a7a1111111%3A0x0!2sDubai+Silicon+Oasis!5e0!3m2!1sen!2sae!4v1714567890123!5m2!1sen!2sae"
            width="100%"
            height="280"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Snow Real Estate Office Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#555",
  marginBottom: "6px",
  letterSpacing: "0.3px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #e8e8ec",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#333",
  outline: "none",
  background: "#fafafa",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};
