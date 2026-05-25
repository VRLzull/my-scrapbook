import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Disc, Heart, 
  GraduationCap, Lock, Play, Mail, Sparkles, CheckCircle2, Circle, Trash2
} from 'lucide-react';

// Content exactly as requested with premium styling
const PAGES = [
  {
    id: 'cover',
    type: 'cover',
    title: 'welcome',
    badge: 'A Little Memory Lane for Aaliyah Ryanzara ✨',
    subtitle: 'Selamat datang di tempat kecil yang isinya banyak cerita tentang kamu.',
    extra: 'Tentang tawa kecil, moment random, hari-hari sederhana, dan kenangan yang ternyata masih aku ingat sampai sekarang.\n\nAku cuma nggak mau semuanya hilang begitu aja. Jadi aku bikin tempat ini… supaya semuanya tetap punya rumah.',
    buttonText: 'open memories'
  },
  {
    id: 'memories-1',
    type: 'memories',
    title: 'little memories',
    desc: 'Aku nggak sadar ternyata kita punya cukup banyak kenangan sampai semuanya terkumpul di sini.',
    photos: [
      { url: '/1.jpeg', caption: 'masih jadi salah satu foto favoritku.' },
      { url: '/2.jpeg', caption: 'foto sederhana, tapi momentnya nggak sesederhana itu.' },
      { url: '/4.jpeg', caption: 'aku suka hari ini.' },
      { url: '/5.jpeg', caption: 'ternyata moment kecil bisa jadi kenangan besar ya.' },
    ]
  },
  {
    id: 'memories-2',
    type: 'memories',
    title: 'more memories',
    photos: [
      { url: '/6.jpeg', caption: 'senyummu di foto ini masih sama seperti yang aku inget.' },
      { url: '/7.jpeg', caption: 'random, tapi berarti.' },
      { url: '/8.jpeg', caption: 'salah satu hari yang nggak pengen aku lupain.' },
      { url: '/9.jpeg', caption: 'kadang foto bisa nyimpen perasaan lebih lama daripada ingatan.' },
    ]
  },
  {
    id: 'memories-3',
    type: 'memories',
    title: 'every moment counts',
    photos: [
      { url: '/10.jpeg', caption: 'moment yang ngga terduga tapi manis.' },
      { url: '/11.jpeg', caption: 'setiap sudutnya punya cerita sendiri.' },
      { url: '/12.jpeg', caption: 'cerita kita masih terus berlanjut.' },
      { url: '/13.jpeg', caption: 'tawa yang selalu bikin hariku beda.' },
      { url: '/14.jpeg', caption: 'moment sederhana yang berarti.' },
      { url: '/WhatsApp Image 2026-05-24 at 11.32.43 PM.jpeg', caption: 'aku bersyukur kenal kamu.' },
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
    badge: 'Selamat yaa, Aaliyah Ryanzara 🤍',
    message: 'Setelah semua perjuangan panjang itu, akhirnya kamu sampai juga di titik ini.',
    subMessage: 'Aku harap hari wisudamu dipenuhi banyak senyum, banyak rasa bangga, dan banyak orang yang sayang sama kamu. Karena kamu memang pantas mendapatkan semua hal baik itu.',
    extra: 'Dan untuk semua versi dirimu yang pernah capek, nangis, stres, atau pengen nyerah… lihat sekarang. Kamu berhasil sampai sejauh ini.'
  },
  {
    id: 'wishlist',
    type: 'wishlist',
    title: 'our wishlist',
    desc: 'Beberapa hal yang pengen aku lakuin atau tempat yang pengen aku kunjungi bareng kamu.',
    items: [
      { text: 'Nonton senja di pinggir pantai', checked: false },
      { text: 'Makan es krim favorit bareng', checked: true },
      { text: 'Jalan-jalan ke toko buku seharian', checked: false },
      { text: 'Foto box lucu bareng lagi', checked: true },
      { text: 'Keliling kota naik motor malam hari', checked: false },
      { text: 'Masak bareng (walaupun berantakan)', checked: false },
    ]
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
      { title: 'Rumah Ke Rumah', artist: 'Hindia', audio: '/Rumah Ke Rumah.mp3' },
      { title: 'Secukupnya', artist: 'Hindia', audio: '/Hindia - Secukupnya Lyric Video - OST. Nanti Kita Cerita Tentang Hari Ini.mp3' },
      { title: 'Cincin', artist: 'Hindia', audio: '/Hindia - Cincin Official Lyric Video.mp3' },
      { title: 'Membasuh', artist: 'Hindia', audio: '/Hindia - Membasuh ft. Rara Sekar Official Music Video.mp3' },
      { title: 'Ramai Sepi Bersama', artist: 'Hindia', audio: '/Ramai Sepi Bersama.mp3' },
      { title: 'Untuk Apa / Untuk Apa?', artist: 'Hindia', audio: '/Hindia - Untuk Apa _ Untuk Apa_ Official Music Video.mp3' },
      { title: 'Kita ke Sana', artist: 'Hindia', audio: '/Hindia - Kita ke Sana Official Lyric Video.mp3' },
      { title: 'Berdansalah, Karir Tak Ada Artinya', artist: 'Hindia', audio: '/Hindia - Berdansalah, Karir Tak Ada Artinya Official Lyric Video.mp3' },
      { title: 'Dehidrasi', artist: 'Hindia', audio: '/Hindia - Dehidrasi ft. Petra Sihombing Official Music Video.mp3' },
      { title: 'Bayangkan Jika Kita Tidak Menyerah', artist: 'Hindia', audio: '/Hindia - Bayangkan Jika Kita Tidak Menyerah Official Lyric Video.mp3' },
      { title: 'Iya...Sebentar', artist: 'Hindia', audio: '/Hindia - Iya...Sebentar Official Lyric Video.mp3' },
    ]
  },
  {
    id: 'thank-you',
    type: 'end',
    title: 'thank you',
    message: 'Terima kasih untuk semua cerita yang pernah kita punya.\n\nTerima kasih untuk semua tawa, moment random, obrolan kecil, dan kenangan yang pernah kita lewati.\n\nMungkin sekarang semuanya udah berbeda. Tapi jujur, aku tetap bersyukur pernah kenal kamu.\n\nDan sekali lagi… selamat wisuda ya 🤍\n\nSemoga setelah ini hidupmu dipenuhi banyak hal baik, banyak kebahagiaan, dan orang-orang yang selalu menghargai kamu.',
    lastPageText: '“some memories never really leave.”',
    quote: '“you’ll always be one of my favorite stories.”'
  }
];

