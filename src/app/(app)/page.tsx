// app/page.jsx
'use client'; // Required for interactivity (hooks, animations)


import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  // Neon glow animation for buttons
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F15] text-[#E0E0E0]">
      <Head>
        <title>StudyFutura | Collaborative Learning Platform</title>
        <meta name="description" content="Next-gen virtual study groups with AI tools" />
      </Head>

      {/* Navbar */}
      {/* <nav className="px-6 py-4 flex justify-between items-center border-b border-[#252535]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#6C4DF6] rounded-full"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
            StudyFutura
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-[#00F0FF] transition-all">Features</a>
          <a href="#" className="hover:text-[#00F0FF] transition-all">Pricing</a>
          <a href="#" className="hover:text-[#00F0FF] transition-all">Login</a>
        </div>
        <button className="md:hidden">☰</button>
      </nav> */}

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
            Collaborate Like It's 2050
          </span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">
          Virtual study groups with AI-powered tools, real-time collaboration, and zero distractions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register"> 
          <button
            className={`px-8 py-3 rounded-full cursor-pointer bg-[#6C4DF6] text-white font-bold transition-all 
              ${isHovered ? 'shadow-[0_0_20px_#6C4DF6]' : 'shadow-[0_0_10px_#6C4DF6]'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Join Free
            </button>
          </Link>
          <button className="px-8 py-3 rounded-full border border-[#00F0FF] text-[#00F0FF] flex items-center justify-center gap-2">
            Watch Demo <span>→</span>
          </button>
        </div>
        <div className="mt-20 max-w-4xl mx-auto bg-[#1A1A25] rounded-xl p-1 backdrop-blur-md">
          {/* Placeholder for app screenshot/illustration */}
          <div className="h-80 bg-gradient-to-br from-[#1A1A25] to-[#252535] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#6C4DF6] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <p className="text-[#00F0FF]">App Interface Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="border-b-2 border-[#00F0FF] pb-2">Powerful Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '💬',
              title: 'Real-Time Chat',
              desc: 'WebSocket-powered chat with markdown support.'
            },
            {
              icon: '🤖',
              title: 'AI Flashcards',
              desc: 'Generate flashcards from your notes using GPT-4.'
            },
            {
              icon: '📹',
              title: 'Video Rooms',
              desc: 'Jitsi-powered HD video with screen sharing.'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#1A1A25] p-6 rounded-xl border border-[#252535] hover:border-[#6C4DF6] transition-all hover:shadow-lg hover:shadow-[#6C4DF6]/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-[#B0B0B0]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="border-b-2 border-[#00F0FF] pb-2">What Users Say</span>
        </h2>
        <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex-shrink-0 w-80 bg-[#1A1A25] p-6 rounded-xl border border-transparent hover:border-[#00F0FF] transition-all"
              style={{ backgroundImage: 'linear-gradient(to bottom, #1A1A25, #0F0F15)' }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#6C4DF6] mr-4"></div>
                <div>
                  <h4 className="font-bold">Alex M.</h4>
                  <p className="text-sm text-[#B0B0B0]">CS Student</p>
                </div>
              </div>
              <p className="italic">"This app made my study group 10x more productive. The whiteboard is 🔥!"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1A1A25] to-[#0F0F15] py-20" id='register'>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Study Sessions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students learning smarter, not harder.</p>
          <Link href="/register">
            <button className="px-8 py-3 cursor-pointer rounded-full bg-[#00F0FF] text-[#0F0F15] font-bold hover:shadow-[0_0_20px_#00F0FF] transition-all">
             Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A25] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-[#6C4DF6] rounded-full"></div>
              <span className="text-xl font-bold">StudyFutura</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#00F0FF]">Privacy</a>
              <a href="#" className="hover:text-[#00F0FF]">Terms</a>
              <a href="#" className="hover:text-[#00F0FF]">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#252535] text-center text-[#B0B0B0]">
            <p>© {new Date().getFullYear()} StudyFutura. Built for the future of learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}