import { useMemo, useEffect } from "react"

function Cube({position, color}) {
    return (
        <mesh position={position}>
            <meshStandardMaterial color={color} />
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    )
}

export default function DebugCube() {
    const colors = ["red", "lime", "blue", "orange", "yellow", "white"]


    let cubes = []
    const offset = 0.1
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                cubes.push({ position: [x+offset*x, y+offset*y, z+offset*z], color: colors[z] })
            }
        }
    }


    console.log(cubes[0])


    return (

        <group position={[0, 10, 0]}>
            {cubes.map((cube, idx) => {
                return <Cube position={cube.position} color={cube.color} key={idx} />
            })}
        </group>
    )
}