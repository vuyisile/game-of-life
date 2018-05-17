import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { setInitialGeneration, getNeighbours, createNewGeneration, createGrid } from "./game-of-life";

class GameOfLife extends React.Component {
    constructor() {
        super()
        this.state = { gameOn: {}, grid: [], currentGen: [] }
    }

    componentDidMount() {
        this.setState({ grid: createGrid() });
    }

    start(alive) {
        var grid = setInitialGeneration(alive);
        var neigbourHood = getNeighbours(grid);
        var changedGrid = createNewGeneration(neigbourHood, grid);
        var onlyTrue = changedGrid.filter(function (c) { return c.isAlive === true });
        this.setState({ currentGen: onlyTrue, grid: changedGrid })
        var generation = this.state.currentGen
        if (generation.length === 0) {
            this.setState({ gameOn: clearInterval(this.state.gameOn) });
        }
        return this.state.currentGen
    }

    play() {
        this.setState({ gameOn: setInterval(() => { 
          
            this.start(this.state.currentGen) 
        }, 1000) });
    }

    clearBoard() {
        this.setState({ currentGen: [], grid: createGrid(), gameOn: clearInterval(this.state.gameOn) });
    }

    pause() {
        this.setState({ gameOn: clearInterval(this.state.gameOn) });
    }

    seed(id) {
        var listOfIds = this.state.currentGen;
        id.isAlive = true;
        listOfIds.push(id);
        this.setState({ currentGen: listOfIds })
    }


    render() {
        return (

            <div>
                <center><h1 className={'text-light'}>GameOfLife</h1></center>

                <div className={'row col-md-12'}>
                    <button className={'btn btn-success'}onClick={this.play.bind(this)}>Play</button>
                    <button className={'btn btn-primary'}onClick={this.pause.bind(this)}>Pause</button>
                    <button className={'btn btn-danger'}onClick={this.clearBoard.bind(this)}>Clear</button>
                </div>
                <div className={'container grid row col-md-12'}>
                    {this.state.grid.map((cell) => <button className={`cell ${cell.isAlive}`} onClick={() => this.seed(cell)} key={`${cell.x},${cell.y}`}></button>)}
                </div>

            </div>
        )
    }

}
// =======================================================================================================================================================================================================================================

ReactDOM.render(
    <GameOfLife />,
    document.getElementById('root')
);
