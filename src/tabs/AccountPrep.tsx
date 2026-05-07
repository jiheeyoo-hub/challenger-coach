import { useState } from 'react'

type FormData = {
  company: string
  prospect: string
  persona: string
  industry: string
  stack: string
  pain: string
  stage: string
  dealSize: string
}

type Output = {
  insight: string
  valueMap: { driver: string; objective: string; measure: string; howAmplitude: string }
  nextActions: string[]
}

function generateOutput(form: FormData): Output {
  const isEdTech = ['EdTech', 'K-12', 'Higher Ed'].includes(form.industry)
  const isRetention = form.pain.toLowerCase().includes('retain') || form.pain.toLowerCase().includes('churn') || form.pain.toLowerCase().includes('engag')
  const isAcquisition = form.pain.toLowerCase().includes('acqui') || form.pain.toLowerCase().includes('onboard') || form.pain.toLowerCase().includes('enroll') || form.pain.toLowerCase().includes('activ')
  const isS2Plus = ['S2', 'S3'].includes(form.stage)
  const isBlocker = form.persona === 'Blocker'
  const isLargeDeal = ['$100-250K', '$250K+'].includes(form.dealSize)

  let insight = ''
  if (isEdTech && isRetention) {
    insight = `Most ${form.industry} platforms track logins and page views — but those metrics don't tell you WHY students disengage after the first week. However, the platforms winning at scale have discovered that a specific set of in-product behaviors in the first 72 hours predicts 30-day retention with 85%+ accuracy. That speed-to-insight gap is costing ${form.company} student lifetime value you can't see in your current stack.`
  } else if (isEdTech && isAcquisition) {
    insight = `Most ${form.industry} platforms invest heavily in top-of-funnel acquisition — but the drop-off between account creation and first meaningful action is where growth stalls. Similar platforms have found that experimenting on the first 3 onboarding steps delivers 3x more conversion lift than any paid acquisition change. The question isn't how to get more students in — it's how to get them to their first "aha moment" before they churn.`
  } else if (isRetention) {
    insight = `Most companies in your space measure retention as a lagging indicator — monthly cohort reports that arrive too late to act. The companies growing fastest have shifted to leading indicators: specific in-product behaviors that predict retention 2-3 weeks ahead of churn. That gap between when churn happens and when you know about it is where your ARR is quietly leaking.`
  } else {
    insight = `Most companies in your space rely on fragmented data across multiple tools, creating a 48-72 hour lag between user behavior and actionable insight. The companies compounding growth fastest aren't those with the most data — they're the ones who can experiment and act in near real-time. That speed gap is costing ${form.company} conversion and retention you can't currently see.`
  }

  let valueMap = {
    driver: isRetention ? 'Retention' : isAcquisition ? 'Acquisition' : 'Operational Efficiency',
    objective: '',
    measure: '',
    howAmplitude: '',
  }

  if (isEdTech && isRetention) {
    valueMap.objective = 'Identify behavioral signals that predict student drop-off and intervene before churn'
    valueMap.measure = 'Improve D30 retention by 10-15 percentage points within 2 quarters'
    valueMap.howAmplitude = 'Retention analysis + behavioral cohorts for at-risk students + Guides & Surveys for in-product nudges (no engineering required)'
  } else if (isEdTech && isAcquisition) {
    valueMap.objective = 'Reduce drop-off between enrollment and first meaningful learning action'
    valueMap.measure = 'Improve enrollment-to-activation from current rate to 65%+ within Q3'
    valueMap.howAmplitude = 'Funnel analysis on onboarding flow + Experimentation on key drop-off steps + Session Replay to diagnose UX friction'
  } else {
    valueMap.objective = `Address: ${form.pain || 'core product analytics gap'}`
    valueMap.measure = 'Define specific KPI improvement with customer in S2 Value Map session'
    valueMap.howAmplitude = 'Funnel analysis + Experimentation + Behavioral cohorts — to be tailored in discovery'
  }

  const nextActions: string[] = []

  if (form.stage === 'S0' || form.stage === 'S1') {
    nextActions.push(`Open with industry reframe, not a product pitch. Ask: "What does your current stack tell you about ${isRetention ? 'WHY users churn' : 'WHERE users drop off'}?"`)
    nextActions.push('Identify: Is your contact a Mobilizer, Talker, or Blocker? Look for "we" language and tough questions.')
    nextActions.push(`Set CTA: "Can we get 30 minutes with [you + data/product lead] to map your current analytics workflow?"`)
  } else if (isS2Plus && !isBlocker) {
    nextActions.push('Initiate Value Map live on next call — show your screen, let them correct you. Complete at least 1 row together.')
    nextActions.push(isLargeDeal ? 'Initiate MAP now — shared timeline with ownership across both orgs.' : 'Propose a Proof of Value tied to their specific retention/activation KPI.')
    nextActions.push('Identify Economic Buyer — get your Mobilizer to sponsor the EB meeting. Prepare a 3-number ROI story.')
  } else if (isBlocker) {
    nextActions.push('Don\'t engage the Blocker directly on product value — they\'re protecting the status quo.')
    nextActions.push('Build coalition with Mobilizers. Ask your champion: "Who else in the org cares most about solving this?"')
    nextActions.push('Prepare security/compliance docs (use Volpia) to address IT concerns in writing, not in a live call.')
  }

  return { insight, valueMap, nextActions }
}

