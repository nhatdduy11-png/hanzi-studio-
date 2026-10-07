'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { CATEGORIES, LEVELS, WORDS, stripPinyin, type Category, type Level } from '@/lib/vocab'
import { toSimplified } from '@/lib/chinese'
import { useSettings } from './settings-provider'
import { WordCard } from './word-card'
import { Chip, PageHeader } from './ui-bits'

const PAGE = 36

export function VocabBrowser() {
  const { t, study } = useSettings()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [cat, setCat] = useState<Category | 'all'>('all')
  const [limit, setLimit] = useState(PAGE)
  const deferred = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    const qSimp = toSimplified(q)
    const qPy = stripPinyin(q)
    return WORDS.filter((w) => {
      if (level !== 'all' && w.lvl !== level) return false
      if (cat !== 'all' && w.cat !== cat) return false
      if (!q) return true
      return (
        w.zh.includes(qSimp) ||
        w.en.toLowerCase().includes(q) ||
        w.vi.toLowerCase().includes(q) ||
        w.py.toLowerCase().includes(q) ||
        (qPy.length > 1 && stripPinyin(w.py).includes(qPy))
      )
    })
  }, [deferred, level, cat])

  const reset = () => setLimit(PAGE)

  return (
    <>
      <PageHeader eyebrow={`${WORDS.length}+ ${t.home.words}`} title={t.vocab.title} desc={t.vocab.desc} />

      <div className="glass-strong sticky top-[4.75rem] z-30 mb-6 flex flex-col gap-4 rounded-3xl p-4 sm:top-[5.5rem]">
        <label className="relative block">
          <span className="sr-only">{t.vocab.search}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              reset()
            }}
            placeholder={t.vocab.search}
            className="h-12 w-full rounded-full border border-input bg-background/40 pl-11 pr-11 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => {
                setQuery('')
                reset()
              }}
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </label>

        <div className="flex flex-col gap-3">
          <div className="scroll-hide -mx-1 flex gap-2 overflow-x-auto px-1" role="group" aria-label={t.vocab.level}>
            <Chip active={level === 'all'} onClick={() => { setLevel('all'); reset() }}>
              {t.vocab.all}
            </Chip>
            {LEVELS.map((l) => (
              <Chip key={l} active={level === l} onClick={() => { setLevel(l); reset() }}>
                {l === 'Native' ? t.levels.Native : `${l} · ${t.levels[l]}`}
              </Chip>
            ))}
          </div>
          <div className="scroll-hide -mx-1 flex gap-2 overflow-x-auto px-1" role="group" aria-label={t.vocab.topic}>
            <Chip active={cat === 'all'} onClick={() => { setCat('all'); reset() }}>
              {t.vocab.all}
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => { setCat(c); reset() }}>
                {t.categories[c]}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {t.vocab.results}
        {study === 'en' && ' · English'}
      </p>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-lg font-semibold">{t.vocab.empty}</p>
          <p className="mt-1 text-muted-foreground">{t.vocab.emptyHint}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, limit).map((w) => (
              <WordCard key={w.id} word={w} />
            ))}
          </div>
          {limit < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((l) => l + PAGE)}
                className="glass rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                {t.vocab.more} ({filtered.length - limit})
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
