import { Link } from 'react-router-dom'

const variants = {
  solid: 'bg-graphite text-limestone',
  outline: 'border border-graphite/70 text-graphite',
  light: 'bg-limestone text-graphite',
  'outline-light': 'border border-limestone/60 text-limestone',
}

const fills = {
  solid: 'bg-bronze',
  outline: 'bg-graphite',
  light: 'bg-brass',
  'outline-light': 'bg-limestone',
}

const hoverText = {
  solid: 'group-hover:text-limestone',
  outline: 'group-hover:text-limestone',
  light: 'group-hover:text-graphite',
  'outline-light': 'group-hover:text-graphite',
}

/**
 * One button for the whole site. Renders a router Link (`to`), an anchor (`href`) or a button.
 * On hover a block of colour rises from the base, like material filling a mould.
 */
export default function Button({ to, href, variant = 'solid', size = 'md', icon: Icon, className = '', children, ...rest }) {
  const pad = size === 'lg' ? 'h-14 px-8 text-[1.0625rem]' : 'h-12 px-6 text-[0.9375rem]'
  const classes = `group relative inline-flex items-center justify-center gap-3 overflow-hidden font-medium tracking-[0.01em] transition-colors duration-500 ${pad} ${variants[variant]} ${className}`

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full transition-transform duration-[650ms] ease-[var(--ease-sculpt)] group-hover:translate-y-0 ${fills[variant]}`}
      />
      <span className={`relative z-10 inline-flex items-center gap-3 transition-[color,transform] duration-500 ease-[var(--ease-sculpt)] group-hover:-translate-y-px ${hoverText[variant]}`}>
        {Icon && <Icon size={18} strokeWidth={1.6} aria-hidden="true" />}
        {children}
      </span>
    </>
  )

  if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {inner}
      </a>
    )
  }
  return <button className={classes} {...rest}>{inner}</button>
}
