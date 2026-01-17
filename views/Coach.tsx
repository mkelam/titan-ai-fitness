import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface Message {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: Date;
}

// Coach personality responses
const getCoachGreeting = (personality: string, userName: string, streak: number) => {
  switch (personality) {
    case 'Sergeant':
      return streak > 0
        ? `${userName}! ${streak}-day streak. Impressive discipline. What's the mission today?`
        : `${userName}! Time to establish discipline. What are we conquering today?`;
    case 'Hype-Man':
      return streak > 0
        ? `YOOO ${userName}! 🔥 ${streak} days STRAIGHT! You're absolutely KILLING IT! What's the vibe today?!`
        : `${userName}!! Let's GOOO! Today's the day we start something LEGENDARY! What do you need?!`;
    default: // Sage
      return streak > 0
        ? `Welcome back, ${userName}. ${streak} days of consistent effort - that's true strength building. How may I guide you today?`
        : `Greetings, ${userName}. Every journey begins with a single step. What would you like to explore?`;
  }
};

const getCoachResponse = (personality: string, topic: string): string => {
  const responses: Record<string, Record<string, string>> = {
    Sage: {
      motivation: "Remember, the iron doesn't lie. Each rep is a conversation with your future self. Trust the process and the results will follow.",
      nutrition: "Nutrition is the foundation upon which strength is built. Consider protein your primary ally - aim for 1.6-2.2g per kg of body weight.",
      form: "Form is the language of efficiency. A controlled, mindful movement will always outperform reckless weight. Quality breeds progress.",
      recovery: "Rest is not weakness - it's where adaptation occurs. Sleep 7-9 hours, manage stress, and let your body rebuild stronger.",
      default: "What specific aspect of your journey would you like to explore deeper?"
    },
    Sergeant: {
      motivation: "NO EXCUSES! Your body can handle it - it's your MIND that quits first. Push through that wall, soldier!",
      nutrition: "FUEL THE MACHINE! Protein at every meal, complex carbs for energy, vegetables for the micronutrients. No junk!",
      form: "TECHNIQUE IS EVERYTHING! I'd rather see 50kg with perfect form than 100kg with garbage movement. Check your ego!",
      recovery: "REST IS PART OF TRAINING! You grow OUTSIDE the gym. Sleep, hydrate, stretch. That's an ORDER!",
      default: "What's the problem? State your objective clearly!"
    },
    'Hype-Man': {
      motivation: "BRO YOU GOT THIS!! 💪 Every single person who ever achieved GREATNESS started exactly where you are RIGHT NOW!",
      nutrition: "Okay okay LISTEN - protein is your BEST FRIEND! Chicken, eggs, fish - these are your GAINS MAKERS! 🍗💪",
      form: "Form check time! Look, perfect form = PERFECT GAINS! Slow it down, feel those muscles WORKING! You're doing AMAZING!",
      recovery: "REST DAY = GROWTH DAY! 🛏️ Your muscles are literally getting BIGGER while you sleep! How COOL is that?!",
      default: "What's on your mind?! I'm HERE for you! Let's figure this out TOGETHER! 🙌"
    }
  };

  const personalityResponses = responses[personality] || responses.Sage;

  // Simple keyword matching
  const lowerTopic = topic.toLowerCase();
  if (lowerTopic.includes('motivat') || lowerTopic.includes('tired') || lowerTopic.includes('give up')) {
    return personalityResponses.motivation;
  }
  if (lowerTopic.includes('eat') || lowerTopic.includes('food') || lowerTopic.includes('protein') || lowerTopic.includes('diet') || lowerTopic.includes('nutri')) {
    return personalityResponses.nutrition;
  }
  if (lowerTopic.includes('form') || lowerTopic.includes('technique') || lowerTopic.includes('hurt') || lowerTopic.includes('pain')) {
    return personalityResponses.form;
  }
  if (lowerTopic.includes('rest') || lowerTopic.includes('sleep') || lowerTopic.includes('recover') || lowerTopic.includes('sore')) {
    return personalityResponses.recovery;
  }

  return personalityResponses.default;
};

