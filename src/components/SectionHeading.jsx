/* eslint-disable react/prop-types */

function SectionHeading({ index, eyebrow, title, accent, description = '', className = '' }) {
  return (
    <header className={`grid gap-7 lg:grid-cols-[8rem_1fr] ${className}`}>
      <div>
        <span className="inline-flex rounded-full border border-ink/20 bg-paper px-3 py-1.5 font-mono text-xs text-smoke">
          {index}
        </span>
      </div>
      <div>
        <p className="eyebrow text-coral">{eyebrow}</p>
        <h2 className="display-type mt-5 max-w-5xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.055em] text-ink md:text-6xl lg:text-7xl">
          {title}{' '}
          {accent && <span className="scribble">{accent}</span>}
        </h2>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-7 text-smoke md:text-lg">{description}</p>
        )}
      </div>
    </header>
  )
}

export default SectionHeading
