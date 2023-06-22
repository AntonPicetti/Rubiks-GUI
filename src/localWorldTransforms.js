/**
 * Updates the model during a 90° rotation.
 * @param {Object} worldAxes Mapping between the local coordinate system of the piece and the world coordinate system.
 * @param {String} localAxis The world axis that the rotation is centered about.
 * @param {Number} dir Positive or negative direction (can be 1 or -1).
 */
export function rotateCoordinateSystem(worldAxes, localAxis, dir) {
    const oldWorldAxes = { ...worldAxes }

    if (localAxis == "x" && dir == 1) {
        worldAxes.x = { axis: oldWorldAxes.x.axis, dir: oldWorldAxes.x.dir }
        worldAxes.z = { axis: oldWorldAxes.y.axis, dir: oldWorldAxes.y.dir }
        worldAxes.y = { axis: oldWorldAxes.z.axis, dir: -oldWorldAxes.z.dir }
    }
    else if (localAxis == "x" && dir == -1) {
        worldAxes.x = { axis: oldWorldAxes.x.axis, dir: oldWorldAxes.x.dir }
        worldAxes.z = { axis: oldWorldAxes.y.axis, dir: -oldWorldAxes.y.dir }
        worldAxes.y = { axis: oldWorldAxes.z.axis, dir: oldWorldAxes.z.dir }
    }
    else if (localAxis == "z" && dir == 1) {
        worldAxes.x = { axis: oldWorldAxes.y.axis, dir: -oldWorldAxes.y.dir }
        worldAxes.z = { axis: oldWorldAxes.z.axis, dir: oldWorldAxes.z.dir }
        worldAxes.y = { axis: oldWorldAxes.x.axis, dir: oldWorldAxes.x.dir }
    }
    else if (localAxis == "z" && dir == -1) {
        worldAxes.x = { axis: oldWorldAxes.y.axis, dir: oldWorldAxes.y.dir }
        worldAxes.z = { axis: oldWorldAxes.z.axis, dir: oldWorldAxes.z.dir }
        worldAxes.y = { axis: oldWorldAxes.x.axis, dir: -oldWorldAxes.x.dir }
    }
    else if (localAxis == "y" && dir == 1) {
        worldAxes.x = { axis: oldWorldAxes.z.axis, dir: oldWorldAxes.z.dir }
        worldAxes.z = { axis: oldWorldAxes.x.axis, dir: -oldWorldAxes.x.dir }
        worldAxes.y = { axis: oldWorldAxes.y.axis, dir: oldWorldAxes.y.dir }
    }
    else if (localAxis == "y" && dir == -1) {
        worldAxes.x = { axis: oldWorldAxes.z.axis, dir: -oldWorldAxes.z.dir }
        worldAxes.z = { axis: oldWorldAxes.x.axis, dir: oldWorldAxes.x.dir }
        worldAxes.y = { axis: oldWorldAxes.y.axis, dir: oldWorldAxes.y.dir }
    }
}

/**
 * Returns the local axis that is aligned with worldAxis.
 * @param {Object} worldAxes Mapping between the local coordinate system of the piece and the world coordinate system.
 * @param {String} worldAxis
 * @param {Number} dir Direction (-1 or 1).
 */
export function localAlignedwithWorld(worldAxes, worldAxis, dir) {
    // Object.entries(worldAxes).filter(([key, value], idx) => value.axis ==)
    if (dir == 1) {
        if (worldAxes.x.axis == worldAxis)
            return { axis: "x", dir: worldAxes.x.dir }
        else if (worldAxes.z.axis == worldAxis)
            return { axis: "z", dir: worldAxes.z.dir }
        else if (worldAxes.y.axis == worldAxis)
            return { axis: "y", dir: worldAxes.y.dir }
    }
    else if (dir == -1) {
        if (worldAxes.x.axis == worldAxis)
            return { axis: "x", dir: -worldAxes.x.dir }
        else if (worldAxes.z.axis == worldAxis)
            return { axis: "z", dir: -worldAxes.z.dir }
        else if (worldAxes.y.axis == worldAxis)
            return { axis: "y", dir: -worldAxes.y.dir }
    }
    else {
        throw new Error("Value of `dir` is invalid.")
    }
}

/**
 * Nedan är några oprocessade tankar jag hade när koden skrevs.
 * Kankse kan komma till användning senare om jag vill skriva
 * dokumentation/blogginlägg.
 */

/*
    Rotation x += 90:
    world x: local x
    world z: local -y
    world y: local z

    Rotation z += 90:
    world x: local y
    world z: local z
    world y: local -x

    Rotation x += 90:
    world x: local -z
    world z: local x
    world y: local y
 */

/**
 * Det måste vara en egenskap som funkar att applicera gång på gång på gång.
 * Alltså måste vi jobba med locala axlar och undersöka hur en lokal rotation
 * ändrar de lokala axlarana inebördes.
 * 
 * Förhållandet mellan lokal och world ändras efter första rotationen och därmed
 * kan inte samma egenskap användas flera gånger.
 * 
 * En sak vet vi: uppenbarligen så förändras inte förhållandet mellan de lokala axlarna.
 * 
 * Jag roterar runt lokala x.
 * Då pekar
 *      - lokala x samma som lokala x gjorde innan
 *      - lokala z samma som lokala y gjorde innan
 *      - lokala y samma som lokala -z gjorde innan 
 */