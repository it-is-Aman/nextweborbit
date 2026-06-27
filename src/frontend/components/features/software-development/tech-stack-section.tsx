'use client'

import React from 'react'
import { TechCategory } from './tech-category'
import { Parallax, TiltCard, StaggerContainer, StaggerItem } from '@/frontend/animations'

export const TechStackSection = () => {
    return (
        <section className="py-32 bg-muted/20 relative overflow-hidden">
            <Parallax offset={30} className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px]" />
            </Parallax>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                        The Stack
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">
                        Technology Stack
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                        Cutting-edge technologies for building robust, scalable software solutions.
                    </p>
                </div>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="LANGUAGES"
                                items={["Python", "Java", "C#", "Go", "Rust", "TypeScript", "Kotlin", "Swift"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="FRAMEWORKS"
                                items={["Django", "Spring Boot", ".NET Core", "FastAPI", "NestJS", "Laravel", "Ruby on Rails"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="DATABASES"
                                items={["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "Cassandra", "DynamoDB"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                    <StaggerItem>
                        <TiltCard className="h-full">
                            <TechCategory
                                title="DEVOPS"
                                items={["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Terraform", "Ansible", "Prometheus", "Grafana"]}
                            />
                        </TiltCard>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
