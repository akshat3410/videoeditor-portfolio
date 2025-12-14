import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../../lib/webgl/liquid-shader";

/**
 * Liquid Distortion Effect Component
 * 
 * A high-performance, shader-based liquid distortion with:
 * - Smooth lerped mouse tracking
 * - Single-color tint
 * - Reduced motion support
 */
export function LiquidEffectAnimation({
  imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  speed = 0.2,
  distortionScale = 0.1,
  noiseScale = 1.0,
  tintColor = "#5c5cff",
  mouseLerp = 0.08,
  className = ""
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const uniformRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Lerped mouse position for smooth follow
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion) return;

    // --- 1. Setup Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- 2. Setup Renderer ---
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 3. Load Texture & Create Material ---
    const textureLoader = new THREE.TextureLoader();
    console.log('[LiquidEffect] Loading texture...');
    
    textureLoader.load(
      imageUrl, 
      (texture) => {
        console.log('[LiquidEffect] Texture loaded successfully');
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
          uTime: { value: 0 },
          uTexture: { value: texture },
          uResolution: { value: new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight) },
          uDistortionStrength: { value: distortionScale },
          uSpeed: { value: speed },
          uNoiseScale: { value: noiseScale },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTintColor: { value: new THREE.Color(tintColor) }
        };
        uniformRef.current = uniforms;

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        sceneRef.current = scene;
        
        console.log('[LiquidEffect] Scene ready, starting animation');
      },
      undefined,
      (err) => console.error("[LiquidEffect] Texture error:", err)
    );

    // --- 4. Animation Loop ---
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!renderer || !sceneRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const elapsedTime = clock.getElapsedTime();
      
      if (uniformRef.current) {
        uniformRef.current.uTime.value = elapsedTime;
        
        // Smooth lerp mouse position
        const mouse = mouseRef.current;
        mouse.x += (mouse.targetX - mouse.x) * mouseLerp;
        mouse.y += (mouse.targetY - mouse.y) * mouseLerp;
        
        uniformRef.current.uMouse.value.set(mouse.x, mouse.y);
      }
      
      renderer.render(sceneRef.current, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // --- 5. Event Listeners ---
    const handleResize = () => {
      if (!containerRef.current || !renderer || !uniformRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformRef.current.uResolution.value.set(width, height);
    };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      // Clamp to 0-1 range
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
      
      // Debug: log every 100ms
      if (!handleMouseMove.lastLog || Date.now() - handleMouseMove.lastLog > 500) {
        console.log('[LiquidEffect] Mouse:', mouseRef.current.targetX.toFixed(2), mouseRef.current.targetY.toFixed(2));
        handleMouseMove.lastLog = Date.now();
      }
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 6. Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      
      if (renderer) {
        renderer.dispose();
        if (sceneRef.current) {
          sceneRef.current.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          });
        }
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [imageUrl, speed, distortionScale, noiseScale, tintColor, mouseLerp, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div 
        className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${className}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
