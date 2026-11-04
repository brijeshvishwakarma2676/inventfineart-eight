import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import ProjectCard from '../ProjectCard'
import { projects } from '../../data/projects'

export default function FeaturedProjects() {
  const [first, second, third, fourth] = projects.filter((p) => p.featured)
  return (
    <section className="py-24 md:py-36" aria-label="Featured projects">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading title="Featured projects" intro="Recent commissions for hotels, homes, offices and public spaces." />
          <Link to="/projects" className="link-line self-start text-[0.9375rem] font-medium md:self-auto">
            See all projects
          </Link>
        </div>

        <ProjectCard project={first} aspect="aspect-[4/5] md:aspect-[21/9]" layout="split" titleSize="h2" className="mt-16 md:mt-24" />

        <div className="mt-24 grid gap-24 md:mt-36 md:grid-cols-12 md:gap-8">
          <ProjectCard project={second} aspect="aspect-[4/5]" className="md:col-span-6" />
          <ProjectCard project={third} aspect="aspect-[3/4]" className="md:col-span-4 md:col-start-9 md:mt-48" />
        </div>

        {fourth && (
          <div className="mt-24 grid md:mt-36 md:grid-cols-12">
            <ProjectCard project={fourth} aspect="aspect-[4/3] md:aspect-[16/9]" className="md:col-span-8 md:col-start-3" />
          </div>
        )}
      </div>
    </section>
  )
}
