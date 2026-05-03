import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'

const Home = () => {
  return (
    <div className="text-white">

      {/* ── HERO — full screen with fixed video bg ── */}
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Fixed video behind */}
        <div className="absolute inset-0 z-0">
          <Video />
        </div>
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 z-10 bg-black/40" />
        {/* Hero text on top */}
        <div className="relative z-20 h-full flex flex-col justify-center">
          <HomeHeroText />
        </div>
      </div>

      {/* ── SCROLL CONTENT — quotes, places, footer ── */}
      <HomeBottomText />

    </div>
  )
}

export default Home