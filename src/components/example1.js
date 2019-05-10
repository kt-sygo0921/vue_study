import {html, render} from 'lit-html';
import axios from 'axios';

class Example1 extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        const text = this.getAttribute('data-hoge');
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {
            render(this.html(text, res.headers.expires), shadow);
        });
    }

    html(text, axiosText) {
        return html`
        <style>
            .text {
                color: red;   
            }
        </style>
        <div>
            <p class="text">${text}</p>
            <p>適当なサンプルAPIの結果です：${axiosText}</p>
        </div>`
    }
}

customElements.define('examplevue1-element', Example1)