const PhotoCard = ({ photo, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <img 
                src={photo.url} 
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" 
                alt="Memory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 flex items-end p-3">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
            </div>
            <p className="font-handwritten text-gray-400 text-[10px] text-center mt-2 italic">klik untuk lihat pesan</p>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-50/10 to-cyan-50/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
            <Heart className="w-8 h-8 text-cyan-500/40 fill-cyan-500/20" />
            <p className="font-handwritten text-blue-100 text-lg leading-relaxed">
              {photo.caption}
            </p>
            <div className="w-8 h-[1px] bg-white/20" />
            <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Memory Card #{index + 1}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [starCount, setStarCount] = useState(40);
  
  // Wishlist State with LocalStorage Persistence
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('acha_wishlist');
    return saved ? JSON.parse(saved) : [
      { text: 'Menemukan hobi baru yang bikin happy', checked: false },
      { text: 'Solo traveling ke tempat impian', checked: false },
      { text: 'Sukses di karir/pekerjaan pertama', checked: false },
      { text: 'Tetap jadi orang yang baik dan tulus', checked: true },
      { text: 'Lebih banyak waktu untuk self-care', checked: false },
      { text: 'Mewujudkan mimpi yang selama ini tertunda', checked: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('acha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [newWishlistText, setNewWishlistText] = useState('');

  const audioRef = useRef(null);
  const totalPages = PAGES.length;

  useEffect(() => {
    if (window.innerWidth < 768) setStarCount(15);
  }, []);

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

  const changeTrack = (track) => {
    if (audioRef.current) {
      audioRef.current.src = track.audio;
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      setCurrentTrack(track.title);
    }
  };

  const toggleWishlistItem = (index) => {
    const newWishlist = [...wishlist];
    newWishlist[index].checked = !newWishlist[index].checked;
    setWishlist(newWishlist);
  };

  const removeWishlistItem = (index) => {
    const newWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(newWishlist);
  };

  const addWishlistItem = (e) => {
    e.preventDefault();
    if (newWishlistText.trim()) {
      setWishlist([...wishlist, { text: newWishlistText, checked: false }]);
      setNewWishlistText('');
    }
  };

  useEffect(() => {
    if (currentPage === PAGES.findIndex(p => p.type === 'playlist')) {
      // No action needed for now, but we could auto-play a specific track
    }
  }, [currentPage]);

  return (
    <div className="fixed inset-0 bg-[#020617] text-white font-sans overflow-hidden touch-none select-none">
      {/* 
        Note: If audio doesn't play, it might be due to browser autoplay policies.
        You can replace the src with a local file like: src="/music.mp3" 
        and put the file in the 'public' folder.
      */}
      <audio 
          ref={audioRef} 
          src="/Rumah Ke Rumah.mp3" 
          loop 
          preload="auto"
        />

      {/* Aesthetic Background Elements */}
      <div className="nebula-1" />
      <div className="nebula-2" />
      
      {/* Duck Characters Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -10, 0],
            rotate: [0, 5, 0] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] text-4xl opacity-40 grayscale-[0.3]"
        >
          🦆
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 15, 0],
            rotate: [0, -5, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[5%] text-3xl opacity-30 grayscale-[0.5]"
        >
          🦆
        </motion.div>
      </div>
      
      {/* Floating Stars/Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(starCount)].map((_, i) => (
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

      {/* Mobile Touch Navigation Overlay (Fallback) - Lower Z-Index to not block drag */}
      <div className="md:hidden fixed inset-0 z-20 pointer-events-none flex">
        {/* Ketuk Kiri -> Halaman Sebelumnya */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }} 
          className="w-1/5 h-full pointer-events-auto active:bg-white/5 transition-colors flex items-center justify-start pl-4"
        >
          {currentPage > 0 && <ChevronLeft className="w-8 h-8 text-white/20" />}
        </div>
        <div className="w-3/5 h-full pointer-events-none" />
        {/* Ketuk Kanan -> Halaman Selanjutnya */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }} 
          className="w-1/5 h-full pointer-events-auto active:bg-white/5 transition-colors flex items-center justify-end pr-4"
        >
          {currentPage < totalPages - 1 && <ChevronRight className="w-8 h-8 text-white/20" />}
        </div>
      </div>

      {/* Floating Music Disc */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {!isPlaying && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-[10px] text-amber-200/60 font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10"
            >
              Play Music
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-colors ${isPlaying ? 'text-pink-400' : 'text-amber-200'}`}
        >
          <Disc className={`w-8 h-8 ${isPlaying ? 'animate-spin-slow' : ''}`} />
        </motion.button>
      </div>

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
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 50;
                // Geser ke Kanan (tangan gerak ke kanan) -> Halaman Selanjutnya (Sesuai request user)
                if (offset.x > swipeThreshold) {
                  paginate(1);
                } 
                // Geser ke Kiri (tangan gerak ke kiri) -> Halaman Sebelumnya
                else if (offset.x < -swipeThreshold) {
                  paginate(-1);
                }
              }}
              initial={{ 
                opacity: 0, 
                x: window.innerWidth < 768 ? 50 : 100, 
                scale: 0.98 
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: window.innerWidth < 768 ? -50 : -100, 
                scale: 0.98 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full glass-card p-10 md:p-16 flex flex-col items-center scrollbar-hide touch-pan-y"
            >
              <div className="w-full h-full flex flex-col items-center relative overflow-y-auto scrollbar-hide">
                
                {/* Content Header Tag */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10 flex items-center gap-3"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400/80 font-bold px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
                    {PAGES[currentPage].badge || 'Memory Lane'}
                  </span>
                  {currentPage % 3 === 0 && <span className="text-xl animate-bounce">🦆</span>}
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
                      <div className={`grid ${PAGES[currentPage].photos.length > 3 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-6 w-full px-2`}>
                        {PAGES[currentPage].photos.map((photo, i) => (
                          <PhotoCard key={i} photo={photo} index={i} />
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
                        <h2 className="text-5xl font-serif text-blue-100 lowercase text-glow-blue">{PAGES[currentPage].title}</h2>
                        <p className="text-cyan-300 font-bold italic text-xl tracking-widest uppercase">{PAGES[currentPage].badge}</p>
                      </div>
                      <div className="space-y-8 max-w-[360px]">
                        <p className="text-gray-100 text-sm font-medium leading-relaxed px-6 py-4 rounded-3xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md italic">
                          "{PAGES[currentPage].message}"
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed px-4">{PAGES[currentPage].subMessage}</p>
                        <p className="text-cyan-300/40 text-[10px] italic leading-relaxed px-6 uppercase tracking-widest">{PAGES[currentPage].extra}</p>
                      </div>
                    </div>
                  )}

                  {PAGES[currentPage].type === 'wishlist' && (
                    <div className="w-full space-y-8 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h2 className="text-5xl font-serif text-blue-100 text-center lowercase text-glow-blue tracking-tight">{PAGES[currentPage].title}</h2>
                        <p className="text-gray-400 text-[10px] italic px-8 leading-relaxed font-sans">{PAGES[currentPage].desc}</p>
                      </div>

                      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 px-6 max-w-sm mx-auto w-full">
                        {wishlist.map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md group"
                          >
                            <div 
                              onClick={() => toggleWishlistItem(i)}
                              className="flex-1 flex items-center gap-4 cursor-pointer"
                            >
                              {item.checked ? (
                                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                              <span className={`text-sm font-medium transition-all ${item.checked ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                {item.text}
                              </span>
                            </div>
                            <button 
                              onClick={() => removeWishlistItem(i)}
                              className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      <form onSubmit={addWishlistItem} className="px-6 max-w-sm mx-auto w-full pb-4">
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={newWishlistText}
                            onChange={(e) => setNewWishlistText(e.target.value)}
                            placeholder="tambah wishlist baru..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-xs text-gray-200 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                          />
                          <button 
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-lg"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
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
                                <h4 className="font-serif text-cyan-500 text-sm font-bold mb-4 uppercase tracking-widest">A Little Letter...</h4>
                                <p className="font-handwritten text-gray-800 text-[15px] leading-relaxed whitespace-pre-line">
                                  {PAGES[currentPage].content}
                                </p>
                                <div className="mt-8 pt-6 border-t border-gray-100 text-right">
                                   <p className="font-handwritten text-cyan-500 text-sm italic">with love, someone who cares ✨</p>
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
                      <h2 className="text-5xl font-serif text-blue-100 text-center lowercase text-glow-blue tracking-tight">{PAGES[currentPage].title}</h2>
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
                             <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                               <Heart className="w-4 h-4 fill-current" />
                             </div>
                             <p className="font-handwritten text-gray-200 text-sm italic">{item}</p>
                           </motion.div>
                         ))}
                         <motion.div className="md:col-span-2 p-6 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 shadow-inner mt-4">
                            <p className="font-handwritten text-cyan-300 text-lg text-center leading-relaxed italic">{PAGES[currentPage].footer}</p>
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
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#020617] rounded-full border border-white/20 flex items-center justify-center shadow-2xl">
                                <Heart className="w-7 h-7 text-cyan-500 fill-cyan-500" />
                             </div>
                             <p className="font-handwritten text-xl text-gray-200 leading-relaxed italic whitespace-pre-line tracking-wide">
                               {PAGES[currentPage].message}
                             </p>
                             <div className="w-16 h-[1px] bg-white/10 mx-auto" />
                             <button onClick={() => setIsSecretRevealed(false)} className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.4em] pt-4 hover:text-cyan-300 transition-colors">Tutup Pesan</button>
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
                            onClick={() => changeTrack(track)}
                            className={`group p-5 rounded-3xl border transition-all cursor-pointer flex items-center gap-6 ${currentTrack === track.title ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner ${currentTrack === track.title ? 'bg-cyan-500 text-white animate-pulse' : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white'}`}>
                              <Play className="w-6 h-6 fill-current" />
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className={`text-base font-bold transition-colors ${currentTrack === track.title ? 'text-cyan-300' : 'text-gray-200 group-hover:text-white'}`}>{track.title}</h3>
                              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{track.artist}</p>
                            </div>
                            {currentTrack === track.title && (
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" 
                              />
                            )}
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
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={createHeartShower}
                        className="flex items-center gap-4 px-14 py-5 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 text-white text-xs font-bold tracking-[0.4em] uppercase transition-all shadow-[0_10px_40px_rgba(6,182,212,0.2)] backdrop-blur-md"
                      >
                        <Heart className="w-6 h-6 fill-current text-cyan-400" /> Tekan dengan tulus
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
                className={`h-1 rounded-full transition-all duration-700 ${currentPage === i ? 'bg-cyan-500 w-10 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'bg-white/10 w-2 hover:bg-white/30'}`}
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
              className="fixed pointer-events-none z-[100] text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
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
