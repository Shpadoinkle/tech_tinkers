import { useState } from 'react'
import { getListColor } from './ListSidebar'

const TYPE_META = {
  shopping: { icon: '🛒', label: 'Shopping list', placeholder: 'Add something to buy...' },
  todo:     { icon: '✅', label: 'Todo list',     placeholder: 'Add a task...' },
}

export default function ListDetail({ list, onRename, onAddItem, onUpdateItem, onDeleteItem }) {
  const [addText, setAddText] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(list.name)

  const color = getListColor(list.id)
  const meta = TYPE_META[list.type]
  const checkedCount = list.items.filter(i => i.checked).length
  const progress = list.items.length > 0 ? checkedCount / list.items.length : 0

  function handleAddItem(e) {
    e.preventDefault()
    const text = addText.trim()
    if (!text) return
    onAddItem(list.id, text)
    setAddText('')
  }

  function handleRename(e) {
    e?.preventDefault()
    const name = draftName.trim()
    if (name) onRename(list.id, name)
    setEditingName(false)
  }

  return (
    <div className="min-h-full p-6 md:p-10">
      <div className="max-w-xl mx-auto">

        {/* Header card */}
        <div
          className="rounded-3xl p-6 mb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 8px 32px ${color}55` }}
        >
          <div className="text-4xl mb-3">{meta.icon}</div>

          {editingName ? (
            <form onSubmit={handleRename}>
              <input
                autoFocus
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onBlur={handleRename}
                className="text-2xl font-black bg-transparent border-b-2 border-white/60 focus:outline-none w-full text-white placeholder-white/50"
              />
            </form>
          ) : (
            <button
              onClick={() => { setDraftName(list.name); setEditingName(true) }}
              className="group flex items-center gap-2 text-left"
            >
              <h2 className="text-2xl font-black text-white">{list.name}</h2>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-sm">✏️</span>
            </button>
          )}

          <p className="text-white/70 text-sm mt-1 font-medium">{meta.label}</p>

          {/* Progress bar */}
          {list.items.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1.5 font-bold">
                <span>{checkedCount} of {list.items.length} done</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Add item form */}
        <form
          onSubmit={handleAddItem}
          className="flex gap-2 mb-5"
        >
          <input
            type="text"
            placeholder={meta.placeholder}
            value={addText}
            onChange={e => setAddText(e.target.value)}
            className="flex-1 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none shadow-sm"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl text-sm font-black text-white transition-all hover:scale-105 active:scale-95 shadow-md"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
          >
            Add
          </button>
        </form>

        {/* Items */}
        {list.items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🌟</div>
            <p className="text-white font-black text-lg">All clear!</p>
            <p className="text-white/60 text-sm mt-1">Add your first item above</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {list.items.map(item => (
              <ListItem
                key={item.id}
                item={item}
                color={color}
                onToggle={() => onUpdateItem(list.id, item.id, { checked: !item.checked })}
                onEdit={text => onUpdateItem(list.id, item.id, { text })}
                onDelete={() => onDeleteItem(list.id, item.id)}
              />
            ))}
          </ul>
        )}

        {/* Clear completed */}
        {checkedCount > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => list.items.filter(i => i.checked).forEach(i => onDeleteItem(list.id, i.id))}
              className="text-xs text-white/50 hover:text-white/80 transition-colors font-medium underline underline-offset-2"
            >
              Clear {checkedCount} completed item{checkedCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ListItem({ item, color, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.text)

  function handleEditSubmit(e) {
    e?.preventDefault()
    const text = draft.trim()
    if (text) onEdit(text)
    else setDraft(item.text)
    setEditing(false)
  }

  return (
    <li
      className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-150 hover:-translate-y-0.5"
      style={{
        background: item.checked ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
        boxShadow: item.checked ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110"
        style={
          item.checked
            ? { background: color, borderColor: color }
            : { background: 'transparent', borderColor: color + '80' }
        }
      >
        {item.checked && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text */}
      {editing ? (
        <form onSubmit={handleEditSubmit} className="flex-1">
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={handleEditSubmit}
            className="w-full text-sm font-medium bg-transparent focus:outline-none border-b-2"
            style={{ borderColor: color }}
          />
        </form>
      ) : (
        <span
          onDoubleClick={() => { setDraft(item.text); setEditing(true) }}
          className={`flex-1 text-sm font-medium cursor-text select-none transition-all ${
            item.checked ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
        >
          {item.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => { setDraft(item.text); setEditing(true) }}
          className="w-7 h-7 flex items-center justify-center rounded-xl transition-all hover:scale-110"
          style={{ background: color + '18', color }}
          title="Edit"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="w-7 h-7 flex items-center justify-center rounded-xl transition-all hover:scale-110 hover:bg-red-50 text-gray-300 hover:text-red-400"
          title="Delete"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  )
}
