import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {
  const [interviews, setInterviews] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  // Fetch Interviews
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/interviews"
          );

        setInterviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  // Filter Candidates
  const filteredInterviews =
    interviews.filter((interview) =>
      interview.candidateName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  // Stats
  const totalCandidates =
    interviews.length;

  const shortlistedCandidates =
    interviews.filter(
      (i) =>
        i.classification ===
        "Job Ready"
    ).length;

  const fraudCandidates =
    interviews.filter(
      (i) => i.fraudDetected
    ).length;

  return (
    <div className="min-h-screen hero-bg text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto section-padding py-16 fade-in">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-14">

          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold gradient-text">
              Recruiter Dashboard
            </h1>

            <p className="text-[#cbd5e1] mt-4 text-lg">
              Monitor candidate performance, fraud
              detection, and AI interview evaluations.
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-[350px]">
            <input
              type="text"
              placeholder="Search candidate..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl glass text-white"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <div className="card-ui p-8">
            <p className="text-[#AACDDC] text-lg mb-3">
              Total Candidates
            </p>

            <h2 className="text-5xl font-extrabold text-[#81A6C6]">
              {totalCandidates}
            </h2>
          </div>

          <div className="card-ui p-8">
            <p className="text-[#AACDDC] text-lg mb-3">
              Shortlisted
            </p>

            <h2 className="text-5xl font-extrabold text-green-400">
              {shortlistedCandidates}
            </h2>
          </div>

          <div className="card-ui p-8">
            <p className="text-[#AACDDC] text-lg mb-3">
              Fraud Suspected
            </p>

            <h2 className="text-5xl font-extrabold text-red-400">
              {fraudCandidates}
            </h2>
          </div>
        </div>

        {/* CANDIDATE CARDS */}
        <div className="grid xl:grid-cols-2 gap-10">

          {filteredInterviews.map(
            (interview) => (
              <div
                key={interview._id}
                className="card-ui p-8"
              >

                {/* TOP */}
                <div className="flex justify-between items-start gap-5 flex-wrap mb-8">

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#81A6C6] to-[#AACDDC] flex items-center justify-center text-[#0f1720] text-2xl font-bold shadow-lg">
                      {interview.candidateName?.charAt(
                        0
                      )}
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold text-[#F3E3D0]">
                        {
                          interview.candidateName
                        }
                      </h2>

                      <p className="text-[#cbd5e1] mt-1">
                        AI Interview Candidate
                      </p>
                    </div>
                  </div>

                  {/* SCORE BADGE */}
                  <div className="glass px-5 py-3 rounded-2xl text-center">

                    <p className="text-sm text-[#AACDDC] mb-1">
                      AI Score
                    </p>

                    <h3 className="text-3xl font-extrabold text-[#81A6C6]">
                      {interview.score}
                    </h3>
                  </div>
                </div>

                {/* STATUS BADGES */}
                <div className="flex flex-wrap gap-4 mb-8">

                  {/* Confidence */}
                  <div className="px-4 py-2 rounded-full bg-[#81A6C6]/20 border border-[#81A6C6]/20 text-[#AACDDC] font-semibold text-sm">
                    Confidence:{" "}
                    {
                      interview.confidenceLevel
                    }
                  </div>

                  {/* Classification */}
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                      interview.classification ===
                      "Job Ready"
                        ? "bg-green-500/20 border-green-500/30 text-green-300"
                        : interview.classification ===
                          "Requires Training"
                        ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
                        : "bg-red-500/20 border-red-500/30 text-red-300"
                    }`}
                  >
                    {
                      interview.classification
                    }
                  </div>

                  {/* Fraud */}
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                      interview.fraudDetected
                        ? "bg-red-500/20 border-red-500/30 text-red-300"
                        : "bg-green-500/20 border-green-500/30 text-green-300"
                    }`}
                  >
                    {interview.fraudDetected
                      ? "⚠ Fraud Suspected"
                      : "✅ Genuine"}
                  </div>
                </div>

                {/* SCORE BAR */}
                <div className="mb-10">
                  <div className="flex justify-between text-sm text-[#cbd5e1] mb-3">
                    <span>
                      Interview Score
                    </span>

                    <span>
                      {interview.score}/100
                    </span>
                  </div>

                  <div className="w-full h-4 bg-[#1a2432] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#81A6C6] to-[#AACDDC]"
                      style={{
                        width: `${interview.score}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* RESPONSES */}
                <div>
                  <h3 className="text-2xl font-bold text-[#F3E3D0] mb-6">
                    Candidate Responses
                  </h3>

                  <div className="space-y-5">

                    {interview.responses.map(
                      (
                        response,
                        index
                      ) => (
                        <div
                          key={index}
                          className="glass rounded-2xl p-5"
                        >
                          <p className="text-[#81A6C6] font-bold text-lg mb-3">
                            Q{index + 1}:{" "}
                            {
                              response.question
                            }
                          </p>

                          <p className="text-[#F3E3D0] leading-relaxed">
                            {
                              response.answer
                            }
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* EMPTY STATE */}
        {filteredInterviews.length ===
          0 && (
          <div className="card-ui p-16 text-center mt-10">
            <h2 className="text-3xl font-bold text-[#F3E3D0] mb-4">
              No Candidates Found
            </h2>

            <p className="text-[#cbd5e1]">
              Try searching with another name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;