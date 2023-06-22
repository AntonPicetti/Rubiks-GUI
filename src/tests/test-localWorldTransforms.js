import  { localAlignedwithWorld, rotateCoordinateSystem} from "../localWorldTransforms.js"

const testCases = [
    {
        rotations: [ // around world axis
            { axis: "x", dir: 1 },
        ],
        result: { // key: world axis, value: local axis
            x: { axis: 'x', dir: 1 },
            z: { axis: 'y', dir: -1 },
            y: { axis: 'z', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: 1 },
            z: { axis: 'z', dir: -1 },
            y: { axis: 'y', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: 1 },
            z: { axis: 'y', dir: 1 },
            y: { axis: 'z', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
            { axis: "x", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: 1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'y', dir: 1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'x', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: -1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'y', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'y', dir: -1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'x', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: 1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'z', dir: -1 },
            z: { axis: 'x', dir: 1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: -1 },
            z: { axis: 'z', dir: -1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'z', dir: 1 },
            z: { axis: 'x', dir: -1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'x', dir: 1 },
            z: { axis: 'z', dir: 1 },
            y: { axis: 'y', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "x", dir: 1 },
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'z', dir: 1 },
            z: { axis: 'y', dir: -1 },
            y: { axis: 'x', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "x", dir: 1 },
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'y', dir: 1 },
            z: { axis: 'x', dir: 1 },
            y: { axis: 'z', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
            { axis: "x", dir: 1 },
        ],
        result: {
            x: { axis: 'y', dir: 1 },
            z: { axis: 'x', dir: 1 },
            y: { axis: 'z', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "z", dir: 1 },
            { axis: "y", dir: 1 },
        ],
        result: {
            x: { axis: 'z', dir: -1 },
            z: { axis: 'y', dir: 1 },
            y: { axis: 'x', dir: -1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
            { axis: "x", dir: 1 },
        ],
        result: {
            x: { axis: 'z', dir: -1 },
            z: { axis: 'y', dir: -1 },
            y: { axis: 'x', dir: 1 }
        }
    },
    {
        rotations: [
            { axis: "y", dir: 1 },
            { axis: "z", dir: 1 },
        ],
        result: {
            x: { axis: 'y', dir: 1 },
            z: { axis: 'x', dir: 1 },
            y: { axis: 'z', dir: 1 }
        }
    },
]

function testRotate() {
    // Local "key" point to world "value"
    let worldAxes = {
        x: { axis: "x", dir: 1 },
        z: { axis: "z", dir: 1 },
        y: { axis: "y", dir: 1 }
    }

    let initWorldAxes = { ...worldAxes }
    let local
    let resX, resY, resZ
    testCases.forEach(testCase => {
        worldAxes = { ...initWorldAxes }

        testCase.rotations.forEach(rot => {
            local = localAlignedwithWorld(worldAxes, rot.axis, rot.dir)
            rotateCoordinateSystem(worldAxes, local.axis, local.dir)
        })

        resX = localAlignedwithWorld(worldAxes, "x", 1)
        resY = localAlignedwithWorld(worldAxes, "z", 1)
        resZ = localAlignedwithWorld(worldAxes, "y", 1)

        console.assert(resX.axis === testCase.result.x.axis && resX.dir === testCase.result.x.dir, `Failed rotations ${testCase.rotations}`)
        console.assert(resY.axis === testCase.result.z.axis && resY.dir === testCase.result.z.dir, `Failed rotations ${testCase.rotations}`)
        console.assert(resZ.axis === testCase.result.y.axis && resZ.dir === testCase.result.y.dir, `Failed rotations ${testCase.rotations}`)
    })
}

testRotate()