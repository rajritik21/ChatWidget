import { h, render } from 'preact';
import ChatWidget from './ChatWidget';
import './index.css';

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

  connectedCallback() {
    if (this._mounted) return;
    // With css-injected-by-js, styles are injected into document; clone into shadow for isolation.
    const collectedStyles = Array.from(document.querySelectorAll('style[data-vite-dev-id], style[data-css-injected]'));
    if (collectedStyles.length) {
      this._styleTag.textContent = collectedStyles.map(s => s.textContent || '').join('\n');
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


