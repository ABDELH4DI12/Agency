/* eslint-disable react/prop-types */

function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description = '',
  align = 'left',
  className = '',
}) {
  const centered = align === 'center';

  return (
    <div
      className={`grid gap-8 md:grid-cols-[5rem_1fr] ${
        centered ? 'md:items-start' : 'md:items-end'
      } ${className}`}
    >
      <div className={`flex items-center gap-3 md:block ${centered ? 'md:text-center' : ''}`}>
        <span className="font-mono text-xs text-smoke">/{index}</span>
        <span className="h-px flex-1 bg-white/15 md:mt-5 md:block md:w-full" />
      </div>
      <div className={centered ? 'text-center' : ''}>
        <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
        <h2 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-paper md:text-7xl lg:text-[6.6rem]">
          {title}{' '}
          {accent && (
            <span className="display-serif italic tracking-[-0.02em] text-electric">
              {accent}
            </span>
          )}
        </h2>
        {description && (
          <p
            className={`mt-7 max-w-2xl text-base leading-7 text-smoke md:text-lg ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default SectionHeading
