import { MotionSection } from "./MotionSection";

const steps = [
  { title: "Pick your stops", text: "Choose from the photos, or ask me for ideas." },
  { title: "Agree on the ride", text: "Confirm pickup, waiting, the ride back and price." },
  { title: "Meet me", text: "I'll meet you at the agreed place and time." },
];

export function HowItWorks() {
  return <MotionSection cinema className="how-section section-space" label="How to arrange your ride"><div className="container-page"><div className="section-heading" data-reveal="heading"><h2 className="type-display">Easy to <em>arrange.</em></h2></div><ol className="how-grid">{steps.map((step, index) => <li data-reveal={step.title} key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></MotionSection>;
}
