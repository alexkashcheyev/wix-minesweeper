
export function validViewportChange(viewport, gameInfo, dx, dy) {
    
    // if horizontal change requested
    if (dx !== 0) {

        // if the fields fits into the viewport, 
        // change should not be accepted
        if (viewport.width >= gameInfo.width) return false;

        // otherwise, check if we won't get over the
        // borders of the field

        const targetX = viewport.offset.x + dx;

        if (
            targetX < 0 
            || targetX + viewport.width > gameInfo.width
        ) {
            return false;
        } 
    }

    // if vertical change requested, do the same
    if (dy !== 0) {

        if (viewport.height >= gameInfo.height) return false;

        const targetY = viewport.offset.y + dy;

        if (
            targetY < 0
            || targetY + viewport.height > gameInfo.height
        ) {
            return false;
        }

    }

    return true;
}