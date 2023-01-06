export function getWeight(rect: DOMRect, window: Window) {
    const isFullyInView = rect.top > 0 && rect.bottom < window.innerHeight;
    const isFillingScreen = rect.top <= 0 && rect.bottom >= window.innerHeight;
    const isPeekingFromTop = rect.bottom > 0 && rect.bottom < window.innerHeight;
    const isPeekingFromBottom = rect.top > 0 && rect.bottom >= window.innerHeight;

    if (isFillingScreen || isFullyInView) {
        return 1;
    } else if (isPeekingFromTop) {
        return Math.max(0, rect.bottom / window.innerHeight);
    } else if (isPeekingFromBottom) {
        return Math.max(0, (window.innerHeight - rect.top) / window.innerHeight);
    }
    return 0;
}