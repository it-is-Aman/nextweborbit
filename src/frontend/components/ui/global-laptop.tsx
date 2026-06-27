// 'use client'

// import React from 'react'
// import { motion, useScroll, useTransform } from 'framer-motion'

// export const GlobalScrollLaptop = ({ children }: { children: React.ReactNode }) => {
//     const { scrollYProgress } = useScroll()

//     // Position: Start RIGHT (40%) to avoid text overlap, Move to CENTER (0%) immediately, Stay CENTER, Move to RIGHT (22.5%)
//     const x = useTransform(scrollYProgress,
//         [0, 0.15, 0.85, 0.95],
//         ['30%', '0%', '0%', '22.5%']
//     )

//     // Vertical Position: Start UP (-22vh), Move to CENTER (0%) as it zooms in
//     const y = useTransform(scrollYProgress,
//         [0, 0.15, 0.85, 0.95],
//         ['-22vh', '0%', '0%', '0%']
//     )

//     // Scale: Small (0.45) -> Big (1) -> Small (0.35)
//     const scale = useTransform(scrollYProgress,
//         [0, 0.15, 0.85, 0.95],
//         [0.45, 1, 1, 0.35]
//     )

//     // Lid rotation: -30deg (Closed) -> 0deg (Open)
//     const lidRotate = useTransform(scrollYProgress, [0, 0.15], [-30, 0])

//     // Y-axis rotation: 45deg (Side) -> 0deg (Front)
//     const rotateY = useTransform(scrollYProgress, [0, 0.15], [45, 0])

//     // Content scroll inside laptop
//     const contentY = useTransform(scrollYProgress, [0.2, 0.85], ['0%', '-75%'])

//     // Browser bar visibility
//     const browserOpacity = useTransform(scrollYProgress,
//         [0, 0.05, 0.15, 0.2, 0.8, 0.85],
//         [1, 1, 1, 0, 0, 1]
//     )

//     // Laptop visibility (Keep visible at end to stop next to CTA)
//     const laptopOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 1])

//     return (
//         <motion.div
//             style={{ opacity: laptopOpacity }}
//             className="sticky top-0 w-full h-screen z-[100] flex items-center justify-center pointer-events-none overflow-hidden"
//         >
//             <motion.div
//                 style={{ x, y, scale, rotateY }}
//                 className="relative w-screen h-screen flex items-center justify-center"
//             >
//                 {/* Laptop Container */}
//                 <div className="relative w-[90vw] max-w-[1400px] h-[85vh] max-h-[900px]" style={{ transformStyle: 'preserve-3d' }}>
//                     {/* Laptop Lid */}
//                     <motion.div
//                         style={{ rotateX: lidRotate }}
//                         className="absolute inset-0 bg-[#0a0a0a] rounded-[20px] rounded-b-none border-[3px] border-[#2a2a2a] overflow-hidden shadow-2xl origin-bottom"
//                     >
//                         {/* Inner Screen Bezel */}
//                         <div className="absolute inset-[6px] bg-black rounded-[16px] rounded-b-none overflow-hidden ring-1 ring-white/10">

//                             {/* Webcam */}
//                             <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rounded-full border border-white/10 z-50">
//                                 <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-green-500/60 rounded-full" />
//                             </div>

//                             {/* Browser Bar */}
//                             <motion.div
//                                 style={{ opacity: browserOpacity }}
//                                 className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1a] flex items-center px-4 gap-3 z-40 border-b border-white/5"
//                             >
//                                 <div className="flex gap-2">
//                                     <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
//                                     <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
//                                     <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
//                                 </div>
//                                 <div className="flex-1 flex justify-center">
//                                     <div className="bg-[#000] px-4 py-1 rounded text-xs text-white/40 font-mono flex items-center gap-2">
//                                         <span className="text-white/30">🔒</span> nextweborbit.com
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             {/* Content Area */}
//                             <div className="absolute top-10 inset-x-0 bottom-0 bg-white overflow-hidden pointer-events-auto">
//                                 <motion.div
//                                     style={{ y: contentY }}
//                                     className="w-full min-h-full"
//                                 >
//                                     {children}
//                                 </motion.div>
//                             </div>
//                         </div>
//                     </motion.div>

//                     {/* Hinge Area */}
//                     <div className="absolute top-full left-0 right-0 h-2 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] shadow-inner z-10" />

//                     {/* Keyboard Base */}
//                     <div className="absolute top-full left-0 right-0 mt-1" style={{ transformStyle: 'preserve-3d' }}>
//                         <div className="relative bg-[#1a1a1a] rounded-[24px] rounded-t-none border-[2px] border-t-0 border-[#333] shadow-2xl" style={{
//                             transform: 'perspective(2000px) rotateX(75deg)',
//                             transformOrigin: 'top center',
//                             height: '300px',
//                             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//                         }}>
//                             {/* Metallic Texture Overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[22px] rounded-t-none pointer-events-none" />

//                             <div className="absolute inset-[12px] bg-[#0a0a0a] rounded-[16px] rounded-t-none overflow-hidden ring-1 ring-white/5">
//                                 {/* Keyboard Well - Recessed Area */}
//                                 <div className="absolute top-8 left-8 right-8 bg-[#141414] rounded-lg border border-white/5 p-1 shadow-inner">
//                                     {/* Keyboard Grid */}
//                                     <div className="grid grid-cols-[repeat(14,1fr)] gap-1 p-1">
//                                         {/* Row 1: Function Keys */}
//                                         <div className="col-span-14 grid grid-cols-[repeat(14,1fr)] gap-1 mb-1">
//                                             {Array.from({ length: 14 }).map((_, i) => (
//                                                 <div key={`row1-${i}`} className="bg-[#2a2a2a] rounded-[2px] h-3 border border-white/5 shadow-sm hover:bg-[#333] transition-colors" />
//                                             ))}
//                                         </div>
//                                         {/* Main Keys Grid */}
//                                         {Array.from({ length: 56 }).map((_, i) => (
//                                             <div key={`main-${i}`} className="bg-[#1f1f1f] rounded-[4px] h-8 border border-white/5 shadow-sm flex items-center justify-center hover:bg-[#2a2a2a] transition-colors">
//                                                 {/* Key Detail */}
//                                                 <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-[3px]" />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Trackpad - Glassy Look */}
//                                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#1a1a1a] rounded-xl border border-white/10 shadow-lg group overflow-hidden">
//                                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
//                                 </div>

//                                 {/* Base Thickness / Side Edge Simulation */}
//                                 <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2a2a2a] opacity-50" />
//                             </div>

//                             {/* Front Lip Depth */}
//                             <div className="absolute top-full left-[24px] right-[24px] h-4 bg-[#111] transform origin-top rotateX(-90deg) rounded-b-xl border-b border-white/10" />
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     )
// }
