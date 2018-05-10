/**
 * codish ui utils
 */

export function getDomNodeInfo(domNode) {
    if (!domNode || !domNode.getBoundingClientRect) return {};
    return domNode.getBoundingClientRect();
}
