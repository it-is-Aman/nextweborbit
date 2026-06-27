// 'use client'

// import { useEffect, useRef } from 'react'
// import * as THREE from 'three'
// import gsap from 'gsap'

// const radianceValues = [
//     1.2, 0.8, 1, 0.6, 1.1, 0.9, 1.1, 0.5, 0.4, 0.7, 0.8, 0.6, 0.7, 0.8, 0.9, 0.5, 0.6, 1, 0.9, 0.7,
//     0.6, 0.8, 0.55, 0.58, 1.1, 0.5, 0.8, 0.6, 0.4, 0.55, 0.7, 0.35, 0.4, 0.45, 0.6, 1, 0.96, 1,
//     1.2, 1, 0.9, 1, 0.5, 0.7, 0.8, 0.75, 0.62, 0.95, 0.86, 0.8, 0.9, 0.7, 0.8, 0.55, 0.55, 0.55,
//     1, 0.8, 0.9, 1, 0.6, 1.09, 0.5
// ]

// const positions = [
//     { x: 0, y: 0, z: 0 }, { x: 2.2, y: 1.9, z: -0.5 }, { x: 2.8, y: -0.3, z: 0 },
//     { x: -1, y: -1, z: 0 }, { x: -1, y: 2.62, z: 0 }, { x: -1.65, y: 0, z: -0.4 },
//     { x: -3.13, y: -2.54, z: -0.4 }, { x: 1.8, y: 1.94, z: 0.3 }, { x: 1.5, y: -1, z: 1.2 },
//     { x: -0.16, y: -2.2, z: 1.9 }, { x: 3.5, y: 2.2, z: 0.8 }, { x: 1.5, y: -2.58, z: 2.4 },
//     { x: -2.5, y: 2, z: 1.15 }, { x: -2.5, y: -2.5, z: 0.99 }, { x: -2.5, y: -2.5, z: -1.9 },
//     { x: 3.85, y: 1.8, z: 0.05 }, { x: 2.5, y: -2.2, z: -0.75 }, { x: 1.9, y: -2.62, z: 0.22 },
//     { x: 0.45, y: 3, z: 0.65 }, { x: 4.5, y: 2.22, z: -0.2 }, { x: 4.35, y: 1.7, z: 0.55 },
//     { x: -2.8, y: -0.35, z: 1.85 }, { x: -2.02, y: 1.2, z: 1.9 }, { x: 1.2, y: 2, z: 2 },
//     { x: -4.88, y: 1.7, z: 2 }, { x: -3, y: -1.95, z: 2.5 }, { x: -3.3, y: 3.4, z: -0.1 },
//     { x: -4.5, y: 2.9, z: 2.2 }, { x: -2.8, y: 1.37, z: 2.2 }, { x: -4.4, y: 2.42, z: 1.05 },
//     { x: -4.72, y: -1.9, z: 2.1 }, { x: -2.8, y: -2.34, z: 2.67 }, { x: -2.6, y: 2.66, z: 1.91 },
//     { x: -4.8, y: 2.58, z: 2.69 }, { x: -4.97, y: 3.3, z: 1.65 }, { x: 2.1, y: -0.2, z: -1.45 },
//     { x: -6, y: 2.78, z: 1.38 }, { x: 1.12, y: 2.4, z: -1.29 }, { x: -2.64, y: 2.4, z: -1.79 },
//     { x: -5.5, y: -0.58, z: 1.1 }, { x: -0.1, y: -1, z: -2.5 }, { x: -6.5, y: 1.55, z: 0.5 },
//     { x: -5.87, y: 1, z: 2.5 }, { x: -6.6, y: -0.1, z: 1.65 }, { x: -4.5, y: 2.5, z: -1.2 },
//     { x: -1.5, y: 1.2, z: -2.5 }, { x: -2.3, y: -1.45, z: -2.5 }, { x: -5.35, y: 1.25, z: -2.5 },
//     { x: -6.76, y: -2.26, z: 1.4 }, { x: -6.32, y: 1.85, z: 2.4 }, { x: -5.5, y: -2.82, z: 1.9 },
//     { x: -5.6, y: -1.6, z: 2.46 }, { x: -6.55, y: -2.5, z: 2.63 }, { x: -5.8, y: -2.15, z: 3.1 },
//     { x: -4.9, y: -1.25, z: 2.86 }, { x: -4.2, y: -1.4, z: 2.86 }, { x: -7.1, y: -1.24, z: 2.86 },
//     { x: -7.27, y: 2.24, z: 1.76 }, { x: -7.27, y: 3, z: -0.4 }, { x: -8.4, y: 1.4, z: 2 },
//     { x: -7.15, y: 1.95, z: 3 }, { x: -8.2, y: 1.5, z: -0.8 }, { x: -5, y: 1.08, z: 2.8 }
// ]

// const ThreeBackground = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null)
//     const containerRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         if (!canvasRef.current || !containerRef.current) return

//         const isMobile = window.innerWidth < 768
//         const width = containerRef.current.clientWidth || window.innerWidth
//         const height = containerRef.current.clientHeight || 500

//         // Scene setup
//         const scene = new THREE.Scene()
//         const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000)
//         camera.position.z = isMobile ? 30 : 24

