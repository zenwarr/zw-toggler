import closest from "zw-closest";

const ATTR_TOGGLE = 'data-toggle',
    ATTR_TOGGLE_PARENT = 'data-toggle-parent',
    ATTR_TOGGLE_ROOT = 'data-toggle-root',
    ATTR_TOGGLE_TARGET = 'data-toggle-target';

export class Toggler {
  static init() {
    document.addEventListener('click', this.onClick);
  }

  /** Protected area **/

  protected static toggle(elem: Element, className: string|null): void {
    if (!elem || !className) {
      return;
    }

    if (elem.hasAttribute(ATTR_TOGGLE_PARENT)) {
      let parentSelector = elem.getAttribute(ATTR_TOGGLE_PARENT);
      if (parentSelector) {
        let parent = closest(elem, parentSelector);
        if (parent) {
          parent.classList.toggle(className);
        }
      }
      return;
    }

    if (elem.hasAttribute(ATTR_TOGGLE_TARGET)) {
      let targetSelector = elem.getAttribute(ATTR_TOGGLE_TARGET);
      if (targetSelector) {
        let root: Element|null = null;

        let rootSelector = elem.getAttribute(ATTR_TOGGLE_ROOT);
        if (rootSelector) {
          root = closest(elem, rootSelector);
        } else {
          root = document.body;
        }

        if (root) {
          let targets = root.querySelectorAll(targetSelector);
          for (let q = 0; q < targets.length; ++q) {
            (targets[q] as Element).classList.toggle(className);
          }
        }
      }
      return;
    }

    // if no other attributes defined
    elem.classList.toggle(className);
  }

  protected static onClick(e: Event): void {
    if (e.target) {
      let toggler = closest(e.target as Element, `[${ATTR_TOGGLE}]`);
      if (toggler) {
        Toggler.toggle(toggler, toggler.getAttribute(ATTR_TOGGLE));
      }
    }
  }
}
