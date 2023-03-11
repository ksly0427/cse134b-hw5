
const dialogTemplate = `
  <dialog>
    <form>
        <label for="input">Enter text:</label>
        <input type="text" id="input">
        <div>
            <button id="confirmBtn">Ok</button>
            <button id="cancelBtn">Cancel</button>
        </div>
    </form>
  </dialog>
`;

export function showDialog(message, confirm, cancel, text) {
    const parser = new DOMParser();

    const dialog = parser.parseFromString(dialogTemplate, 'text/html').querySelector('dialog');
    const label = dialog.querySelector('label');
    const input = dialog.querySelector('#input');
    const confirmBtn = dialog.querySelector('#confirmBtn');
    const cancelBtn = dialog.querySelector('#cancelBtn');

    label.textContent = message;
    if(!confirm) {
        confirmBtn.hidden = true;
    }
    if(!cancel) {
        cancelBtn.hidden = true;
    }
    if(!text) {
        input.hidden = true;
    }

    document.body.appendChild(dialog);
    
    return new Promise((resolve) => {
        confirmBtn.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
            document.body.removeChild(dialog);
            if(!text) {
                resolve(true);
            }
            else {
                if(input.value === '') {
                    resolve(false);
                }
                else {
                    resolve(DOMPurify.sanitize(input.value));
                }
            }
            
        });
        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
            document.body.removeChild(dialog);
            resolve(false);
        });
        dialog.showModal();
    });
    
}

