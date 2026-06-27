'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { PortfolioItem } from '@/shared/types/api'

const PortfolioSection = () => {
    const [items, setItems] = useState<PortfolioItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`/api/portfolio?t=${Date.now()}`)
                const data = await response.json()
                if (data.success && data.data?.items) {
                    const filteredItems = data.data.items.filter(
                        (item: PortfolioItem) => item.type !== 'Our Product'
                    )
                    setItems(filteredItems)
                }
            } catch (error) {
                console.error('Failed to fetch portfolio:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPortfolio()
    }, [])

    if (isLoading) {
        return (
            <section className="bg-[#050505] min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#3b82f6]" />
            </section>
        )
    }

    if (items.length === 0) return null

    return <RetroPortfolioPlayer items={items} />
}

const RetroPortfolioPlayer = ({ items }: { items: PortfolioItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [controlState, setControlState] = useState<'idle' | 'left' | 'right' | 'up' | 'down'>('idle')
    const [isPlayPressed, setIsPlayPressed] = useState(false)
    const audioCtxRef = useRef<AudioContext | null>(null)

    const currentItem = items[currentIndex]

    // Sound Effect Function
    const playClickSound = () => {
        try {
            if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
                if (AudioContextClass) {
                    audioCtxRef.current = new AudioContextClass()
                }
            }

            const ctx = audioCtxRef.current
            if (!ctx) return

            if (ctx.state === 'suspended') {
                ctx.resume()
            }

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            // Short "blip" sound
            osc.type = 'sine'
            osc.frequency.setValueAtTime(800, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1)

            gain.gain.setValueAtTime(0.15, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

            osc.start()
            osc.stop(ctx.currentTime + 0.1)
        } catch {
            // Context might be blocked until user interaction, ignore
        }
    }

    const togglePlay = () => {
        playClickSound()
        if (currentItem.projectLink) {
            window.open(currentItem.projectLink, '_blank')
        }
    }

    const nextProject = () => {
        playClickSound()
        setCurrentIndex((prev) => (prev + 1) % items.length)
    }

    const prevProject = () => {
        playClickSound()
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    }

    // Styles from reference
    const playerBg = 'linear-gradient(380deg, #1a1a1a 0%, #3C3C3C 100%)'
    const noiseUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png'
    const innerBg = 'linear-gradient(180deg, #1b1b1b 0%, #212121 11.2%, #3A3A3A 100%)'

    // Button Overlay Dynamic Styles
    const getBtnOverlayStyle = () => {
        let transform = 'translate(-50%, -50%)'
        let boxShadow = '0px 4px 7px 1px rgba(255, 255, 255, 0.11) inset'
        let filter = 'none'

        if (controlState === 'left') {
            transform += ' rotateY(-6deg) skew(1deg, -1deg)'
            boxShadow += ', 16px 4px 14px 0px rgba(0, 0, 0, 0.05) inset'
            filter = 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
        } else if (controlState === 'right') {
            transform += ' rotateY(6deg) skew(-1deg, 1deg)'
            boxShadow += ', -16px 4px 14px 0px rgba(0, 0, 0, 0.05) inset'
            filter = 'drop-shadow(0px 4px -4px rgba(0, 0, 0, 0.25))'
        } else if (controlState === 'up') {
            transform += ' rotateX(8deg)'
            boxShadow = '0px 4px 7px 1px rgba(255, 255, 255, 0.09) inset, 0px -4px 14px 0px rgba(0, 0, 0, 0.05) inset'
            filter = 'drop-shadow(0px 4px -4px rgba(0, 0, 0, 0.25))'
        } else if (controlState === 'down') {
            transform += ' rotateX(-8deg)'
            boxShadow = '0px 4px 7px 1px rgba(255, 255, 255, 0.1) inset, 0px -14px 14px 0px rgba(0, 0, 0, 0.05) inset'
            filter = 'drop-shadow(0px 4px -4px rgba(0, 0, 0, 0.25))'
        }

        return { transform, boxShadow, filter }
    }

    return (
        <>
            <style jsx>{`
                .player-container {
                    container-type: inline-size;
                    container-name: player;
                    width: 100%;
                    /* Responsive Cap: Better scaling for tablets */
                    max-width: min(1300px, 180vh); 
                    display: flex;
                    justify-content: center;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .music-player {
                    width: 100cqw;
                    height: calc(100cqw * (480/900));
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Tablet and Mobile Portrait */
                @container player (max-width: 640px) {
                    .music-player {
                        width: 100%; /* Force full width on mobile */
                        height: auto;
                        aspect-ratio: 480/900; /* Portrait Ratio */
                        max-width: 480px;
                        margin: 0 auto;
                    }
                }

                /* Proportional internal scaling */
                .mp-inner {
                    padding: 1cqw;
                    display: flex;
                    flex-direction: row; /* Default Desktop */
                }

                @container player (max-width: 640px) {
                    .mp-inner {
                        flex-direction: column; /* Mobile Portrait */
                    }
                    .music-player {
                        /* ... existing mobile styles ... */
                        width: 100%;
                        height: auto;
                        aspect-ratio: 480/900;
                        max-width: 480px;
                        margin: 0 auto;
                    }
                    /* ... */
                }
                
                .album-artwork {
                    width: 49cqw !important;
                    height: 44.7cqw !important;
                    border-radius: 3cqw !important;
                }

                .button-controls {
                    width: 36.4cqw !important;
                    height: 36.4cqw !important;
                }

                .btn-overlay {
                    width: 33.8cqw !important;
                    height: 33.8cqw !important;
                }

                .play-btn {
                    width: 14.3cqw !important;
                    height: 14.3cqw !important;
                }
                
                .play-btn-inner {
                    width: 12.3cqw !important;
                    height: 12.3cqw !important;
                }

                @container player (max-width: 640px) {
                    .album-artwork {
                        width: 90cqw !important;
                        height: 82cqw !important;
                        margin-bottom: 4cqw;
                    }
                    .button-controls {
                        width: 70cqw !important;
                        height: 70cqw !important;
                    }
                    .btn-overlay {
                        width: 65cqw !important;
                        height: 65cqw !important;
                    }
                    .play-btn {
                        width: 28cqw !important;
                        height: 28cqw !important;
                    }
                    .play-btn-inner {
                        width: 24cqw !important;
                        height: 24cqw !important;
                    }
                }
            `}</style>
            <section className="w-full py-20 bg-white overflow-hidden select-none font-sans text-black">
                {/* Previous Theme: bg-[#050505] text-white */}
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase text-black tracking-tighter leading-none mb-4">
                        {/* Previously: Selected Works */}
                        PORTFOLIO
                    </h2>
                    <p className="text-black/60 max-w-lg mx-auto text-sm md:text-base">
                        {/* Previously: text-white/50 */}
                        Use the player controls to browse projects. Click the center button to view.
                    </p>
                </div>

                <div className="content flex flex-col items-center justify-center w-full pb-10">
                    <div className="player-container">
                        {/* Music Player Chassis */}
                        <div
                            className="music-player relative flex justify-center items-center rounded-[4.7cqw] border-2 border-[#1A1A1A] shadow-2xl hover:shadow-[0_0_50px_rgba(0,0,0,0.1)]"
                            style={{ background: playerBg }}
                        >
                            {/* Glow Underneath */}
                            <div className="absolute -bottom-[60px] left-0 w-[98%] h-[60px] rounded-[20px] opacity-30 blur-[4px] bg-gradient-to-b from-[#727272] to-transparent -z-10 mx-[1%]" />

                            {/* Noise Texture */}
                            <div
                                className="texture absolute inset-0 z-[1] rounded-[40px] opacity-25 pointer-events-none mix-blend-multiply bg-center"
                                style={{ backgroundImage: `url(${noiseUrl})` }}
                            />

                            {/* Inner Container */}
                            <div
                                className="mp-inner relative z-10 flex flex-col md:flex-row justify-around items-center w-[95%] h-[95%] rounded-[20px] md:rounded-[50px] overflow-hidden"
                                style={{ background: innerBg }}
                            >

                                {/* Album Artwork Section */}
                                <div className="relative z-[2]">
                                    <div
                                        className="album-artwork relative border-4 border-[#1E1E1E] bg-[#111] bg-center bg-no-repeat overflow-hidden transition-all duration-200"
                                        style={{
                                            backgroundImage: currentItem.imageUrl || currentItem.preview ? `url(${currentItem.imageUrl || currentItem.preview})` : 'none',
                                            backgroundSize: 'cover' // Filled for better visibility
                                        }}
                                    >
                                        {/* Info Overlay */}
                                        <div
                                            className="album-text absolute bottom-0 w-full h-[40%] rounded-b-[24px] z-10 opacity-[0.89] blur-[0.6px] flex flex-col justify-end pb-4"
                                            style={{ background: 'linear-gradient(180deg, rgba(2, 2, 2, 0.0) 0%, rgba(2, 2, 2, 0.90) 100%)' }}
                                        >
                                            <h1 className="text-[3cqw] md:text-[2cqw] font-bold mx-5 mt-6 truncate drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                                                {currentItem.name}
                                            </h1>
                                            <p className="text-[2.5cqw] md:text-[1.5cqw] mx-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-white/80">
                                                {currentItem.category || currentItem.type}
                                            </p>
                                        </div>

                                        {/* Screen FX Lines - Optimized to single div */}
                                        <div
                                            className="album-scrn-fx absolute inset-0 rounded-[30px] opacity-20 pointer-events-none z-20"
                                            style={{
                                                background: 'repeating-linear-gradient(90deg, rgba(2, 2, 2, 0.1) 0px, rgba(2, 2, 2, 0.1) 4px, transparent 4px, transparent 6px)',
                                                maskImage: 'linear-gradient(180deg, black 0%, transparent 100%)',
                                                WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 100%)',
                                            }}
                                        />

                                        {/* Reflection */}
                                        <div
                                            className="album-reflection absolute top-0 left-0 w-[30%] h-full opacity-40 blur-[2.4px] pointer-events-none z-30"
                                            style={{
                                                transform: 'translateX(128px) skewX(-30deg)',
                                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%)'
                                            }}
                                        />

                                        {/* SVG Borders/Overlays - Fixed positioning */}
                                        <div className="album-border absolute inset-0 flex flex-col justify-between blur-[1px] pointer-events-none z-40 w-full h-full">
                                            <svg viewBox="0 0 345 135" fill="none" className="w-full h-auto rotate-180 opacity-50 block">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.34951 0H0V114C0 129.464 12.536 142 28 142H316C332.016 142 345 129.016 345 113V0H341.65V110C341.65 126.016 328.667 139 312.65 139H31.3495C15.8856 139 3.34951 126.464 3.34951 111V0Z" fill="url(#paint0_linear_1685_2758)" fillOpacity="0.5" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_1685_2758" x1="172.5" y1="0" x2="172.5" y2="149" gradientUnits="userSpaceOnUse">
                                                        <stop stopOpacity="0" />
                                                        <stop offset="0.786458" stopColor="#0D0D0D" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <svg viewBox="0 0 345 143" fill="none" className="w-full h-auto opacity-50 block">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M340.505 143H345V28C345 12.536 332.464 2.37738e-05 317 2.25623e-05L29 0C12.9838 -1.25474e-06 1.2684e-05 12.9837 1.11215e-05 29L0 143H4.495L4.49501 33.0273C4.49501 17.0111 17.4788 4.02734 33.495 4.02734L312.505 4.02737C327.969 4.02737 340.505 16.5634 340.505 32.0274V143Z" fill="url(#paint0_linear_1685_2624)" fillOpacity="0.5" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_1685_2624" x1="172.5" y1="143" x2="172.5" y2="1.35139e-05" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#D9D9D9" stopOpacity="0" />
                                                        <stop offset="0.786458" stopColor="#D9D9D9" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Control Pad Section - Fluid scaling */}
                                <div
                                    className="button-controls bg-red-500/0 relative flex justify-center items-center"
                                    style={{
                                        background: 'linear-gradient(180deg, #292929 0%, #1F1F1F 100%)',
                                        borderRadius: '50%',
                                        border: '0.4cqw solid #0D0D0D',
                                        perspective: '120em',
                                        flexShrink: 0
                                    }}
                                >
                                    {/* 3D Moving Overlay */}
                                    <div
                                        className="btn-overlay relative"
                                        style={{
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            background: 'linear-gradient(175deg, #1F1F1F 3.94%, #2D2D2D 44.59%, #3D3D3D 81.99%)',
                                            transition: 'transform 0.1s ease',
                                            ...getBtnOverlayStyle()
                                        }}
                                    >
                                        {/* Play Button Shadow */}
                                        <div className="absolute w-[45%] h-[45%] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 blur-[0.2cqw]" />

                                        {/* Play Button */}
                                        <div
                                            className="play-btn absolute z-20 cursor-pointer"
                                            style={{
                                                borderRadius: '50%',
                                                top: '50%',
                                                left: '50%',
                                                background: 'linear-gradient(180deg, #292929 0%, #1F1F1F 100%)',
                                                transition: 'transform 0.1s ease',
                                                transform: isPlayPressed ? 'translate(-50%, -50%) scale(0.96)' : 'translate(-50%, -50%)'
                                            }}
                                            onMouseDown={() => setIsPlayPressed(true)}
                                            onMouseUp={() => setIsPlayPressed(false)}
                                            onMouseLeave={() => setIsPlayPressed(false)}
                                            onClick={togglePlay}
                                            title="View Project"
                                        >
                                            {/* Inner Overlay */}
                                            <div
                                                className="play-btn-inner absolute flex items-center justify-center"
                                                style={{
                                                    borderRadius: '50%',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    background: 'linear-gradient(189deg, #1F1F1F 6.91%, #2D2D2D 50.27%, #393939 83.66%)',
                                                    boxShadow: '0px 0.1cqw 0.2cqw 0px rgba(255, 255, 255, 0.12) inset'
                                                }}
                                            >
                                                <div className="w-[40px] h-[40px] flex items-center justify-center">
                                                    {/* Play Icon - Centered */}
                                                    <svg width="48" height="31" viewBox="0 0 48 31" fill="none">
                                                        <g filter="url(#filter0_diii_0_1)">
                                                            <path d="M2 25.7434V3.31956C2 1.81294 3.60276 0.847294 4.93472 1.55143L26.5854 12.9969C28.0194 13.7551 28.0019 15.8153 26.5551 16.5489L4.9045 27.5272C3.57407 28.2018 2 27.2351 2 25.7434Z" fill="#232323" />
                                                        </g>
                                                        <g filter="url(#filter1_diii_0_1)">
                                                            <path d="M40 26V3C40 1.89543 40.8954 1 42 1H44C45.1046 1 46 1.89543 46 3V26C46 27.1046 45.1046 28 44 28H42C40.8954 28 40 27.1046 40 26Z" fill="#232323" />
                                                        </g>
                                                        <g filter="url(#filter2_diii_0_1)">
                                                            <path d="M30 26V3C30 1.89543 30.8954 1 32 1H34C35.1046 1 36 1.89543 36 3V26C36 27.1046 35.1046 28 34 28H32C30.8954 28 30 27.1046 30 26Z" fill="#232323" />
                                                        </g>
                                                        <defs>
                                                            <filter id="filter0_diii_0_1" x="0" y="0.316406" width="29.6504" height="30.4297" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="1" />
                                                                <feGaussianBlur stdDeviation="1" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="1" />
                                                                <feGaussianBlur stdDeviation="1.5" />
                                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                                                                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="-2" />
                                                                <feGaussianBlur stdDeviation="0.5" />
                                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0" />
                                                                <feBlend mode="normal" in2="effect2_innerShadow_0_1" result="effect3_innerShadow_0_1" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="1" dy="4" />
                                                                <feGaussianBlur stdDeviation="0.5" />
                                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0" />
                                                                <feBlend mode="normal" in2="effect3_innerShadow_0_1" result="effect4_innerShadow_0_1" />
                                                            </filter>
                                                            {/* Additional filters for pause bars can be added here if needed, omitted for brevity */}
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skip Left */}
                                        <div
                                            className="absolute top-[52%] left-[15%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                            onMouseDown={() => { setControlState('left'); prevProject(); }}
                                            onMouseUp={() => setControlState('idle')}
                                            onMouseLeave={() => setControlState('idle')}
                                            title="Previous"
                                        >
                                            <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                                                {/* Simplified Previous Icon */}
                                                <g filter="url(#filter0_diii_1685_2650)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 9.79778L7 3C7 1.89543 6.10457 0.999997 5 0.999997L4 0.999997C2.89543 0.999997 2 1.89543 2 3L2 20C2 21.1046 2.89543 22 4 22L5 22C6.10457 22 7 21.1046 7 20L7 12.8382C7.107 12.9288 7.22633 13.0104 7.35802 13.0809L21.0553 20.4218C22.3876 21.1359 24 20.1706 24 18.659L24 14.4969L35.0553 20.4218C36.3876 21.1359 38 20.1706 38 18.659L38 4.27691C38 2.78036 36.4166 1.81396 35.0856 2.49817L24 8.19687L24 4.27691C24 2.78035 22.4166 1.81396 21.0856 2.49817L7.38839 9.5394C7.24469 9.61327 7.11522 9.70027 7 9.79778Z" fill="#1C1C1C" />
                                                </g>
                                            </svg>
                                        </div>

                                        {/* Skip Right */}
                                        <div
                                            className="absolute top-[52%] -right-[2%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                            onMouseDown={() => { setControlState('right'); nextProject(); }}
                                            onMouseUp={() => setControlState('idle')}
                                            onMouseLeave={() => setControlState('idle')}
                                            title="Next"
                                        >
                                            <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                                                <g filter="url(#filter0_diii_1685_2646)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M33 13.2022V20C33 21.1046 33.8954 22 35 22H36C37.1046 22 38 21.1046 38 20V3C38 1.89543 37.1046 1 36 1H35C33.8954 1 33 1.89543 33 3V10.1618C32.893 10.0712 32.7737 9.98964 32.642 9.91906L18.9447 2.5782C17.6124 1.86415 16 2.82937 16 4.341V8.50312L4.94475 2.5782C3.61241 1.86415 2 2.82937 2 4.341V18.7231C2 20.2196 3.58339 21.186 4.91438 20.5018L16 14.8031V18.7231C16 20.2196 17.5834 21.186 18.9144 20.5018L32.6116 13.4606C32.7553 13.3867 32.8848 13.2997 33 13.2022Z" fill="#1C1C1C" />
                                                </g>
                                            </svg>
                                        </div>

                                        {/* Vol Up */}
                                        <div
                                            className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                            onMouseDown={() => { setControlState('up'); }}
                                            onMouseUp={() => setControlState('idle')}
                                            onMouseLeave={() => setControlState('idle')}
                                            title="Volume Up"
                                        >
                                            <svg width="32" height="31" viewBox="0 0 32 31" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19 11.5V3C19 1.89543 18.1046 1 17 1H15C13.8954 1 13 1.89543 13 3L13 11.5H4.5C3.39543 11.5 2.5 12.3954 2.5 13.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H13L13 26C13 27.1046 13.8954 28 15 28H17C18.1046 28 19 27.1046 19 26V17.5H27.5C28.6046 17.5 29.5 16.6046 29.5 15.5V13.5C29.5 12.3954 28.6046 11.5 27.5 11.5H19Z" fill="#1C1C1C" />
                                            </svg>
                                        </div>

                                        {/* Vol Down */}
                                        <div
                                            className="absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                            onMouseDown={() => { setControlState('down'); }}
                                            onMouseUp={() => setControlState('idle')}
                                            onMouseLeave={() => setControlState('idle')}
                                            title="Volume Down"
                                        >
                                            <svg width="32" height="11" viewBox="0 0 32 11" fill="none">
                                                <path d="M4.5 1.5L27.5 1.5C28.6046 1.5 29.5 2.39543 29.5 3.5L29.5 5.5C29.5 6.60457 28.6046 7.5 27.5 7.5L4.5 7.5C3.39543 7.5 2.5 6.60457 2.5 5.5L2.5 3.5C2.5 2.39543 3.39543 1.5 4.5 1.5Z" fill="#262626" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full text-center mt-8">
                    <Link href="/portfolio" className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors border-b border-transparent hover:border-black/50 pb-1">
                        {/* Previously: text-white/30 hover:text-white/80 */}
                        View All Projects
                    </Link>
                </div>

                <svg style={{ visibility: 'hidden', position: 'absolute' }}>
                    <defs>
                        {/* Simplified reused filter definitions. */}
                        <filter id="filter0_diii_1685_2650" x="0" y="0" width="40" height="25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1685_2650" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1685_2650" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2650" />
                        </filter>
                        <filter id="filter0_diii_1685_2646" x="0" y="0" width="40" height="25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1685_2646" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1685_2646" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2646" />
                        </filter>
                        <filter id="filter0_dii_1685_2641" x="0.5" y="0" width="31" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1685_2641" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1685_2641" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2641" />
                        </filter>
                        <filter id="filter0_dii_1685_2644" x="0.5" y="0.5" width="31" height="10" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1685_2644" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1685_2644" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2644" />
                        </filter>
                    </defs>
                </svg>
            </section>
        </>
    )
}

export default PortfolioSection
