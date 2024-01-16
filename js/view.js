export default class View {
    $ = {};
    $$ = {};


    constructor() {
        this.$.menu = this.#qs('[data-id="menu"]');
        this.$.menuItem = this.#qs('[data-id="menu-items"]');
        this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
        this.$.modal = this.#qs('[data-id="modal"]');
        this.$.modalText = this.#qs('[data-id="modal-text"]');
        this.$.modalButton = this.#qs('[data-id="modal-btn"]');
        this.$.turn = this.#qs('[data-id="turn"]');

        this.$$.gameBoardSquare = this.#qsAll('[data-id="square"]');

        // UI only event listeners
        this.$.menu.addEventListener('click', event => this.#toggleMenu());
    }

    /**
     * Register all the event listeners
     */
    bindGameResetEvent(handler) {
        this.$.resetBtn.addEventListener("click", handler);
    }
    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener("click", handler);
    }
    bindPlayerMoveEvent(handler) {
        this.$$.gameBoardSquare.forEach(square => {
            square.addEventListener('click', handler);
        });
    }
    /**
     * DOM helper methods
     */
    #toggleMenu() {
        this.$.menuItem.classList.toggle('hidden');
        this.$.menuBtn.classList.toggle('border');

        // Flip the menu icon
        const icon = this.$.menuBtn.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }

    #qs(selector, parent) {
        const el = parent ? parent.querySelector(selector) : document.querySelector(selector);
        if(!el) throw new Error('Could not find elements');
        return el;
    }
    #qsAll(selector) {
        const elList = document.querySelectorAll(selector);
        if(!elList) throw new Error('Could not find elements');
        return elList;
    }
}
