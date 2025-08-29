import { h, render } from 'preact';
import ChatWidget from './ChatWidget';
import cssUrl from './index.css?url';

class ChatBotWidgetElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._mountPoint = document.createElement('div');
    this._styleTag = document.createElement('style');
    this._shadowRoot.appendChild(this._styleTag);
    this._shadowRoot.appendChild(this._mountPoint);
    this._mounted = false;
  }

  async connectedCallback() {
    if (this._mounted) return;
    try {
      const currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1] || null;
      })();
      const scriptBase = currentScript ? new URL('.', currentScript.src) : new URL('.', window.location.href);
      let cssFileName = 'index.css';
      try {
        const asUrl = new URL(String(cssUrl), window.location.href);
        const parts = asUrl.pathname.split('/');
        cssFileName = parts[parts.length - 1] || 'index.css';
      } catch (_) {
        const parts = String(cssUrl).split('/');
        cssFileName = parts[parts.length - 1] || 'index.css';
      }
      const resolvedCssUrl = new URL(cssFileName, scriptBase).toString();
      const res = await fetch(resolvedCssUrl, { cache: 'force-cache' });
      const cssText = await res.text();
      this._styleTag.textContent = cssText;
    } catch (_) {
      // Non-fatal if CSS fails; widget still mounts
    }
    render(h(ChatWidget, {}), this._mountPoint);
    this._mounted = true;
  }

  disconnectedCallback() {
    try {
      render(null, this._mountPoint);
    } finally {
      this._mounted = false;
    }
  }
}

if (!customElements.get('chat-bot-widget')) {
  customElements.define('chat-bot-widget', ChatBotWidgetElement);
}

function autoMount() {
  // If the host page already includes the custom element, do nothing
  if (document.querySelector('chat-bot-widget')) return;
  // Otherwise, append a floating widget to the body
  const el = document.createElement('chat-bot-widget');
  document.body.appendChild(el);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

export function mount(target) {
  let hostElement = null;
  if (typeof target === 'string') {
    hostElement = document.querySelector(target);
  } else if (target && target.nodeType === 1) {
    hostElement = target;
  }

  if (!hostElement) {
    const el = document.createElement('chat-bot-widget');
    document.body.appendChild(el);
    return el;
  }

  if (hostElement.tagName && hostElement.tagName.toLowerCase() !== 'chat-bot-widget') {
    const el = document.createElement('chat-bot-widget');
    hostElement.appendChild(el);
    return el;
  }

  return hostElement;
}

// Make mount function globally available
window.ChatBotWidget = { mount };
