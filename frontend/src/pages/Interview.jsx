import axios from "axios";
import {
  useState,
  useEffect,
  useRef,
} from "react";

import * as faceapi from "face-api.js";

import Navbar from "../components/Navbar";

function Interview() {
  // Questions Array
  const questions = {
    "en-US": [
      "Tell me about yourself",
      "Why do you want this job?",
      "Describe your previous work experience",
      "What are your strengths?",
      "How do you handle difficult situations?",
    ],

    "hi-IN": [
      "अपने बारे में बताइए",
      "आप यह नौकरी क्यों चाहते हैं?",
      "अपने पिछले कार्य अनुभव के बारे में बताइए",
      "आपकी ताकत क्या है?",
      "आप कठिन परिस्थितियों को कैसे संभालते हैं?",
    ],

    "kn-IN": [
      "ನಿಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಸಿ",
      "ನೀವು ಈ ಕೆಲಸವನ್ನು ಏಕೆ ಬಯಸುತ್ತೀರಿ?",
      "ನಿಮ್ಮ ಹಿಂದಿನ ಕೆಲಸದ ಅನುಭವವನ್ನು ವಿವರಿಸಿ",
      "ನಿಮ್ಮ ಶಕ್ತಿಗಳು ಯಾವುವು?",
      "ಕಷ್ಟಕರ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ನೀವು ಹೇಗೆ ನಿಭಾಯಿಸುತ್ತೀರಿ?",
    ],

    "bn-IN": [
      "নিজের সম্পর্কে বলুন",
      "আপনি এই চাকরিটি কেন চান?",
      "আপনার পূর্ববর্তী কাজের অভিজ্ঞতা সম্পর্কে বলুন",
      "আপনার শক্তি কী?",
      "আপনি কঠিন পরিস্থিতি কীভাবে সামলান?",
    ],
  };
  const saveInterviewToDB = async (
    responsesData,
    evaluationData
  ) => {
    try {
      await axios.post(
        "http://localhost:5000/api/interviews",
        {
          candidateName: candidateName,

          responses: responsesData,

          score: evaluationData.score,

          confidenceLevel:
            evaluationData.confidenceLevel,

          classification:
            evaluationData.classification,

          fraudDetected:
            !faceDetected,
        }
      );

      console.log("Interview Saved");
    } catch (error) {
      console.log(error);
    }
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [candidateName, setCandidateName] =
    useState(
      localStorage.getItem("candidateName") || ""
    );
  const [language, setLanguage] = useState("en-US");

  const [responses, setResponses] = useState([]);

  const [interviewComplete, setInterviewComplete] =
    useState(false);

  // AI Evaluation State
  const [evaluation, setEvaluation] = useState(null);

  // Face Detection
  const videoRef = useRef();

  const [faceDetected, setFaceDetected] =
    useState(false);

  const currentQuestion =
    questions[language][
    currentQuestionIndex
    ];

  // Load Face API Models
  useEffect(() => {
    loadModels();
    startVideo();
  }, []);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
      "/models"
    );

    console.log("Face API Loaded");
  };

  // Start Webcam
  const startVideo = async () => {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true,
      });

    videoRef.current.srcObject = stream;
  };

  // Face Detection Logic
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (!videoRef.current) return;

      const detections =
        await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

      if (detections.length > 0) {
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
      }
    }, 1000);
  };

  // AI Voice Question
  const askQuestion = () => {
    // Stop previous speech
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        currentQuestion
      );

    // Set selected language
    speech.lang = language;

    // Voice settings
    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    // Get available voices
    const voices =
      window.speechSynthesis.getVoices();

    // Try matching voice language
    const selectedVoice = voices.find(
      (voice) =>
        voice.lang === language
    );

    // Apply matched voice
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    // Speak
    window.speechSynthesis.speak(
      speech
    );
  };

  // Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognition.lang = language;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setAnswer(transcript);
    };
  };

  // AI Evaluation Logic
  const evaluateInterview = (
    responsesData
  ) => {
    let totalScore = 0;

    let confidenceLevel = "Low";

    let classification =
      "Manual Review";

    // Keywords related to jobs/work
    const keywords = [
      "team",
      "work",
      "experience",
      "responsibility",
      "customer",
      "manage",
      "problem",
      "communication",
      "delivery",
      "warehouse",
    ];

    responsesData.forEach((item) => {
      const answer =
        item.answer.toLowerCase();

      // Score based on answer length
      totalScore += Math.min(
        answer.length / 5,
        20
      );

      // Score based on keywords
      keywords.forEach((word) => {
        if (answer.includes(word)) {
          totalScore += 5;
        }
      });
    });

    // Fraud Penalty
    if (!faceDetected) {
      totalScore -= 30;
    }

    // Maximum score 100
    totalScore = Math.min(
      totalScore,
      100
    );

    // Confidence Level
    if (totalScore > 75) {
      confidenceLevel = "High";
    } else if (totalScore > 50) {
      confidenceLevel = "Medium";
    }

    // Candidate Classification
    if (!faceDetected) {
      classification =
        "Suspected Fraud";
    } else if (totalScore > 80) {
      classification = "Job Ready";
    } else if (totalScore > 60) {
      classification =
        "Requires Training";
    } else if (totalScore > 40) {
      classification =
        "Manual Review";
    } else {
      classification =
        "Low Confidence";
    }

    const finalEvaluation = {
      score: Math.round(totalScore),
      confidenceLevel,
      classification,
    };

    setEvaluation(finalEvaluation);

    saveInterviewToDB(
      responsesData,
      finalEvaluation
    );
  };

  // Next Question
  const handleNextQuestion = () => {

    if (!candidateName) {
      alert("Please enter candidate name");

      return;
    }

    const updatedResponses = [
      ...responses,
      {
        question: currentQuestion,
        answer: answer,
      },
    ];

    setResponses(updatedResponses);

    setAnswer("");

    // Last Question
    if (
      currentQuestionIndex ===
      questions[language].length - 1
    ) {
      setInterviewComplete(true);

      evaluateInterview(
        updatedResponses
      );

      return;
    }

    setCurrentQuestionIndex(
      currentQuestionIndex + 1
    );
  };

  return (
    <div className="min-h-screen text-white hero-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto section-padding py-16 fade-in">

        {/* Webcam + Face Detection */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 mb-14">

  {/* Webcam Card */}
  <div className="card-ui p-6 relative overflow-hidden">

    <div className="absolute top-0 right-0 w-40 h-40 bg-[#81A6C6]/10 blur-3xl rounded-full"></div>

    <div className="relative z-10">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-[#F3E3D0]">
          Live Camera
        </h2>

        <div
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            faceDetected
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {faceDetected
            ? "✅ Verified"
            : "❌ Not Detected"}
        </div>
      </div>

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={handleVideoOnPlay}
          className="w-full h-[320px] object-cover rounded-3xl border-4 border-[#81A6C6]/30 shadow-2xl"
        />

        <div className="absolute inset-0 rounded-3xl border border-white/10"></div>
      </div>

      <div className="mt-5 flex items-center gap-3 text-[#AACDDC]">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

        <span className="text-sm">
          AI fraud detection monitoring enabled
        </span>
      </div>
    </div>
  </div>

  {/* Candidate Setup */}
  <div className="card-ui p-8">

    <div className="flex items-center gap-4 mb-8">

      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#81A6C6] to-[#AACDDC] flex items-center justify-center text-[#0f1720] text-2xl font-bold">
        AI
      </div>

      <div>
        <h2 className="text-3xl font-bold text-[#F3E3D0]">
          Interview Setup
        </h2>

        <p className="text-[#D2C4B4] mt-1">
          Configure candidate details before starting.
        </p>
      </div>
    </div>

    {/* Candidate Name */}
    <div className="mb-8">
      <label className="block text-lg font-semibold mb-3 text-[#F3E3D0]">
        Candidate Name
      </label>

      <input
        type="text"
        placeholder="Enter your full name"
        value={candidateName}
        onChange={(e) => {
          setCandidateName(e.target.value);

          localStorage.setItem(
            "candidateName",
            e.target.value
          );
        }}
        className="w-full p-5 rounded-2xl glass text-white text-lg"
      />
    </div>

    {/* Language */}
    <div>
      <label className="block text-lg font-semibold mb-3 text-[#F3E3D0]">
        Select Interview Language
      </label>

<select
  value={language}
  onChange={(e) =>
    setLanguage(e.target.value)
  }
  className="
    w-full
    p-5
    rounded-2xl
    glass
    text-white
    text-lg
    bg-[#0f1720]
    border
    border-[#81A6C6]/30
    outline-none
    appearance-none
    cursor-pointer
  "
>
<option
  value="en-US"
  className="bg-[#0f1720] text-white"
>
  English
</option>

<option
  value="hi-IN"
  className="bg-[#0f1720] text-white"
>
  Hindi
</option>

<option
  value="kn-IN"
  className="bg-[#0f1720] text-white"
>
  Kannada
</option>

<option
  value="bn-IN"
  className="bg-[#0f1720] text-white"
>
  Bengali
</option>
      </select>
    </div>

    {/* Progress */}
    <div className="mt-10">

      <div className="flex justify-between mb-3 text-sm text-[#AACDDC]">
        <span>Interview Progress</span>

        <span>
          {currentQuestionIndex + 1}/
          {questions[language].length}
        </span>
      </div>

      <div className="w-full h-4 bg-[#0f1720] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#81A6C6] to-[#AACDDC] transition-all duration-500"
          style={{
            width: `${
              ((currentQuestionIndex + 1) /
                questions[language].length) *
              100
            }%`,
          }}
        ></div>
      </div>
    </div>
  </div>
</div>

        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold gradient-text leading-tight">
            AI Interview
          </h1>

          <p className="text-[#D2C4B4] mt-4 text-lg">
            Multilingual AI-powered workforce screening
            experience.
          </p>
        </div>

        {!interviewComplete ? (
          <>
            {/* Question Card */}
            <div className="card-ui p-10 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#81A6C6]/10 blur-3xl rounded-full"></div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#F3E3D0]">
                  Question {currentQuestionIndex + 1}
                </h2>

                <div className="flex items-center gap-3 bg-[#81A6C6]/20 px-5 py-3 rounded-full text-sm font-semibold text-[#AACDDC]">

  <div className="flex gap-1">
    <span className="w-1 h-4 bg-[#81A6C6] rounded-full animate-pulse"></span>
    <span className="w-1 h-6 bg-[#AACDDC] rounded-full animate-pulse"></span>
    <span className="w-1 h-3 bg-[#F3E3D0] rounded-full animate-pulse"></span>
  </div>

  AI Speaking
</div>
              </div>

              <div className="bg-[#0f1720] border border-[#81A6C6]/20 rounded-3xl p-8">
                <p className="text-3xl leading-relaxed font-medium text-[#F3E3D0]">
                  {currentQuestion}
                </p>

                <button
                  onClick={askQuestion}
                  className="primary-btn mt-8"
                >
                  🔊 Play Question
                </button>
              </div>
            </div>

            {/* Response Card */}
            <div className="card-ui p-10">

              <h2 className="text-3xl font-bold mb-3 text-[#F3E3D0]">
                Candidate Response
              </h2>

              <p className="text-[#D2C4B4] mb-6">
                Please answer in the selected language.
              </p>

              <button
                onClick={startListening}
                className="secondary-btn"
              >
                🎤 Start Speaking
              </button>

              {/* Transcript */}
              <div className="mt-8 bg-[#0f1720] border border-[#81A6C6]/20 rounded-3xl p-6 min-h-[220px]">

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                  <span className="text-[#AACDDC] font-medium">
                    Live Transcript
                  </span>
                </div>

                <p className="text-xl leading-loose text-[#F3E3D0]">
                  {answer ||
                    "Your spoken response will appear here..."}
                </p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="primary-btn mt-8"
              >
                Next Question →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Completion Card */}
            <div className="card-ui p-14">

              <div className="text-center mb-10">
                <h2 className="text-5xl font-extrabold gradient-text mb-4">
                  Interview Completed
                </h2>

                <p className="text-[#D2C4B4] text-lg">
                  AI evaluation generated successfully.
                </p>
              </div>

              {/* Evaluation */}
              {evaluation && (
                <div className="glass rounded-3xl p-8 mb-10 border border-[#81A6C6]/20">

                  <h3 className="text-3xl font-bold text-[#AACDDC] mb-8">
                    AI Evaluation Report
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-[#0f1720] rounded-2xl p-6">
                      <p className="text-[#D2C4B4] mb-2">
                        Score
                      </p>

                      <h4 className="text-4xl font-bold text-[#81A6C6]">
                        {evaluation.score}/100
                      </h4>
                    </div>

                    <div className="bg-[#0f1720] rounded-2xl p-6">
                      <p className="text-[#D2C4B4] mb-2">
                        Confidence
                      </p>

                      <h4 className="text-2xl font-bold text-[#AACDDC]">
                        {evaluation.confidenceLevel}
                      </h4>
                    </div>

                    <div className="bg-[#0f1720] rounded-2xl p-6">
                      <p className="text-[#D2C4B4] mb-2">
                        Classification
                      </p>

                      <h4 className="text-2xl font-bold text-[#F3E3D0]">
                        {evaluation.classification}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Responses */}
              <div>
                <h3 className="text-3xl font-bold mb-8 text-[#F3E3D0]">
                  Candidate Responses
                </h3>

                <div className="space-y-6">
                  {responses.map((item, index) => (
                    <div
                      key={index}
                      className="glass rounded-3xl p-6"
                    >
                      <p className="font-bold text-[#81A6C6] text-xl mb-4">
                        Q{index + 1}: {item.question}
                      </p>

                      <p className="text-[#F3E3D0] text-lg leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
 export default Interview;