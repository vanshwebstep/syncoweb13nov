/**
 * Global DOM patch to prevent Google Translate and other browser translation
 * extensions from crashing React.
 *
 * Problem:
 * Google Translate mutates the real DOM by wrapping text nodes in `<font>` tags.
 * When React updates or reconciles components, it attempts to call
 * `parentNode.insertBefore(newNode, referenceNode)` or `parentNode.removeChild(child)`.
 * Because Google Translate reparented the reference node or child,
 * `node.parentNode !== parentNode`, causing native DOMException:
 * "NotFoundError: Failed to execute 'insertBefore' on 'Node':
 * The node before which the new node is to be inserted is not a child of this node."
 *
 * Solution:
 * Safely intercept `insertBefore` and `removeChild` on Node.prototype:
 * - If `referenceNode` is not a child of `this`, safely fall back to `insertBefore(newNode, null)`
 *   (which appends to `this`, matching standard DOM behavior without throwing).
 * - If `child` is not a child of `this`, remove it from its actual parent if possible,
 *   or return it safely.
 */
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console && console.warn) {
        console.warn(
          '[Google Translate DOM Patch] Prevented NotFoundError in insertBefore (referenceNode parent mismatch).'
        );
      }
      return originalInsertBefore.call(this, newNode, null);
    }
    return originalInsertBefore.apply(this, arguments);
  };

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode !== this) {
      if (console && console.warn) {
        console.warn(
          '[Google Translate DOM Patch] Prevented NotFoundError in removeChild (child parent mismatch).'
        );
      }
      if (child.parentNode) {
        return child.parentNode.removeChild(child);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };
}

export {};
