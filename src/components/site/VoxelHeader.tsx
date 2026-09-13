import { useEffect, useRef } from "react";

const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
};

type Voxel = { x: number; y: number; z: number; letter: number };

function buildVoxels() {
  const voxels: Voxel[] = [];
  const lines = ["MUHAMMAD", "AHMAD"];
  const cell = 0.28;
  const letterWidth = cell * 6;

  lines.forEach((line, row) => {
    const rowWidth = line.length * letterWidth - cell;
    const rowY = row === 0 ? 1.15 : -1.2;
    Array.from(line).forEach((letter, letterIndex) => {
      const glyph = GLYPHS[letter];
      if (!glyph) return;
      glyph.forEach((glyphRow, y) => {
        Array.from(glyphRow).forEach((filled, x) => {
          if (filled !== "1") return;
          voxels.push({
            x: letterIndex * letterWidth + x * cell - rowWidth / 2,
            y: rowY + (3 - y) * cell,
            z: ((x + y + letterIndex) % 3) * 0.035,
            letter: letterIndex + row * 9,
          });
        });
      });
    });
  });

  return voxels;
}

const VOXELS = buildVoxels();

export function VoxelHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let frame = 0;
    let visible = true;

    const setup = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
      camera.position.set(0, 0.25, 15);

      const group = new THREE.Group();
      scene.add(group);
      scene.add(new THREE.HemisphereLight(0xf6e4d6, 0x281503, 2.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(-4, 6, 8);
      scene.add(key);

      const geometry = new THREE.BoxGeometry(0.235, 0.235, 0.235);
      const material = new THREE.MeshStandardMaterial({
        color: 0xf6e4d6,
        roughness: 0.72,
        metalness: 0.03,
        flatShading: true,
      });
      const mesh = new THREE.InstancedMesh(geometry, material, VOXELS.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      group.add(mesh);

      const dummy = new THREE.Object3D();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const resize = () => {
        const { width, height } = canvas.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = width < 640 ? 18.5 : 15;
        camera.updateProjectionMatrix();
      };

      const render = () => {
        frame = 0;
        if (!visible || disposed) return;
        const progress = reducedMotion.matches ? 0 : progressRef.current;

        VOXELS.forEach((voxel, index) => {
          const letterPhase = voxel.letter * 0.34;
          const arc = Math.sin(voxel.x * 0.34 + progress * Math.PI * 1.25) * 0.36;
          const lift = Math.sin(progress * Math.PI + letterPhase) * 0.48;
          dummy.position.set(
            voxel.x + Math.sin(progress * Math.PI * 0.7 + letterPhase) * 0.14,
            voxel.y + arc + lift,
            voxel.z + Math.cos(progress * Math.PI * 1.5 + letterPhase) * 0.52,
          );
          dummy.rotation.set(
            Math.sin(progress * Math.PI + letterPhase) * 0.08,
            Math.sin(progress * Math.PI * 1.4 + letterPhase) * 0.18,
            Math.cos(progress * Math.PI + letterPhase) * 0.045,
          );
          const scale = 0.9 + Math.sin(progress * Math.PI + letterPhase) * 0.08;
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          mesh.setMatrixAt(index, dummy.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        group.rotation.y = (progress - 0.5) * 0.12;
        renderer.render(scene, camera);
      };

      const requestRender = () => {
        if (!frame) frame = window.requestAnimationFrame(render);
      };

      const onScroll = () => {
        const section = canvas.closest("section");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        progressRef.current = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
        requestRender();
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
        requestRender();
      });
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) requestRender();
      });

      resizeObserver.observe(canvas);
      visibilityObserver.observe(canvas);
      window.addEventListener("scroll", onScroll, { passive: true });
      reducedMotion.addEventListener("change", requestRender);
      resize();
      onScroll();
      render();

      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
        reducedMotion.removeEventListener("change", requestRender);
        if (frame) window.cancelAnimationFrame(frame);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    void setup().then((teardown) => {
      if (disposed) teardown?.();
      else cleanup = teardown;
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="absolute inset-x-0 top-[11vh] z-10 h-[54vh] min-h-[340px] md:top-[5vh] md:h-[68vh]">
      <h1 className="sr-only">Muhammad Ahmad</h1>
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
    </div>
  );
}