class CustomComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._count = 0;
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#incrementButton').addEventListener('click', () => {
            this.increment();
        });
    }

    increment() {
        this._count++;
        console.log(this._count)
        this.postMessageToIframe();
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
            button {
              cursor: pointer;
            }
          </style>
          <div>
            <button id="incrementButton">Increment</button>
          </div>
        `;
    }

    postMessageToIframe() {
        const iframe = document.getElementById('myIframe');
        const inputValue = this._count;

        iframe.contentWindow.postMessage({
            type: 'countUpdate',
            value: inputValue
        }, '*');
    }
}

// Define the custom element 'math-operations'
customElements.define("custom-comp", CustomComponent);