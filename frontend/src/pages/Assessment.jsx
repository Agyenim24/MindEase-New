import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import Footer from '../components/Footer';

const stepsData = [
  {
    step: 1,
    category: 'Primary Focus',
    icon: 'target',
    question: 'What is your primary goal for using MindEase today?',
    subtitle: 'Select the main area where you would like to experience progress.',
    options: [
      {
        id: 'reduce-stress',
        title: 'Reduce Stress & Overwhelm',
        desc: 'Learn grounding tools to ease daily workplace and personal pressure.',
        icon: 'spa',
      },
      {
        id: 'improve-sleep',
        title: 'Improve Sleep & Rest Quality',
        desc: 'Build night-time routines and peaceful wind-down habits.',
        icon: 'nightlight',
      },
      {
        id: 'manage-anxiety',
        title: 'Manage Anxiety & Panic',
        desc: 'Access instant CBT coping techniques and breathing exercises.',
        icon: 'air',
      },
      {
        id: 'mental-clarity',
        title: 'Enhance Focus & Emotional Clarity',
        desc: 'Clear mental fog and cultivate mindful daily presence.',
        icon: 'lightbulb',
      },
    ],
  },
  {
    step: 2,
    category: 'Emotional State',
    icon: 'psychology',
    question: 'How have you been feeling over the last few days?',
    subtitle: 'Your honest response helps us personalize your mindfulness journey.',
    options: [
      {
        id: 'calm-balanced',
        title: 'Calm and balanced',
        desc: 'I feel grounded and emotionally steady.',
        icon: 'self_improvement',
      },
      {
        id: 'slightly-overwhelmed',
        title: 'Slightly overwhelmed',
        desc: 'Feeling a bit stretched but managing.',
        icon: 'waves',
      },
      {
        id: 'stressed-anxious',
        title: 'Stressed and anxious',
        desc: 'Looking for immediate relief and peace.',
        icon: 'warning_amber',
      },
      {
        id: 'foggy-unfocused',
        title: 'Seeking focus and clarity',
        desc: 'I want to clear mental fog and improve concentration.',
        icon: 'psychology_alt',
      },
    ],
  },
  {
    step: 3,
    category: 'Sleep & Energy',
    icon: 'bedtime',
    question: 'How would you rate your sleep and energy levels?',
    subtitle: 'Rest is fundamental to emotional resilience and mood stability.',
    options: [
      {
        id: 'deep-rested',
        title: 'Restful and consistent',
        desc: 'I wake up refreshed and energized most mornings.',
        icon: 'sentiment_very_satisfied',
      },
      {
        id: 'trouble-falling-asleep',
        title: 'Trouble falling asleep',
        desc: 'Racing thoughts keep me awake at bedtime.',
        icon: 'schedule',
      },
      {
        id: 'frequent-waking',
        title: 'Restless or fragmented sleep',
        desc: 'I wake up often during the night and feel fatigued.',
        icon: 'bedtime_off',
      },
      {
        id: 'low-energy',
        title: 'Persistent low energy',
        desc: 'Feeling drained throughout the day regardless of sleep hours.',
        icon: 'battery_alert',
      },
    ],
  },
  {
    step: 4,
    category: 'Stress Triggers',
    icon: 'thunderstorm',
    question: 'What tends to trigger your stress or anxiety most often?',
    subtitle: 'Identifying triggers allows your AI assistant to guide CBT reflections effectively.',
    options: [
      {
        id: 'work-career',
        title: 'Workload & Career Demands',
        desc: 'Deadlines, job expectations, or career uncertainty.',
        icon: 'work',
      },
      {
        id: 'relationships',
        title: 'Relationships & Social Dynamics',
        desc: 'Family, partner, or interpersonal communication stress.',
        icon: 'diversity_3',
      },
      {
        id: 'health-body',
        title: 'Health & Body Overwhelm',
        desc: 'Physical tension, health worries, or wellness anxiety.',
        icon: 'favorite',
      },
      {
        id: 'general-uncertainty',
        title: 'Future Uncertainty & Overthinking',
        desc: 'Repetitive worrying about upcoming decisions or unknown outcomes.',
        icon: 'loop',
      },
    ],
  },
  {
    step: 5,
    category: 'Support Preference',
    icon: 'tune',
    question: 'How do you prefer to receive mindfulness guidance?',
    subtitle: 'We will tailor your daily recommended sessions and AI personality tone.',
    options: [
      {
        id: 'cbt-guided',
        title: 'Structured CBT Exercises',
        desc: 'Step-by-step reflections and actionable coping frameworks.',
        icon: 'fact_check',
      },
      {
        id: 'conversational-ai',
        title: 'Empathetic AI Companion Chat',
        desc: 'Open, supportive conversations available 24/7.',
        icon: 'forum',
      },
      {
        id: 'audio-breathwork',
        title: 'Quick Audio & Breathing Micro-Sessions',
        desc: '2-5 minute ambient audio sessions for instant decompression.',
        icon: 'graphic_eq',
      },
      {
        id: 'journaling',
        title: 'Guided Daily Journaling',
        desc: 'Prompts to write and process emotions privately.',
        icon: 'edit_note',
      },
    ],
  },
];

