"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function NatureScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [threeLoaded, setThreeLoaded] = useState(false);

  // Poll for window.THREE since it is loaded via CDN Script tag
  useEffect(() => {
    if (shouldReduceMotion) return;

    let pollInterval: NodeJS.Timeout;
    const checkThree = () => {
      if ((window as any).THREE) {
        setThreeLoaded(true);
        clearInterval(pollInterval);
      }
    };

    checkThree();
    pollInterval = setInterval(checkThree, 100);

    return () => clearInterval(pollInterval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!threeLoaded || !mountRef.current || shouldReduceMotion) return;

    const THREE = (window as any).THREE;
    const container = mountRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Fog
    // blending into our brand background #0a0a14
    scene.fog = new THREE.FogExp2(0x0a0a14, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Initial camera position (Hero section state)
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Sunbeams direction light (Warm golden light filtering in)
    const dirLight = new THREE.DirectionalLight(0xffdfa9, 1.2);
    dirLight.position.set(30, 50, 20);
    scene.add(dirLight);

    // Glow point light (warm golden glow near camera)
    const glowLight = new THREE.PointLight(0xffd080, 2.5, 60);
    scene.add(glowLight);

    // Teal point light (floating forest heart)
    const tealLight = new THREE.PointLight(0x36d7c4, 2.0, 40);
    tealLight.position.set(0, 3, -10);
    scene.add(tealLight);

    // ────────────────────────────────────────────────────────
    // PROCEDURAL TERRAIN (MOSS FLOOR)
    // ────────────────────────────────────────────────────────
    const terrainWidth = 250;
    const terrainLength = 320;
    const terrainSegments = 30;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainLength, terrainSegments, terrainSegments);
    terrainGeo.rotateX(-Math.PI / 2);

    // Simple height function for rolling hills
    const getHeight = (x: number, z: number) => {
      return (
        Math.sin(x * 0.08) * Math.cos(z * 0.08) * 1.5 +
        Math.sin(x * 0.03) * 2.0 +
        Math.cos(z * 0.04) * 1.0
      );
    };

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getHeight(x, z));
    }
    terrainGeo.computeVertexNormals();

    // Translate terrain to center around the camera's Z path (Z = -50)
    terrainGeo.translate(0, 0, -50);

    // Dark forest moss material
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x050e0a,
      roughness: 0.95,
      flatShading: true,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrain);

    // ────────────────────────────────────────────────────────
    // PROCEDURAL 3D TREES
    // ────────────────────────────────────────────────────────
    const treesGroup = new THREE.Group();
    scene.add(treesGroup);

    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.4, 10, 5);
    trunkGeo.translate(0, 5, 0); // Origin at bottom of trunk
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x120c08, roughness: 0.9, flatShading: true });

    // Foliage Materials using friendly, warm nature colors
    const goldFoliageMat = new THREE.MeshStandardMaterial({
      color: 0xffd080,
      roughness: 0.4,
      transparent: true,
      opacity: 0.75,
      emissive: 0x5a3300,
      emissiveIntensity: 0.4,
      flatShading: true,
    });

    const greenFoliageMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.3,
      transparent: true,
      opacity: 0.75,
      emissive: 0x062f17,
      emissiveIntensity: 0.4,
      flatShading: true,
    });

    const warmTealFoliageMat = new THREE.MeshStandardMaterial({
      color: 0x36d7c4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7,
      emissive: 0x083b35,
      emissiveIntensity: 0.4,
      flatShading: true,
    });

    const foliageMaterials = [goldFoliageMat, greenFoliageMat, warmTealFoliageMat];

    // Instantiate shared foliage geometries ONCE to save memory and CPU cycles
    const foliageGeo1 = new THREE.DodecahedronGeometry(1.6, 1);
    foliageGeo1.translate(0, 8.0, 0);
    const foliageGeo2 = new THREE.DodecahedronGeometry(1.2, 1);
    foliageGeo2.translate(-0.8, 8.8, 0.4);
    const foliageGeo3 = new THREE.DodecahedronGeometry(1.2, 1);
    foliageGeo3.translate(0.8, 9.2, -0.4);
    const foliageGeo4 = new THREE.DodecahedronGeometry(1.0, 1);
    foliageGeo4.translate(0, 10.0, 0);

    const treePositions: { x: number; z: number; y: number }[] = [];
    const treesCount = 75; // More trees to populate the extended forest

    for (let i = 0; i < treesCount; i++) {
      // Avoid center line (x ~ 0) where the flythrough camera goes
      let tx = (Math.random() - 0.5) * 70;
      if (Math.abs(tx) < 4) tx += tx >= 0 ? 4 : -4;

      const tz = Math.random() * -170 + 40; // extend deep along Z down to Z = -130
      const ty = getHeight(tx, tz);

      // Create tree group
      const tree = new THREE.Group();
      tree.position.set(tx, ty, tz);

      // Random scale for organic feel
      const scale = 0.75 + Math.random() * 0.6;
      tree.scale.set(scale, scale, scale);

      // Trunk
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      tree.add(trunk);

      // Foliage with random brand color material
      const foliageMat = foliageMaterials[Math.floor(Math.random() * foliageMaterials.length)];
      
      const foliageGroup = new THREE.Group();
      foliageGroup.add(new THREE.Mesh(foliageGeo1, foliageMat));
      foliageGroup.add(new THREE.Mesh(foliageGeo2, foliageMat));
      foliageGroup.add(new THREE.Mesh(foliageGeo3, foliageMat));
      foliageGroup.add(new THREE.Mesh(foliageGeo4, foliageMat));
      
      tree.add(foliageGroup);
      treesGroup.add(tree);
      treePositions.push({ x: tx, y: ty, z: tz });
    }

    // ────────────────────────────────────────────────────────
    // FRIENDLY & CONNECTED AI COMPANIONS
    // ────────────────────────────────────────────────────────
    const companionsGroup = new THREE.Group();
    scene.add(companionsGroup);

    // Geometries
    const bodyGeo = new THREE.DodecahedronGeometry(0.8, 1);
    const earGeo = new THREE.ConeGeometry(0.2, 0.5, 4);
    const eyeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const helperGeo = new THREE.DodecahedronGeometry(0.18, 0);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x16231f, // dark forest green
      roughness: 0.8,
      flatShading: true,
    });
    const earMat = new THREE.MeshStandardMaterial({
      color: 0x1c312a,
      roughness: 0.8,
      flatShading: true,
    });

    const companionsData = [
      { x: -4.5, z: 12, color: 0x36d7c4 },  // Teal companion
      { x: 4.5, z: -8, color: 0xff8a3d },   // Saffron companion
      { x: -5.0, z: -30, color: 0x7c5cff }, // Indigo companion
      { x: 5.0, z: -50, color: 0x36d7c4 },  // Teal companion
      { x: -4.5, z: -70, color: 0xff8a3d },  // Saffron companion
      { x: 4.5, z: -90, color: 0x7c5cff },  // Indigo companion
      { x: -5.0, z: -110, color: 0x36d7c4 }, // Teal companion
      { x: 4.5, z: -130, color: 0xff8a3d },  // Saffron companion
    ];

    const companionInstances: { group: any; helper: any; specificColor: number }[] = [];
    const companionMaterials: any[] = [];

    companionsData.forEach((data) => {
      const group = new THREE.Group();
      const cy = getHeight(data.x, data.z);
      group.position.set(data.x, cy + 0.8, data.z);

      // Rotate companion to face the center camera track path
      group.lookAt(0, cy + 0.8, data.z - 10);

      // Body mesh
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Ears (cute details)
      const leftEar = new THREE.Mesh(earGeo, earMat);
      leftEar.position.set(-0.4, 0.7, 0);
      leftEar.rotation.z = 0.3;
      group.add(leftEar);

      const rightEar = new THREE.Mesh(earGeo, earMat);
      rightEar.position.set(0.4, 0.7, 0);
      rightEar.rotation.z = -0.3;
      group.add(rightEar);

      // Glowing friendly eyes
      const specificEyeMat = new THREE.MeshBasicMaterial({ color: data.color });
      companionMaterials.push(specificEyeMat);

      const leftEye = new THREE.Mesh(eyeGeo, specificEyeMat);
      leftEye.position.set(-0.25, 0.2, 0.65);
      group.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, specificEyeMat);
      rightEye.position.set(0.25, 0.2, 0.65);
      group.add(rightEye);

      // Glowing helper orb floating above head
      const specificHelperMat = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 1.5,
      });
      companionMaterials.push(specificHelperMat);

      const helper = new THREE.Mesh(helperGeo, specificHelperMat);
      helper.position.set(0, 1.2, 0);
      group.add(helper);

      // Point light to cast a friendly glow
      const compLight = new THREE.PointLight(data.color, 1.2, 8);
      compLight.position.set(0, 0.5, 0);
      group.add(compLight);

      companionsGroup.add(group);
      companionInstances.push({ group, helper, specificColor: data.color });
    });

    // ────────────────────────────────────────────────────────
    // MYCELIUM / DATA NEURAL NETWORK LINES (GROUND)
    // ────────────────────────────────────────────────────────
    const linePositions: number[] = [];
    const connectionDist = 18;
    const allNodes = [
      ...treePositions,
      ...companionsData.map((c) => ({ x: c.x, z: c.z, y: getHeight(c.x, c.z) })),
    ];

    // ponytail: connect every pair within range (no 2-connection cap that orphaned most nodes)
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const dx = allNodes[i].x - allNodes[j].x;
        const dz = allNodes[i].z - allNodes[j].z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < connectionDist) {
          linePositions.push(allNodes[i].x, allNodes[i].y + 0.15, allNodes[i].z);
          linePositions.push(allNodes[j].x, allNodes[j].y + 0.15, allNodes[j].z);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x36d7c4, // teal network lines
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(networkLines);

    // ────────────────────────────────────────────────────────
    // CONNECTIVE DATA BEAMS IN THE AIR (BETWEEN COMPANIONS)
    // ────────────────────────────────────────────────────────
    const beamPositions: number[] = [];
    for (let i = 0; i < companionsData.length - 1; i++) {
      const c1 = companionInstances[i].group.position;
      const c2 = companionInstances[i + 1].group.position;
      beamPositions.push(c1.x, c1.y + 1.2, c1.z);
      beamPositions.push(c2.x, c2.y + 1.2, c2.z);
    }

    const airLinesGeo = new THREE.BufferGeometry();
    airLinesGeo.setAttribute("position", new THREE.Float32BufferAttribute(beamPositions, 3));
    const airLinesMat = new THREE.LineBasicMaterial({
      color: 0x7c5cff, // indigo beams
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const airLines = new THREE.LineSegments(airLinesGeo, airLinesMat);
    scene.add(airLines);

    // ────────────────────────────────────────────────────────
    // BIOLUMINESCENT SPORES / PARTICLES
    // ────────────────────────────────────────────────────────
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = Math.random() * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 140;

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() * 0.015 + 0.005), // drift upwards
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Custom circular points shader/texture replacement
    const pMat = new THREE.PointsMaterial({
      color: 0xffd080,
      size: 0.22,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, pMat);
    scene.add(particles);

    // ────────────────────────────────────────────────────────
    // SCROLL INTERPOLATION & FLYTHROUGH PATH
    // ────────────────────────────────────────────────────────
    let scrollPercent = 0;
    let targetScrollPercent = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;

      if (totalScrollable > 0) {
        targetScrollPercent = scrollY / totalScrollable;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth scroll interpolation (lerp) variables
    let currentX = 0;
    let currentY = 5;
    let currentZ = 25;
    let currentLookAtZ = 0;

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Lerp scroll percentage for buttery smooth motion
      scrollPercent += (targetScrollPercent - scrollPercent) * 0.06;

      // ──────────────────────────────────────────────────────
      // 3D CAMERA PATH SCROLL MAPPING
      // ──────────────────────────────────────────────────────
      // Z flies deeper into the forest from 25 to -90
      const targetZ = 25 - scrollPercent * 115;
      
      // X sways left and right along the scroll to weave between trunks
      const targetX = Math.sin(scrollPercent * Math.PI * 2.5) * 4.5;

      // Y goes down near the mossy floor, rises into canopy, and finally rises high
      let targetY = 5;
      if (scrollPercent < 0.35) {
        // Hero to Comparison: dip down slightly
        targetY = 5 - (scrollPercent / 0.35) * 2.2;
      } else if (scrollPercent < 0.7) {
        // Comparison to How It Works: climb up into tree trunks
        const t = (scrollPercent - 0.35) / 0.35;
        targetY = 2.8 + t * 6.2;
      } else {
        // How It Works to Waitlist/Footer: rise above the canopy to see the forest sunset
        const t = (scrollPercent - 0.7) / 0.35;
        targetY = 9.0 + t * 9.0;
      }

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      currentZ += (targetZ - currentZ) * 0.06;

      camera.position.set(currentX, currentY, currentZ);

      // Camera lookAt point travels ahead of the camera along Z
      const targetLookAtZ = currentZ - 20;
      currentLookAtZ += (targetLookAtZ - currentLookAtZ) * 0.08;
      
      // Camera looks slightly up when low, and down when high
      const lookAtY = currentY < 6 ? 4.5 : 8 - (currentY - 6) * 0.2;
      camera.lookAt(currentX * 0.5, lookAtY, currentLookAtZ);

      // Glow light follows the camera to illuminate nearby trees
      glowLight.position.set(currentX, currentY + 1, currentZ - 5);

      // Animate floating spores
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Y drift
        positions[i * 3 + 1] += particleSpeeds[i].y;
        // X and Z sway
        positions[i * 3] += Math.sin(time + i) * 0.005;
        positions[i * 3 + 2] += Math.cos(time + i) * 0.005;

        // Reset if floats too high or far
        if (positions[i * 3 + 1] > 20) {
          positions[i * 3 + 1] = getHeight(positions[i * 3], positions[i * 3 + 2]);
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Drift and rotate the entire spore particle system in space (highly optimized GPU-friendly drift)
      particles.rotation.y = time * 0.02;
      particles.position.y = Math.sin(time * 0.4) * 0.5;

      // Gently sway the entire forest group in the wind (highly optimized single operation)
      treesGroup.rotation.z = Math.sin(time * 0.5) * 0.008;
      treesGroup.rotation.x = Math.cos(time * 0.4) * 0.006;

      // Slowly pulse teal light
      tealLight.intensity = 2.0 + Math.sin(time * 1.5) * 0.5;

      // Pulse neural network lines (ground and air)
      linesMat.opacity = 0.35 + Math.sin(time * 2.0) * 0.15;
      airLinesMat.opacity = 0.4 + Math.cos(time * 2.5) * 0.15;

      // Animate companions (bobbing, rotating floating helper orbs)
      companionInstances.forEach((comp, idx) => {
        comp.group.position.y = getHeight(comp.group.position.x, comp.group.position.z) + 0.8 + Math.sin(time * 2.0 + idx) * 0.08;
        
        comp.helper.rotation.y = time * 2.0 + idx;
        comp.helper.rotation.x = time * 0.5;
        
        comp.helper.material.emissiveIntensity = 1.5 + Math.sin(time * 4.0 + idx) * 0.5;
      });

      // Dynamically blend fog color from moss-green (#0d1714) to a deep warm twilight plum (#15101a) at the bottom
      const baseFogColor = new THREE.Color(0x0d1714);
      const sunsetFogColor = new THREE.Color(0x15101a); // soft warm twilight plum
      const currentFogColor = baseFogColor.clone().lerp(sunsetFogColor, Math.min(Math.pow(scrollPercent, 1.3), 1.0));
      if (scene.fog && 'color' in scene.fog) {
        (scene.fog as any).color.copy(currentFogColor);
      }
      
      // Update HTML container background dynamically to prevent visual mismatch
      const hexColor = "#" + currentFogColor.getHexString();
      container.style.backgroundColor = hexColor;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      terrainGeo.dispose();
      terrainMat.dispose();
      trunkGeo.dispose();
      trunkMat.dispose();
      foliageGeo1.dispose();
      foliageGeo2.dispose();
      foliageGeo3.dispose();
      foliageGeo4.dispose();
      particleGeo.dispose();
      pMat.dispose();
      bodyGeo.dispose();
      earGeo.dispose();
      eyeGeo.dispose();
      helperGeo.dispose();
      bodyMat.dispose();
      earMat.dispose();
      companionMaterials.forEach((m) => m.dispose());
      linesGeo.dispose();
      linesMat.dispose();
      airLinesGeo.dispose();
      airLinesMat.dispose();
      renderer.dispose();
    };
  }, [threeLoaded, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#0d1714]"
      aria-hidden="true"
    />
  );
}
