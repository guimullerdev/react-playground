class WcCounter extends HTMLElement {
  #count = 0

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: contents;
          font-family: inherit;
        }
        .counter-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 32px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          min-width: 200px;
        }
        .counter-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
        }
        .counter-value {
          font-size: 56px;
          font-weight: 700;
          line-height: 1;
          color: #0f172a;
          min-width: 3ch;
          text-align: center;
        }
        .counter-actions {
          display: flex;
          gap: 8px;
        }
        button {
          font-size: 14px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #0f172a;
          cursor: pointer;
          transition: background 0.15s;
        }
        button:hover {
          background: #e2e8f0;
        }
      </style>
      <div class="counter-card">
        <span class="counter-label">Web Component Counter</span>
        <span class="counter-value">${this.#count}</span>
        <div class="counter-actions">
          <button id="dec">−</button>
          <button id="reset">Reset</button>
          <button id="inc">+</button>
        </div>
      </div>
    `

    this.shadowRoot.getElementById('dec').addEventListener('click', () => { this.#count--; this.render() })
    this.shadowRoot.getElementById('reset').addEventListener('click', () => { this.#count = 0; this.render() })
    this.shadowRoot.getElementById('inc').addEventListener('click', () => { this.#count++; this.render() })
  }
}

customElements.define('wc-counter', WcCounter)
