import { useState } from 'react'
import StudyGuide from './tabs/StudyGuide'
import Quiz from './tabs/Quiz'
import RolePlay from './tabs/RolePlay'
import AccountPrep from './tabs/AccountPrep'

const TABS = ['Study Guide', 'Quiz', 'Role Play', 'Account Prep'] as const
type Tab = typeof TABS[number]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Study Guide')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <span className="font-bold text-lg" style={{ color: '#1C6EE8' }}>
              ⚡ Challenger Coach
            </span>
            <div className="flex gap-1">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  style={activeTab === tab ? { backgroundColor: '#1C6EE8' } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'Study Guide' && <StudyGuide />}
        {activeTab === 'Quiz' && <Quiz />}
        {activeTab === 'Role Play' && <RolePlay />}
        {activeTab === 'Account Prep' && <AccountPrep />}
      </main>
    </div>
  )
}
