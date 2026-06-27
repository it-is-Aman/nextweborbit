/* eslint-disable react-hooks/refs */
'use client'

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import React, { ReactNode, useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { GSAP_CONFIG } from './config'

export const Magnetic = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const xTo = gsap.quickTo(element, "x", { duration: GSAP_CONFIG.magneticDuration, ease: GSAP_CONFIG.magneticEase })
        const yTo = gsap.quickTo(element, "y", { duration: GSAP_CONFIG.magneticDuration, ease: GSAP_CONFIG.magneticEase })

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { height, width, left, top } = element.getBoundingClientRect()
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)
            xTo(x * 0.35)
            yTo(y * 0.35)
        }

        const handleMouseLeave = () => {
            xTo(0)
            yTo(0)
        }

        element.addEventListener("mousemove", handleMouseMove)
        element.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            element.removeEventListener("mousemove", handleMouseMove)
            element.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export const ShuffleText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
    const [displayText, setDisplayText] = useState(text)
    const chars = "ABCD"

    useEffect(() => {
        if (!isHovered) {
            // eslint-disable-next-line
            setDisplayText(text)
            return
        }
        let iterations = 0
        const interval = setInterval(() => {
            setDisplayText(() =>
                text.split("").map((letter, index) => {
                    if (index < iterations) return text[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                }).join("")
            )
            if (iterations >= text.length) clearInterval(interval)
            iterations += 1 / 3
        }, 30)
        return () => clearInterval(interval)
    }, [isHovered, text])

    return <span>{displayText}</span>
}

const SlotChar = ({ char, delay }: { char: string; delay: number }) => {
    const [spinChars, setSpinChars] = useState<string[]>([char]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
        const randomChars = "ABCDEFGHI";
        const count = 10 + Math.floor(Math.random() * 5);
        const chars = Array.from({ length: count }, () => randomChars[Math.floor(Math.random() * randomChars.length)]);
        chars.push(char);
        setSpinChars(chars);
    }, [char]);

    const finalY = isMounted ? `-${(spinChars.length - 1)}em` : "0em";

    return (
        <span className="inline-block overflow-hidden h-[1em] leading-[1em] relative align-top">
            <span className="invisible">{char}</span>
            <motion.div
                initial={{ y: "0em" }}
                animate={{ y: finalY }}
                transition={{
                    duration: 1,
                    ease: [0.2, 0, 0.1, 1],
                    delay: delay
                }}
                className="absolute top-0 left-0 right-0 flex flex-col text-center"
            >
                {spinChars.map((c, i) => (
                    <span key={i} className="h-[1em] flex items-center justify-center">{c}</span>
                ))}
            </motion.div>
        </span>
    );
};

export function SlotTextReveal({ text, className = "" }: { text: string; className?: string }) {
    const words = text.split(" ");
    let charIndex = 0;

    return (
        <span className={`inline-flex flex-wrap gap-x-[0.1em] ${className}`}>
            <span className="sr-only">{text}</span>
            {words.map((word, i) => (
                <span key={i} className="inline-flex whitespace-nowrap">
                    {word.split("").map((char, j) => {
                        const delay = charIndex * 0.05;
                        charIndex++;
                        return <SlotChar key={j} char={char} delay={delay} />;
                    })}
                </span>
            ))}
        </span>
    );
}

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
    size?: "default" | "sm" | "lg";
}


const setRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
    }
};

