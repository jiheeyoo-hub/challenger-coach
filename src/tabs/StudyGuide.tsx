import { useState } from 'react'

const sections = [
  {
    title: 'Challenger Methodology — The 3 T\'s',
    content: [
      { label: 'Teach', text: 'Deliver commercial insight rationally AND emotionally. Lead TO the solution, not WITH it. 54% of top performers are Challengers vs only 4% Relationship Builders.' },
      { label: 'Tailor', text: 'Customize message using 4 research layers (Industry → Company → Role → Individual). Every interaction should feel built specifically for them.' },
      { label: 'Take Control', text: 'Guide the buying process. Create tension purposefully. Constructive tension = a productive force that compels change. Take Control ≠ dominating — it means guiding, not dictating.' },
    ]
  },
  {
    title: 'Constructive Tension Framework',
    content: [
      { label: '🔵 PASSIVE (No Tension)', text: 'Customer leaning back, one-word answers, no urgency. Fix: Ask ego-centric open-ended questions. Try: "What do you care about most?" or "What have you heard about Amplitude?"' },
      { label: '🟢 CONSTRUCTIVE ← SWEET SPOT', text: 'Customer leaning forward, intrigued, asking questions. Skepticism = gears turning = GREEN FLAG. WE create it. If we don\'t call or email, there\'s no tension. We control the dial.' },
      { label: '🔴 AGGRESSIVE (Too Much)', text: 'Customer defensive, arms crossed, refusing to act. Fix: "It feels like you\'re really passionate about this — what\'s driving that?" Acknowledge, don\'t fight. Breathe through silence.' },
    ]
  },
  {
    title: 'Commercial Teaching — 3 Phases',
    content: [
      { label: 'Phase 1: REFRAME (Why Change?)', text: 'Empathize with current state → "However..." transition → Reveal the gap. Template: "Today, you have... The reality is... Similar companies continue to overlook..." If reframe is wrong: don\'t panic — pivot with an open question.' },
      { label: 'Phase 2: IMPACT — Valley of Despair (Why Now?)', text: 'Intensify rational consequences. Make them feel the cost of staying the same. Tools: Imagery (invoke 5 senses), Analogies ("like shoveling snow with a rake"), Vivid Equivalents. Goal: get buyer "crying" about unsolvable challenges.' },
      { label: 'Phase 3: REVEAL VALUE (Why Us?)', text: 'Show the way out. Customer stories from similar companies, ROI examples, how Amplitude uniquely solves it. Lead TO your strengths — never lead WITH them.' },
    ]
  },
  {
    title: '3 Buyer Personas',
    content: [
      { label: '🟢 MOBILIZER — Invest Here', text: 'Champions change, drives internal consensus. Uses "we" language. Asks tough, probing questions (skepticism = GREEN FLAG). Exists at ALL levels. Activity clues: bringing in legal/IT/finance, building a business case, asking implementation questions.' },
      { label: '🟡 TALKER — Use for Intel Only', text: 'Friendly, approachable, willing to talk — but lacks internal influence. Risk: creates illusion of momentum. Info may flow to competitors. Use talkers for background intel (org dynamics, key players). Never rely on them to move the deal.' },
      { label: '🔴 BLOCKER — Route Around Them', text: 'Protective of status quo, works against your deal. Why they block: past vendor trauma, fear of job threat, ego. Strategy: don\'t argue — reframe. Build broader coalition with mobilizers. Avoid direct confrontation.' },
    ]
  },
  {
    title: 'CEM Stages — S0 to S4',
    content: [
      { label: 'Drop-off reality', text: '35% of deals lost at S1 | 25% at S2 | 18% at S3 | <5% after S3. Nail S0–S3 and you\'re almost home. 78% of losses happen in S1–S3.' },
      { label: 'S0 SDR / S1 Discovery / S2 Qualification', text: 'S0: ICP confirmed, S1 booked. S1: Pain documented, 3 Whys captured, Champion + EB identified, FLM validated. S2: Full MEDDPICC, MAP initiated ($100K+ deals), Value Map initiated.' },
      { label: 'S3 Evaluation / S4 Negotiation', text: 'S3: Eval Plan agreed, Technical Win Plan, BVA delivered, EB engaged. S4: Contract negotiation. 3 Whys required at every stage: Why Amplitude? Why Change? Why Now?' },
    ]
  },
  {
    title: 'Value Map — 4 Columns',
    content: [
      { label: 'The Framework', text: 'Value Driver | Business Objectives | Measures of Success | How Amplitude Helps. A living document — done WITH the customer, not AT them. S2+ timing (too early = no context, too late = decisions made).' },
      { label: 'Example Row (EdTech)', text: 'Retention | Reduce 30-day student churn | Improve D30 retention from 32% to 45% by Q4 | Retention analysis + cohorts for at-risk students + Guides & Surveys for in-product nudges without engineering.' },
      { label: 'Tips', text: 'Show your screen. Let them correct you. It\'s collaborative. Organic — evolves presale → sale → post-sale → renewal → EBR. Not every account: Strat accounts = always, Velocity = pick top ones.' },
    ]
  },
  {
    title: 'Research Framework — 4 Layers',
    content: [
      { label: 'Layer 1: Industry (Macro credibility)', text: 'Biggest positive/negative change right now? Top 3 news stories? How are peers responding? Establishes you as a market expert.' },
      { label: 'Layer 2: Company + Layer 3: Role', text: 'Company: How do they make money? Leadership priorities? Read earnings calls. Role: What do they own and deliver? How are they measured this quarter? Budget authority?' },
      { label: 'Layer 4: Individual — THE DIFFERENTIATOR', text: 'Personal/professional goals (promotion? recognition?). Communication style. Attitude toward Amplitude. "People buy from people they like." This is where YOU add value AI can\'t. JT\'s warning: nobody reads 16 pages of AI output — extract the TLDR and add your soul.' },
    ]
  },
  {
    title: 'Adam\'s Leadership Principles',
    content: [
      { label: 'Be timely, relevant, personal', text: 'NEVER send "just checking in." Every touchpoint must be tailored — a use case, a case study, something specific to their world. Host-based mentality: anticipate needs, find what people like.' },
      { label: 'Valley of Despair + AI', text: 'Get buyers to the point where they\'re "crying" about challenges they cannot solve. If you don\'t have that story, you\'re unlikely to make the sale. "The person who uses AI better will take your job, promotion, paycheck." Use: Glean, Claude, Moda, Granola, Volpia.' },
      { label: 'Know your numbers + Tell good stories', text: 'Not just quota — customer economics, gross margin, pipeline coverage, forecast. People at happy hour gravitate to storytellers. It\'s a practiced skill. 60-second pitch: "We help companies surface behavior to create insights and deliver optimal customer experiences." Then ask questions.' },
    ]
  },
]

export default function StudyGuide() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">cAMP 201 Study Guide</h1>
      <p className="text-gray-500 mb-6">Amplitude GTM — Challenger Sales Methodology</p>
      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-gray-800">{section.title}</span>
              <span className="text-gray-400 ml-4">{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                {section.content.map((item, j) => (
                  <div key={j} className="pt-4">
                    <p className="text-sm font-semibold mb-1" style={{ color: '#5C4EFA' }}>{item.label}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
