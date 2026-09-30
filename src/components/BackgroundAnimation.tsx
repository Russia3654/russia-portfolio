"use client";

import { useEffect, useRef } from "react";


export default function BackgroundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let particles: Particle[] = [];
        let ripples: unknown[] = [];
        let mouse = { x: null as number | null, y: null as number | null };

        const PARTICLE_COUNT = 200;
        const COLORS = ["rgba(168,85,247,0.12)", "rgba(192,132,252,0.3)", "#d946ef", "#f0abfc", "#a855f7"];

        /**
         * The function `resizeCanvas` resizes the canvas element to match the current window dimensions.
         */
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            x!: number; y!: number; vx!: number; vy!: number;
            radius!: number; color!: string; alpha!: number;
            constructor() { this.reset(); }

            /**
             * The `reset` function initializes random values for the position, velocity, radius, color, and
             * alpha of a particle.
             */
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 2.5 + 1;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.alpha = Math.random() * 0.5 + 0.15;
            }

            /**
             * The `update` function updates the position and velocity of the particle based on its current
             * velocity and the position of the mouse.
             */
            update() {
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        this.vx += dx / dist * 0.3;
                        this.vy += dy / dist * 0.3;
                    }
                }
                this.vx += (Math.random() - 0.5) * 0.05;
                this.vy += (Math.random() - 0.5) * 0.05;
                this.vx *= 0.995;
                this.vy *= 0.995;
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            /**
             * The `draw` function renders the particle on the canvas.
             */
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        /**
         * The function `drawConnections` iterates through particles and draws lines between them if their
         * distance is less than 130, adjusting the opacity based on the distance.
         */
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = "rgba(168,85,247)";
                        ctx.globalAlpha = (1 - dist / 130) * 0.15;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        /**
         * The function `drawCursorGlow` creates a radial gradient glow effect around the mouse cursor position
         * on a canvas.
         * @returns If the `mouse.x` value is `null`, the function `drawCursorGlow` will return early and not
         * execute the rest of the code inside the function.
         */
        function drawCursorGlow() {
            if (mouse.x === null) return;
            const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 40);
            gradient.addColorStop(0, "rgba(168,85,247,0.25)");
            gradient.addColorStop(0.5, "rgba(192,132,252,0.15)");
            gradient.addColorStop(1, "rgba(240,171,252,0)");
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        /**
         * The function `drawRipples` draws fading ripples on a canvas element.
         */
        function drawRipples() {
            ripples = ripples.filter(r => r.alpha > 0);
            ripples.forEach(function (r) {
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = r.color;
                ctx.globalAlpha = r.alpha;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.globalAlpha = 1;
                r.radius += 3;
                r.alpha -= 0.025;
            });
        }

        /**
         * The `animate` function clears the canvas, draws cursor glow, connections, ripples, updates and draws
         * particles, and requests animation frame for continuous animation.
         */
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCursorGlow();
            drawConnections();
            drawRipples();
            particles.forEach(function (p) { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        /**
         * The `initParticles` function initializes an array of particles and starts the animation.
         */
        function initParticles() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
            animate();
        }

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });
        window.addEventListener("touchstart", e => {
            const touch = e.touches[0];
            ripples.push({
                x: touch.clientX,
                y: touch.clientY,
                radius: 10,
                alpha: 0.8,
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            });
        })

        initParticles();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", () => { });
            window.removeEventListener("mouseleave", () => { });
            window.removeEventListener("touchstart", () => { });
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}