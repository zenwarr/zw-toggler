import { expect } from 'chai';
import {Toggler} from "./index";

describe("toggle on click", function () {
  function hasClass(id: string, className: string): boolean {
    return (document.getElementById(id) as Element).classList.contains(className);
  }

  function sendEvent(id: string, eventType: string): void {
    (document.getElementById(id) as Element).dispatchEvent(new Event(eventType, { bubbles: true }));
  }

  function init(html: string): void {
    document.body.innerHTML = html;
    Toggler.init();
  }

  it('should toggle parent on click', function () {
    init(`
      <div id="parent">
        <button id="btn" data-toggle="parent--on" data-toggle-parent="#parent"></button> 
      </div>    
    `);

    sendEvent('btn', 'click');
    expect(hasClass('parent', 'parent--on')).to.be.true;

    sendEvent('btn', 'click');
    expect(hasClass('parent', 'parent--on')).to.be.false;
  });

  it('should toggle other element on click', function () {
    init(`
    <div class="other" id="other"></div>
    <div class="other" id="other2"></div>
    
    <button id="btn" data-toggle="a" data-toggle-target=".other" />
    `);

    sendEvent('btn', 'click');
    expect(hasClass('other', 'a')).to.be.true;
    expect(hasClass('other2', 'a')).to.be.true;
  });

  it('should toggle other elements inside root', function () {
    init(`
    <div class="root">
      <div class="target" id="id1"></div>
      <div class="target" id="id2"></div>
      
      <button data-toggle="a" data-toggle-target=".target" data-toggle-root=".root" id="btn"></button>    
    </div>
    
    <div class="target" id="id3"></div>
    
    <div class="root">
      <div class="target" id="id4"></div>    
    </div>
    `);

    sendEvent('btn', 'click');
    expect(hasClass('id1', 'a')).to.be.true;
    expect(hasClass('id2', 'a')).to.be.true;
    expect(hasClass('id3', 'a')).to.be.false;
    expect(hasClass('id4', 'a')).to.be.false;
  });
});
