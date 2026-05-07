import { useState } from 'react'

const questions = [
  {
    q: 'Your prospect gives one-word answers and seems disengaged. What tension zone are you in and what\'s your move?',
    options: ['Constructive — keep going, they\'re thinking', 'Passive — ask "What do you care about most?" to re-engage', 'Aggressive — back off and reschedule', 'Constructive — introduce more product features'],
    answer: 1,
    explanation: 'Passive zone = no tension. Best fix is ego-centric open-ended questions that get them talking about themselves.'
  },
  {
    q: 'In the Commercial Teaching flow, where does the "Valley of Despair" live?',
    options: ['Phase 1 — Reframe', 'Phase 3 — Reveal Value', 'Phase 2 — Introduce Impact', 'During the demo'],
    answer: 2,
    explanation: 'Phase 2 is where you intensify the emotional cost of staying the same — make them feel the pain before showing the way out.'
  },
  {
    q: 'A prospect asks 5 tough questions in a row and seems skeptical. This is:',
    options: ['A red flag — they\'re about to walk', 'A blocker emerging', 'A green flag — skepticism means gears are turning', 'Aggressive tension — time to back off'],
    answer: 2,
    explanation: 'Skepticism is the hallmark of a Mobilizer. Tough questions = engaged buyer building internal business case.'
  },
  {
    q: 'You\'re at S2 with a $150K deal. Which tools should be active?',
    options: ['MAP + Value Map', 'POC only', 'Just the demo', 'Contract negotiation'],
    answer: 0,
    explanation: 'S2 requires MEDDPICC validation, MAP initiation ($100K+ deals), and Value Map initiation.'
  },
  {
    q: 'A CFO pushes back: "We already have Google Analytics, why would we pay for Amplitude?" Which tension zone?',
    options: ['Passive', 'Constructive', 'Aggressive', 'None — this is a buying signal'],
    answer: 2,
    explanation: 'CFO defensiveness = aggressive tension. Don\'t fight — acknowledge, reframe: "It sounds like data ROI is really important to you. What would it mean if you could..."'
  },
  {
    q: 'What % of top performers are Challengers?',
    options: ['25%', '37%', '54%', '72%'],
    answer: 2,
    explanation: '54% of top performers are Challengers. Relationship Builders = only 4%.'
  },
  {
    q: 'What is a commercial insight? (select the best answer)',
    options: ['A demo that shows product features', 'A message that makes the customer think differently, drives action, and leads to YOUR solution', 'An ROI calculator', 'A case study from a similar company'],
    answer: 1,
    explanation: 'All 3 criteria required: reframes thinking + drives urgency + leads exclusively to Amplitude.'
  },
  {
    q: 'Your champion says "I love it but need to think about it." What\'s your move?',
    options: ['Send a follow-up email with the deck', 'Schedule a check-in for next week', 'Ask "What specifically would help you think it through? Who else needs to be part of this?"', 'Offer a discount'],
    answer: 2,
    explanation: '"Think about it" = stalled momentum. Use it to uncover blockers, expand the coalition, and set a clear next step tied to their timeline.'
  },
  {
    q: 'Which persona should you invest the most time in?',
    options: ['Talker — they\'re friendly and easy to reach', 'Blocker — convert them first', 'Economic Buyer — they sign the check', 'Mobilizer — they drive internal consensus on your behalf'],
    answer: 3,
    explanation: 'Mobilizers sell Amplitude internally when you\'re not in the room. Talkers create false momentum. Blockers should be routed around, not fought.'
  },
  {
    q: 'When is the BEST time to start a Value Map with a customer?',
    options: ['S0 — as soon as you have an ICP match', 'S1 — during discovery', 'S2+ — after MEDDPICC is validated', 'S4 — during negotiation'],
    answer: 2,
    explanation: 'Too early (S0/S1) and you don\'t have enough context. Too late (S3/S4) and decisions are already made. S2 is the sweet spot.'
  },
]

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [answered, setAnswered] = useState(false)

  const q = questions[current]

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.answer) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
    setAnswered(false)
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '💪' : '📚'}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
        <p className="text-5xl font-bold mb-2" style={{ color: '#1C6EE8' }}>{score}/{questions.length}</p>
        <p className="text-gray-500 mb-8">{pct >= 80 ? 'Challenger ready! 🔥' : pct >= 60 ? 'Good — keep practicing' : 'Review the Study Guide and try again'}</p>
        <button onClick={handleRestart} className="px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: '#1C6EE8' }}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Challenger Knowledge Quiz</h1>
        <span className="text-sm text-gray-500">{current + 1} / {questions.length}</span>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div className="h-2 rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%`, backgroundColor: '#1C6EE8' }} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
        <p className="text-lg font-medium text-gray-900 mb-6">{q.q}</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all '
            if (!answered) {
              cls += 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
            } else if (i === q.answer) {
              cls += 'border-green-500 bg-green-50 text-green-800'
            } else if (i === selected && i !== q.answer) {
              cls += 'border-red-400 bg-red-50 text-red-700'
            } else {
              cls += 'border-gray-200 text-gray-400'
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            )
          })}
        </div>
        {answered && (
          <div className={`mt-4 p-4 rounded-xl text-sm ${selected === q.answer ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <p className="font-semibold mb-1">{selected === q.answer ? '✅ Correct!' : '❌ Not quite.'}</p>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>
      {answered && (
        <button onClick={handleNext} className="w-full py-3 rounded-xl text-white font-medium text-sm" style={{ backgroundColor: '#1C6EE8' }}>
          {current + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
