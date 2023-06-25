import { Perf } from 'r3f-perf'
import { OrbitControls, useGLTF, Environment, Stage, GizmoHelper, GizmoViewport, Float, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RubiksModel } from './RubiksModel'
import * as THREE from "three"
import { useRef, useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/three'
import { getAllPiecesOnSide, rotateData } from './RubiksData'
import { rotateCoordinateSystem, localAlignedwithWorld } from "./localWorldTransforms"

export default function Experience() {
    const edges = Array(12).fill().map((_, i) => {
        const [spring, api] = useSpring(() => ({ t: 0, config: { mass: 5, tension: 200 } }), []);
        const quaternion =new THREE.Quaternion()
        const from = new THREE.Quaternion()
        const animFrom = new THREE.Quaternion()
        const to = new THREE.Quaternion()
        const [debug, setDebug] = useState(false)

        return {
            ref: useRef(),
            id: `edge-${i}`,
            spring,
            api,
            debug: debug,
            setDebug: setDebug,
            quaternion,
            from,
            animFrom,
            to,
        }
    })
    const corners = Array(8).fill().map((_, i) => {
        const [spring, api] = useSpring(() => ({ t: 0, config: { mass: 5, tension: 200 } }), []);
        const quaternion =new THREE.Quaternion()
        const from = new THREE.Quaternion()
        const animFrom = new THREE.Quaternion()
        const to = new THREE.Quaternion()
        const [debug, setDebug] = useState(false)

        return {
            ref: useRef(),
            id: `corner-${i}`,
            spring,
            api,
            debug: debug,
            setDebug: setDebug,
            quaternion,
            from,
            animFrom,
            to,
        }
    })

    const fixed = Array(6).fill().map((_, i) => {
        const [spring, api] = useSpring(() => ({ t: 0, config: { mass: 5, tension: 200 } }), []);
        const quaternion =new THREE.Quaternion()
        const from = new THREE.Quaternion()
        const animFrom = new THREE.Quaternion()
        const to = new THREE.Quaternion()
        const [debug, setDebug] = useState(false)

        return {
            ref: useRef(),
            id: `fixed-${i}`,
            spring,
            api,
            debug: debug,
            setDebug: setDebug,
            quaternion,
            from,
            animFrom,
            to,
        }
    })


    useFrame(() => {
        [...edges, ...corners, ...fixed].forEach((piece, i) => {
            if (piece.spring.t.animation.values.length) {
                piece.ref.current.quaternion.slerpQuaternions(piece.animFrom, piece.to, piece.spring.t.animation.values[0]._value)
            }
        })
    })

    const [subscribeKeys, getKeys] = useKeyboardControls()

    const rotate = (piece, side, cw) => {
        let q = new THREE.Quaternion()

        if (side === "F") {
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
        }
        else if (side === "U") {
            q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
        }
        else if (side === "B") {
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
            q.invert()
        }
        else if (side === "D") {
            q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            q.invert()
        }
        else if (side === "L") {
            q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
            q.invert()
        }
        else if (side === "R") {
            q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
        }

        piece.from.copy(piece.to)
        piece.to.premultiply(q)
        piece.animFrom.copy(piece.ref.current.quaternion)
        piece.api.start({ from: { t: 0 }, to: { t: 1 } })
    }

    // const rotate = (piece, side, cw) => {
    //     let worldAxis
    //     let dir
    //     if (side === "F") {
    //         worldAxis = "z"
    //         // dir = cw ? 1 : -1 // original
    //         dir = cw ? -1 : 1
    //     }
    //     else if (side === "U") {
    //         worldAxis = "y"
    //         dir = cw ? -1 : 1
    //     }
    //     else if (side === "B") {
    //         worldAxis = "z"
    //         // dir = cw ? -1 : 1 // original
    //         dir = cw ? 1 : -1
    //     }
    //     else if (side === "D") {
    //         worldAxis = "y"
    //         dir = cw ? 1 : -1
    //     }
    //     else if (side === "L") {
    //         worldAxis = "x"
    //         dir = cw ? 1 : -1
    //     }
    //     else if (side === "R") {
    //         worldAxis = "x"
    //         dir = cw ? -1 : 1
    //     }

    //     const localAxis = localAlignedwithWorld(piece.worldAxes, worldAxis, dir)
    //     console.log(localAxis)
    //     let dir2 = localAxis.dir * (cw ? -1 : 1)
    //     rotateCoordinateSystem(piece.worldAxes, localAxis.axis, dir2)

    //     if (localAxis.axis === "x") {
    //         piece.arotation[0] -= dir2 * Math.PI / 2
    //     }
    //     if (localAxis.axis === "y") {
    //         piece.arotation[1] -= dir2 * Math.PI / 2
    //     }
    //     if (localAxis.axis === "z") {
    //         piece.arotation[2] -= dir2 * Math.PI / 2
    //     }

    //     piece.api.start({ rotation: [...piece.arotation] })

    // rotateData(side)
    // }

    let shiftdown = false
    useEffect(() => {
        const unsubscribeKeys = subscribeKeys(
            (state) => state.F || state.U || state.B || state.D || state.L || state.R,
            (pressed) => {
                if (pressed) {
                    let side = Object.entries(getKeys())
                        .filter(([key, value]) => value)[0][0]

                    const sidePiecesIdx = getAllPiecesOnSide(side)
                    const sidePieces = [
                        ...sidePiecesIdx["edges"].map(value => edges[value]),
                        ...sidePiecesIdx["corners"].map(value => corners[value]),
                        ...sidePiecesIdx["fixed"].map(value => fixed[value]),
                    ]

                    if (shiftdown) {
                        sidePieces.forEach(piece => {
                            piece.setDebug(true)
                            // setTimeout(() => { piece.setDebug(false) }, 1000)
                        })

                    }

                    else {
                        sidePieces.forEach(piece => {
                            rotate(piece, side, true)
                        })
                        rotateData(side, false)
                    }
                }
            }
        )

        const unsubscribeShiftKeys = subscribeKeys(
            (state) => state.Shift,
            (pressed) => {
                shiftdown = pressed

                if (!pressed) {
                    for (let i = 0; i < edges.length; i++) edges[i].setDebug(false)
                    for (let i = 0; i < corners.length; i++) corners[i].setDebug(false)
                    for (let i = 0; i < fixed.length; i++) fixed[i].setDebug(false)
                }
            }
        )

        return () => {
            unsubscribeKeys()
            unsubscribeShiftKeys()
        }
    }, [])

    return <>
        <color args={['#FFFFFF']} attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
        >
            <GizmoViewport labelColor="black" />
        </GizmoHelper>

        {/* <Stage
            shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
            environment={null} // TODO: add environment and make sure it works on all devices.
            preset="portrait"
            intensity={1}
        > */}
        {/* <Float floatIntensity={5} rotationIntensity={1} floatingRange={[0, 0.4]}> */}
        <RubiksModel edges={edges} corners={corners} fixed={fixed} />

        {/* </Float> */}
        <Environment files="./resting_place_1k.hdr" />
        {/* </Stage> */}
    </>
}