import React from 'react';

function Chat() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* TopAppBar Context */}
      <header className="h-20 w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-primary">MindEase Assistant</h2>
            <p className="text-[12px] text-secondary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              AI Companion Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">history</button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">more_vert</button>
        </div>
      </header>

      {/* Chat Canvas — scrollable area */}
      <div className="flex-1 overflow-y-auto py-lg px-margin-mobile md:px-0 custom-scrollbar">
        <div className="max-w-[720px] mx-auto space-y-md">
          {/* Mood Check-in Component */}
          <section className="glass-panel rounded-3xl p-md mb-lg shadow-sm">
            <p className="text-center font-label-md text-label-md text-on-surface-variant mb-4">How are you feeling right now?</p>
            <div className="flex justify-between items-center max-w-sm mx-auto">
              <button className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-secondary-container transition-all">
                <span className="text-2xl">😌</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-secondary-container">Calm</span>
              </button>
              <button className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-surface-container-high transition-all">
                <span className="text-2xl">😐</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface">Okay</span>
              </button>
              <button className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-orange-100 transition-all">
                <span className="text-2xl">😓</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-orange-900">Stressed</span>
              </button>
              <button className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-red-100 transition-all">
                <span className="text-2xl">😰</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-red-900">Anxious</span>
              </button>
            </div>
          </section>

          {/* Bot Welcome Message */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary-container text-md" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="max-w-[85%] bg-white border border-outline-variant/30 p-md rounded-[1.25rem] rounded-bl-[4px] shadow-[0_20px_40px_-15px_rgba(0,89,186,0.04)]">
              <p className="text-on-surface leading-relaxed">Hello! I'm here to support your mental wellbeing. It's a brand new day—how can I help you find some peace today?</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex flex-row-reverse gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
              <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDni0wrqPfDc7i5fWj_iwbnHP6Drv0ITdlpPPLEWlSzoayGUqL6SypoKmmBkLdUNbsW3M69KROD9L8x_xIgvhxmdhfAIlX3VftgLW_IYt11C5-rOV-9Wrw56OqQ3NmZv0aSIBbyB7xN5j8QoIQkcWrlUqq--1yJiZ8P3-nIGq2X8HI41dNROq7Se6ZRjPdRuQyJay0SRnV9L7NLz5jiOxPwaV85gFwOgfYHpZPcjRW1_d__XO9YeZWXhC3oHimuvwe4QAK6yCcxYmmj" />
            </div>
            <div className="max-w-[85%] bg-primary text-on-primary p-md rounded-[1.25rem] rounded-br-[4px] shadow-lg shadow-primary/10">
              <p className="leading-relaxed">I've been feeling a bit overwhelmed with work lately. It's hard to switch off in the evenings.</p>
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary-container text-md" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="max-w-[85%] bg-white border border-outline-variant/30 p-md rounded-[1.25rem] rounded-bl-[4px] shadow-[0_20px_40px_-15px_rgba(0,89,186,0.04)] space-y-md">
              <p className="text-on-surface leading-relaxed">That sounds challenging. Disconnecting is a skill that takes practice. I've found that creating a 'transition ritual' can help signal to your brain that work is over.</p>
              
              {/* Mini Card Inside Chat */}
              <div className="bg-surface-container-low rounded-xl p-4 border-l-4 border-secondary">
                <h4 className="font-bold text-on-surface text-label-md mb-1">Recommended Exercise</h4>
                <p className="text-body-md text-on-surface-variant">5-Minute Desk Decompression: A guided visualization to leave your tasks at your workstation.</p>
                <button className="mt-3 px-4 py-2 bg-secondary text-on-secondary rounded-full font-label-sm text-label-sm hover:opacity-90 transition-all active:scale-95">Start Exercise</button>
              </div>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex gap-4 items-center pb-8">
            <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary-container text-md" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="bg-white border border-outline-variant/30 px-6 py-4 rounded-full shadow-sm">
              <div className="dot-flashing"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Interaction Area — pinned to bottom */}
      <div className="shrink-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-6 px-margin-mobile md:px-0">
        <div className="max-w-[720px] mx-auto">
          {/* Quick Actions chips */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
            <button className="flex-shrink-0 px-4 py-2 glass-panel border border-primary/20 rounded-full text-primary font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">air</span>
              Breathing Exercise
            </button>
            <button className="flex-shrink-0 px-4 py-2 glass-panel border border-secondary/20 rounded-full text-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              Mindfulness Tip
            </button>
            <button className="flex-shrink-0 px-4 py-2 glass-panel border border-tertiary/20 rounded-full text-tertiary font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
              CBT Reflection
            </button>
          </div>

          {/* Message Input */}
          <div className="relative glass-panel rounded-full p-2 border border-outline-variant/50 shadow-lg shadow-primary/5 group focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-surface">
            <div className="flex items-center px-4">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">add_circle</button>
              <input className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-on-surface placeholder:text-outline font-body-md py-3 px-4" placeholder="Tell me what's on your mind..." type="text" />
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors mr-3">mic</button>
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md hover:shadow-primary/30 transition-all active:scale-90">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-outline mt-3 px-12">
            MindEase AI provides emotional support but is not a replacement for clinical therapy. 
            In case of a crisis, please use the <span className="text-error font-bold">Emergency Support</span> button.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
