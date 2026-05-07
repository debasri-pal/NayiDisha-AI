import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen hero-bg text-white overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="section-padding py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="fade-in">
            <div className="inline-block px-5 py-2 rounded-full border border-[#AACDDC]/30 bg-[#81A6C6]/10 text-[#AACDDC] text-sm font-semibold tracking-wide mb-8">
              AI Voice Hiring Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Hiring Begins <br />
              With a{" "}
              <span className="gradient-text">
                Voice
              </span>{" "}
              Not a Form
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[#cbd5e1] leading-relaxed max-w-2xl">
              NayiDisha AI helps recruiters assess blue-collar
              workforce candidates through multilingual
              voice interviews using AI-powered evaluation,
              fraud detection, and real-time analysis.
            </p>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link to="/interview">
                <button className="primary-btn text-lg w-full sm:w-auto">
                  🎤 Start Interview
                </button>
              </Link>

              <button className="secondary-btn text-lg">
                Explore Features
              </button>
            </div>

            {/* STATS */}
            <div className="mt-14 grid grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-[#81A6C6]">
                  4+
                </h2>

                <p className="text-sm text-[#cbd5e1] mt-2">
                  Languages
                </p>
              </div>

              <div className="glass rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-[#81A6C6]">
                  AI
                </h2>

                <p className="text-sm text-[#cbd5e1] mt-2">
                  Evaluation
                </p>
              </div>

              <div className="glass rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-[#81A6C6]">
                  24/7
                </h2>

                <p className="text-sm text-[#cbd5e1] mt-2">
                  Automated
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center items-center">
            
            {/* MAIN CARD */}
            <div className="card-ui p-8 w-full max-w-md relative z-10 float">
              
              {/* TOP */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 rounded-full bg-green-400 pulse-soft"></div>

                <p className="text-[#F3E3D0] font-semibold">
                  AI Interview Active
                </p>
              </div>

              {/* CANDIDATE */}
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#81A6C6] to-[#AACDDC] flex items-center justify-center text-2xl font-bold text-[#0f1720]">
                    D
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      Debasri Pal
                    </h3>

                    <p className="text-[#cbd5e1] text-sm">
                      Candidate Interview
                    </p>
                  </div>
                </div>

                {/* WAVE */}
                <div className="mt-8 flex justify-center gap-2">
                  <div className="w-2 h-10 rounded-full bg-[#81A6C6] animate-pulse"></div>
                  <div className="w-2 h-16 rounded-full bg-[#AACDDC] animate-pulse"></div>
                  <div className="w-2 h-8 rounded-full bg-[#D2C4B4] animate-pulse"></div>
                  <div className="w-2 h-14 rounded-full bg-[#81A6C6] animate-pulse"></div>
                  <div className="w-2 h-6 rounded-full bg-[#AACDDC] animate-pulse"></div>
                </div>

                {/* QUESTION */}
                <div className="mt-8 bg-[#0f1720] rounded-2xl p-5 border border-[#81A6C6]/20">
                  <p className="text-[#AACDDC] text-sm mb-2">
                    AI Question
                  </p>

                  <p className="text-[#F3E3D0] text-lg">
                    Tell me about your work experience.
                  </p>
                </div>

                {/* RESPONSE */}
                <div className="mt-5 bg-[#1a2432] rounded-2xl p-5">
                  <p className="text-[#cbd5e1] leading-relaxed">
                    I worked in warehouse logistics and handled
                    packaging and inventory management...
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING BADGES */}
            <div className="absolute top-10 -left-4 glass px-5 py-3 rounded-2xl hidden md:flex items-center gap-2">
              <span className="text-green-400">✔</span>
              <span className="text-sm">
                Fraud Detection Enabled
              </span>
            </div>

            <div className="absolute bottom-10 -right-6 glass px-5 py-3 rounded-2xl hidden md:flex items-center gap-2">
              <span>🌍</span>
              <span className="text-sm">
                Multilingual Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-padding pb-24">
        <div className="text-center mb-16">
          <p className="text-[#81A6C6] font-semibold tracking-widest uppercase mb-4">
            Features
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Smarter Hiring Through AI
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="card-ui p-8">
            <div className="text-5xl mb-6">🎤</div>

            <h3 className="text-2xl font-bold mb-4">
              Voice Interviews
            </h3>

            <p className="text-[#cbd5e1] leading-relaxed">
              Candidates answer questions naturally through
              speech instead of filling lengthy forms.
            </p>
          </div>

          <div className="card-ui p-8">
            <div className="text-5xl mb-6">🧠</div>

            <h3 className="text-2xl font-bold mb-4">
              AI Evaluation
            </h3>

            <p className="text-[#cbd5e1] leading-relaxed">
              AI evaluates confidence, communication,
              response quality, and interview performance.
            </p>
          </div>

          <div className="card-ui p-8">
            <div className="text-5xl mb-6">🛡</div>

            <h3 className="text-2xl font-bold mb-4">
              Fraud Detection
            </h3>

            <p className="text-[#cbd5e1] leading-relaxed">
              Detect suspicious activity using face detection,
              monitoring, and interview validation systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;