import { useEffect, useMemo, useState } from "react";
import { fetchConsignments, submitInquiry } from "./api";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  consignmentId: "",
  message: ""
};

const WHOLESALE_PILLARS = [
  {
    title: "Division-Based Inventory",
    summary: "Stock is zoned by category so buyers can source complete mixes in one request.",
    points: [
      "Fast product discovery by division",
      "Consistent SKU labeling and carton mapping",
      "Lower picking errors for mixed orders"
    ]
  },
  {
    title: "Wholesale Pricing Tiers",
    summary: "Flexible rates for resellers, distributors, and retail chain replenishment.",
    points: [
      "MOQ aligned to carton and pallet levels",
      "Tiered pricing by volume brackets",
      "Repeat-order incentives for active accounts"
    ]
  },
  {
    title: "Warehouse Dispatch Workflow",
    summary: "Rapid handling from stock confirmation to shipment release.",
    points: [
      "Daily pick-pack windows",
      "Batch-level quality checks before dispatch",
      "Regional and export-ready handover"
    ]
  },
  {
    title: "Account-Managed Sourcing",
    summary: "Dedicated managers route each inquiry to the right inventory owner.",
    points: [
      "Single contact for each category portfolio",
      "Restock alerts and lead-time visibility",
      "Faster quote turnaround for bulk requests"
    ]
  }
];

const PRODUCT_DIVISIONS = [
  {
    name: "Power Tools",
    detail:
      "High-turnover tools for hardware chains and reseller channels with dependable replenishment.",
    subdivisions: [
      "Drills and Drivers",
      "Grinders and Sanders",
      "Cutting and Sawing",
      "Industrial Batteries and Chargers"
    ]
  },
  {
    name: "Electronics",
    detail:
      "Consumer and utility electronics curated for volume buyers and regional distributors.",
    subdivisions: [
      "Smart Home Devices",
      "Audio and Entertainment",
      "Power and Charging",
      "Small Home Appliances"
    ]
  },
  {
    name: "Gadgets",
    detail:
      "Fast-moving accessories and trend products ideal for ecommerce storefront rotation.",
    subdivisions: [
      "Wearables",
      "Mobile Accessories",
      "Desk and Travel Tech",
      "Gaming Add-ons"
    ]
  },
  {
    name: "Clothes",
    detail:
      "Wholesale apparel lines prepared for mixed-size packs and seasonal inventory planning.",
    subdivisions: ["Menswear Basics", "Womenswear Essentials", "Kidswear Packs", "Athleisure Sets"]
  },
  {
    name: "Medical Equipment",
    detail:
      "Certified medical products and clinic-ready units supported by compliance documents.",
    subdivisions: [
      "Diagnostic Devices",
      "Patient Monitoring",
      "Mobility and Support",
      "PPE and Clinical Consumables"
    ]
  }
];

const WHOLESALE_PROGRAMS = [
  {
    name: "Pallet Program",
    detail: "Best for importers and regional distributors running predictable monthly volume."
  },
  {
    name: "Mixed-Carton Program",
    detail: "Blend multiple subdivisions in one order for agile ecommerce restocking."
  },
  {
    name: "Scheduled Replenishment",
    detail: "Set reorder cadence by division to stabilize stock and reduce rush procurement."
  },
  {
    name: "Private Label Support",
    detail: "Apply your brand package standards across selected fast-moving product lines."
  },
  {
    name: "Export Documentation",
    detail: "Commercial paperwork and packing details aligned for cross-border dispatch."
  },
  {
    name: "B2B Account Desk",
    detail: "Dedicated support team for quotes, substitutions, and portfolio expansion."
  }
];

const PROOF_POINTS = [
  { label: "Active Divisions", value: "5" },
  { label: "Subdivisions", value: "20+" },
  { label: "Order Model", value: "Wholesale B2B" },
  { label: "Inquiry SLA", value: "Within 24h" }
];

