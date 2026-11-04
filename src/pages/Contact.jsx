import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import RevealText from '../components/RevealText'
import Button from '../components/Button'
import usePageMeta from '../hooks/usePageMeta'
import { site, whatsappLink } from '../data/site'
import { ease, fadeUp, viewport } from '../lib/motion'

const projectTypes = [
  { value: 'sculptures', label: 'Sculpture' },
  { value: 'planters', label: 'Planters & pots' },
  { value: 'murals', label: 'Mural or wall feature' },
  { value: 'customised', label: 'Customised FRP or GRC product' },
  { value: 'other', label: 'Something else' },
]

const timelines = ['As soon as possible', 'Within 3 months', '3 to 6 months', 'More than 6 months', 'Not sure yet']

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const e = {}
  if (!v.type) e.type = 'Choose the kind of project.'
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email so we can reply.'
  else if (!emailPattern.test(v.email.trim())) e.email = 'Enter an email address like name@example.com.'
  if (v.phone && v.phone.replace(/[^\d]/g, '').length < 7) e.phone = 'Enter a phone number with at least 7 digits, or leave it empty.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little about the project, at least a sentence.'
  return e
}

function composeEnquiry(v) {
  const type = projectTypes.find((t) => t.value === v.type)?.label
  return [
    `Project type: ${type}`,
    v.piece && `Piece: ${v.piece}`,
    v.location && `Site location: ${v.location}`,
    v.timeline && `Timeline: ${v.timeline}`,
    '',
    v.message,
    '',
    `${v.name}`,
    v.email,
    v.phone,
  ]
    .filter((x) => x !== undefined && x !== false && x !== null)
    .join('\n')
}