//         const renderer = new THREE.WebGLRenderer({
//             canvas: canvasRef.current,
//             antialias: !isMobile, // Disable antialias on mobile for performance
//             alpha: true,
//             powerPreference: "high-performance"
//         })
//         renderer.setSize(width, height)
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
//         renderer.shadowMap.enabled = false

//         // Filter positions for mobile to reduce draw calls
//         const activePositions = isMobile ? positions.slice(0, 15) : positions

//         const material = new THREE.MeshPhongMaterial({
//             color: "#ffebee",
//             emissive: "#ff8a80",
//             emissiveIntensity: 0.2,
//             specular: "#ffffff",
//             shininess: isMobile ? 50 : 100
//         })

//         const spheres: THREE.Mesh[] = []
//         const group = new THREE.Group()

//         // Single geometry template - lower detail on mobile
//         const baseGeometry = new THREE.SphereGeometry(1, isMobile ? 8 : 16, isMobile ? 8 : 16)

//         activePositions.forEach((pos, index) => {
//             const radius = radianceValues[index % radianceValues.length]
//             const sphere = new THREE.Mesh(baseGeometry, material)
//             sphere.scale.setScalar(radius)
//             sphere.position.set(pos.x + 1.5, -15, pos.z)
//             sphere.userData = { originalPosition: { x: pos.x + 1.5, y: pos.y, z: pos.z }, radius }
//             spheres.push(sphere)
//             group.add(sphere)
//         })

//         scene.add(group)

//         // Lighting - Simplified for mobile
//         const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 1.0 : 1.5)
//         scene.add(ambientLight)

//         const mainLight = new THREE.DirectionalLight(0xffffff, isMobile ? 1.5 : 2)
//         mainLight.position.set(10, 20, 30)
//         scene.add(mainLight)

//         if (!isMobile) {
//             const fillLight = new THREE.PointLight(0xffffff, 1.2)
//             fillLight.position.set(-20, 10, 10)
//             scene.add(fillLight)
//         }

//         // Raycasting - Only for desktop
//         const raycaster = new THREE.Raycaster()
//         const mouse = new THREE.Vector2()
//         const forces = new Map<string, THREE.Vector3>()

//         const onMouseMove = (event: MouseEvent) => {
//             if (isMobile) return
//             const rect = containerRef.current?.getBoundingClientRect()
//             if (!rect) return

//             mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
//             mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

//             raycaster.setFromCamera(mouse, camera)
//             const intersects = raycaster.intersectObjects(spheres)

//             if (intersects.length > 0) {
//                 const hoveredSphere = intersects[0].object as THREE.Mesh
//                 const force = new THREE.Vector3()
//                 force.subVectors(intersects[0].point, hoveredSphere.position).normalize().multiplyScalar(0.15)
//                 forces.set(hoveredSphere.uuid, force)
//             }
//         }

//         // Animation config
//         const breathingAmplitude = isMobile ? 0.08 : 0.12
//         const breathingSpeed = 0.0012

//         // Rise Animation
//         spheres.forEach((sphere, i) => {
//             gsap.to(sphere.position, {
//                 x: sphere.userData.originalPosition.x,
//                 y: sphere.userData.originalPosition.y,
//                 z: sphere.userData.originalPosition.z,
//                 duration: 2.5,
//                 delay: i * 0.012,
//                 ease: "power3.out"
//             })
//         })

//         // Main Loop
//         let frameId: number
//         const tempVector = new THREE.Vector3()

//         const animate = () => {
//             frameId = requestAnimationFrame(animate)

//             const time = Date.now() * breathingSpeed

//             spheres.forEach((sphere, i) => {
//                 const offset = i * 0.25
//                 const breathingY = Math.sin(time + offset) * breathingAmplitude
//                 const breathingX = Math.cos(time + offset * 0.8) * breathingAmplitude * 0.5

//                 const force = forces.get(sphere.uuid)
//                 if (force) {
//                     sphere.position.add(force)
//                     force.multiplyScalar(0.9)
//                     if (force.length() < 0.01) forces.delete(sphere.uuid)
//                 }

//                 const originalPos = sphere.userData.originalPosition
//                 tempVector.set(originalPos.x + breathingX, originalPos.y + breathingY, originalPos.z)
//                 sphere.position.lerp(tempVector, 0.03)
//             })

//             renderer.render(scene, camera)
//         }

//         animate()

//         // Resize Handling
//         const resize = (w: number, h: number) => {
//             camera.aspect = w / h
//             camera.updateProjectionMatrix()
//             renderer.setSize(w, h)
//         }

//         const resizeObserver = new ResizeObserver(entries => {
//             for (const entry of entries) {
//                 const { width, height } = entry.contentRect
//                 if (width > 0 && height > 0) {
//                     resize(width, height)
//                 }
//             }
//         })
//         resizeObserver.observe(containerRef.current)

//         if (!isMobile) {
//             window.addEventListener('mousemove', onMouseMove)
//         }

//         return () => {
//             cancelAnimationFrame(frameId)
//             window.removeEventListener('mousemove', onMouseMove)
//             resizeObserver.disconnect()
//             spheres.forEach(s => s.geometry.dispose())
//             material.dispose()
//             renderer.dispose()
//         }
//     }, [])

//     return (
//         <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none select-none">
//             <canvas ref={canvasRef} id="webgl" className="block w-full h-full" />
//         </div>
//     )
// }

// export default ThreeBackground
