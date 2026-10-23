import { useCoursesStore } from '../store/useCoursesStore'
import {
  Code,
  Sparkles,
  Layers,
  SlidersHorizontal,
  Flame,
  Globe,
  Database,
  Cpu,
} from 'lucide-react'

// Icon mapping helper for categories
function getCategoryIcon(cat) {
  const lower = cat.toLowerCase()
  if (lower.includes('all') || lower.includes('hammasi')) return <Layers className="w-3.5 h-3.5" />
  if (lower.includes('python') || lower.includes('go') || lower.includes('c#') || lower.includes('java'))
    return <Code className="w-3.5 h-3.5" />
  if (lower.includes('ai') || lower.includes('chatgpt') || lower.includes('ml'))
    return <Sparkles className="w-3.5 h-3.5" />
  if (lower.includes('web')) return <Globe className="w-3.5 h-3.5" />
  if (lower.includes('data')) return <Database className="w-3.5 h-3.5" />
  if (lower.includes('spring')) return <Cpu className="w-3.5 h-3.5" />
  return <Layers className="w-3.5 h-3.5" />
}

export default function CategoryBar() {
  const { categories, activeCategory, setActiveCategory, sortBy, setSortBy } = useCoursesStore()

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Scrollable Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 flex-1">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-102'
                      : 'bg-gray-100 hover:bg-gray-200/80 text-gray-700'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              )
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 border-l border-gray-200 pl-4">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-gray-700 bg-transparent outline-none cursor-pointer hover:text-purple-600"
            >
              <option value="popular">Eng mashhur</option>
              <option value="rating">Yuqori reyting</option>
              <option value="price-low">Narxi: Arzonroq</option>
              <option value="price-high">Narxi: Qimmatroq</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
