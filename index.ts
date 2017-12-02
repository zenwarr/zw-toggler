import closest from "zw-closest";

const ATTR_TOGGLE = 'data-toggle',
    ATTR_TOGGLE_PARENT = 'data-toggle-parent',
    ATTR_TOGGLE_TARGET = 'data-toggle-target',
    ATTR_TOGGLE_FOCUS = 'data-toggle-focus',
    ATTR_TOGGLE_HOVER = 'data-toggle-hover';

export class Toggler {
  static init() {
    document.addEventListener('click', Toggler.onClick);
    document.addEventListener('focusin', Toggler.onFocusChanged);
    document.addEventListener('focusout', Toggler.onFocusChanged);
    document.addEventListener('mouseout', Toggler.onHoverChanged);
    document.addEventListener('mouseover', Toggler.onHoverChanged);
  }

  static uninit() {
    document.removeEventListener('click', Toggler.onClick);
    document.removeEventListener('focusin', Toggler.onFocusChanged);
    document.removeEventListener('focusout', Toggler.onFocusChanged);
    document.removeEventListener('mouseout', Toggler.onHoverChanged);
    document.removeEventListener('mouseover', Toggler.onHoverChanged);
  }

  /** Protected area **/

  protected static toggle(elem: Element, className: string|null): void {
    if (!elem || !className) {
      return;
    }

    let parentSelector = elem.getAttribute(ATTR_TOGGLE_PARENT),
        targetSelector = elem.getAttribute(ATTR_TOGGLE_TARGET);

    let nodes: NodeList|(Node|null)[] = [];

    if (parentSelector == null && targetSelector != null) {
      // target all elements by targetSelector inside the document
      nodes = document.querySelectorAll(targetSelector);
    } else if (parentSelector != null && targetSelector != null) {
      // target all element by targetSelector inside parentSelector
      let parent = closest(elem, parentSelector);
      if (parent) {
        nodes = parent.querySelectorAll(targetSelector);
      }
    } else if (parentSelector != null && targetSelector == null) {
      // target parent
      nodes = [ closest(elem, parentSelector) ];
    } else {
      // target the element itself
      nodes = [ elem ];
    }

    for (let q = 0; q < nodes.length; ++q) {
      if (nodes[q]) {
        (nodes[q] as Element).classList.toggle(className);
      }
    }
  }

  protected static onEvent(attrName: string, e: Event): void {
    if (e.target) {
      let toggler = closest(e.target as Element, `[${attrName}]`);
      if (toggler) {
        Toggler.toggle(toggler, toggler.getAttribute(attrName));
      }
    }
  }

  protected static onClick(e: Event): void {
    return Toggler.onEvent(ATTR_TOGGLE, e);
  }

  protected static onFocusChanged(e: Event): void {
    return Toggler.onEvent(ATTR_TOGGLE_FOCUS, e);
  }

  protected static onHoverChanged(e: Event): void {
    return Toggler.onEvent(ATTR_TOGGLE_HOVER, e);
  }
}