function App() {
  const [consignments, setConsignments] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    let isMounted = true;

    fetchConsignments()
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setConsignments(data);
        if (data.length > 0) {
          setForm((current) => ({ ...current, consignmentId: String(data[0].id) }));
        }
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        setStatus({ type: "error", message: error.message });
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedConsignment = useMemo(
    () => consignments.find((item) => String(item.id) === String(form.consignmentId)),
    [consignments, form.consignmentId]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedConsignment) {
      setStatus({ type: "error", message: "Please select a valid consignment." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await submitInquiry({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: form.message,
        consignmentId: selectedConsignment.id
      });

      setStatus({
        type: "success",
        message: "Inquiry submitted. The assigned account manager has received your request."
      });
      setForm((current) => ({
        ...INITIAL_FORM,
        consignmentId: current.consignmentId
      }));
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-name">PowerArc Wholesale</p>
            <p className="brand-subtitle">Warehouse And Ecommerce Supply</p>
          </div>
        </div>

        <nav className="top-nav" aria-label="Primary">
          <a href="#divisions">Divisions</a>
          <a href="#wholesale">Wholesale Model</a>
          <a href="#inquiry">Inquiry</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="top-cta" href="#inquiry">
          Request Pricing
        </a>
      </header>

      <main>
        <section className="hero reveal reveal-1">
          <div className="hero-copy">
            <p className="eyebrow">Warehouse And Ecommerce Supply</p>
            <h1>Wholesale Divisions Built For Fast Business Replenishment.</h1>
            <p className="hero-lead">
              PowerArc now operates as a category-first wholesale warehouse. Source power tools,
              electronics, gadgets, clothes, and medical equipment through one inquiry flow and
              scale from carton orders to pallet volumes.
            </p>
            <div className="hero-tags">
              {PRODUCT_DIVISIONS.map((division) => (
                <span key={division.name}>{division.name}</span>
              ))}
            </div>
          </div>

          <aside className="hero-summary" aria-label="Delivery snapshot">
            <h2>Wholesale Snapshot</h2>
            <ul>
              {PROOF_POINTS.map((point) => (
                <li key={point.label}>
                  <span>{point.label}</span>
                  <strong>{point.value}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="section-block reveal reveal-2" id="divisions">
          <div className="section-heading">
            <p className="eyebrow">Product Divisions</p>
            <h2>Five Divisions With Deep Subdivision Coverage.</h2>
            <p className="section-intro">
              Each division is structured for wholesale purchasing, allowing you to source
              specific subdivisions or build mixed orders across categories.
            </p>
          </div>
          <div className="division-grid">
            {PRODUCT_DIVISIONS.map((division) => (
              <article key={division.name} className="division-card">
                <h3>{division.name}</h3>
                <p>{division.detail}</p>
                <ul>
                  {division.subdivisions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-soft reveal reveal-3" id="wholesale">
          <div className="section-heading">
            <p className="eyebrow">Wholesale Operating Model</p>
            <h2>Built For B2B Buyers, Ecommerce Teams, And Distributors.</h2>
            <p className="section-intro">
              We focus on stock visibility, fulfillment speed, and account-managed sourcing so
              your purchase cycle stays predictable as demand grows.
            </p>
          </div>
          <div className="pillar-grid">
            {WHOLESALE_PILLARS.map((pillar) => (
              <article key={pillar.title} className="pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.summary}</p>
                <ul>
                  {pillar.points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block reveal reveal-4">
          <div className="section-heading">
            <p className="eyebrow">Wholesale Programs</p>
            <h2>Choose The Purchase Program That Matches Your Volume.</h2>
          </div>
          <div className="program-grid">
            {WHOLESALE_PROGRAMS.map((program) => (
              <article key={program.name} className="program-card">
                <span className="program-badge">B2B Program</span>
                <h3>{program.name}</h3>
                <p>{program.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="highlight-strip reveal reveal-5">
          <div className="highlight-copy">
            <p className="eyebrow">Category-Mix Ordering</p>
            <h2>Source Across Divisions In One Cycle.</h2>
            <p>
              Need power tools, gadgets, and medical equipment in the same replenishment run?
              We route mixed inquiries to the right inventory owners and return one coordinated
              response.
            </p>
            <a className="text-link" href="#inquiry">
              Send your wholesale requirement
            </a>
          </div>
          <div className="highlight-panel">
            <p>
              Portfolio-driven sourcing keeps your catalog active while reducing supplier
              fragmentation and quote delays.
            </p>
          </div>
        </section>

        <section className="inquiry-block reveal reveal-6" id="inquiry">
          <div className="section-heading">
            <p className="eyebrow">Wholesale Inquiry</p>
            <h2>Tell Us What You Need And We Route It To The Right Account Manager.</h2>
            <p className="section-intro">
              This form still uses your Spring Boot API and sends your request to the selected
              listing owner.
            </p>
          </div>

          <div className="inquiry-grid">
            <article className="panel">
              <div className="panel-head">
                <h3>Live Wholesale Listings</h3>
                {!loading && <span>{consignments.length} Listings</span>}
              </div>

              {loading ? (
                <p className="info">Loading consignments...</p>
              ) : consignments.length === 0 ? (
                <p className="info">No listings available right now.</p>
              ) : (
                <div className="consignment-list">
                  {consignments.map((item) => {
                    const isActive = String(item.id) === String(form.consignmentId);
                    return (
                      <article
                        key={item.id}
                        className={`consignment-card ${isActive ? "active" : ""}`}
                      >
                        <p className="consignment-tag">{item.category}</p>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <button
                          type="button"
                          className="text-button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              consignmentId: String(item.id)
                            }))
                          }
                        >
                          {isActive ? "Selected" : "Select this consignment"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}

              {selectedConsignment && (
                <p className="selected-owner">
                  Assigned account manager: <strong>{selectedConsignment.ownerName}</strong>
                </p>
              )}
            </article>

            <article className="panel">
              <h3>Send Inquiry</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Akin Yusuf"
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="buyer@storefront.com"
                  />
                </label>

                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 202 555 0141"
                  />
                </label>

                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    placeholder="Northline Commerce"
                  />
                </label>

                <label>
                  Choose Listing
                  <select
                    name="consignmentId"
                    value={form.consignmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select listing
                    </option>
                    {consignments.map((item) => (
                      <option key={item.id} value={String(item.id)}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Requirement Details
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Mention quantities, destination, and preferred shipment window."
                  />
                </label>

                <button type="submit" disabled={submitting || loading}>
                  {submitting ? "Sending..." : "Send Wholesale Inquiry"}
                </button>

                {status.message && (
                  <p
                    className={`status ${
                      status.type === "success" ? "status-success" : "status-error"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer reveal reveal-7" id="contact">
        <div>
          <p className="footer-title">PowerArc Warehouse And Ecommerce</p>
          <p className="footer-copy">
            Product divisions include power tools, electronics, gadgets, clothes, and medical
            equipment for wholesale purchasing.
          </p>
        </div>
        <div className="footer-contact">
          <p>Global Warehouse Desk</p>
          <p>wholesale@powerarc.com</p>
          <p>+1 202 555 0108</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
