import { useState } from 'react'

const scenarios = [
  {
    id: 1,
    label: 'Cold discovery — VP Product (EdTech startup)',
    name: 'Jordan Lee',
    title: 'VP Product, EdTech startup',
    persona: 'MOBILIZER' as const,
    context: 'Jordan reached out through your SDR after seeing an Amplitude webinar. First call. They have 2M MAUs, use Firebase Analytics, growing fast. Engineering team of 8.',
    tension: 'passive' as const,
    tips: [
      'Lead with industry insight: "EdTech platforms growing past 1M MAU hit a data wall with Firebase"',
      'Ask: "What does your current analytics stack tell you about WHY students drop off?"',
      'Do NOT demo yet — this is pure discovery. Set up the next meeting.'
    ]
  },
  {
    id: 2,
    label: 'Objection handling — "We already have Mixpanel"',
    name: 'Priya Nair',
    title: 'Director of Analytics, K-12 platform',
    persona: 'MOBILIZER' as const,
    context: 'Second call. Discovery went well. Now Priya says: "We actually already have Mixpanel — I\'m not sure we need another tool."',
    tension: 'constructive' as const,
    tips: [
      'Don\'t trash Mixpanel — validate: "Mixpanel is great for event tracking..."',
      'Reframe: "Companies your size with Mixpanel typically hit a wall when they need to experiment AND personalize in the same platform"',
      'Ask: "When was the last time you ran an experiment that changed a core onboarding flow?"'
    ]
  },
  {
    id: 3,
    label: 'Blocker encounter — IT Director',
    name: 'Mike Torres',
    title: 'IT Director',
    persona: 'BLOCKER' as const,
    context: 'Mike was just pulled into the deal. He\'s asking about security docs and wants to know why they can\'t just use Tableau.',
    tension: 'aggressive' as const,
    tips: [
      'Acknowledge, don\'t fight: "Totally fair — vendor consolidation is smart IT strategy"',
      'Separate his concerns: security (Volpia/trust center) vs. business value (behavioral analytics ≠ BI)',
      'Route around: "Would it make sense to loop in [VP Product] so they can share the use cases driving this?"'
    ]
  },
  {
    id: 4,
    label: 'Stalled deal — Champion went quiet',
    name: 'Sarah Kim',
    title: 'Director of Product (your champion)',
    persona: 'MOBILIZER' as const,
    context: 'Sarah was excited after the demo. Said she\'d get you in front of the VP. 2 weeks of silence. Your last email got no reply.',
    tension: 'passive' as const,
    tips: [
      'Be timely, relevant, personal — NEVER "just checking in"',
      'Try: "Sarah — saw [EdTech company] just announced [news]. Thought of your student activation challenge immediately."',
      'If still no reply: ask SDR to try different channel, or find another contact in the org'
    ]
  },
  {
    id: 5,
    label: 'Executive meeting — CFO asking for ROI',
    name: 'David Park',
    title: 'CFO',
    persona: 'BLOCKER' as const,
    context: 'Your champion invited you to present to the CFO. David controls the budget and is skeptical of analytics spend.',
    tension: 'aggressive' as const,
    tips: [
      'Lead with numbers: "Companies in EdTech see Y% retention improvement, which at your scale = $Z in reduced churn"',
      'Valley of Despair: "What does a 1% improvement in D30 retention mean to your ARR?"',
      'Come with a tight ROI story — 3 numbers max. No feature walkthrough.'
    ]
  },
]

const personaColor: Record<string, string> = {
  MOBILIZER: 'bg-green-100 text-green-800',
  TALKER: 'bg-yellow-100 text-yellow-800',
  BLOCKER: 'bg-red-100 text-red-800',
}

const tensionConfig = {
  passive: { label: 'PASSIVE', pos: 0, bar: 'bg-gray-300', text: 'text-gray-600' },
  constructive: { label: 'CONSTRUCTIVE', pos: 50, bar: 'bg-green-400', text: 'text-green-700' },
  aggressive: { label: 'AGGRESSIVE', pos: 100, bar: 'bg-red-400', text: 'text-red-700' },
}

export default function RolePlay() {
  const [scenarioId, setScenarioId] = useState(1)
  const [response, setResponse] = useState('')

  const scenario = scenarios.find(s => s.id === scenarioId)!
  const tension = tensionConfig[scenario.tension]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Challenger Simulation</h1>
      <p className="text-gray-500 mb-6">Pick a scenario and practice your response</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Scenario</label>
        <select
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#1C6EE8' } as React.CSSProperties}
          value={scenarioId}
          onChange={e => { setScenarioId(Number(e.target.value)); setResponse('') }}
        >
          {scenarios.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Who */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Who You're Talking To</p>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold text-gray-900">{scenario.name}</p>
              <p className="text-sm text-gray-500">{scenario.title}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${personaColor[scenario.persona]}`}>{scenario.persona}</span>
          </div>
        </div>

        {/* Tension */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Tension Meter</p>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Passive</span><span>Constructive</span><span>Aggressive</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2 relative">
            <div className={`h-3 rounded-full ${tension.bar}`} style={{ width: `${tension.pos === 0 ? 15 : tension.pos === 50 ? 55 : 100}%` }} />
          </div>
          <p className={`text-xs font-bold ${tension.text}`}>{tension.label}</p>
        </div>
      </div>

      {/* Context */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Situation</p>
        <p className="text-sm text-gray-700 leading-relaxed">{scenario.context}</p>
      </div>

      {/* Your response */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Your Move</p>
        <textarea
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-blue-400 min-h-[100px]"
          placeholder="What would you say or do? Type your response here..."
          value={response}
          onChange={e => setResponse(e.target.value)}
        />
      </div>

      {/* Coaching Tips */}
      <div className="rounded-xl p-5 border" style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: '#1C6EE8' }}>💡 COACHING TIPS</p>
        <ul className="space-y-2">
          {scenario.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: '#1e40af' }}>
              <span className="font-bold shrink-0">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
