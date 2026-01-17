import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, useGLTF, Float } from '@react-three/drei';

function Model({ color, defect, ...props }) {
    // Using a generic iPhone model URL for demonstration if no local file is provided
    // In a real app, we would use local assets in public/models/
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');

    // Programmatically change the body color
    if (materials['body']) {
        materials['body'].color.set(color || '#222');

        // Simulate defects (cracks/scratches) by adjusting material properties
        if (defect === 'fissure_arriere') {
            materials['body'].roughness = 1.0;
            materials['body'].metalness = 0.5;
            // In a real scenario, we'd swap textures here
        }
    }

    return <primitive object={nodes.Scene} {...props} />;
}

const iPhoneViewer = ({ color = '#222', defect = null }) => {
    return (
        <div className="glass-card 3d-container" style={{ height: '500px', width: '100%', cursor: 'grab' }}>
            <Canvas shadows dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
                    <Environment preset="city" />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Stage environment="city" intensity={0.6} contactShadow={true} shadowBias={-0.0015}>
                            <Model color={color} defect={defect} scale={0.01} />
                        </Stage>
                    </Float>
                    <OrbitControls makeDefault enablePan={false} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                </Suspense>
            </Canvas>
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                color: 'white',
                backdropFilter: 'blur(10px)'
            }}>
                Interagissez pour inspecter les côtés
            </div>
        </div>
    );
};

export default iPhoneViewer;
