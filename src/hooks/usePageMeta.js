import { useEffect } from 'react'
import { site } from '../data/site'

// Sets the document title and meta description for each route.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Sculpture, murals and architectural elements`
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description || site.descriptor
  }, [title, description])
}