export default function AccountPrep() {
  const [form, setForm] = useState<FormData>({
    company: '', prospect: '', persona: 'Mobilizer', industry: 'EdTech',
    stack: '', pain: '', stage: 'S1', dealSize: '$50-100K'
  })
  const [output, setOutput] = useState<Output | null>(null)

  function handleChange(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setOutput(null)
  }

  function handleGenerate() {
    setOutput(generateOutput(form))
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-blue-400'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Build Your Commercial Insight</h1>
      <p className="text-gray-500 mb-6">Fill in account details to generate your prep kit</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Company Name</label>
            <input className={inputCls} placeholder="e.g. Duolingo" value={form.company} onChange={e => handleChange('company', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Prospect Name & Title</label>
            <input className={inputCls} placeholder="e.g. Jordan Lee, VP Product" value={form.prospect} onChange={e => handleChange('prospect', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Persona Type</label>
            <select className={inputCls} value={form.persona} onChange={e => handleChange('persona', e.target.value)}>
              <option>Mobilizer</option><option>Talker</option><option>Blocker</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Industry</label>
            <select className={inputCls} value={form.industry} onChange={e => handleChange('industry', e.target.value)}>
              <option>EdTech</option><option>K-12</option><option>Higher Ed</option><option>FinTech</option><option>Healthcare</option><option>E-commerce</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Current Analytics Stack</label>
            <input className={inputCls} placeholder="e.g. Firebase + Tableau" value={form.stack} onChange={e => handleChange('stack', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Biggest Known Pain</label>
            <input className={inputCls} placeholder="e.g. student retention after onboarding" value={form.pain} onChange={e => handleChange('pain', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">CEM Stage</label>
            <select className={inputCls} value={form.stage} onChange={e => handleChange('stage', e.target.value)}>
              <option>S0</option><option>S1</option><option>S2</option><option>S3</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Deal Size Estimate</label>
            <select className={inputCls} value={form.dealSize} onChange={e => handleChange('dealSize', e.target.value)}>
              <option>&lt;$50K</option><option>$50-100K</option><option>$100-250K</option><option>$250K+</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#1C6EE8' }}
        >
          Generate My Prep Kit →
        </button>
      </div>

      {output && (
        <div className="space-y-4">
          {/* Commercial Insight */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: '#5C4EFA' }}>💬 Commercial Insight</p>
            <p className="text-sm text-gray-700 leading-relaxed italic">"{output.insight}"</p>
          </div>

          {/* Value Map */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: '#5C4EFA' }}>📊 Value Map Starter</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                    <th className="text-left pb-2 pr-4">Value Driver</th>
                    <th className="text-left pb-2 pr-4">Business Objective</th>
                    <th className="text-left pb-2 pr-4">Measure of Success</th>
                    <th className="text-left pb-2">How Amplitude Helps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700">
                    <td className="pt-3 pr-4 font-semibold text-blue-700 align-top">{output.valueMap.driver}</td>
                    <td className="pt-3 pr-4 align-top">{output.valueMap.objective}</td>
                    <td className="pt-3 pr-4 align-top">{output.valueMap.measure}</td>
                    <td className="pt-3 align-top">{output.valueMap.howAmplitude}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: '#5C4EFA' }}>⚡ Next Best Actions</p>
            <ul className="space-y-3">
              {output.nextActions.map((action, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="font-bold shrink-0" style={{ color: '#1C6EE8' }}>{i + 1}.</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
