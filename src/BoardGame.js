import React, { Component } from 'react';

function shuffle(array) {
    let result = [];
    let source = array.slice();

    for(let count = source.length; count > 0; count--) {
        let randomIndex = Math.floor(Math.random() * count);
        let card = source[randomIndex];
        result.push(card);
        source = source.filter(c => (c && c.cardId !== card.cardId));
    }
    return result;
}

const cards = [
    {
        cardId: 1,
        cardImage: "Blossom.jpg"
    },
    {
        cardId: 2,
        cardImage: "Bravo.jpg"   
    },
    {
        cardId: 3,
        cardImage: "Bubbles.jpg"
    },
    {
        cardId: 4,
        cardImage: "Buttercup.jpg"
    },
    {
        cardId: 5,
        cardImage: "Courage.jpg"
    },
    {
        cardId: 6,
        cardImage: "dafne.png"
    },
    {
        cardId: 7,
        cardImage: "Dexter.jpg"
    },
    {
        cardId: 8,
        cardImage: "Didi.jpg"
    },
    {
        cardId: 9,
        cardImage: "edd.png"
    },
    {
        cardId: 10,
        cardImage: "JerryMouse.png"
    },
    {
        cardId: 11,
        cardImage: "tom.png"
    },
    {
        cardId: 12,
        cardImage: "Scooby.jpg"
    }];

class BoardGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            availableCards: cards,
            cardMatrix: [[cards[0], cards[1], cards[2], cards[3]],
                         [cards[4], cards[5], cards[6], cards[7]],
                         [cards[8], cards[9], cards[10], cards[11]]]
        }

        this.boardCardSelectorHandler = this.props.onCardSelected;

        this.onCardSelectedHandler = this.onCardSelectedHandler.bind(this);
    }

    onCardSelectedHandler(cardId) {
        let shuffledCards = shuffle(this.state.availableCards);
        let newMatrix = [];
        for(var r = 0; r < 3; r++) {
            newMatrix.push([]);
            for(var c = 0; c < 4; c++) {
            let row = newMatrix[r];
            let newIndex = (r * 4) + c;
            row.push(shuffledCards[newIndex]);
        }
    }
    this.setState({
        availableCards: shuffledCards,
        cardMatrix: newMatrix
    }, () => this.boardCardSelectorHandler(cardId));
}

render() {
    return(
        <div id="board-container">
        {this.state.cardMatrix.map(r => {
            return(
                <div className="card-row">
                    {r.map(c => { return(
                        <div id={"card-" + c.cardId} className="card">
                        <img src={"./images/" + c.cardImage} onClick={() => this.onCardSelectedHandler(c.cardId)} />
                        </div>
                    )})}
                </div>
            );
        })}
        </div>);
     }
}   

export default BoardGame;
