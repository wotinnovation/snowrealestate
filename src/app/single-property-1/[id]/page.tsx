"use client";
import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import SnowNavbar from "../../components/navbar/snow-navbar";
import Footer from "../../components/footer";
import FooterTop from "../../components/footer-top";
import ScrollToTop from "../../components/scroll-to-top";
import { snowProperties, SnowProperty } from "../../data/snow-properties";

/* ─── Mortgage Calculator ───────────────────────────────── */
function MortgageCalc({ price }: { price: number }) {
  const [salePrice, setSalePrice] = useState(String(price));
  const [down, setDown] = useState("20");
  const [term, setTerm] = useState("25");
  const [rate, setRate] = useState("4.5");
  const [monthly, setMonthly] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(salePrice.replace(/,/g, "")) * (1 - parseFloat(down) / 100);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (!P || !r || !n) return;
    const m = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthly(m);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "14px" }}>
        <label style={fieldLabel}>Sale Price (AED)</label>
        <input value={salePrice} onChange={(e) => setSalePrice(e.target.value)} style={inputStyle} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
        <div>
          <label style={fieldLabel}>Down Payment (%)</label>
          <input value={down} onChange={(e) => setDown(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={fieldLabel}>Loan Term (Years)</label>
          <input value={term} onChange={(e) => setTerm(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ marginBottom: "18px" }}>
        <label style={fieldLabel}>Interest Rate (%)</label>
        <input value={rate} onChange={(e) => setRate(e.target.value)} style={inputStyle} />
      </div>
      <button onClick={calculate} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#caab4d,#caab4d)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
        Calculate Monthly Payment
      </button>
      {monthly !== null && (
        <div style={{ marginTop: "16px", background: "rgba(202,171,77,0.08)", border: "1px solid rgba(202,171,77,0.3)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#888", marginBottom: "4px" }}>Estimated Monthly Payment</p>
          <p style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#caab4d" }}>
            AED {Math.round(monthly).toLocaleString()}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#aaa" }}>*Indicative only. Contact your bank for exact terms.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Contact Form ──────────────────────────────────────── */
function ContactAgent({ agent, propertyName }: { agent: SnowProperty["agent"]; propertyName: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `I'm interested in ${propertyName}.` });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent)
    return (
      <div style={{ padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "42px", marginBottom: "12px" }}>✅</div>
        <h6 style={{ fontWeight: 700, color: "#1a1a2e" }}>Message Sent!</h6>
        <p style={{ fontSize: "14px", color: "#888" }}>{agent.name} will contact you shortly.</p>
      </div>
    );

  return (
    <form onSubmit={submit} style={{ padding: "20px 24px" }}>
      {[
        { key: "name", label: "Your Name", type: "text", ph: "John Smith" },
        { key: "email", label: "Email Address", type: "email", ph: "you@email.com" },
        { key: "phone", label: "Phone Number", type: "tel", ph: "+971 50 000 0000" },
      ].map((f) => (
        <div key={f.key} style={{ marginBottom: "14px" }}>
          <label style={fieldLabel}>{f.label}</label>
          <input required type={f.type} placeholder={f.ph} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} />
        </div>
      ))}
      <div style={{ marginBottom: "18px" }}>
        <label style={fieldLabel}>Message</label>
        <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} />
      </div>
      <button type="submit" style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#caab4d,#caab4d)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", letterSpacing: "0.3px" }}>
        Send Message
      </button>
      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <a href={`tel:${agent.phone}`} style={{ flex: 1, padding: "11px", border: "1px solid #e0e0e0", borderRadius: "8px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "#1a1a2e", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <i className="fa-solid fa-phone" style={{ color: "#caab4d", fontSize: "12px" }} />
          Call
        </a>
        <a href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "11px", border: "1px solid #25d366", borderRadius: "8px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "#25d366", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <i className="fa-brands fa-whatsapp" />
          WhatsApp
        </a>
      </div>
    </form>
  );
}

/* ─── Stars ─────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={`fa${i <= n ? "s" : "r"} fa-star`} style={{ color: "#caab4d", fontSize: "11px", marginRight: "1px" }} />
      ))}
    </span>
  );
}

/* ─── Section Block ─────────────────────────────────────── */
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#fff", borderRadius: "14px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", marginBottom: "20px", overflow: "hidden", border: "1px solid #f0f0f0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "18px 24px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: open ? "1px solid #f5f5f5" : "none" }}>
        <h5 style={{ margin: 0, fontWeight: 700, fontSize: "16px", color: "#1a1a2e" }}>{title}</h5>
        <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`} style={{ color: "#caab4d", fontSize: "13px" }} />
      </button>
      {open && <div style={{ padding: "20px 24px" }}>{children}</div>}
    </div>
  );
}

/* ─── Shared styles ─────────────────────────────────────── */
const fieldLabel: React.CSSProperties = { display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", color: "#888", marginBottom: "6px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#1a1a2e", outline: "none", background: "#fafafa", boxSizing: "border-box" };

/* ─── Main Page ─────────────────────────────────────────── */
export default function PropertyDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  const p = snowProperties.find((x) => x.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [saved, setSaved] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!p) return notFound();

  const allImages = [p.image, ...p.gallery];

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveImg((prev) => (prev + 1) % allImages.length);
    } else if (isRightSwipe) {
      setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    }
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev + 1) % allImages.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  return (
    <>
      <SnowNavbar />

      {/* ── Hero Gallery ── */}
      <div style={{ marginTop: "80px", background: "#0a0e1e" }}>
        {/* Main Image */}
        <div 
          style={{ position: "relative", height: "500px", overflow: "hidden", cursor: "zoom-in", touchAction: "pan-y" }} 
          onClick={() => setLightbox(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={allImages[activeImg]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,14,30,0.55) 0%, transparent 60%)" }} />
          
          {/* Slider Arrows */}
          <button 
            onClick={prevImg}
            style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", border: "none", width: "40px", height: "40px", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextImg}
            style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", border: "none", width: "40px", height: "40px", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Badges */}
          <div style={{ position: "absolute", top: "20px", left: "20px", display: "flex", gap: "10px" }}>
            <span style={{ background: p.status === "For Sale" ? "#caab4d" : "#074da3", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>{p.status}</span>
            <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>{p.type}</span>
          </div>
          {/* Photo count */}
          <div style={{ position: "absolute", bottom: "20px", right: "20px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <i className="fa-regular fa-image" /> {allImages.length} Photos
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "6px", padding: "8px 16px", overflowX: "auto", background: "#0a0e1e" }}>
          {allImages.map((img, i) => (
            <div key={i} onClick={() => setActiveImg(i)} style={{ flexShrink: 0, width: "100px", height: "64px", borderRadius: "8px", overflow: "hidden", border: i === activeImg ? "2px solid #caab4d" : "2px solid transparent", cursor: "pointer", opacity: i === activeImg ? 1 : 0.65, transition: "all 0.2s" }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <section className="single-property-wrapper" style={{ background: "#f8f7f4", paddingTop: "36px", paddingBottom: "60px" }}>
        <div className="container">
          <div className="row">
            {/* ── LEFT COLUMN ── */}
            <div className="col-lg-8 col-md-12">

              {/* Title Block */}
              <div style={{ background: "#fff", borderRadius: "14px", padding: "28px 28px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", marginBottom: "20px", border: "1px solid #f0f0f0" }}>
                <div className="sp-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 8px" }}>{p.name}</h1>
                    <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
                      <i className="fa-solid fa-location-dot" style={{ color: "#caab4d", marginRight: "6px" }} />
                      {p.address}
                    </p>
                  </div>
                  <div className="sp-price-col" style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#caab4d" }}>{p.priceLabel}</div>
                    {p.roi && <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>ROI: {p.roi}</div>}
                  </div>
                </div>

                {/* Key Stats */}
                <div style={{ display: "flex", gap: "0", marginTop: "22px", borderTop: "1px solid #f5f5f5", paddingTop: "18px", flexWrap: "wrap" }}>
                  {[
                    { icon: "fa-bed", label: "Bedrooms", val: p.beds },
                    { icon: "fa-bath", label: "Bathrooms", val: p.baths },
                    { icon: "fa-ruler-combined", label: "Area", val: p.sqft },
                    { icon: "fa-car", label: "Parking", val: p.parking },
                    { icon: "fa-couch", label: "Furnished", val: p.furnished.split(" ")[0] },
                    { icon: "fa-building", label: "Floor", val: p.floors },
                  ].map((s) => (
                    <div key={s.label} style={{ flex: "1 1 16%", minWidth: "90px", textAlign: "center", padding: "10px 4px" }}>
                      <i className={`fa-solid ${s.icon}`} style={{ color: "#caab4d", fontSize: "18px", display: "block", marginBottom: "6px" }} />
                      <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e" }}>{s.val}</div>
                      <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                  <button onClick={() => setSaved(!saved)} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px", border: "1px solid #e0e0e0", borderRadius: "8px", background: saved ? "#fff5e6" : "#fff", color: saved ? "#caab4d" : "#555", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
                    <i className={`fa${saved ? "s" : "r"} fa-heart`} style={{ color: saved ? "#caab4d" : "#aaa" }} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", color: "#555", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
                    <i className="fa-solid fa-share-nodes" style={{ color: "#aaa" }} /> Share
                  </button>
                  <Link href={`https://wa.me/${p.agent.phone.replace(/\D/g, "")}`} target="_blank" style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px", border: "1px solid #25d366", borderRadius: "8px", background: "#f0fff5", color: "#25d366", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
                    <i className="fa-brands fa-whatsapp" /> WhatsApp
                  </Link>
                  <a href={`tel:${p.agent.phone}`} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px", background: "linear-gradient(135deg,#caab4d,#caab4d)", borderRadius: "8px", color: "#fff", fontWeight: 600, fontSize: "13px", textDecoration: "none", border: "none" }}>
                    <i className="fa-solid fa-phone" /> {p.agent.phone}
                  </a>
                </div>
              </div>

              {/* Investment Quick Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Property ID", val: `SNOW-00${p.id}` },
                  { label: "Service Charge", val: p.serviceCharge },
                  { label: "Handover", val: p.handoverDate },
                  { label: "Payment Plan", val: p.paymentPlan },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>{s.val}</div>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <Section title="About This Property">
                <p style={{ color: "#555", lineHeight: 1.85, fontSize: "15px", margin: 0 }}>{p.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "20px" }}>
                  {p.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <i className="fa-solid fa-check-circle" style={{ color: "#caab4d", marginTop: "3px", flexShrink: 0 }} />
                      <span style={{ fontSize: "14px", color: "#444" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Features & Details */}
              <Section title="Property Details">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {p.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 12px", background: i % 2 === 0 ? "#fafafa" : "#fff", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}>
                      <span style={{ color: "#888", fontWeight: 500 }}>{f.label}</span>
                      <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Amenities */}
              <Section title="Amenities & Features">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
                  {p.amenities.map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "#fafafa", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                      <i className="fa-solid fa-circle-check" style={{ color: "#caab4d", fontSize: "13px", flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", color: "#444" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Location Map */}
              <Section title="Location & Map">
                <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #f0f0f0" }}>
                  <iframe src={p.mapEmbed} width="100%" height="380" style={{ border: 0 }} loading="lazy" title="Property Location" />
                </div>
                <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#888" }}>
                  <i className="fa-solid fa-location-dot" style={{ color: "#caab4d", marginRight: "6px" }} />
                  {p.address}
                </p>
              </Section>

              {/* Nearby */}
              <Section title="What's Nearby">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  {p.nearby.map((cat) => (
                    <div key={cat.category}>
                      <h6 style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: "12px", fontSize: "14px" }}>
                        {cat.category === "Schools" ? "🏫" : cat.category === "Dining" ? "🍽️" : "🏥"} {cat.category}
                      </h6>
                      {cat.places.map((pl, i) => (
                        <div key={i} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: i < cat.places.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a2e", marginBottom: "3px" }}>{pl.name}</div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "12px", color: "#aaa" }}>{pl.distance}</span>
                            <Stars n={pl.rating} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="col-lg-4 col-md-12">
              <div style={{ position: "sticky", top: "100px" }}>

                {/* Agent Card */}
                <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", marginBottom: "20px", border: "1px solid #f0f0f0" }}>
                  <div style={{ background: "linear-gradient(135deg,#0a0e1e,#1a2040)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
                    <img src={p.agent.photo} alt={p.agent.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "3px solid #caab4d" }} />
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>{p.agent.name}</div>
                      <div style={{ color: "#caab4d", fontSize: "12px", marginTop: "3px" }}>{p.agent.title}</div>
                      <div style={{ color: "#aaa", fontSize: "12px", marginTop: "2px" }}>{p.agent.phone}</div>
                    </div>
                  </div>
                  <ContactAgent agent={p.agent} propertyName={p.name} />
                </div>

                {/* Mortgage Calculator */}
                <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", marginBottom: "20px", border: "1px solid #f0f0f0" }}>
                  <div style={{ background: "linear-gradient(135deg,#0a0e1e,#1a2040)", padding: "18px 24px" }}>
                    <h6 style={{ color: "#fff", margin: 0, fontWeight: 700, fontSize: "15px" }}>
                      <i className="fa-solid fa-calculator" style={{ color: "#caab4d", marginRight: "8px" }} />
                      Mortgage Calculator
                    </h6>
                    <p style={{ color: "#aaa", fontSize: "12px", margin: "4px 0 0" }}>Estimate your monthly payments</p>
                  </div>
                  <MortgageCalc price={p.price} />
                </div>

                {/* Quick Info */}
                <div style={{ background: "linear-gradient(135deg,#caab4d,#caab4d)", borderRadius: "14px", padding: "22px 24px", color: "#fff" }}>
                  <h6 style={{ fontWeight: 700, margin: "0 0 16px", fontSize: "15px" }}>
                    <i className="fa-solid fa-star" style={{ marginRight: "8px" }} />
                    Investment Highlights
                  </h6>
                  {[
                    { icon: "fa-percent", label: "Gross ROI", val: p.roi },
                    { icon: "fa-calendar-check", label: "Handover", val: p.handoverDate },
                    { icon: "fa-file-contract", label: "Payment Plan", val: p.paymentPlan },
                    { icon: "fa-shield-halved", label: "Ownership", val: "Freehold — All Nationalities" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                      <span style={{ fontSize: "13px", opacity: 0.85, display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className={`fa-solid ${s.icon}`} />
                        {s.label}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 700 }}>{s.val}</span>
                    </div>
                  ))}
                  <a href={`tel:${p.agent.phone}`} style={{ display: "block", marginTop: "4px", padding: "12px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", textAlign: "center", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                    Request a Viewing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTop bg="theme-bg" />
      <Footer />
      <ScrollToTop />
    </>
  );
}
