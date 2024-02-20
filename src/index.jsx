import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[
            {name: 'F', keys: ['KeyF']},
            {name: 'U', keys: ['KeyU']},
            {name: 'B', keys: ['KeyB']},
            {name: 'D', keys: ['KeyD']},
            {name: 'L', keys: ['KeyL']},
            {name: 'R', keys: ['KeyR']},
            {name: 'Q', keys: ['KeyQ']},
            {name: 'Shift', keys: ['Shift']}
        ]}
    >
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 4, 3, 6]
            }}
        >
            <Experience />
        </Canvas>
    </KeyboardControls>
)