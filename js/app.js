const App = {
    // All of our selected elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItem: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        gameBoardSquare: document.querySelectorAll('[data-id="square"]'),
    },
    getGameStatus(moves) {
        const p1Moves = moves.filter((move) => move.playerId === 1).map((move) => +move.squareId);
        const p2Moves = moves.filter((move) => move.playerId === 2).map((move) => +move.squareId);
        const winningPatterns = [
            [ 1, 2, 3 ],
            [ 1, 5, 9 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 3, 5, 7 ],
            [ 3, 6, 9 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ],
        ];

        let winner = null;
        winningPatterns.forEach(pattern => {
            const p1Wins = pattern.every(v => p1Moves.includes(v));
            const p2Wins = pattern.every(v => p2Moves.includes(v));

            if(p1Wins) winner = 1;
            if(p2Wins) winner = 2;
        });

        return {
            status: moves.length === 9 || winner !== null ? 'complete' : 'in-progress',//in-progress | complete
            winner // 1 | 2 | null
        };
    },
    init() {
        App.registerEventListeners();
    },
    state: {
        moves: [],
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
                // check if there is aleady a play, if so, return early
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(move => move.squareId === squareId);
                    return existingMove !== undefined;
                };
                if(hasMove(+square.id)) return;

                // Who is the last one who played so we can switch it
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1;
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
                // Determine which player icon to add to the square
                const icon = document.createElement('i');
                if(currentPlayer === 1) {
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');
                } else {
                    icon.classList.add('fa-solid', 'fa-0', 'turquoise');
                }
                // Update the state of the App
                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                });
                App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

                // Replace the icon as needed
                square.replaceChildren(icon);

                // Check if there is a winner or tie game
                const game = App.getGameStatus(App.state.moves);
                console.log(game);

                if(game.status == 'complete') {
                    if(game.winner) {
                        alert(`Player ${ game.winner } wins`);
                    } else {
                        alert(`tie`);
                    }
                }

            });
        });
    }
};

window.addEventListener('load', App.init);