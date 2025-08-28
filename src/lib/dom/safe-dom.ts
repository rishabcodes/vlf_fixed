import { logger } from '@/lib/safe-logger';

/**
 * Safe DOM manipulation utilities to prevent "null is not an object" errors
 * These functions wrap common DOM operations with null checks
 */

/**
 * Safely remove a child element from its parent
 */
export function safeRemoveChild(parent: Node | null, child: Node | null): boolean {
  if (!parent || !child || child.parentNode !== parent) {
    logger.warn('safeRemoveChild: Invalid parent or child node');
    return false;
  }

  try {
    parent.removeChild(child);
    return true;
  } catch (error) {
    logger.error('safeRemoveChild error:', error);
    return false;
  }
}

/**
 * Safely remove an element from the DOM
 */
export function safeRemove(element: Element | null): boolean {
  if (!element || !element.parentNode) {
    logger.warn('safeRemove: Element has no parent');
    return false;
  }

  try {
    element.remove();
    return true;
  } catch (error) {
    logger.error('safeRemove error:', error);
    return false;
  }
}

/**
 * Safely append a child to a parent element
 */
export function safeAppendChild(parent: Node | null, child: Node | null): boolean {
  if (!parent || !child) {
    logger.warn('safeAppendChild: Invalid parent or child node');
    return false;
  }

  try {
    parent.appendChild(child);
    return true;
  } catch (error) {
    logger.error('safeAppendChild error:', error);
    return false;
  }
}

/**
 * Safely insert an element before another element
 */
export function safeInsertBefore(
  parent: Node | null,
  newNode: Node | null,
  referenceNode: Node | null
): boolean {
  if (!parent || !newNode) {
    logger.warn('safeInsertBefore: Invalid parent or new node');
    return false;
  }

  try {
    parent.insertBefore(newNode, referenceNode);
    return true;
  } catch (error) {
    logger.error('safeInsertBefore error:', error);
    return false;
  }
}

/**
 * Safely replace a child element
 */
export function safeReplaceChild(
  parent: Node | null,
  newChild: Node | null,
  oldChild: Node | null
): boolean {
  if (!parent || !newChild || !oldChild || oldChild.parentNode !== parent) {
    logger.warn('safeReplaceChild: Invalid nodes');
    return false;
  }

  try {
    parent.replaceChild(newChild, oldChild);
    return true;
  } catch (error) {
    logger.error('safeReplaceChild error:', error);
    return false;
  }
}

/**
 * Safely set innerHTML
 */
export function safeSetInnerHTML(element: Element | null, html: string): boolean {
  if (!element) {
    logger.warn('safeSetInnerHTML: Element is null');
    return false;
  }

  try {
    element.innerHTML = html;
    return true;
  } catch (error) {
    logger.error('safeSetInnerHTML error:', error);
    return false;
  }
}

/**
 * Safely query selector with error handling
 */
export function safeQuerySelector<T extends Element>(
  selector: string,
  parent: ParentNode = document
): T | null {
  try {
    return parent.querySelector<T>(selector);
  } catch (error) {
    logger.error('safeQuerySelector error:', error);
    return null;
  }
}

/**
 * Safely query selector all with error handling
 */
export function safeQuerySelectorAll<T extends Element>(
  selector: string,
  parent: ParentNode = document
): NodeListOf<T> | [] {
  try {
    return parent.querySelectorAll<T>(selector);
  } catch (error) {
    logger.error('safeQuerySelectorAll error:', error);
    return [] as unknown as NodeListOf<T>;
  }
}

/**
 * Batch DOM operations to reduce reflows
 */
export function batchDOMOperations(operations: (() => void)[]): void {
  if (typeof window === 'undefined') return;

  // Use requestAnimationFrame to batch operations
  requestAnimationFrame(() => {
    operations.forEach(operation => {
      try {
        operation();
      } catch (error) {
        logger.error('Batch DOM operation error:', error);
      }
    });
  });
}

/**
 * Wait for element to be available in DOM
 */
export function waitForElement(selector: string, timeout: number = 5000): Promise<Element> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Check if element is in DOM
 */
export function isInDOM(element: Node | null): boolean {
  if (!element) return false;
  return document.body.contains(element);
}

/**
 * Safe DOM ready check
 */
export function domReady(): Promise<void> {
  return new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else {
      resolve();
    }
  });
}

/**
 * Create element with safe error handling
 */
export function safeCreateElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K] | null {
  try {
    return document.createElement(tagName, options);
  } catch (error) {
    logger.error('safeCreateElement error:', error);
    return null;
  }
}

/**
 * Clone node with error handling
 */
export function safeCloneNode<T extends Node>(node: T | null, deep: boolean = true): T | null {
  if (!node) {
    logger.warn('safeCloneNode: Node is null');
    return null;
  }

  try {
    return node.cloneNode(deep) as T;
  } catch (error) {
    logger.error('safeCloneNode error:', error);
    return null;
  }
}
