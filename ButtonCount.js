class ButtonCount extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        let button = document.createElement('button');

        //initial textContent
        button.textContent = 'Times Clicked: 0';

        shadow.appendChild(button);

        let clicks = 0;

        button.addEventListener('click', () => {
            clicks++;
            button.textContent = `Times Clicked: ${clicks}`;
        });

    }
}

window.customElements.define('button-count', ButtonCount);