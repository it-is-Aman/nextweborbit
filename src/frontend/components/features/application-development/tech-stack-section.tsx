'use client'

import { TechCategory } from './tech-category'
import { Parallax, TiltCard, StaggerContainer, StaggerItem } from '@/frontend/animations'

export const TechStackSection = () => {
    return (
        <section className="py-32 bg-muted/20 relative overflow-hidden">
            {/* Background Elements */}
            <Parallax offset={30} className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-green-600/5 rounded-full blur-[128px]" />
            </Parallax>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                        The Toolkit
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">
                        Technology Arsenal
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                        We leverage the most advanced frameworks and tools to build future-proof solutions.
                    </p>
                </div>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="FRONTEND"
                                items={["React.js", "Next.js", "Vue.js", "Nuxt", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="BACKEND"
                                items={["Node.js", "Express", "Python", "Django", "GoLang", "GraphQL", "NestJS", "Serverless"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="MOBILE"
                                items={["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", "Expo", "SwiftUI", "Jetpack Compose"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="INFRASTRUCTURE"
                                items={["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "Terraform"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
