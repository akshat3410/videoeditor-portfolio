/**
 * Smooth Gradient Water Ripple Shader
 * Elegant, minimal water effect with smooth gradients
 */

export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform float uDistortionStrength;
  uniform float uSpeed;
  uniform float uNoiseScale;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec3 uTintColor;
  
  varying vec2 vUv;

  #define PI 3.14159265359

  // Smooth gradient ripple - elegant wave
  float smoothRipple(float dist, float time) {
    // Larger, slower waves
    float wave = sin(dist * 15.0 - time * 3.0);
    
    // Smooth decay
    float decay = exp(-dist * 5.0);
    
    return wave * decay;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    
    // Aspect-corrected coordinates
    vec2 aspectUV = vec2(uv.x * aspect, uv.y);
    vec2 mouseAspect = vec2(uMouse.x * aspect, uMouse.y);
    
    float time = uTime;
    
    // Distance from cursor
    float dist = length(aspectUV - mouseAspect);
    
    // ===== SMOOTH RIPPLE =====
    float ripple = smoothRipple(dist, time);
    
    // Secondary ripple for depth
    float ripple2 = smoothRipple(dist * 1.5, time * 1.2) * 0.5;
    
    float totalRipple = ripple + ripple2;
    
    // ===== VERY DARK BASE COLORS =====
    vec3 baseColor = vec3(0.02, 0.02, 0.025);  // Near black
    vec3 rippleColor = vec3(0.08, 0.09, 0.11); // Dark grey
    vec3 highlightColor = vec3(0.15, 0.16, 0.19); // Light grey highlight
    
    // ===== COMPOSE =====
    // Start with base
    vec3 color = baseColor;
    
    // Add ripple - smooth gradient from dark to light
    float rippleIntensity = smoothstep(0.5, 0.0, dist);
    float rippleGradient = (totalRipple * 0.5 + 0.5) * rippleIntensity;
    
    color = mix(color, rippleColor, rippleGradient * 0.6);
    
    // Highlight on wave peaks
    float peak = smoothstep(0.3, 1.0, totalRipple) * rippleIntensity;
    color = mix(color, highlightColor, peak * 0.4);
    
    // Soft glow at cursor center
    float centerGlow = smoothstep(0.2, 0.0, dist);
    color += vec3(0.06, 0.07, 0.08) * centerGlow;
    
    // Subtle outer ring
    float ring = smoothstep(0.02, 0.0, abs(dist - 0.15 - sin(time * 2.0) * 0.05));
    ring *= smoothstep(0.4, 0.1, dist);
    color += highlightColor * ring * 0.2;

    gl_FragColor = vec4(color, 1.0);
  }
`;
