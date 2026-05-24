import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Music, Disc, Heart, 
  GraduationCap, Lock, Play, Mail, Star, Sparkles, 
  Music2, Camera, Video, Moon, Send
} from 'lucide-react';

// Content exactly as requested with premium styling
const PAGES = [
  {
    id: 'cover',
    type: 'cover',
    title: 'welcome',
    badge: 'A Little Memory Lane ✨',
    subtitle: 'Selamat datang di tempat kecil yang isinya banyak cerita tentang kamu.',
    extra: 'Tentang tawa kecil, moment random, hari-hari sederhana, dan kenangan yang ternyata masih aku ingat sampai sekarang.',
    buttonText: 'open memories'
  },
  {
    id: 'memories-1',
    type: 'memories',
    title: 'little memories',
    desc: 'Aku nggak sadar ternyata kita punya cukup banyak kenangan sampai semuanya terkumpul di sini.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=600&auto=format&fit=crop', caption: 'masih jadi salah satu foto favoritku.' },
      { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop', caption: 'foto sederhana, tapi momentnya nggak sesederhana itu.' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', caption: 'aku suka hari ini.' },
    ]
  },
  {
    id: 'memories-2',
    type: 'memories',
    title: 'more memories',
    photos: [
      { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop', caption: 'ternyata moment kecil bisa jadi kenangan besar ya.' },
      { url: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=600&auto=format&fit=crop', caption: 'senyummu di foto ini masih sama seperti yang aku inget.' },
      { url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop', caption: 'random, tapi berarti.' },
      { url: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=600&auto=format&fit=crop', caption: 'salah satu hari yang nggak pengen aku lupain.' },
    ]
  },
  {
    id: 'video',
    type: 'video',
    title: 'moving memories',
    desc: 'Beberapa kenangan rasanya lebih hidup kalau diputar ulang.',
    quote: '"seperti pita film tua yang terus berputar..."',
  },
  {
    id: 'timeline',
    type: 'timeline',
    title: 'our story',
    nodes: [
      { title: 'Awal Kenal', desc: 'Awalnya cuma obrolan biasa. Tapi ternyata kamu jadi salah satu orang yang paling berkesan di hidupku.', emoji: '💬' },
      { title: 'Hari-Hari Random', desc: 'Kita pernah punya banyak moment sederhana yang ternyata sekarang jadi sesuatu yang dirindukan.', emoji: '🌟' },
      { title: 'Moment Bahagia', desc: 'Aku selalu suka lihat kamu bahagia. Sesimpel itu.', emoji: '🤍' },
      { title: 'Hari Sulit', desc: 'Walaupun nggak semua cerita kita sempurna, aku tetap bersyukur pernah ada di beberapa bagian hidupmu.', emoji: '🍂' },
    ]
  },
  {
    id: 'graduation',
    type: 'special',
    title: 'you really made it',
    badge: 'Selamat yaa 🤍',
    message: 'Setelah semua perjuangan panjang itu, akhirnya kamu sampai juga di titik ini.',
    subMessage: 'Aku harap hari wisudamu dipenuhi banyak senyum, banyak rasa bangga, dan banyak orang yang sayang sama kamu. Karena kamu memang pantas mendapatkan semua hal baik itu.',
    extra: 'Dan untuk semua versi dirimu yang pernah capek, nangis, stres, atau pengen nyerah… lihat sekarang. Kamu berhasil sampai sejauh ini.'
  },
  {
    id: 'honest-letter',
    type: 'letter',
    title: 'something honest',
    content: 'Aku sempat bingung mau masukin bagian ini atau nggak. Tapi kalau dipikir-pikir, mungkin ini satu-satunya kesempatan aku buat jujur lewat cara yang tenang.\n\nSampai sekarang… aku masih peduli sama kamu. Dan mungkin, sebagian perasaanku juga masih tetap tinggal.\n\nAku nggak bikin semua ini untuk bikin kamu nggak enak atau berharap sesuatu harus kembali seperti dulu. Aku cuma pengen kamu tahu kalau kamu masih jadi seseorang yang spesial buat aku.'
  },
  {
    id: 'likes',
    type: 'list',
    title: 'things i still like about you',
    items: [
      'cara kamu ketawa',
      'cara kamu cerita hal random',
      'cara kamu berusaha terlihat kuat',
      'cara kamu peduli sama orang lain',
      'cara kamu jadi diri sendiri',
    ],
    footer: 'dan banyak hal kecil lain yang mungkin bahkan nggak kamu sadari.'
  },
  {
    id: 'last-thing',
    type: 'secret',
    title: 'one last thing',
    buttonText: 'one last thing',
    message: 'Kalau suatu hari nanti kamu baca ini lagi… aku harap kamu tahu kalau pernah ada seseorang yang benar-benar tulus sayang sama kamu.\n\nDan walaupun sekarang semuanya berubah, rasa bangga dan rasa peduli itu ternyata belum ikut hilang.\n\nTerima kasih ya, karena pernah jadi bagian penting di hidupku.',
  },
  {
    id: 'playlist',
    type: 'playlist',
    title: 'songs that remind me of you',
    desc: 'Beberapa lagu ternyata bisa nyimpen perasaan lebih baik daripada kata-kata.',
    tracks: [
      { title: 'Secukupnya', artist: 'Hindia', audio: 'https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3' },
      { title: 'Rumah Ke Rumah', artist: 'Hindia', audio: 'https://assets.mixkit.co/music/preview/mixkit-tender-love-155.mp3' },
      { title: 'Evaluasi', artist: 'Hindia', audio: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3' },
    ]
  },
  {
    id: 'thank-you',
    type: 'end',
    title: 'thank you',
    message: 'Terima kasih untuk semua cerita yang pernah kita punya.\n\nTerima kasih untuk semua tawa, moment random, obrolan kecil, dan kenangan yang pernah kita lewati.\n\nMungkin sekarang semuanya udah berbeda. Tapi jujur, aku tetap bersyukur pernah kenal kamu.\n\nDan sekali lagi… selamat wisuda ya 🤍\n\nSemoga setelah ini hidupmu dipenuhi banyak hal baik, banyak kebahagiaan, dan orang-orang yang selalu menghargai kamu.',
    lastPageText: 'Mungkin scrapbook ini selesai di halaman terakhir. Tapi beberapa kenangan ternyata nggak benar-benar selesai.',
    quote: '“you’ll always be one of my favorite stories.”'
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  const totalPages = PAGES.length;

  const paginate = (dir) => {
    const next = currentPage + dir;
    if (next >= 0 && next < totalPages) {
      setCurrentPage(next);
      setIsLetterOpen(false);
      setIsSecretRevealed(false);
    }
  };

  const createHeartShower = () => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 3 + 2,
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => setHearts([]), 5000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(console.error);
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#09090b] text-white font-sans overflow-hidden touch-none select-none">
      <audio ref={audioRef} src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3" loop />

      {/* Aesthetic Background Elements */}
      <div className="nebula-1" />
      <div className="nebula-2" />
      
      {/* Floating Stars/Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Mobile Touch Navigation Overlay (Fallback) */}
      <div className="md:hidden fixed inset-0 z-30 pointer-events-none flex">
        {/* Ketuk Kiri -> Halaman Sebelumnya */}
        <div 
          onClick={() => paginate(-1)} 
          className="w-1/4 h-full pointer-events-auto active:bg-white/5 transition-colors flex items-center justify-start pl-4"
        >
          {currentPage > 0 && <ChevronLeft className="w-8 h-8 text-white/20" />}
        </div>
        <div className="w-2/4 h-full pointer-events-none" />
        {/* Ketuk Kanan -> Halaman Selanjutnya */}
        <div 
          onClick={() => paginate(1)} 
          className="w-1/4 h-full pointer-events-auto active:bg-white/5 transition-colors flex items-center justify-end pr-4"
        >
          {currentPage < totalPages - 1 && <ChevronRight className="w-8 h-8 text-white/20" />}
        </div>
      </div>

      {/* Floating Music Disc */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-colors ${isPlaying ? 'text-pink-400' : 'text-amber-200'}`}
      >
        <Disc className={`w-8 h-8 ${isPlaying ? 'animate-spin-slow' : ''}`} />
      </motion.button>

      {/* Main Experience Container */}
      <div className="w-full h-full flex items-center justify-center p-6 relative z-10">
        
        {/* Navigation - Desktop */}
        <button 
          onClick={() => paginate(-1)}
          disabled={currentPage === 0}
          className="hidden md:flex absolute left-12 z-40 w-16 h-16 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-0 transition-all text-amber-200/60 hover:text-amber-200"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>

        <div className="relative w-full max-w-[440px] md:max-w-2xl aspect-[3/4.8] md:aspect-[4/3] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x * velocity.x;
                // Geser ke Kiri (offset.x negatif) -> Halaman Selanjutnya
                if (swipe < -5000) paginate(1);
                // Geser ke Kanan (offset.x positif) -> Halaman Sebelumnya
                else if (swipe > 5000) paginate(-1);
              }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full glass-card p-10 md:p-16 flex flex-col items-center scrollbar-hide touch-pan-y"
            >
              <div className="w-full h-full flex flex-col items-center relative overflow-y-auto scrollbar-hide">
                
                {/* Content Header Tag */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-pink-400/80 font-bold px-5 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm">
                    {PAGES[currentPage].badge || 'Memory Lane'}
                  </span>
                </motion.div>

                {/* Page Content Switcher */}
                <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
                  
                  {PAGES[currentPage].type === 'cover' && (
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <motion.h1 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-7xl md:text-8xl font-serif text-amber-100 text-glow-gold leading-none lowercase"
                        >
                          {PAGES[currentPage].title}
                        </motion.h1>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xs mx-auto font-medium">
                          {PAGES[currentPage].subtitle}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs italic max-w-[280px] mx-auto leading-relaxed">
                        {PAGES[currentPage].extra}
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => paginate(1)}
                        className="px-10 py-4 rounded-full border-2 border-amber-200/30 text-amber-100 text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-200/10 transition-all shadow-xl"
                      >
                        {PAGES[currentPage].buttonText}
                      </motion.button>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'memories' && (
                    <div className="w-full space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif text-amber-100 lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                        {PAGES[currentPage].desc && <p className="text-gray-400 text-xs italic px-6 leading-relaxed">{PAGES[currentPage].desc}</p>}
                      </div>
                      <div className={`grid ${PAGES[currentPage].photos.length > 3 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                        {PAGES[currentPage].photos.map((photo, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? -1 : 1 }}
                            className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl group cursor-pointer"
                          >
                            <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                              <img src={photo.url} className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <Sparkles className="w-4 h-4 text-amber-200" />
                              </div>
                            </div>
                            <p className="font-handwritten text-gray-300 text-xs text-center leading-snug px-2">{photo.caption}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'video' && (
                    <div className="w-full space-y-12">
                      <div className="space-y-4">
                        <h2 className="text-5xl font-serif text-amber-100 lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                        <p className="text-gray-400 text-xs px-8 leading-relaxed italic">{PAGES[currentPage].desc}</p>
                      </div>
                      <div className="relative w-full aspect-video bg-black/40 rounded-3xl border border-white/10 shadow-inner flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                        <Play className="w-16 h-16 text-white/20 group-hover:text-pink-400/60 transition-all duration-500 scale-90 group-hover:scale-100" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                          <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Memories_01.mp4</span>
                        </div>
                      </div>
                      <p className="font-handwritten text-pink-300/60 text-2xl italic tracking-wide">{PAGES[currentPage].quote}</p>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'timeline' && (
                    <div className="w-full space-y-12 py-6">
                      <h2 className="text-5xl font-serif text-amber-100 text-center lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                      <div className="relative space-y-14 pl-12 border-l border-white/10 ml-6 text-left">
                        {PAGES[currentPage].nodes.map((node, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative group"
                          >
                            <div className="absolute -left-[61px] top-0 w-6 h-6 rounded-full bg-[#09090b] border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10 transition-colors group-hover:border-pink-400/50">
                              <span className="text-xs group-hover:scale-125 transition-transform">{node.emoji}</span>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-serif text-amber-100 italic tracking-wide group-hover:text-pink-300 transition-colors">{node.title}</h3>
                              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">{node.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'special' && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                      <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="relative"
                      >
                        <GraduationCap className="w-28 h-28 text-amber-100 drop-shadow-glow" />
                        <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-pink-400 animate-pulse" />
                      </motion.div>
                      <div className="space-y-4">
                        <h2 className="text-6xl font-serif text-amber-100 lowercase text-glow-gold tracking-tighter">{PAGES[currentPage].title}</h2>
                        <p className="text-pink-300 font-bold italic text-xl tracking-widest uppercase">{PAGES[currentPage].badge}</p>
                      </div>
                      <div className="space-y-8 max-w-[360px]">
                        <p className="text-gray-100 text-sm font-medium leading-relaxed px-6 py-4 rounded-3xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md italic">
                          "{PAGES[currentPage].message}"
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed px-4">{PAGES[currentPage].subMessage}</p>
                        <p className="text-pink-300/40 text-[10px] italic leading-relaxed px-6 uppercase tracking-widest">{PAGES[currentPage].extra}</p>
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'letter' && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-14 w-full px-4">
                      <h2 className="text-5xl font-serif text-amber-100 lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                      <div className="relative w-full max-w-[280px] aspect-[3/2.2] group cursor-pointer" onClick={() => setIsLetterOpen(!isLetterOpen)}>
                         <div className="absolute inset-0 bg-white/5 rounded-3xl shadow-2xl flex items-center justify-center border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-colors">
                            <Mail className="w-12 h-12 text-amber-100/30 group-hover:scale-110 transition-transform" />
                         </div>
                         <AnimatePresence>
                            {isLetterOpen && (
                              <motion.div 
                                initial={{ y: 0, scale: 0.8, opacity: 0 }}
                                animate={{ y: -140, scale: 1.1, opacity: 1 }}
                                exit={{ y: 0, scale: 0.8, opacity: 0 }}
                                className="absolute inset-2 bg-white rounded-3xl p-8 text-left shadow-2xl z-20 border border-gray-200 overflow-y-auto max-h-[280px]"
                              >
                                <h4 className="font-serif text-pink-500 text-sm font-bold mb-4 uppercase tracking-widest">A Little Letter...</h4>
                                <p className="font-handwritten text-gray-800 text-[15px] leading-relaxed whitespace-pre-line">
                                  {PAGES[currentPage].content}
                                </p>
                                <div className="mt-8 pt-6 border-t border-gray-100 text-right">
                                   <p className="font-handwritten text-pink-500 text-sm italic">with love, someone who cares ✨</p>
                                </div>
                              </motion.div>
                            )}
                         </AnimatePresence>
                         <motion.div 
                            animate={{ rotateX: isLetterOpen ? 180 : 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl origin-top z-10 transition-shadow"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
                         />
                      </div>
                      <p className="text-[10px] text-pink-400/60 italic tracking-[0.3em] uppercase font-bold">Klik untuk {isLetterOpen ? 'menutup' : 'membuka'} surat ✉️</p>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'list' && (
                    <div className="w-full space-y-12 flex-1">
                      <h2 className="text-5xl font-serif text-amber-100 text-center lowercase text-glow-gold tracking-tight">{PAGES[currentPage].title}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4">
                         {PAGES[currentPage].items.map((item, i) => (
                           <motion.div 
                             key={i}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: i * 0.1 }}
                             whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                             className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-4 text-left shadow-lg group"
                           >
                             <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                               <Heart className="w-4 h-4 fill-current" />
                             </div>
                             <p className="font-handwritten text-gray-200 text-sm italic">{item}</p>
                           </motion.div>
                         ))}
                         <motion.div className="md:col-span-2 p-6 bg-pink-500/5 rounded-3xl border border-pink-500/20 shadow-inner mt-4">
                            <p className="font-handwritten text-pink-300 text-lg text-center leading-relaxed italic">{PAGES[currentPage].footer}</p>
                         </motion.div>
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'secret' && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-16 w-full px-8">
                      <div className="space-y-6">
                        <h2 className="text-5xl font-serif text-amber-100 lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                        <p className="text-gray-500 text-xs italic leading-relaxed px-4">Ketuk gembok ini jika kamu siap membaca sebuah pesan terakhir...</p>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {!isSecretRevealed ? (
                          <motion.button
                            key="lock"
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            onClick={() => setIsSecretRevealed(true)}
                            whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)" }}
                            whileTap={{ scale: 0.9 }}
                            className="w-32 h-32 rounded-full bg-white/5 border-2 border-amber-200/30 flex items-center justify-center relative overflow-hidden group shadow-2xl backdrop-blur-md"
                          >
                            <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
                            <Lock className="w-12 h-12 text-amber-200 animate-pulse relative z-10" />
                            <p className="absolute bottom-6 text-[8px] font-bold text-amber-200 tracking-[0.4em] uppercase">{PAGES[currentPage].buttonText}</p>
                          </motion.button>
                        ) : (
                          <motion.div
                            key="message"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="space-y-10 bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-white/10 backdrop-blur-2xl relative max-w-sm"
                          >
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#09090b] rounded-full border border-white/20 flex items-center justify-center shadow-2xl">
                                <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
                             </div>
                             <p className="font-handwritten text-xl text-gray-200 leading-relaxed italic whitespace-pre-line tracking-wide">
                               {PAGES[currentPage].message}
                             </p>
                             <div className="w-16 h-[1px] bg-white/10 mx-auto" />
                             <button onClick={() => setIsSecretRevealed(false)} className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.4em] pt-4 hover:text-pink-300 transition-colors">Tutup Pesan</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'playlist' && (
                    <div className="w-full space-y-12 flex-1">
                      <div className="space-y-4 text-center">
                        <h2 className="text-5xl font-serif text-amber-100 lowercase text-glow-gold">{PAGES[currentPage].title}</h2>
                        <p className="text-gray-500 text-xs italic px-8 leading-relaxed font-sans">{PAGES[currentPage].desc}</p>
                      </div>
                      
                      <div className="relative w-56 h-56 mx-auto group">
                         <motion.div 
                           animate={{ rotate: isPlaying ? 360 : 0 }}
                           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                           className="w-full h-full bg-[#121214] rounded-full border-8 border-white/5 shadow-2xl flex items-center justify-center relative overflow-hidden group-hover:border-white/10 transition-colors"
                         >
                            {[...Array(15)].map((_, i) => (
                              <div key={i} className="absolute inset-0 border border-white/5 rounded-full" style={{ margin: `${i * 6}px` }} />
                            ))}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/40 to-amber-500/40 flex items-center justify-center z-10 border-4 border-black/40 backdrop-blur-md">
                               <Disc className="w-12 h-12 text-white/60" />
                            </div>
                         </motion.div>
                         <div className="absolute -top-6 -right-6 w-5 h-28 bg-gray-400 rounded-full origin-top rotate-[35deg] shadow-2xl border-2 border-white/20 z-20 transition-transform group-hover:rotate-[30deg]" />
                      </div>

                      <div className="space-y-5 px-4">
                        {PAGES[currentPage].tracks.map((track, i) => (
                          <motion.div 
                            key={i} 
                            whileTap={{ scale: 0.98 }}
                            className="group p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all cursor-pointer flex items-center gap-6"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-inner">
                              <Play className="w-6 h-6 fill-current" />
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">{track.title}</h3>
                              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{track.artist}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'end' && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                      <div className="space-y-6">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                           <span className="text-6xl drop-shadow-2xl">🎓🌸</span>
                        </motion.div>
                        <h2 className="text-7xl font-serif text-amber-100 lowercase text-glow-gold tracking-tighter">{PAGES[currentPage].title}</h2>
                      </div>
                      <div className="space-y-12 max-w-[360px]">
                        <p className="text-gray-300 text-sm leading-relaxed font-sans font-medium whitespace-pre-line px-6 italic opacity-90">
                          {PAGES[currentPage].message}
                        </p>
                        <div className="space-y-6 py-10 border-t border-white/10 relative">
                           <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-pink-500/40" />
                           <p className="text-gray-500 text-xs italic px-10 leading-relaxed font-sans">{PAGES[currentPage].lastPageText}</p>
                           <p className="font-handwritten text-4xl text-pink-300 leading-tight tracking-tight mt-6 text-glow-rose italic">
                             {PAGES[currentPage].quote}
                           </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244,63,94,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={createHeartShower}
                        className="flex items-center gap-4 px-14 py-5 rounded-full bg-gradient-to-r from-pink-600/30 to-rose-600/30 border border-pink-500/50 text-white text-xs font-bold tracking-[0.4em] uppercase transition-all shadow-[0_10px_40px_rgba(244,63,94,0.2)] backdrop-blur-md"
                      >
                        <Heart className="w-6 h-6 fill-current text-pink-400" /> Tekan dengan tulus
                      </motion.button>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - Right Desktop */}
        <button 
          onClick={() => paginate(1)}
          disabled={currentPage === totalPages - 1}
          className="hidden md:flex absolute right-12 z-40 w-16 h-16 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-0 transition-all text-amber-200/60 hover:text-amber-200"
        >
          <ChevronRight className="w-10 h-10" />
        </button>

        {/* Navigation Indicator - Mobile */}
        <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-6 md:hidden pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[10px] text-white/30 tracking-[0.5em] uppercase font-bold drop-shadow-2xl flex items-center gap-3"
          >
            <ChevronLeft className="w-3 h-3" /> Geser Halaman <ChevronRight className="w-3 h-3" />
          </motion.div>
          <div className="flex gap-4 pointer-events-auto">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-1 rounded-full transition-all duration-700 ${currentPage === i ? 'bg-pink-500 w-10 shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'bg-white/10 w-2 hover:bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Heart Shower Overlay */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ y: "110vh", x: `${heart.left}vw`, opacity: 1, scale: 0, rotate: 0 }}
              animate={{ y: "-20vh", opacity: 0, scale: 2, rotate: 720 }}
              exit={{ opacity: 0 }}
              transition={{ duration: heart.duration, ease: "easeOut" }}
              className="fixed pointer-events-none z-[100] text-pink-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
              style={{ fontSize: heart.size }}
            >
              <Heart className="fill-current" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.4));
        }
      `}} />
    </div>
  );
};

export default App;
