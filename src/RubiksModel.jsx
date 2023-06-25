import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from '@react-spring/three'
import * as THREE from "three"

const debugMaterial = new THREE.MeshStandardMaterial()
debugMaterial.color = { r: 1, g: 0, b: 1, isColor: true }
let blackMaterial

export function setDebug(piece, debug) {
    piece.ref.current.traverse((object) => {
        if(object.isMesh && object.material.uuid !== blackMaterial.uuid){
            if(debug){
                object.material = debugMaterial
            }
            else {
                object.material = object.userData.originalMaterial
            }
        }
    })
}

function PieceSideMesh({ piece, meshName, geometry, material }) {
    return (
        <mesh
            name={meshName}
            castShadow
            receiveShadow
            geometry={geometry}
            material={piece.debug ? debugMaterial : material}
            userData={{originalMaterial: material}}
        />
    )
}

export function RubiksModel({ edges, corners, fixed }) {
    const { nodes, materials } = useGLTF("/rubiks-with-correct-names3.glb");
    blackMaterial = materials.Black

    const edgeMeshes = [
        [ // 0
            { meshName: "Mesh_14", geometry: nodes.Mesh_14.geometry, material: materials.Black },
            { meshName: "Mesh_15", geometry: nodes.Mesh_15.geometry, material: materials.Yellow },
            { meshName: "Mesh_16", geometry: nodes.Mesh_16.geometry, material: materials.Orange },
        ],
        [ // 1
            { meshName: "Mesh_38", geometry: nodes.Mesh_38.geometry, material: materials.Black },
            { meshName: "Mesh_39", geometry: nodes.Mesh_39.geometry, material: materials.Blue },
            { meshName: "Mesh_40", geometry: nodes.Mesh_40.geometry, material: materials.Yellow },
        ],
        [ // 2
            { meshName: "Mesh_57", geometry: nodes.Mesh_57.geometry, material: materials.Black },
            { meshName: "Mesh_58", geometry: nodes.Mesh_58.geometry, material: materials.Red },
            { meshName: "Mesh_59", geometry: nodes.Mesh_59.geometry, material: materials.Yellow },
        ],
        [ // 3
            { meshName: "Mesh_2", geometry: nodes.Mesh_2.geometry, material: materials.Black },
            { meshName: "Mesh_3", geometry: nodes.Mesh_3.geometry, material: materials.Green },
            { meshName: "Mesh_4", geometry: nodes.Mesh_4.geometry, material: materials.Yellow },
        ],
        [ // 4
            { meshName: "Mesh_31", geometry: nodes.Mesh_31.geometry, material: materials.Black },
            { meshName: "Mesh_32", geometry: nodes.Mesh_32.geometry, material: materials.Blue },
            { meshName: "Mesh_33", geometry: nodes.Mesh_33.geometry, material: materials.Orange },
        ],
        [ // 5
            { meshName: "Mesh_69", geometry: nodes.Mesh_69.geometry, material: materials.Black },
            { meshName: "Mesh_70", geometry: nodes.Mesh_70.geometry, material: materials.Blue },
            { meshName: "Mesh_71", geometry: nodes.Mesh_71.geometry, material: materials.Red },
        ],
        [ // 6
            { meshName: "Mesh_50", geometry: nodes.Mesh_50.geometry, material: materials.Black },
            { meshName: "Mesh_51", geometry: nodes.Mesh_51.geometry, material: materials.Red },
            { meshName: "Mesh_52", geometry: nodes.Mesh_52.geometry, material: materials.Green },
        ],
        [ // 7
            { meshName: "Mesh_11", geometry: nodes.Mesh_11.geometry, material: materials.Black },
            { meshName: "Mesh_12", geometry: nodes.Mesh_12.geometry, material: materials.Green },
            { meshName: "Mesh_13", geometry: nodes.Mesh_13.geometry, material: materials.Orange },
        ],
        [ // 8
            { meshName: "Mesh_19", geometry: nodes.Mesh_19.geometry, material: materials.Black },
            { meshName: "Mesh_20", geometry: nodes.Mesh_20.geometry, material: materials.White },
            { meshName: "Mesh_21", geometry: nodes.Mesh_21.geometry, material: materials.Orange },
        ],
        [ // 9
            { meshName: "Mesh_43", geometry: nodes.Mesh_43.geometry, material: materials.Black },
            { meshName: "Mesh_44", geometry: nodes.Mesh_44.geometry, material: materials.White },
            { meshName: "Mesh_45", geometry: nodes.Mesh_45.geometry, material: materials.Blue },
        ],
        [ // 10
            { meshName: "Mesh_62", geometry: nodes.Mesh_62.geometry, material: materials.Black },
            { meshName: "Mesh_63", geometry: nodes.Mesh_63.geometry, material: materials.White },
            { meshName: "Mesh_64", geometry: nodes.Mesh_64.geometry, material: materials.Red },
        ],
        [ // 11
            { meshName: "Mesh_22", geometry: nodes.Mesh_22.geometry, material: materials.Black },
            { meshName: "Mesh_23", geometry: nodes.Mesh_23.geometry, material: materials.White },
            { meshName: "Mesh_24", geometry: nodes.Mesh_24.geometry, material: materials.Green },
        ],
    ]

    const cornerMeshes = [
        [ // 0
            { meshName: "Mesh_27", geometry: nodes.Mesh_27.geometry, material: materials.Black },
            { meshName: "Mesh_28", geometry: nodes.Mesh_28.geometry, material: materials.Blue },
            { meshName: "Mesh_29", geometry: nodes.Mesh_29.geometry, material: materials.Yellow },
            { meshName: "Mesh_30", geometry: nodes.Mesh_30.geometry, material: materials.Orange },
        ],
        [ // 1
            { meshName: "Mesh_65", geometry: nodes.Mesh_65.geometry, material: materials.Black },
            { meshName: "Mesh_66", geometry: nodes.Mesh_66.geometry, material: materials.Blue },
            { meshName: "Mesh_67", geometry: nodes.Mesh_67.geometry, material: materials.Red },
            { meshName: "Mesh_68", geometry: nodes.Mesh_68.geometry, material: materials.Yellow },
        ],
        [ // 2
            { meshName: "Mesh_46", geometry: nodes.Mesh_46.geometry, material: materials.Black },
            { meshName: "Mesh_47", geometry: nodes.Mesh_47.geometry, material: materials.Red },
            { meshName: "Mesh_48", geometry: nodes.Mesh_48.geometry, material: materials.Green },
            { meshName: "Mesh_49", geometry: nodes.Mesh_49.geometry, material: materials.Yellow },
        ],
        [ // 3
            { meshName: "Mesh_7", geometry: nodes.Mesh_7.geometry, material: materials.Black },
            { meshName: "Mesh_8", geometry: nodes.Mesh_8.geometry, material: materials.Green },
            { meshName: "Mesh_9", geometry: nodes.Mesh_9.geometry, material: materials.Yellow },
            { meshName: "Mesh_10", geometry: nodes.Mesh_10.geometry, material: materials.Orange },
        ],
        [ // 4
            { meshName: "Mesh_34", geometry: nodes.Mesh_34.geometry, material: materials.Black },
            { meshName: "Mesh_35", geometry: nodes.Mesh_35.geometry, material: materials.White },
            { meshName: "Mesh_36", geometry: nodes.Mesh_36.geometry, material: materials.Blue },
            { meshName: "Mesh_37", geometry: nodes.Mesh_37.geometry, material: materials.Orange },
        ],
        [ // 5
            { meshName: "Mesh_72", geometry: nodes.Mesh_72.geometry, material: materials.Black },
            { meshName: "Mesh_73", geometry: nodes.Mesh_73.geometry, material: materials.White },
            { meshName: "Mesh_74", geometry: nodes.Mesh_74.geometry, material: materials.Blue },
            { meshName: "Mesh_75", geometry: nodes.Mesh_75.geometry, material: materials.Red },
        ],
        [ // 6
            { meshName: "Mesh_53", geometry: nodes.Mesh_53.geometry, material: materials.Black },
            { meshName: "Mesh_54", geometry: nodes.Mesh_54.geometry, material: materials.White },
            { meshName: "Mesh_55", geometry: nodes.Mesh_55.geometry, material: materials.Red },
            { meshName: "Mesh_56", geometry: nodes.Mesh_56.geometry, material: materials.Green },
        ],
        [ // 7
            { meshName: "Cube004", geometry: nodes.Cube004.geometry, material: materials.Black },
            { meshName: "Cube004_1", geometry: nodes.Cube004_1.geometry, material: materials.White },
            { meshName: "Cube004_2", geometry: nodes.Cube004_2.geometry, material: materials.Green },
            { meshName: "Cube004_3", geometry: nodes.Cube004_3.geometry, material: materials.Orange },
        ],
    ]

    const fixedMeshes = [
        [ // 0
            { meshName: "Mesh_5", geometry: nodes.Mesh_5.geometry, material: materials.Black },
            { meshName: "Mesh_6", geometry: nodes.Mesh_6.geometry, material: materials.Yellow },
        ],
        [ // 1
            { meshName: "Mesh_17", geometry: nodes.Mesh_17.geometry, material: materials.Black },
            { meshName: "Mesh_18", geometry: nodes.Mesh_18.geometry, material: materials.Orange },
        ],
        [ // 2
            { meshName: "Mesh_41", geometry: nodes.Mesh_41.geometry, material: materials.Black },
            { meshName: "Mesh_42", geometry: nodes.Mesh_42.geometry, material: materials.Blue },
        ],
        [ // 3
            { meshName: "Mesh_60", geometry: nodes.Mesh_60.geometry, material: materials.Black },
            { meshName: "Mesh_61", geometry: nodes.Mesh_61.geometry, material: materials.Red },
        ],
        [ // 4
            { meshName: "Mesh", geometry: nodes.Mesh.geometry, material: materials.Black },
            { meshName: "Mesh_1", geometry: nodes.Mesh_1.geometry, material: materials.Green },
        ],
        [ // 5
            { meshName: "Mesh_25", geometry: nodes.Mesh_25.geometry, material: materials.Black },
            { meshName: "Mesh_26", geometry: nodes.Mesh_26.geometry, material: materials.White },
        ],
    ]

    return (
        <group dispose={null}>
            <group name="Scene">
                {edgeMeshes.map((piece, i) => {
                    return (
                        <group ref={edges[i].ref} quaternion={edges[i].quaternion} name={`edge${i}`} key={i}>
                            {piece.map((m, j) => {
                                return (
                                    <PieceSideMesh
                                        piece={edges[i]}
                                        name={m.meshName}
                                        geometry={m.geometry}
                                        material={m.material}
                                        key={j}
                                    />
                                )
                            })}
                        </group>
                    )
                })}

                {cornerMeshes.map((piece, i) => {
                    return (
                        <a.group ref={corners[i].ref} quaternion={corners[i].quaternion} name={`corner${i}`} key={i}>
                            {piece.map((m, j) => {
                                return (
                                    <PieceSideMesh
                                        piece={corners[i]}
                                        name={m.meshName}
                                        geometry={m.geometry}
                                        material={m.material}
                                        key={j}
                                    />
                                )
                            })}
                        </a.group>
                    )
                })}

                {fixedMeshes.map((piece, i) => {
                    return (
                        <a.group ref={fixed[i].ref} quaternion={fixed[i].quaternion} name={`fixed${i}`} key={i}>
                            {piece.map((m, j) => {
                                return (
                                    <PieceSideMesh
                                        piece={fixed[i]}
                                        name={m.meshName}
                                        geometry={m.geometry}
                                        material={m.material}
                                        key={j}
                                    />
                                )
                            })}
                        </a.group>
                    )
                })}
            </group>
        </group>
    )
}

useGLTF.preload("/rubiks-with-correct-names3.glb");