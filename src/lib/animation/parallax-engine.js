/**
 * ParallaxEngine - Production-Ready Parallax System
 * 
 * Handles smooth mouse/gyroscope-based parallax calculations with:
 * - Lerp damping for smooth interpolation
 * - Gyroscope support for mobile devices
 * - Device capability detection
 * - Movement clamping
 * - Throttled event handlers
 * - Clean memory management
 * 
 * @example
 * const engine = new ParallaxEngine({ damping: 0.08, range: 30 });
 * engine.init();
 * // In animation loop:
 * const { x, y } = engine.getOffset("both");
 * // On cleanup:
 * engine.destroy();
 */

/**
 * @typedef {Object} ParallaxEngineConfig
 * @property {number} [damping=0.08] - Lerp smoothness (0.01 = slow, 0.2 = snappy)
 * @property {number} [range=30] - Maximum movement in pixels (clamped)
 * @property {boolean} [useGyroscope=true] - Enable gyroscope on mobile devices
 * @property {number} [throttleMs=16] - Throttle interval for mouse events (~60fps)
 */

/**
 * Detects device capabilities for performance optimization
 * @returns {{ prefersReducedMotion: boolean, isLowEndDevice: boolean, isMobile: boolean }}
 */
function detectCapabilities() {
    if (typeof window === 'undefined') {
        return { prefersReducedMotion: false, isLowEndDevice: false, isMobile: false };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;

    // Detect low-end devices via hardware concurrency and device memory
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4; // GB, Chrome only
    const isLowEndDevice = hardwareConcurrency <= 2 || deviceMemory <= 2;

    return { prefersReducedMotion, isLowEndDevice, isMobile };
}

/**
 * Creates a throttled version of a function
 * @param {Function} fn - Function to throttle
 * @param {number} wait - Throttle interval in ms
 * @returns {Function}
 */
function throttle(fn, wait) {
    let lastTime = 0;
    let timeoutId = null;

    const throttled = function (...args) {
        const now = Date.now();
        const remaining = wait - (now - lastTime);

        if (remaining <= 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastTime = now;
            fn.apply(this, args);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastTime = Date.now();
                timeoutId = null;
                fn.apply(this, args);
            }, remaining);
        }
    };

    throttled.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return throttled;
}

