'use client'

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import NextImage from 'next/image';
import { useRef } from 'react';

const PICTURES = [
    '/uploads/images/1.jpeg',
    '/uploads/images/2.jpeg',
    '/uploads/images/3.jpeg',
];

const PHRASES = [
    "Innovation • Excellence • Strategy",
    "Design • Development • Success",
    "Strategy • Scale • Solution",
];

export default function TextRevealSection() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    return (
        <section className="w-full py-20 bg-background overflow-hidden">
            <div ref={container} className="flex flex-col gap-10">
                <Slide src={PICTURES[0]} phrase={PHRASES[0]} direction={'left'} left={"-40%"} progress={scrollYProgress} />
                <Slide src={PICTURES[1]} phrase={PHRASES[1]} direction={'right'} left={"-25%"} progress={scrollYProgress} />
                <Slide src={PICTURES[2]} phrase={PHRASES[2]} direction={'left'} left={"-75%"} progress={scrollYProgress} />
            </div>
        </section>
    );
}

interface SlideProps {
    src: string;
    phrase: string;
    direction: 'left' | 'right';
    left: string;
    progress: MotionValue<number>;
}

function Slide({ src, phrase, direction, left, progress }: SlideProps) {
    const dir = direction === 'left' ? -1 : 1;
    const translateX = useTransform(progress, [0, 1], [500 * dir, -500 * dir]);

    return (
        <motion.div
            style={{ x: translateX, left: left }}
            className="relative flex whitespace-nowrap"
        >
            <Phrase src={src} phrase={phrase} />
            <Phrase src={src} phrase={phrase} />
            <Phrase src={src} phrase={phrase} />
        </motion.div>
    );
}

function Phrase({ src, phrase }: { src: string; phrase: string }) {
    return (
        <div className="px-10 flex gap-8 items-center">
            <p className="text-[5vw] md:text-[4vw] font-black tracking-tighter text-foreground opacity-90">
                {phrase}
            </p>
            <div className="relative h-[8vw] md:h-[6.5vw] aspect-[2/1] rounded-full overflow-hidden bg-muted">
                <NextImage
                    src={src}
                    alt="Innovation"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
