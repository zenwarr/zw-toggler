export default class Toggler {
    static init(): void;
    static uninit(): void;
    /** Protected area **/
    protected static toggle(elem: Element, className: string | null): void;
    protected static onEvent(attrName: string, e: Event): void;
    protected static onClick(e: Event): void;
    protected static onFocusChanged(e: Event): void;
    protected static onHoverChanged(e: Event): void;
}
