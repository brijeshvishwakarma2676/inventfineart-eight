import { useSyncExternalStore } from 'react'

// The opening loader lives in index.html so it paints before any JavaScript arrives.
// This module decides when it may leave, lifts it away, and tells the page when to start its own entrance.

const el = typeof document !== 'undefined' ? document.getElementById('loader') : null
let done = !el
const listeners = new Set()

const notify = () => listeners.forEach((fn) => fn())
const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** True once the loader has started lifting: entrance animations wait for this. */
export const useLoaderDone = () => useSyncExternalStore(subscribe, () => done, () => true)

const setProgress = (p) => el?.style.setProperty('--loader-progress', String(p))
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const pageLoaded = () =>
  document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }))

export async function finishLoader() {
  if (!el) return
  // index.html's safety net already lifted it (very slow start): just let the page play its entrance.
  if (!el.isConnected || el.classList.contains('is-leaving')) {
    done = true
    notify()
    return
  }
  setProgress(0.45) // the app has started

  // The full drawing plays once per visit; a reload in the same session only needs a short hold.
  let seen = false
  try {
    seen = sessionStorage.getItem('ifa-loader-seen') === '1'
    sessionStorage.setItem('ifa-loader-seen', '1')
  } catch {
    // storage unavailable: treat as a first visit
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const minimum = seen || reduce ? 350 : 2100 // ms from the first paint, long enough for the drawing to finish

  const ready = Promise.all([
    document.fonts?.ready.then(() => setProgress(0.7)),
    pageLoaded().then(() => setProgress(0.9)),
  ])
  // Never hold the visitor for more than a few seconds, however slow the photos are.
  await Promise.race([ready, wait(4500)])
  const elapsed = performance.now() - Number(el.dataset.start || 0)
  await wait(Math.max(0, minimum - elapsed))

  setProgress(1)
  await wait(reduce ? 0 : 280) // let the line reach the end before the panel lifts
  el.classList.add('is-leaving')
  document.documentElement.classList.remove('is-loading')

  // The hero's arch starts rising while the panel is still lifting, so the two read as one movement.
  setTimeout(() => {
    done = true
    notify()
  }, reduce ? 0 : 420)

  const remove = () => el.remove()
  el.addEventListener('transitionend', (e) => e.target === el && remove())
  setTimeout(remove, 1600)
}
