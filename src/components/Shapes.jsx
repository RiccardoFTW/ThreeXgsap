import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Environment, Float } from '@react-three/drei';
import PropTypes from 'prop-types';
import { ContactShadows } from '@react-three/drei';

const Shapes = () => {
    return (
        <div>
            <Canvas 
                style={{width: '100vw', height: '100vh', backgroundColor: 'darkorange'}}
                camera={{position: [0, 0, 25], fov: 30, near: 1, far: 40}}
                shadows
            >
                <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} />
                <Geometries />
                <Environment preset='studio' />
            </Canvas>
        </div>
    )
}

function Geometries() {
    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3, 0)
        },
        {
            position: [2, -2, 4],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16)
        },
        {
            position: [-2, 3, -4],
            r: 0.4,
            geometry: new THREE.DodecahedronGeometry(1.5)
        },
        {
            position: [-2, -0.75, 5],
            r: 0.4,
            geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32)
        },
        {
            position: [2.2, 3.5, -4],
            r: 0.4,
            geometry: new THREE.OctahedronGeometry(1.5)
        },
    ]

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({color: 0xff5733, roughness: 0.2}),
        new THREE.MeshStandardMaterial({color: 0x3498db, roughness: 0.5}),
        new THREE.MeshStandardMaterial({color: 0x9b59b6, roughness: 0.3}),
        new THREE.MeshStandardMaterial({color: 0x27ae60, roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: 0xe67e22, roughness: 0.6}),
        new THREE.MeshStandardMaterial({
            color: 0xd34500, 
            roughness: 0.5,
            metalness: 0.4,
        }),
    ]

    const soundEffect = [
        new Audio ("/sounds/Hihat 02 by Jalastram.wav"),
        new Audio ("/sounds/Snare 11 by Jalastram.wav"),
        new Audio ("/sounds/Trap Kick 01 by Jalastram.wav"),
        new Audio ("/sounds/Trap Kick 02 by Jalastram.wav")
    ]

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {geometries.map((item) => (
                <Geometry 
                    key={JSON.stringify(item.position)}
                    position={item.position}
                    r={item.r}
                    geometry={item.geometry}
                    materials={materials}
                    soundEffect={soundEffect}
                />
            ))}
        </>
    )
}

function Geometry({position, r, geometry, materials, soundEffect}) {
    const meshRef = useRef();
    useEffect(() => {
        gsap.from(meshRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            delay: 0.3,
            ease: 'elastic.out(1, 0,.3)'
        })
    }, [])

    function handleClick(e) {
        const mesh = e.object;
        gsap.utils.random(soundEffect).play()

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        })
    }

    return(
        <group position={position} ref={meshRef}>
            <Float speed={4 * r} rotationIntensity={4 * r} floatIntensity={3 * r}>
                <mesh
                    onClick={handleClick}
                    geometry={geometry}
                    material={gsap.utils.random(materials)}
                    onPointerEnter={() => (document.body.style.cursor = "pointer")}
                    onPointerLeave={() => (document.body.style.cursor = "default")}
                />
                </Float>
                </group>
            )
        }

Geometry.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    r: PropTypes.number.isRequired,
    geometry: PropTypes.object.isRequired,
    materials: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Shapes;