function Field({ label, error, optional, children, id }) {
  return (
    <div>
      <label htmlFor={id} className="t-label flex justify-between text-graphite">
        <span>{label}</span>
        {optional && <span className="text-ash">Optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-2 text-[0.9rem] text-[#9b3b2a]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  usePageMeta('Contact', `Start a commission with ${site.name}: sculptures, planters, murals and FRP or GRC products.`)
  const [params] = useSearchParams()
  const uid = useId()
  const presetType = projectTypes.some((t) => t.value === params.get('type')) ? params.get('type') : ''
  const piece = params.get('piece') || ''

  const [values, setValues] = useState({
    type: presetType,
    name: '',
    email: '',
    phone: '',
    location: '',
    timeline: '',
    message: piece ? `I am interested in ${piece}. ` : '',
    piece,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | opened | failed

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first === 'type' ? `${uid}-type-0` : `${uid}-${first}`)?.focus()
      return
    }
    const body = composeEnquiry(values)
    if (site.formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, summary: body }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
      } catch {
        setStatus('failed')
      }
    } else {
      const subject = `Enquiry: ${projectTypes.find((t) => t.value === values.type)?.label} from ${values.name}`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('opened')
    }
  }

  const done = status === 'sent' || status === 'opened'
  const inputProps = (key) => ({
    id: `${uid}-${key}`,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
    className: 'field mt-1',
  })

  return (
    <PageTransition>
      <section className="shell pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="t-label mb-6 text-bronze">Contact</p>
        <RevealText as="h1" text={['Tell us about', 'the space.']} className="t-h1" animateOnMount delay={0.15} />
        <motion.p
          className="t-lead mt-8 max-w-[38rem] text-ash"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          Share what you can: the site, the scale, a photograph, a deadline. We reply within two working days with first
          thoughts and the questions we need answered to give you a price.
        </motion.p>
      </section>

      <section className="shell grid gap-20 pb-24 md:grid-cols-12 md:gap-8 md:pb-36">
        {/* Direct contact */}
        <aside className="md:col-span-4">
          <div className="space-y-10 md:sticky md:top-28">
            <div>
              <h2 className="t-label text-ash">Write to us</h2>
              <a href={`mailto:${site.email}`} className="link-line mt-2 inline-block font-display text-[1.5rem]">{site.email}</a>
            </div>
            <div>
              <h2 className="t-label text-ash">Call the studio</h2>
              {site.phones.map((p) => (
                <a key={p.href} href={`tel:${p.href}`} className="link-line mt-2 block w-fit font-display text-[1.5rem]">{p.label}</a>
              ))}
              {site.hours && <p className="mt-1 text-[0.95rem] text-ash">{site.hours}</p>}
            </div>
            <div className="border-t border-graphite/15 pt-10">
              <h2 className="font-display text-[1.6rem] leading-snug">Prefer to send photos of the site?</h2>
              <p className="mt-3 leading-relaxed text-ash">WhatsApp is often the quickest way to share pictures, drawings and voice notes.</p>
              <Button href={whatsappLink()} variant="outline" icon={MessageCircle} className="mt-6">Message us on WhatsApp</Button>
            </div>
          </div>
        </aside>

        {/* Enquiry form */}
        <div className="md:col-span-7 md:col-start-6">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                role="status"
                className="bg-plaster p-8 md:p-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-bronze text-limestone">
                  <Check size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="t-h2 mt-8">{status === 'sent' ? 'Enquiry sent.' : 'Your enquiry is ready to send.'}</h2>
                <p className="t-lead mt-5 max-w-[34rem] text-ash">
                  {status === 'sent'
                    ? `Thank you, ${values.name.split(' ')[0]}. We will reply to ${values.email} within two working days.`
                    : `Your email app should have opened with the enquiry written out. Press send there, or write to ${site.email} directly if nothing opened.`}
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="link-line mt-8 text-[0.9375rem] font-medium">
                  Edit the enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                className="space-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
              >
                <fieldset aria-describedby={errors.type ? `${uid}-type-error` : undefined}>
                  <legend className="t-h3">What would you like made?</legend>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {projectTypes.map((t, i) => {
                      const checked = values.type === t.value
                      return (
                        <label
                          key={t.value}
                          className={`relative flex min-h-[4.5rem] cursor-pointer items-end border p-4 text-[0.975rem] leading-snug transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bronze ${
                            checked ? 'border-graphite bg-graphite text-limestone' : 'border-graphite/20 hover:border-graphite/60'
                          }`}
                        >
                          <input
                            id={`${uid}-type-${i}`}
                            type="radio"
                            name="type"
                            value={t.value}
                            checked={checked}
                            onChange={set('type')}
                            className="sr-only"
                          />
                          {t.label}
                          {checked && <Check size={16} className="absolute right-3 top-3 text-brass" aria-hidden="true" />}
                        </label>
                      )
                    })}
                  </div>
                  {errors.type && <p id={`${uid}-type-error`} className="mt-3 text-[0.9rem] text-[#9b3b2a]">{errors.type}</p>}
                </fieldset>

                {values.piece && (
                  <p className="border-l-2 border-bronze pl-4 text-[0.975rem] text-ash">
                    Enquiring about <span className="text-graphite">{values.piece}</span>
                  </p>
                )}

                <div className="grid gap-10 sm:grid-cols-2">
                  <Field label="Your name" id={`${uid}-name`} error={errors.name}>
                    <input type="text" autoComplete="name" {...inputProps('name')} />
                  </Field>
                  <Field label="Email" id={`${uid}-email`} error={errors.email}>
                    <input type="email" autoComplete="email" inputMode="email" {...inputProps('email')} />
                  </Field>
                  <Field label="Phone" optional id={`${uid}-phone`} error={errors.phone}>
                    <input type="tel" autoComplete="tel" inputMode="tel" {...inputProps('phone')} />
                  </Field>
                  <Field label="Where is the site?" optional id={`${uid}-location`}>
                    <input type="text" placeholder="City, or the name of the project" {...inputProps('location')} />
                  </Field>
                  <Field label="When does it need to be ready?" optional id={`${uid}-timeline`}>
                    <select {...inputProps('timeline')} className="field mt-1 cursor-pointer appearance-none pr-8" style={{ background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%23262320' stroke-width='1.4'/></svg>") no-repeat right 0.25rem center / 12px` }}>
                      <option value="">Choose a timeframe</option>
                      {timelines.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="About the project" id={`${uid}-message`} error={errors.message}>
                  <textarea rows={6} placeholder="The space, the size you imagine, the mood, any drawings or references you can share." {...inputProps('message')} className="field mt-1 resize-y" />
                </Field>

                {status === 'failed' && (
                  <p role="alert" className="text-[0.95rem] text-[#9b3b2a]">
                    The enquiry did not reach us. Check your connection and send it again, or write to {site.email}.
                  </p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" size="lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending enquiry' : 'Send enquiry'}
                  </Button>
                  <p className="max-w-[18rem] text-[0.875rem] leading-relaxed text-ash">We use your details only to reply to this enquiry.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Location */}
      <section className="bg-plaster py-24 md:py-32" aria-label="Studio location">
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="md:col-span-4">
            <h2 className="t-h2">Visit us</h2>
            <p className="mt-4 text-ash">{site.visits}.</p>
            {[
              ['Office', site.address, site.mapUrl],
              ['Factory', site.factory.address, site.factory.mapUrl],
            ].map(([label, lines, map]) => (
              <div key={label} className="mt-8 border-t border-graphite/15 pt-6">
                <h3 className="t-label text-ash">{label}</h3>
                <address className="mt-3 not-italic leading-relaxed">
                  {lines.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
                <a href={map} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block text-bronze">Open in Google Maps</a>
              </div>
            ))}
          </motion.div>
          <div className="md:col-span-7 md:col-start-6">
            <SitePlan />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

// A drawn site plan rather than an embedded map: light, fast and in keeping with the drawings in the workshop.
function SitePlan() {
  const reduce = useReducedMotion()
  return (
    <motion.figure initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: 1, ease }}>
      <svg viewBox="0 0 700 440" className="h-auto w-full bg-limestone" role="img" aria-label={`Drawn site plan marking the ${site.name} office`}>
        <defs>
          <pattern id="plan-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#C9BBA3" strokeWidth="0.6" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="700" height="440" fill="url(#plan-grid)" />
        <path d="M-10 330 C 160 300, 300 340, 470 300 S 640 250, 720 260" fill="none" stroke="#C9BBA3" strokeWidth="26" />
        <path d="M-10 330 C 160 300, 300 340, 470 300 S 640 250, 720 260" fill="none" stroke="#F1ECE3" strokeWidth="2" strokeDasharray="10 10" />
        <path d="M380 312 L380 210" stroke="#C9BBA3" strokeWidth="10" />
        {[[80, 60, 120, 80], [230, 50, 90, 110], [545, 185, 115, 60], [90, 370, 140, 50], [520, 330, 150, 80]].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke="#262320" strokeWidth="1" opacity="0.35" />
        ))}
        <rect x="320" y="90" width="150" height="120" fill="#E6DED1" stroke="#262320" strokeWidth="1.5" />
        <path d="M335 210 V150 a30 30 0 0 1 60 0 V210" fill="none" stroke="#262320" strokeWidth="1.2" />
        <circle cx="395" cy="150" r="9" fill="#8A5A32" />
        {!reduce && (
          <circle cx="395" cy="150" r="22" fill="none" stroke="#8A5A32" strokeWidth="1">
            <animate attributeName="r" values="12;30;12" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" />
          </circle>
        )}
        <text x="480" y="128" fontFamily="Marcellus, serif" fontSize="20" fill="#262320">{site.name}</text>
        <text x="480" y="150" fontFamily="Albert Sans, sans-serif" fontSize="12.5" fill="#6B6255">Office, Kandivali East</text>
        <g transform="translate(640 50)" fontFamily="Albert Sans, sans-serif" fontSize="12" fill="#262320">
          <path d="M0 22 L8 0 L16 22 L8 16 Z" fill="#262320" />
          <text x="4" y="40">N</text>
        </g>
      </svg>
      <figcaption className="t-label mt-3 text-ash">Not to scale. Parking for visitors inside the gate.</figcaption>
    </motion.figure>
  )
}
