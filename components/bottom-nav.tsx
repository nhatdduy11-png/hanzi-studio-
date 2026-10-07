'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSettings } from './settings-provider'
import { NAV_ITEMS } from './nav-items'

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useSettings()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="glass-strong mx-auto flex max-w-md items-center justify-between rounded-full p-1.5">
        {NAV_ITEMS.map(({ href, key, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-full px-1 py-2 text-[10px] font-semibold transition-all',
                  active
                    ? 'bg-foreground text-background shadow-[0_6px_18px_-6px_oklch(0_0_0/60%)]'
                    : 'text-muted-foreground',
                )}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
                <span className="max-w-full truncate">{t.nav[key]}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
