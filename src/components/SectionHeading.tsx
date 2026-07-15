import type { ReactNode } from 'react'

type SectionHeadingProps = {
  label: string
  title: string
  action?: ReactNode
  compact?: boolean
}

export function SectionHeading({ label, title, action, compact = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${compact ? 'compact-heading' : ''}`}>
      <div>
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}
