export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="aurora-orb -left-[10vw] -top-[12vh] size-[55vmax] max-h-[760px] max-w-[760px]"
        style={{ background: 'var(--orb-1)' }}
      />
      <div
        className="aurora-orb -right-[12vw] top-[18vh] size-[60vmax] max-h-[820px] max-w-[820px]"
        style={{ background: 'var(--orb-2)', animationDelay: '-9s', animationDuration: '34s' }}
      />
      <div
        className="aurora-orb bottom-[-18vh] left-[22vw] size-[45vmax] max-h-[620px] max-w-[620px]"
        style={{ background: 'var(--orb-3)', animationDelay: '-17s', animationDuration: '40s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,var(--background)_100%)] opacity-70" />
    </div>
  )
}