function Assessment() {
  const { toggleMobileMenu } = useLayout();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStepData = stepsData[currentStep];

  const handleSelectOption = (optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background text-on-background">
      {/* Top App Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={toggleMobileMenu} className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl fill-icon">spa</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/chat" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="hidden sm:inline">Back to Chat</span>
          </Link>
        </div>
      </header>

      {/* Main Content Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col custom-scrollbar relative">
        {/* Ambient Gradient Background Circles */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        </div>

        <div className="max-w-[1280px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-8 sm:py-12 flex-grow">

          {!isCompleted ? (
            <>
              {/* Progress Bar & Header Header */}
              <div className="max-w-[720px] mx-auto mb-8 sm:mb-12 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-label-md font-bold text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Step {currentStep + 1} of {stepsData.length}
                  </span>
                  <span className="text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-xs">
                    {currentStepData.category}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20 p-0.5">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-sm shadow-primary/30"
                    style={{ width: `${((currentStep + 1) / stepsData.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Assessment Grid: Card + Side Panel */}
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Main Interactive Assessment Glass Panel Card */}
                <div className="w-full lg:max-w-[720px] glass-panel rounded-[2rem] p-6 sm:p-10 card-shadow border border-outline-variant/30 space-y-8 animate-slide-up">
                  {/* Question Title Header */}
                  <div className="text-center md:text-left space-y-3">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container shadow-sm">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {currentStepData.icon}
                      </span>
                    </span>
                    <h1 className="font-headline-lg text-2xl sm:text-[30px] font-bold text-on-surface leading-snug">
                      {currentStepData.question}
                    </h1>
                    <p className="font-body-md text-on-surface-variant text-sm sm:text-base leading-relaxed">
                      {currentStepData.subtitle}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {currentStepData.options.map((opt) => {
                      const isSelected = selectedAnswers[currentStep] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`group flex items-center p-4 sm:p-5 rounded-2xl border-2 transition-all text-left active:scale-[0.99] ${
                            isSelected
                              ? 'border-primary bg-primary-container/10 shadow-md shadow-primary/5'
                              : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container-low'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-surface-container text-primary group-hover:bg-primary-container group-hover:text-white'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                          </div>

                          <div className="flex-grow pr-2">
                            <p className="font-body-lg text-body-lg text-on-surface font-bold text-base sm:text-lg">
                              {opt.title}
                            </p>
                            <p className="text-label-md text-on-surface-variant text-xs sm:text-sm mt-0.5">
                              {opt.desc}
                            </p>
                          </div>

                          {/* Custom Radio Indicator Circle */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-primary bg-primary'
                                : 'border-outline-variant group-hover:border-primary'
                            }`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full bg-white transition-opacity ${
                                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Footer Action Controls */}
                  <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="flex items-center gap-2 text-primary font-bold text-sm hover:underline disabled:opacity-30 disabled:no-underline transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      <span>Back</span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!selectedAnswers[currentStep]}
                      className="bg-primary text-white rounded-full px-8 sm:px-10 py-3 font-bold text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2"
                    >
                      <span>{currentStep === stepsData.length - 1 ? 'Complete Assessment' : 'Next'}</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* Side Informational Panel (Stitch UI style) */}
                <aside className="w-full lg:w-80 space-y-6">
                  {/* Privacy Guaranteed */}
                  <div className="glass-panel p-6 rounded-3xl border border-outline-variant/20 flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-1">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        lock
                      </span>
                    </div>
                    <p className="font-bold text-on-surface text-sm">Privacy Guaranteed</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Your responses are HIPAA-encrypted and strictly confidential. We use this data solely to tailor your personalized care plan.
                    </p>
                  </div>

                  {/* Community Counter Banner */}
                  <div className="glass-panel p-6 rounded-3xl border border-outline-variant/20 overflow-hidden relative min-h-[160px] flex flex-col justify-end">
                    <div
                      className="absolute inset-0 bg-cover bg-center -z-10"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent -z-10" />
                    <p className="text-white font-bold text-xs text-center drop-shadow-sm">
                      Join 20,000+ members on their journey toward everyday emotional resilience.
                    </p>
                  </div>

                  {/* Testimonial Review */}
                  <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/20 text-center space-y-3">
                    <p className="text-xs text-on-surface-variant italic leading-relaxed">
                      "The MindEase assessment gave me the exact tools I needed during a stressful month."
                    </p>
                    <div className="flex justify-center gap-1 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-outline font-bold uppercase tracking-wider">— Verified User</p>
                  </div>
                </aside>

              </div>
            </>
          ) : (
            /* ── Assessment Completed Results Screen ─────────── */
            <div className="max-w-[840px] mx-auto glass-panel rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-outline-variant/30 text-center space-y-8 animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto shadow-lg shadow-secondary/20">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  task_alt
                </span>
              </div>

              <div className="space-y-3 max-w-xl mx-auto">
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                  Assessment Completed
                </span>
                <h1 className="font-headline-xl text-3xl md:text-4xl font-bold text-on-surface">
                  Your Personalized Care Plan is Ready
                </h1>
                <p className="text-on-surface-variant text-body-md text-sm sm:text-base leading-relaxed">
                  Based on your responses, we have customized your AI companion tone and selected evidence-based CBT exercises tailored for your wellness goals.
                </p>
              </div>

              {/* Recommended Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">forum</span>
                  </div>
                  <h4 className="font-bold text-on-surface text-sm">AI Companion Chat</h4>
                  <p className="text-xs text-on-surface-variant">Calibrated to your preferred tone for guided stress relief conversations.</p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">apps</span>
                  </div>
                  <h4 className="font-bold text-on-surface text-sm">7-Day Stress Relief</h4>
                  <p className="text-xs text-on-surface-variant">Recommended CBT program to build resilience and grounding habits.</p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">air</span>
                  </div>
                  <h4 className="font-bold text-on-surface text-sm">4-7-8 Breathing</h4>
                  <p className="text-xs text-on-surface-variant">2-minute micro-exercise to regulate your nervous system on demand.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link
                  to="/chat"
                  className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Start Chatting with Assistant</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="border border-primary/30 text-primary font-bold px-8 py-3.5 rounded-full hover:bg-primary/5 active:scale-95 transition-all text-sm flex items-center justify-center"
                >
                  View Dashboard
                </Link>
                <button
                  onClick={handleRestart}
                  className="text-on-surface-variant hover:text-primary font-semibold text-xs py-3 px-4 transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Assessment;
