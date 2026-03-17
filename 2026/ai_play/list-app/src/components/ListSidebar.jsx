import { useState } from 'react'

const LIST_COLORS = [
  '#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c',
  '#4dabf7', '#da77f2', '#f783ac', '#63e6be',
]

export function getListColor(id) {
  // Deterministic color from id
  let hash = 0
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff
  return LIST_COLORS[hash % LIST_COLORS.length]
}

export default function ListSidebar({ lists, activeId, onSelect, onCreate, onDelete }) {
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('todo')

  function handleCreate(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    onCreate(name, newType)
    setNewName('')
    setNewType('todo')
    setShowForm(false)
  }

  return (
    <aside
      className="w-72 flex flex-col h-full shrink-0"
      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.25)' }}
    >
      {/* Header */}
      <div className="px-5 py-5">
        <h1 className="text-2xl font-black text-white tracking-tight drop-shadow">✨ My Lists</h1>
        <p className="text-white/60 text-xs mt-0.5 font-medium">Stay on top of everything</p>
      </div>

      {/* List nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2">
        {lists.length === 0 && !showForm && (
          <div className="text-center mt-8 px-4">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-white/60 text-sm font-medium">No lists yet!</p>
            <p className="text-white/40 text-xs mt-1">Hit the button below to start</p>
          </div>
        )}
        {lists.map(list => {
          const color = getListColor(list.id)
          const isActive = activeId === list.id
          const done = list.items.filter(i => i.checked).length
          return (
            <div
              key={list.id}
              onClick={() => onSelect(list.id)}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer mb-1 transition-all duration-150"
              style={
                isActive
                  ? { background: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              {/* Color dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 0 3px ${color}33` }}
              />
              <span className={`flex-1 text-sm font-bold truncate ${isActive ? 'text-gray-800' : 'text-white'}`}>
                {list.name}
              </span>
              {list.items.length > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={
                    isActive
                      ? { background: color + '22', color }
                      : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }
                  }
                >
                  {done}/{list.items.length}
                </span>
              )}
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-100"
                onClick={e => { e.stopPropagation(); onDelete(list.id) }}
                title="Delete"
              >
                <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        })}
      </nav>

      {/* New list form / button */}
      <div className="p-3 pt-0">
        {showForm ? (
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-2 rounded-2xl p-3"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Name your list..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full text-sm rounded-xl px-3 py-2 focus:outline-none font-medium placeholder-gray-400"
              style={{ background: 'rgba(255,255,255,0.9)' }}
            />
            <div className="flex gap-2">
              {[
                { type: 'todo', label: '✅ Todo' },
                { type: 'shopping', label: '🛒 Shop' },
              ].map(opt => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setNewType(opt.type)}
                  className="flex-1 text-xs py-2 rounded-xl font-bold transition-all"
                  style={
                    newType === opt.type
                      ? { background: 'white', color: '#667eea', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }
                      : { background: 'rgba(255,255,255,0.15)', color: 'white' }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 text-xs py-2 rounded-xl font-black text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #667eea, #f093fb)' }}
              >
                Create ✨
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setNewName('') }}
                className="flex-1 text-xs py-2 rounded-xl font-bold text-white/70 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.9)', color: '#667eea', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            New list
          </button>
        )}
      </div>
    </aside>
  )
}
