/**
 * codish ui utils
 */

export function getDomNodeInfo(domNode) {
    if (!domNode || !domNode.getBoundingClientRect) return {};
    return domNode.getBoundingClientRect();
}

export function getPageScrollInfo() {
    let scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    let scrollLeft = window.pageXOffset
        ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0;
    return {
        scrollLeft,
        scrollTop
    };
}