/**
 * Clamps a value between min and max
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export class ParallaxEngine {
    /**
     * @param {ParallaxEngineConfig} config
     */
    constructor(config = {}) {
        const {
            damping = 0.08,
            range = 30,
            useGyroscope = true,
            throttleMs = 16,
        } = config;

        this.damping = damping;
        this.range = range;
        this.useGyroscope = useGyroscope;
        this.throttleMs = throttleMs;

        // Normalized target position (-1 to 1)
        this.targetX = 0;
        this.targetY = 0;

        // Current interpolated position (-1 to 1)
        this.currentX = 0;
        this.currentY = 0;

        // State
        this.rafId = null;
        this.isActive = false;
        this.isDestroyed = false;
        this.gyroscopePermission = 'prompt'; // 'granted' | 'denied' | 'prompt'

        // Device capabilities
        this.capabilities = detectCapabilities();

        // Bind methods
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this);
        this._update = this._update.bind(this);

        // Create throttled handlers
        this._throttledMouseMove = throttle(this._handleMouseMove, this.throttleMs);
        this._throttledDeviceOrientation = throttle(this._handleDeviceOrientation, this.throttleMs);
    }

    /**
     * Initialize the parallax engine
     * Starts listening for mouse/gyroscope events
     */
    init() {
        if (this.isDestroyed || this.isActive) return;

        // Disable if user prefers reduced motion
        if (this.capabilities.prefersReducedMotion) {
            console.log('[ParallaxEngine] Disabled: prefers-reduced-motion is set');
            return;
        }

        // Disable heavy effects on low-end devices
        if (this.capabilities.isLowEndDevice) {
            console.log('[ParallaxEngine] Running in low-power mode');
            this.damping = 0.15; // Faster lerp = less frames needed
        }

        this.isActive = true;

        // Desktop: Mouse tracking
        if (!this.capabilities.isMobile) {
            window.addEventListener('mousemove', this._throttledMouseMove, { passive: true });
        }

        // Mobile: Gyroscope tracking
        if (this.capabilities.isMobile && this.useGyroscope) {
            this._initGyroscope();
        }

        // Start update loop
        this._update();
    }

    /**
     * Initialize gyroscope with permission handling (iOS 13+)
     * @private
     */
    async _initGyroscope() {
        // Check if DeviceOrientationEvent exists and requires permission
        if (typeof DeviceOrientationEvent !== 'undefined') {
            // iOS 13+ requires permission
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    this.gyroscopePermission = permission;

                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', this._throttledDeviceOrientation, { passive: true });
                    } else {
                        console.log('[ParallaxEngine] Gyroscope permission denied');
                    }
                } catch (error) {
                    console.log('[ParallaxEngine] Gyroscope permission error:', error);
                    this.gyroscopePermission = 'denied';
                }
            } else {
                // Android and older iOS - no permission needed
                window.addEventListener('deviceorientation', this._throttledDeviceOrientation, { passive: true });
                this.gyroscopePermission = 'granted';
            }
        }
    }

    /**
     * Request gyroscope permission (call from user interaction)
     * Required for iOS 13+
     * @returns {Promise<boolean>}
     */
    async requestGyroscopePermission() {
        if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                this.gyroscopePermission = permission;

                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', this._throttledDeviceOrientation, { passive: true });
                    return true;
                }
            } catch (error) {
                console.error('[ParallaxEngine] Permission request failed:', error);
            }
        }
        return false;
    }

    /**
     * Destroy the engine and clean up all listeners
     */
    destroy() {
        if (this.isDestroyed) return;

        this.isDestroyed = true;
        this.isActive = false;

        // Cancel animation frame
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        // Remove event listeners
        window.removeEventListener('mousemove', this._throttledMouseMove);
        window.removeEventListener('deviceorientation', this._throttledDeviceOrientation);

        // Cancel any pending throttled calls
        this._throttledMouseMove.cancel();
        this._throttledDeviceOrientation.cancel();

        // Reset state
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = 0;
        this.currentY = 0;
    }

    /**
     * Handle mouse movement
     * @param {MouseEvent} e
     * @private
     */
    _handleMouseMove(e) {
        if (!this.isActive) return;

        const { innerWidth, innerHeight } = window;

        // Normalize to -1 to 1 (center of screen = 0,0)
        this.targetX = (e.clientX / innerWidth) * 2 - 1;
        this.targetY = (e.clientY / innerHeight) * 2 - 1;
    }

    /**
     * Handle device orientation (gyroscope)
     * @param {DeviceOrientationEvent} e
     * @private
     */
    _handleDeviceOrientation(e) {
        if (!this.isActive) return;

        const { beta, gamma } = e;

        if (beta === null || gamma === null) return;

        // beta: -180 to 180 (front-back tilt)
        // gamma: -90 to 90 (left-right tilt)
        // Normalize to -1 to 1, with reasonable tilt range (±30 degrees)
        const maxTilt = 30;
        this.targetX = clamp(gamma / maxTilt, -1, 1);
        this.targetY = clamp((beta - 45) / maxTilt, -1, 1); // Offset by 45° for natural holding position
    }

    /**
     * Animation loop - lerp towards target
     * @private
     */
    _update() {
        if (!this.isActive) return;

        // Lerp: current += (target - current) * damping
        this.currentX += (this.targetX - this.currentX) * this.damping;
        this.currentY += (this.targetY - this.currentY) * this.damping;

        // Clamp to prevent micro-movements from continuing forever
        if (Math.abs(this.targetX - this.currentX) < 0.0001) this.currentX = this.targetX;
        if (Math.abs(this.targetY - this.currentY) < 0.0001) this.currentY = this.targetY;

        this.rafId = requestAnimationFrame(this._update);
    }

    /**
     * Get the calculated offset for applying to transforms
     * @param {"x" | "y" | "both"} direction - Which axis to return
     * @returns {{ x: number, y: number }}
     */
    getOffset(direction = 'both') {
        let x = 0;
        let y = 0;

        if (direction === 'x' || direction === 'both') {
            x = clamp(this.currentX * this.range, -this.range, this.range);
        }
        if (direction === 'y' || direction === 'both') {
            y = clamp(this.currentY * this.range, -this.range, this.range);
        }

        return { x, y };
    }

    /**
     * Check if the engine is currently active
     * @returns {boolean}
     */
    isRunning() {
        return this.isActive && !this.isDestroyed;
    }

    /**
     * Get current device capabilities
     * @returns {{ prefersReducedMotion: boolean, isLowEndDevice: boolean, isMobile: boolean }}
     */
    getCapabilities() {
        return { ...this.capabilities };
    }

    /**
     * Update configuration at runtime
     * @param {Partial<ParallaxEngineConfig>} config
     */
    updateConfig(config) {
        if (config.damping !== undefined) this.damping = config.damping;
        if (config.range !== undefined) this.range = config.range;
    }
}
