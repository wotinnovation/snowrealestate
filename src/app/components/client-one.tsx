"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { clientData } from "../data/data";

interface Client {
  image: string;
  quote: string;
  desc: string;
  name: string;
  position: string;
}

export default function ClientOne() {
  const items: Client[] = clientData as Client[];
  const total = items.length;

  /* How many cards are visible depends on viewport — we track via state */
  const [visible, setVisible] = useState(3);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /* Recalculate visible count on resize */
  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 768) setVisible(1);
      else if (window.innerWidth < 992) setVisible(2);
      else setVisible(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = total - visible;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return 0;
        return next;
      });
      setTimeout(() => setIsAnimating(false), 450);
    },
    [isAnimating, maxIndex]
  );

  /* Auto-play */
  useEffect(() => {
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [go]);

  const cardWidth = 100 / visible; // percent per card

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12 col-md-12">
        <div
          style={{ position: "relative", overflow: "hidden", padding: "0 0 56px" }}
          className="smart-textimonials smart-center"
          id="smart-textimonials"
        >
          {/* Track */}
          <div
            style={{
              display: "flex",
              transition: isAnimating ? "transform 0.42s cubic-bezier(.4,0,.2,1)" : "none",
              transform: `translateX(-${current * cardWidth}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  minWidth: `${cardWidth}%`,
                  padding: "0 12px",
                  boxSizing: "border-box",
                }}
              >
                <div className="item-box">
                  <div className="smart-tes-author">
                    <div className="st-author-box">
                      <div className="st-author-thumb">
                        <div className={`quotes ${item.quote}`}>
                          <i className="fa-solid fa-quote-left"></i>
                        </div>
                        <Image
                          src={item.image}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          className="img-fluid"
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="smart-tes-content">
                    <p>{item.desc}</p>
                  </div>
                  <div className="st-author-info">
                    <h4 className="st-author-title">{item.name}</h4>
                    <span className="st-author-subtitle">{item.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-45px)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #d0d5dd",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#555",
              zIndex: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,.10)",
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(5px)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #d0d5dd",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#555",
              zIndex: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,.10)",
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
