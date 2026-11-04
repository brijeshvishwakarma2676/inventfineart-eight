import PageTransition from '../components/PageTransition'
import Button from '../components/Button'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <PageTransition>
      <section className="shell flex min-h-[80svh] flex-col justify-center pb-20 pt-40">
        <h1 className="t-h1 max-w-[14ch]">This page isn’t in the catalogue.</h1>
        <p className="t-lead mt-6 max-w-[34rem] text-ash">
          The link may be old or mistyped. Browse the collections, or go back to the home page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/collections">Browse collections</Button>
          <Button to="/" variant="outline">Go to home page</Button>
        </div>
      </section>
    </PageTransition>
  )
}
