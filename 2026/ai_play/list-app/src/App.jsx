import { useState, useEffect } from 'react'
import ListSidebar from './components/ListSidebar'
import ListDetail from './components/ListDetail'

const STORAGE_KEY = 'list-app-data'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [lists, setLists] = useState(loadFromStorage)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  }, [lists])

  const activeList = lists.find(l => l.id === activeId) ?? null

  function createList(name, type) {
    const newList = { id: generateId(), name, type, items: [] }
    setLists(prev => [...prev, newList])
    setActiveId(newList.id)
  }

  function deleteList(id) {
    setLists(prev => prev.filter(l => l.id !== id))
    if (activeId === id) setActiveId(null)
  }

  function renameList(id, name) {
    setLists(prev => prev.map(l => l.id === id ? { ...l, name } : l))
  }

  function addItem(listId, text) {
    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, items: [...l.items, { id: generateId(), text, checked: false }] }
        : l
    ))
  }

  function updateItem(listId, itemId, changes) {
    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, items: l.items.map(i => i.id === itemId ? { ...i, ...changes } : i) }
        : l
    ))
  }

  function deleteItem(listId, itemId) {
    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, items: l.items.filter(i => i.id !== itemId) }
        : l
    ))
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)' }}>
      <ListSidebar
        lists={lists}
        activeId={activeId}
        onSelect={setActiveId}
        onCreate={createList}
        onDelete={deleteList}
      />
      <main className="flex-1 overflow-auto">
        {activeList ? (
          <ListDetail
            list={activeList}
            onRename={renameList}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onDeleteItem={deleteItem}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-7xl">🗒️</div>
      <p className="text-2xl font-black text-white drop-shadow">Pick a list!</p>
      <p className="text-white/70 text-sm font-medium">Select one from the sidebar or create a new one</p>
    </div>
  )
}
