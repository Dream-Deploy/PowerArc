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
    <div className="page-shell">
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />
      <header className="hero">
        <p className="eyebrow">Dubai-Based MultiTrade Network</p>
        <h1>General multi-trade intelligence with direct owner inquiry flow.</h1>
        <p>
          A futuristic B2B portal connecting buyers to consignments in clothes, medical equipment,
          and electronic devices across Dubai.
        </p>
        <div className="hero-stats">
          <article>
            <strong>03</strong>
            <span>Core sectors</span>
          </article>
          <article>
            <strong>24/7</strong>
            <span>Inquiry intake</span>
          </article>
          <article>
            <strong>UAE</strong>
            <span>Dubai focused</span>
          </article>
        </div>
      </header>

      <main className="content-grid">
        <section className="card consignments-card">
          <h2>Live Consignments</h2>
          <p className="card-subtitle">Dynamic content served by Spring Boot API</p>
          {loading ? (
            <p className="info">Loading consignments...</p>
          ) : (
            <div className="consignment-list">
              {consignments.map((item) => (
                <article
                  key={item.id}
                  className={`consignment-item ${item.id === form.consignmentId ? "active" : ""}`}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="meta-row">
                    <span>{item.category}</span>
                    <span>Owner: {item.ownerName}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="card form-card">
          <h2>Send Inquiry</h2>
          <p className="card-subtitle">
            Customer details are emailed directly to the selected consignment owner.
          </p>

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
                placeholder="Mention quantity, destination port, and required delivery window."
              />
            </label>

            <button type="submit" disabled={submitting || loading}>
              {submitting ? "Sending..." : "Send to Consignment Owner"}
            </button>

            {status.message && (
              <p className={`status ${status.type === "success" ? "status-success" : "status-error"}`}>
                {status.message}
              </p>
            )}
          </form>
        </section>
      </main>

      <section className="value-strip">
        <article>
          <h3>Why Businesses Use This Portal</h3>
          <p>
            Centralized visibility for diversified consignments with faster owner communication.
          </p>
        </article>
        <article>
          <h3>Verified Trade Focus</h3>
          <p>Designed for Dubai market operations, GCC-oriented sourcing, and B2B clarity.</p>
        </article>
        <article>
          <h3>Decision-Ready Data</h3>
          <p>Each listing includes sector context and direct ownership routing in one flow.</p>
        </article>
      </section>

      <section className="process-strip">
        <h2>How Inquiry Routing Works</h2>
        <div className="process-steps">
          <article>
            <span>01</span>
            <p>Browse live consignments</p>
          </article>
          <article>
            <span>02</span>
            <p>Submit company requirement</p>
          </article>
          <article>
            <span>03</span>
            <p>Backend validates request</p>
          </article>
          <article>
            <span>04</span>
            <p>Email sent to owner directly</p>
          </article>
        </div>
      </section>

      <section className="contact-strip">
        <article>
          <h3>Head Office</h3>
          <p>Dubai Investment Park, United Arab Emirates</p>
        </article>
        <article>
          <h3>Email</h3>
          <p>sales@dubaimultitrade.com</p>
        </article>
        <article>
          <h3>Phone</h3>
          <p>+971 50 000 0000</p>
        </article>
      </section>
    </div>
  );
}

export default App;
