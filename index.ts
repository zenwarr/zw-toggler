import closest from "zw-closest";

export class Toggler {
  static init() {
    document.addEventListener('click', this.onClick);
  }

  /** Protected area **/

  protected static toggle(elem: Element, className: string|null): void {
    if (!elem || !className) {
      return;
    }

    if (elem.hasAttribute('data-toggle-parent')) {
      let parentSelector = elem.getAttribute('data-toggle-parent');
      if (parentSelector) {
        let parent = closest(elem, parentSelector);
        if (parent) {
          parent.classList.toggle(className);
        }
      }
      return;
    }

    if (elem.hasAttribute('data-toggle-target')) {
      let targetSelector = elem.getAttribute('data-toggle-target');
      if (targetSelector) {
        let root: Element|null = null;

        let rootSelector = elem.getAttribute('data-toggle-root');
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
      let toggler = closest(e.target as Element, '[data-toggle]');
      if (toggler) {
        Toggler.toggle(toggler, toggler.getAttribute('data-toggle'));
      }
    }
  }
}
