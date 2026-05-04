import { useNavigate } from 'react-router-dom'

const QUOTES = [
  { text: 'The mountains are calling and I must go.', author: 'Priya' },
  { text: 'Travel is the only thing you buy that makes you richer.', author: 'Prakriti' },
  { text: 'Travel is Therapy', author: 'Amit' },
]

const PLACES = [
  { name: 'Leh-Ladakh',       tag: 'High Altitude Desert', num: '01' },
  { name: 'Kerala Backwaters', tag: "God's Own Country",    num: '02' },
  { name: 'Varanasi',          tag: 'Spiritual Capital',    num: '03' },
  { name: 'Rann of Kutch',     tag: 'White Salt Desert',    num: '04' },
  { name: 'Meghalaya',         tag: 'Abode of Clouds',      num: '05' },
  { name: 'Coorg',             tag: 'Scotland of India',    num: '06' },
]

const HomeBottomText = () => {
  const navigate = useNavigate()

  return (
    <div className="relative bg-[#080808] text-white">

      {/* ── TRAVEL QUOTES ── */}
      <section className="px-5 lg:px-16 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/50 text-[9px] uppercase tracking-[0.4em]">Words that move us</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="border border-white/[0.07] rounded-2xl p-8 hover:border-[#D3FD50]/40 transition-colors duration-500"
            >
              <div className="text-[#D3FD50] text-4xl font-serif mb-4 leading-none opacity-50">"</div>
              <p className="text-white/65 text-sm lg:text-base leading-relaxed font-light mb-6">
                {q.text}
              </p>
              <p className="text-white/50 text-[9px] uppercase tracking-[0.3em]">— {q.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ICONIC INDIA ── */}
      <section className="px-5 lg:px-16 py-20 border-t border-white/[0.06]">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-white/50 text-[9px] uppercase tracking-[0.4em] mb-2">Must Visit</p>
            <h2 className="font-[font1] text-4xl lg:text-6xl uppercase text-white leading-none">
              Iconic India
            </h2>
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="hidden lg:block text-[9px] uppercase tracking-widest text-white/50 hover:text-[#D3FD50] transition-colors duration-300 border-b border-white/10 hover:border-[#D3FD50] pb-1"
          >
            View all places →
          </button>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {PLACES.map((p, i) => (
            <div
              key={i}
              className="group flex items-center justify-between py-5 px-0 hover:px-4 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/projects')}
            >
              <div className="flex items-center gap-6">
                <span className="text-white/40 text-[10px] font-mono w-6 shrink-0">{p.num}</span>
                <div>
                  <h3 className="font-[font1] text-xl lg:text-3xl uppercase text-white group-hover:text-[#D3FD50] transition-colors duration-300 leading-none">
                    {p.name}
                  </h3>
                  <p className="text-white/50 text-[9px] uppercase tracking-widest mt-1">{p.tag}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#D3FD50] group-hover:bg-[#D3FD50]/10 flex items-center justify-center transition-all duration-300 shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeOpacity="0.5"
                    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/projects')}
          className="lg:hidden mt-8 w-full border border-white/10 text-white/50 text-[9px] uppercase tracking-widest py-4 rounded-full hover:border-[#D3FD50] hover:text-[#D3FD50] transition-colors duration-300"
        >
          View all places →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <section className="border-t border-white/[0.06] px-5 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>
            <h2 className="font-[font1] text-3xl lg:text-4xl uppercase">
              <span className="text-white">Prime</span>
              <span className="text-[#22c55e]">Travel</span>
            </h2>
            <p className="text-white/50 text-[9px] uppercase tracking-widest mt-1">
              Curated Escapes · India
            </p>
          </div>

          <div className="text-center">
            <p className="text-white/50 text-sm font-light">
              Made with <span className="text-red-400">♥</span> by{' '}
              <span className="text-white font-medium">Priya</span>
            </p>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">
              © 2026 PrimeTravel · All rights reserved
            </p>
          </div>

          <div className="flex gap-8">
            {[
              { label: 'Places', path: '/projects' },
              { label: 'Story',  path: '/agence'   },
            ].map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="text-white/50 text-[9px] uppercase tracking-widest hover:text-white transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default HomeBottomText