export const SpotlightButton = ({ children, className = "", asChild = false, size = "default", ...props }: SpotlightButtonProps) => {
    const elementRef = useRef<HTMLButtonElement>(null)
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (!elementRef.current) return
        const rect = elementRef.current.getBoundingClientRect()
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const sizeClasses: Record<string, string> = {
        default: "px-6 py-3 text-base",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
    }

    const baseClasses = `relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border border-blue-500/50 text-white font-semibold shadow-lg hover:shadow-xl rounded-full transition-all duration-300 ${sizeClasses[size] || sizeClasses.default} ${className}`

    const spotlightElement = (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 0.4 : 0
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                width: 600,
                height: 600,
                left: hoverPos.x,
                top: hoverPos.y,
                transform: 'translate(-50%, -50%)',
                position: 'absolute'
            }}
            className="rounded-full pointer-events-none bg-white blur-2xl"
        />
    )

    const childRef = (asChild && React.isValidElement(children))
        ? (children as React.ReactElement & { ref?: React.Ref<HTMLButtonElement> }).ref
        : null

    const mergedRef = React.useCallback((node: HTMLButtonElement | null) => {
        setRef(elementRef, node)
        if (asChild && childRef) {
            setRef(childRef, node)
        }
    }, [childRef, asChild]) // elementRef is stable from useRef

    if (asChild && React.isValidElement(children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = children as React.ReactElement<any>

        return React.cloneElement(child, {
            ...child.props,
            ref: mergedRef,
            className: `${baseClasses} ${child.props.className || ''}`,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            children: (
                <>
                    <span className="relative z-10 flex items-center gap-2">
                        {child.props.children}
                    </span>
                    {spotlightElement}
                </>
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
    }

    return (
        <button
            ref={elementRef}
            className={baseClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {spotlightElement}
        </button>
    )
}

export const TiltCard = ({ children, className = "", style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                ...style
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    )
}

export const MouseEffect = () => {
    const mouseRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const followRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return
        }

        const mouseEffect = mouseRef.current
        const circle = circleRef.current
        const follow = followRef.current

        if (!mouseEffect || !circle || !follow) return

        gsap.set(circle, { xPercent: -50, yPercent: -50 })
        gsap.set(follow, { xPercent: -50, yPercent: -50 })

        const xTo = gsap.quickTo(circle, "x", { duration: 0.2, ease: "power3" })
        const yTo = gsap.quickTo(circle, "y", { duration: 0.2, ease: "power3" })

        const xFollow = gsap.quickTo(follow, "x", { duration: 0.6, ease: "power3" })
        const yFollow = gsap.quickTo(follow, "y", { duration: 0.6, ease: "power3" })

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(mouseEffect, { opacity: 1, duration: 0.5 })

            xTo(e.clientX)
            yTo(e.clientY)

            xFollow(e.clientX)
            yFollow(e.clientY)
        }

        const onMouseLeave = () => {
            gsap.to(mouseEffect, { opacity: 0, duration: 0.5 })
        }

        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseleave', onMouseLeave)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <div ref={mouseRef} className="mouse-effect">
            <div ref={circleRef} className="circle" />
            <div ref={followRef} className="circle-follow" />
        </div>
    )
}

export function CircularText({
    text = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
    className = "",
    duration = 21
}: { text: string; className?: string; duration?: number }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const svg = containerRef.current.querySelector("svg")
        if (!svg) return

        const ctx = gsap.context(() => {
            const pathId = `path-${Math.random().toString(36).substr(2, 9)}`
            const path = svg.querySelector("path")

            if (path) {
                gsap.set(path, {
                    attr: { id: pathId, fill: "none", stroke: "none" }
                })
            }

            const textPath1 = svg.querySelector(".text-path-1")
            const textPath2 = svg.querySelector(".text-path-2")

            if (textPath1 && textPath2) {
                textPath1.setAttribute("href", `#${pathId}`)
                textPath2.setAttribute("href", `#${pathId}`)

                const props = { duration, ease: "none", repeat: -1 }

                gsap.fromTo(
                    textPath1,
                    { attr: { startOffset: "0%" } },
                    { attr: { startOffset: "-100%" }, ...props }
                )

                gsap.fromTo(
                    textPath2,
                    { attr: { startOffset: "100%" } },
                    { attr: { startOffset: "0%" }, ...props }
                )
            }

        }, containerRef)

        return () => ctx.revert()
    }, [text, duration])

    return (
        <div ref={containerRef} className={`ellipse ${className}`}>
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                <path d="M 50, 100 a 200,50 0 1,1 400,0 a 200,50 0 1,1 -400,0" />

                <text className="fill-current text-[17px] font-medium tracking-wider uppercase">
                    <textPath className="text-path-1" startOffset="0%">{text}</textPath>
                    <textPath className="text-path-2" startOffset="0%">{text}</textPath>
                </text>
            </svg>
        </div>
    )
}
