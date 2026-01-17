import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, useGLTF, Float } from '@react-three/drei';
import { AlertTriangle, Smartphone } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Three.js Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

function Model({ color, defect, ...props }) {
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');

    if (materials['body']) {
        materials['body'].color.set(color || '#222');
        if (defect === 'fissure_arriere') {
            materials['body'].roughness = 1.0;
            materials['body'].metalness = 0.5;
        }
    }

    return <primitive object={nodes.Scene} {...props} />;
}

const iPhoneViewer = ({ color = '#222', defect = null }) => {
    const FallbackUI = (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '18px',
            gap: '15px',
            border: '1px dashed var(--border)'
        }}>
            <div style={{ padding: '20px', backgroundColor: 'rgba(255,69,58,0.1)', borderRadius: '50%' }}>
                <Smartphone size={40} color="var(--text-secondary)" />
            </div>
            <div style={{ textAlign: 'center', padding: '0 20px' }}>
                <p style={{ fontWeight: '600', marginBottom: '5px' }}>Prévisualisation 3D indisponible</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Une erreur de réseau empêche le chargement du modèle. L'inspection visuelle reste possible en boutique.
                </p>
            </div>
        </div>
    );

    return (
        <div className="glass-card 3d-container" style={{ height: '500px', width: '100%', cursor: 'grab', position: 'relative', overflow: 'hidden' }}>
            <ErrorBoundary fallback={FallbackUI}>
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

                {/* Interaction hint overlay only if no error */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    pointerEvents: 'none'
                }}>
                    Mode inspection active
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default iPhoneViewer;
