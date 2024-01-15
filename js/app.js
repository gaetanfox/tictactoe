// stable selectors data-* 
const App = {
    // All of our selected elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItem: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        gameBoardSquare: document.querySelectorAll('[data-id="square"]'),
    },
    init() {
        App.registerEventListeners();
    },
    state: {
        currentPlayer: 1,
    },

    // The event listeners go there
    registerEventListeners() {
        // Add events listeners here
        App.$.menu.addEventListener('click', event => {
            App.$.menuItem.classList.toggle('hidden');
        });
        // TODO
        App.$.resetBtn.addEventListener('click', event => { console.log('reset the game'); });
        // TODO
        App.$.newRoundBtn.addEventListener('click', event => { console.log('New round'); });


        App.$.gameBoardSquare.forEach(square => {
            square.addEventListener('click', event => {
                if(square.hasChildNodes()) return;

                const currentPlayer = App.state.currentPlayer;
                const icon = document.createElement('i');
                if(currentPlayer === 1) {
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');
                } else {
                    icon.classList.add('fa-solid', 'fa-0', 'turquoise');
                }
                App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;

                square.replaceChildren(icon);

            });
        });
    }
};

window.addEventListener('load', App.init);