export const AICoachChatView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { profile, stats, goals } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const coachName = goals.coachPersonality || 'Sage';
  const userName = profile?.name || 'Champion';

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = getCoachGreeting(coachName, userName, stats.streak);
      setMessages([{
        id: `msg_${Date.now()}`,
        role: 'coach',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate coach thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const coachResponse = getCoachResponse(coachName, userMessage.content);

    const coachMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'coach',
      content: coachResponse,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, coachMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick prompts
  const quickPrompts = [
    "I need motivation",
    "Nutrition tips",
    "Form advice",
    "Recovery help"
  ];

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title={`Coach ${coachName}`}
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="tune"
          onRightClick={() => setView(View.COACH_SELECTION)}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'coach' && (
                <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center mr-2 shrink-0">
                  <span className="material-symbols-rounded text-neon text-sm">smart_toy</span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.role === 'user'
                    ? 'bg-neon text-black rounded-br-sm'
                    : 'glass-panel rounded-bl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-black/50' : 'text-white/50'}`}>
                  {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center mr-2">
                <span className="material-symbols-rounded text-neon text-sm">smart_toy</span>
              </div>
              <div className="glass-panel rounded-2xl rounded-bl-sm p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-2 rounded-full glass-light text-xs whitespace-nowrap hover:bg-white/10 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="glass-panel border-t border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your coach anything..."
              className="glass-input flex-1 rounded-full px-4 py-3 text-white placeholder-gray-500"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                input.trim() && !isTyping
                  ? 'bg-neon text-black shadow-[0_0_15px_rgba(0,255,157,0.4)]'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              <span className="material-symbols-rounded">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Coach Selection Screen
export const CoachSelectionView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { goals, setGoals } = useApp();
  const [selected, setSelected] = useState(goals.coachPersonality);

  const coaches = [
    {
      id: 'Sage' as const,
      icon: 'psychology',
      name: 'The Sage',
      personality: 'Calm, analytical, philosophical',
      quote: '"Strength is a journey, not a destination."',
      color: 'from-blue-500/20 to-purple-500/20'
    },
    {
      id: 'Sergeant' as const,
      icon: 'military_tech',
      name: 'The Sergeant',
      personality: 'Strict, disciplined, no-nonsense',
      quote: '"No excuses! Results only!"',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 'Hype-Man' as const,
      icon: 'celebration',
      name: 'The Hype-Man',
      personality: 'Energetic, encouraging, enthusiastic',
      quote: '"YOU GOT THIS!! Let\'s GOOO!"',
      color: 'from-yellow-500/20 to-green-500/20'
    }
  ];

  const handleSelect = () => {
    setGoals(prev => ({ ...prev, coachPersonality: selected }));
    setView(View.AI_COACH_CHAT);
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Choose Your Coach" leftIcon="arrow_back" onLeftClick={() => setView(View.AI_COACH_CHAT)} />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <p className="text-white/70 text-center mb-6">
            Your AI coach adapts to your preferred communication style
          </p>

          <div className="space-y-4">
            {coaches.map(coach => (
              <GlassCard
                key={coach.id}
                className={`cursor-pointer transition-all border ${
                  selected === coach.id
                    ? 'border-neon bg-gradient-to-br ' + coach.color
                    : 'border-transparent hover:border-white/20'
                }`}
                onClick={() => setSelected(coach.id)}
              >
                <div className="flex gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${
                    selected === coach.id ? 'bg-neon text-black' : 'bg-white/10'
                  }`}>
                    <span className="material-symbols-rounded text-3xl">{coach.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{coach.name}</h3>
                    <p className="text-sm text-white/70 mb-2">{coach.personality}</p>
                    <p className="text-xs italic text-white/50">{coach.quote}</p>
                  </div>
                  {selected === coach.id && (
                    <span className="material-symbols-rounded text-neon">check_circle</span>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="glass-panel border-t border-white/10 p-4">
          <Button fullWidth onClick={handleSelect}>
            SELECT COACH
          </Button>
        </div>
      </div>
    </div>
  );
};
