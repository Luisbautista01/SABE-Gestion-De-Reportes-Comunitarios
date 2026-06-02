import { sabeTeam } from '../../../core/domain/team'

const beachImage =
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80'
const communityImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80'

export function AboutPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Sobre SABE</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">Tecnologia para escuchar, priorizar y resolver necesidades comunitarias</h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              SABE nace como una plataforma academica y tecnologica orientada a fortalecer la gestion de reportes ciudadanos en San Bernardo del Viento mediante APIs REST, seguridad por roles y una experiencia web accesible.
            </p>
          </div>
          <img className="h-full min-h-80 w-full rounded object-cover shadow-sm" src={beachImage} alt="Paisaje costero" />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 lg:px-8">
          <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Mision</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Facilitar la comunicacion entre ciudadania y administracion municipal a traves de una plataforma confiable para registrar, gestionar y dar seguimiento a incidencias comunitarias.
            </p>
          </article>
          <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Vision</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Ser una base digital escalable para la transformacion de la atencion ciudadana, integrando analitica, notificaciones e inteligencia artificial en la gestion publica local.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <img className="h-full min-h-80 w-full rounded object-cover shadow-sm" src={communityImage} alt="Equipo trabajando en gestion digital" />
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Por que elegir SABE</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Control, evidencia y transparencia en una sola plataforma</h2>
          <div className="mt-6 grid gap-4">
            {[
              'Permite registrar reportes con informacion estructurada y evidencias fotograficas.',
              'Organiza responsabilidades por roles: ciudadano, funcionario y administrador.',
              'Mantiene historial de actualizaciones para seguimiento y auditoria.',
              'Expone API documentada con Swagger para facilitar integraciones futuras.',
            ].map((item) => (
              <p className="rounded border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm" key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Equipo de SABE</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Fundador y colaboradores</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {sabeTeam.map((member) => (
              <article className="rounded border border-slate-200 bg-slate-50 p-6 shadow-sm" key={member.contact}>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{member.highlight}</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">{member.name}</h3>
                <p className="mt-1 text-sm font-bold text-slate-700">{member.role}</p>
                <p className="mt-3 text-sm text-slate-500">{member.category}</p>
                <p className="mt-4 text-sm leading-6 text-slate-700">{member.responsibility}</p>
                <a className="mt-5 inline-flex text-sm font-bold text-emerald-700 hover:underline" href={`mailto:${member.contact}`}>
                  {member.contact}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
