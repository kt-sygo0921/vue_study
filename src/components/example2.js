import { LitElement, html, css } from 'lit-element';
import axios from 'axios';

class Example2 extends LitElement {
    static get properties() {
        return {
            text: {
                reflect: true,
                converter: {
                    fromAttribute(value) { // 属性の値を取得して、プリパティに指定するよ
                        let retVal = String(value);
                        return retVal+'bbb';
                    },
                    toAttribute(value) { // 属性の値を変更するよ
                        let retVal = String(value);
                        return retVal+'aaa';
                    }
                 }
            },
            text2: {type: String},
            test3: {type: String},
        }
    }
    static styles = css`
        :host {
            display: inline-block;
            width: 500px;
        }
        p {
            color:purple;
        }
    `;
    constructor() {
        super();
        this.text = '指定なしlit-elementだよ';
        this.text2 = '';
    }
    firstUpdated(changeProperties) {
        console.log(changeProperties)
        let event = new CustomEvent('my-event', {
            detail: {
                message: 'メッセージ'
            },
            bubbles: true, 
            composed: true
        });
        this.dispatchEvent(event);
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {
            this.text2 = res.headers.expires;
        });
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('my-event', e => {
            console.log(e)
            // console.log(e.target.detail.message)
            console.log('コンポーネントに登録しカスタムイベントだよ')
        })
    }

    changeProperties() {
        let randomString = Math.floor(Math.random()*100).toString();
        this.text = this.text+=randomString;
    }
    changeAttributes() {
        this.setAttribute('text', 'lit-elementだよ');
        this.requestUpdate();
    }
    changeUrl() {
        let event = new CustomEvent('custom-click', {
            detail: {
                message: 'ああああ'
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event)
    }

    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
    }

    render() {
        return html`
            <div>
                <p>${this.text}</p>
                <p>${this.text2}</p>
                <button @click="${this.changeProperties}">クリックすると文字列が変わるよ</button>
                <button @click="${this.changeAttributes}">クリックするとテキストを初期化するよ</button>
                <button @click="${this.changeUrl}">クリックするとrouter.pushする</button>
            </div>
        `;
    }
}

customElements.define('example2-element', Example2)