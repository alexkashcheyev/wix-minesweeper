export function validViewport(viewport, { width, height }) {
    return viewport.offset.x >= 0
        && viewport.offset.x <= width - viewport.width
        && viewport.offset.y >= 0
        && viewport.offset.y <= height - viewport.height
}

export function validViewportChange(viewport, gameInfo, dx, dy) {
    const testedViewport = {
        ...viewport,
        offset: {
            x: viewport.offset.x + dx,
            y: viewport.offset.y + dy
        }
    }

    return validViewport(testedViewport, gameInfo);
}