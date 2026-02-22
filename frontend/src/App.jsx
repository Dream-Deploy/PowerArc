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

const DELIVERY_PILLARS = [
  {
    title: "Self-Performing Trade Teams",
    summary: "Tighter quality control and cleaner communication from kickoff to closeout.",
    points: [
      "Dedicated scope leaders per discipline",
      "Field crews aligned to one schedule",
      "Consistent standards across all trades"
    ]
  },
  {
    title: "Lean Prefabrication Workflow",
    summary: "Build more in controlled environments and install faster on-site.",
    points: [
      "Fabrication-ready model coordination",
      "Reduced field congestion and rework",
      "Predictable sequencing at turnover"
    ]
  },
  {
    title: "Real-Time Project Visibility",
    summary: "Track milestones and decisions across design, procurement, and execution.",
    points: [
      "Milestone-driven planning cadence",
      "Transparent issue ownership",
      "Faster response to trade conflicts"
    ]
  },
  {
    title: "Safety And Accountability",
    summary: "One integrated partner accountable for safe, high-performance delivery.",
    points: [
      "Unified site safety planning",
      "Clear escalation channels",
      "Measured performance reporting"
    ]
  }
];

const TRADE_AREAS = [
  {
    name: "Electrical",
    detail: "Power distribution, lighting controls, and mission-critical electrical infrastructure."
  },
  {
    name: "Mechanical",
    detail: "HVAC, hydronic, and process systems coordinated with constructability in mind."
  },
  {
    name: "Plumbing",
    detail: "Domestic water, drainage, and specialty systems integrated into one field plan."
  },
  {
    name: "Technology",
    detail: "Structured cabling and low-voltage pathways designed for long-term adaptability."
  },
  {
    name: "Virtual Design",
    detail: "Clash detection, model federation, and phased installation simulations."
  },
  {
    name: "Commissioning Support",
    detail: "Startup planning and validation aligned with owner turnover goals."
  }
];

const PROOF_POINTS = [
  { label: "Delivery Model", value: "Multi-Trade" },
  { label: "Coverage", value: "Design To Build" },
  { label: "Coordination", value: "Single Team" },
  { label: "Inquiry Intake", value: "24 / 7" }
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
          setForm((current) => ({ ...current, consignmentId: data[0].id }));
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
    () => consignments.find((item) => item.id === form.consignmentId),
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
        consignmentId: form.consignmentId
      });

      setStatus({
        type: "success",
        message: "Inquiry submitted. The consignment owner has received your email."
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
            <p className="brand-name">PowerArc Construction</p>
            <p className="brand-subtitle">Integrated Multi-Trade Delivery</p>
          </div>
        </div>

        <nav className="top-nav" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#inquiry">Inquiry</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="top-cta" href="#inquiry">
          Start Project
        </a>
      </header>

      <main>
        <section className="hero reveal reveal-1">
          <div className="hero-copy">
            <p className="eyebrow">Integrated Solutions Across Trades</p>
            <h1>Multi-Trade Construction Built For Complex Projects.</h1>
            <p className="hero-lead">
              From preconstruction planning to final commissioning, PowerArc delivers
              coordinated electrical, mechanical, plumbing, and technology scope through one
              accountable team.
            </p>
            <div className="hero-tags">
              <span>Electrical</span>
              <span>Mechanical</span>
              <span>Plumbing</span>
              <span>Technology</span>
              <span>VDC</span>
              <span>Commissioning</span>
            </div>
          </div>

          <aside className="hero-summary" aria-label="Delivery snapshot">
            <h2>Project Delivery Snapshot</h2>
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

        <section className="section-block reveal reveal-2" id="services">
          <div className="section-heading">
            <p className="eyebrow">Multi-Trade Contracting Delivers</p>
            <h2>One Partner, Coordinated Scope, Better Outcomes.</h2>
            <p className="section-intro">
              This layout follows the same storytelling pattern as the reference site while
              keeping your product flow and backend integrations intact.
            </p>
          </div>
          <div className="pillar-grid">
            {DELIVERY_PILLARS.map((pillar) => (
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

        <section className="section-block section-soft reveal reveal-3" id="approach">
          <div className="section-heading">
            <p className="eyebrow">Our Approach</p>
            <h2>Integrated Planning, Trade Expertise, Field Precision.</h2>
            <p className="section-intro">
              We coordinate labor, fabrication, and installation as one delivery system so each
              trade contributes to the same schedule and quality target.
            </p>
          </div>
          <div className="trade-grid">
            {TRADE_AREAS.map((trade) => (
              <article key={trade.name} className="trade-card">
                <span className="trade-badge">Trade Focus</span>
                <h3>{trade.name}</h3>
                <p>{trade.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="highlight-strip reveal reveal-4">
          <div className="highlight-copy">
            <p className="eyebrow">Virtual Design And Construction</p>
            <h2>Coordinate Before You Build.</h2>
            <p>
              Our pre-installation coordination process aligns trades early, reduces rework,
              and improves productivity in the field.
            </p>
            <a className="text-link" href="#inquiry">
              Review your project requirements
            </a>
          </div>
          <div className="highlight-panel">
            <p>
              Cross-trade model coordination and prefabrication planning convert complex scope
              into repeatable execution packages.
            </p>
          </div>
        </section>

        <section className="inquiry-block reveal reveal-5" id="inquiry">
          <div className="section-heading">
            <p className="eyebrow">Project Inquiry</p>
            <h2>Tell Us Your Requirement And We Route It To The Right Owner.</h2>
            <p className="section-intro">
              This form still uses your Spring Boot API and sends contact details directly to
              the selected consignment owner.
            </p>
          </div>

          <div className="inquiry-grid">
            <article className="panel">
              <div className="panel-head">
                <h3>Live Consignments</h3>
                {!loading && <span>{consignments.length} Listings</span>}
              </div>

              {loading ? (
                <p className="info">Loading consignments...</p>
              ) : consignments.length === 0 ? (
                <p className="info">No consignments available right now.</p>
              ) : (
                <div className="consignment-list">
                  {consignments.map((item) => {
                    const isActive = item.id === form.consignmentId;
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
                              consignmentId: item.id
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
                  Assigned owner: <strong>{selectedConsignment.ownerName}</strong>
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
                    placeholder="Ameer Khan"
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
                    placeholder="ameer@company.com"
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
                    placeholder="+971 50 123 4567"
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
                    placeholder="Desert Horizon Trading"
                  />
                </label>

                <label>
                  Choose Consignment
                  <select
                    name="consignmentId"
                    value={form.consignmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select consignment
                    </option>
                    {consignments.map((item) => (
                      <option key={item.id} value={item.id}>
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
                    placeholder="Mention quantity, destination, and required delivery window."
                  />
                </label>

                <button type="submit" disabled={submitting || loading}>
                  {submitting ? "Sending..." : "Send To Consignment Owner"}
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

      <footer className="site-footer reveal reveal-6" id="contact">
        <div>
          <p className="footer-title">PowerArc Multi-Trade Frontend</p>
          <p className="footer-copy">
            Frontend refreshed to mirror the reference style while preserving your existing
            consignment inquiry workflow.
          </p>
        </div>
        <div className="footer-contact">
          <p>Dubai Investment Park, United Arab Emirates</p>
          <p>sales@powerarc.ae</p>
          <p>+971 50 000 0000</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
