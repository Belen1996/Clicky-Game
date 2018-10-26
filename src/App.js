import React, { Component } from 'react';
import BoardGame from './BoardGame.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardHistory: [],
      score: 0,
      topScore: 0,
      message: "Click an image to begin!"
    }

    this.cardSelected = this.cardSelected.bind(this);
}

  cardSelected(cardId) {
    if (cardId) {

      let newCardHistory;
      let newScore;
      let newTopScore;
      let newMessage;
      if (this.cardPreviouslySelected(this.state.cardHistory.slice(), cardId)) {
        //Game ends

        newCardHistory = [];
        newScore = 0;
        newTopScore = this.state.topScore;
        newMessage = "You guessed incorrectly! Don't click an image more than once!";
      } else {
        //Game continues

        newCardHistory = this.state.cardHistory.slice();
        newCardHistory.push(cardId);
        newScore = this.state.score + 1;
        newTopScore = Math.max(newScore, this.state.topScore);
        newMessage = "You guessed correctly! Keep playing!"
      }
      this.setState({
        cardHistory: newCardHistory,
        score: newScore,
        topScore: newTopScore,
        message: newMessage
      });
    }
  }
  cardPreviouslySelected(cards, card) {
    return (cards.filter(c => c === card).length > 0);
  }
  render() {
    return (
        <div>
            <nav class="navbar">
                <ul>
                    <li class="brand">
                        <a href="/">Clicky Game!</a>
                    </li>
                    <li class="">{this.state.message}</li>
                </ul>
                <div style={{float: "right"}}>Score: {this.state.score} | Top Score: {this.state.topScore}</div>
            </nav>
            <header class="header">
                <h1>Clicky Game!</h1>
                <h2>Click on an image to earn points, but don't click on the same one more than once!</h2>
            </header>
            <section id="board"><BoardGame onCardSelected={this.cardSelected}/></section>
            <footer class="footer">
                <div class="bottom">Copyright Belen Fernandez &copy;2018</div>
            </footer>
        </div>
    );
  }
}

export default App;

