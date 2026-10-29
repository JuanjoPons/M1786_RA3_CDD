import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Compass } from 'lucide-react';

interface ThreeSpaceCanvasProps {
  activeView?: 'earth' | 'tpack' | 'satellite';
  className?: string;
}

export const ThreeSpaceCanvas: React.FC<ThreeSpaceCanvasProps> = ({
  activeView = 'earth',
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<'earth' | 'tpack' | 'satellite'>(activeView);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeInfo, setActiveInfo] = useState<string>('Órbita Terrestre & Nodos de Aprendizaje');

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    earthGroup: THREE.Group;
    satelliteGroup: THREE.Group;
    tpackGroup: THREE.Group;
    clouds: THREE.Mesh;
    reqId: number;
  } | null>(null);

  useEffect(() => {
    setCurrentView(activeView);
  }, [activeView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 18);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(20, 15, 25);
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
    blueRimLight.position.set(-25, -10, -20);
    scene.add(blueRimLight);

    // 4. Procedural Starfield Particle System
    const starCount = isSoftwareGl ? 300 : 900;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const r = 50 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = r * Math.cos(phi);

      const isCyan = Math.random() > 0.65;
      starColors[idx] = isCyan ? 0.2 : 0.9;
      starColors[idx + 1] = isCyan ? 0.8 : 0.95;
      starColors[idx + 2] = 1.0;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. Procedural Earth Mesh
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Create Earth texture via canvas
    const createEarthCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Deep ocean
        ctx.fillStyle = '#061a33';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Continents and topography procedural patterns
        ctx.fillStyle = '#103d42';
        for (let i = 0; i < 48; i++) {
          const cx = Math.random() * canvas.width;
          const cy = 80 + Math.random() * (canvas.height - 160);
          const rad = 25 + Math.random() * 90;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.fill();
        }

        // Coastline highlights
        ctx.fillStyle = '#1e6870';
        for (let i = 0; i < 30; i++) {
          const cx = Math.random() * canvas.width;
          const cy = 100 + Math.random() * (canvas.height - 200);
          const rad = 15 + Math.random() * 45;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.fill();
        }

        // Night city lights
        ctx.fillStyle = 'rgba(255, 230, 160, 0.85)';
        for (let i = 0; i < 180; i++) {
          const x = Math.random() * canvas.width;
          const y = 80 + Math.random() * (canvas.height - 160);
          ctx.fillRect(x, y, 2 + Math.random() * 2, 2 + Math.random() * 2);
        }
      }
      return canvas;
    };

    const earthTexture = new THREE.CanvasTexture(createEarthCanvas());
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthGeo = new THREE.SphereGeometry(4.8, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.15
    });
    const earthSphere = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthSphere);

    // Atmospheric Glow Rim Shell
    const atmoGeo = new THREE.SphereGeometry(5.08, 36, 36);
    const atmoMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.22,
      roughness: 0.9,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmosphere);

    // Procedural Clouds Layer
    const createCloudCanvas = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const cx = c.getContext('2d');
      if (cx) {
        cx.fillStyle = 'rgba(0,0,0,0)';
        cx.fillRect(0, 0, 512, 256);
        cx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let i = 0; i < 28; i++) {
          const x = Math.random() * 512;
          const y = 50 + Math.random() * 150;
          cx.beginPath();
          cx.ellipse(x, y, 35 + Math.random() * 60, 12 + Math.random() * 22, 0, 0, Math.PI * 2);
          cx.fill();
        }
      }
      return c;
    };
    const cloudTexture = new THREE.CanvasTexture(createCloudCanvas());
    cloudTexture.colorSpace = THREE.SRGBColorSpace;
    const cloudGeo = new THREE.SphereGeometry(4.9, 36, 36);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(clouds);

    // 6. Orbital Satellite Assembly (3-12 parts procedural model)
    const satelliteGroup = new THREE.Group();
    scene.add(satelliteGroup);

    // Main Bus Body
    const busGeo = new THREE.BoxGeometry(0.8, 1.2, 0.8);
    const busMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.2
    });
    const busMesh = new THREE.Mesh(busGeo, busMat);
    satelliteGroup.add(busMesh);

    // Gold Foil Insulation Wrap
    const foilGeo = new THREE.BoxGeometry(0.82, 0.5, 0.82);
    const foilMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.3
    });
    const foilMesh = new THREE.Mesh(foilGeo, foilMat);
    foilMesh.position.y = -0.25;
    satelliteGroup.add(foilMesh);

    // Solar Wings (Left & Right)
    const wingGeo = new THREE.BoxGeometry(2.2, 0.6, 0.04);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.95,
      roughness: 0.1
    });

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-1.6, 0, 0);
    satelliteGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(1.6, 0, 0);
    satelliteGroup.add(rightWing);

    // Solar Truss Booms
    const boomGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8);
    const boomMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    const leftBoom = new THREE.Mesh(boomGeo, boomMat);
    leftBoom.rotation.z = Math.PI / 2;
    leftBoom.position.set(-0.6, 0, 0);
    satelliteGroup.add(leftBoom);

    const rightBoom = new THREE.Mesh(boomGeo, boomMat);
    rightBoom.rotation.z = Math.PI / 2;
    rightBoom.position.set(0.6, 0, 0);
    satelliteGroup.add(rightBoom);

    // Communication Parabolic Dish
    const dishGeo = new THREE.CylinderGeometry(0.4, 0.05, 0.15, 24, 1, true);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.7, roughness: 0.2, side: THREE.DoubleSide });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.rotation.x = Math.PI / 3;
    dish.position.set(0, 0.75, 0.3);
    satelliteGroup.add(dish);

    // Communication Antenna Mast
    const mastGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, metalness: 0.9 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(0, 0.95, 0.3);
    satelliteGroup.add(mast);

    // Cyan Telemetry Beacon
    const beaconGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 1.35, 0.3);
    satelliteGroup.add(beacon);

    // Satellite initial position
    satelliteGroup.position.set(7.5, 2.5, 3.5);
    satelliteGroup.scale.set(0.85, 0.85, 0.85);

    // 7. 3D TPACK Hologram Rings & Interactive Nodes
    const tpackGroup = new THREE.Group();
    scene.add(tpackGroup);

    // Create 3 glowing orbital rings for TK, PK, CK
    const createTpackRing = (radius: number, color: number, tiltX: number, tiltY: number, tiltZ: number) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.set(tiltX, tiltY, tiltZ);

      // Torus track
      const torusGeo = new THREE.TorusGeometry(radius, 0.03, 16, 100);
      const torusMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      ringGroup.add(torus);

      // Node probe on the ring
      const nodeGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(radius, 0, 0);
      ringGroup.add(node);

      return { ringGroup, node, radius };
    };

    // Ring 1: TK (Technological Knowledge - Cyan)
    const tkRing = createTpackRing(6.8, 0x00e5ff, Math.PI / 4, 0, 0);
    tpackGroup.add(tkRing.ringGroup);

    // Ring 2: PK (Pedagogical Knowledge - Blue)
    const pkRing = createTpackRing(7.2, 0x38bdf8, -Math.PI / 4, Math.PI / 3, 0);
    tpackGroup.add(pkRing.ringGroup);

    // Ring 3: CK (Content Knowledge - Gold/Amber)
    const ckRing = createTpackRing(7.6, 0xfacc15, 0, -Math.PI / 4, Math.PI / 6);
    tpackGroup.add(ckRing.ringGroup);

    // Central Convergence Core (TPACK)
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0);
    tpackGroup.add(coreMesh);

    // 8. Interaction (Mouse dragging to rotate)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotVelY = deltaX * 0.005;
      rotVelX = deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    let satAngle = 0;

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Earth rotation
      if (autoRotate && !isDragging) {
        earthGroup.rotation.y += 0.15 * delta;
        clouds.rotation.y += 0.22 * delta;
        tpackGroup.rotation.y += 0.08 * delta;
      }

      // Drag inertia
      if (Math.abs(rotVelX) > 0.0001 || Math.abs(rotVelY) > 0.0001) {
        earthGroup.rotation.x += rotVelX;
        earthGroup.rotation.y += rotVelY;
        tpackGroup.rotation.x += rotVelX * 0.8;
        tpackGroup.rotation.y += rotVelY * 0.8;
        rotVelX *= 0.92;
        rotVelY *= 0.92;
      }

      // Satellite Orbit trajectory
      satAngle += 0.35 * delta;
      const satR = 7.8;
      const orbitX = Math.cos(satAngle) * satR;
      const orbitZ = Math.sin(satAngle) * satR;
      const orbitY = Math.sin(satAngle * 1.5) * 2.2;
      satelliteGroup.position.set(orbitX, orbitY, orbitZ);
      satelliteGroup.rotation.y = satAngle + Math.PI / 2;
      satelliteGroup.rotation.z = Math.sin(satAngle) * 0.2;

      // Pulse Central TPACK Core
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.08;
      coreMesh.scale.set(scale, scale, scale);
      coreMesh.rotation.x += 0.5 * delta;
      coreMesh.rotation.y += 0.7 * delta;

      // Animate node probes along rings
      tkRing.node.position.x = tkRing.radius * Math.cos(elapsed * 0.8);
      tkRing.node.position.y = tkRing.radius * Math.sin(elapsed * 0.8);

      pkRing.node.position.x = pkRing.radius * Math.cos(-elapsed * 0.7);
      pkRing.node.position.y = pkRing.radius * Math.sin(-elapsed * 0.7);

      ckRing.node.position.x = ckRing.radius * Math.cos(elapsed * 0.6);
      ckRing.node.position.y = ckRing.radius * Math.sin(elapsed * 0.6);

      // Camera view transition
      let targetCamPos = new THREE.Vector3(0, 4, 18);
      let targetLookAt = new THREE.Vector3(0, 0, 0);

      if (currentView === 'satellite') {
        targetCamPos = new THREE.Vector3(
          satelliteGroup.position.x + 3.5,
          satelliteGroup.position.y + 1.8,
          satelliteGroup.position.z + 4.5
        );
        targetLookAt.copy(satelliteGroup.position);
      } else if (currentView === 'tpack') {
        targetCamPos = new THREE.Vector3(0, 9, 14);
        targetLookAt = new THREE.Vector3(0, 0, 0);
      }

      camera.position.lerp(targetCamPos, 0.04);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
      sceneRef.current = {
        scene,
        camera,
        renderer,
        earthGroup,
        satelliteGroup,
        tpackGroup,
        clouds,
        reqId: requestAnimationFrame(tick)
      };
    };

    tick();

    return () => {
      if (sceneRef.current?.reqId) {
        cancelAnimationFrame(sceneRef.current.reqId);
      }
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      // Dispose Three.js resources
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudTexture.dispose();
      starGeo.dispose();
      starMat.dispose();
      busGeo.dispose();
      busMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentView, autoRotate]);

  return (
    <div className={`relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden bg-[#030712] border border-cyan-500/30 glow-cyan ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-slate-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="tracking-wider">ORBITAL VIEWPORT 3D</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300">{activeInfo}</span>
      </div>

      {/* View Presets & Controls Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-xl border border-cyan-500/40 shadow-2xl">
        <button
          onClick={() => {
            setCurrentView('earth');
            setActiveInfo('Órbita Terrestre Global');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            currentView === 'earth'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.6)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Planeta
        </button>

        <button
          onClick={() => {
            setCurrentView('tpack');
            setActiveInfo('Anillos TPACK: TK · PK · CK');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            currentView === 'tpack'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.6)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Holograma TPACK
        </button>

        <button
          onClick={() => {
            setCurrentView('satellite');
            setActiveInfo('Sonda Orbital & Telemetría');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            currentView === 'satellite'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.6)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Satélite
        </button>

        <div className="w-[1px] h-4 bg-slate-800 mx-1" />

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
            autoRotate ? 'text-cyan-400 bg-cyan-950/50' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Alternar rotación automática"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      {/* Coordinate & Telemetry Corner Accents */}
      <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/70 text-right pointer-events-none hidden sm:block">
        <div>SYS: GEO-CDPD // RA3</div>
        <div>ALT: 420.5 KM</div>
        <div>INC: 51.6°</div>
      </div>
    </div>
  );
};
