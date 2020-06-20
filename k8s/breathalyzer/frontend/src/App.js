import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component
{
    constructor()
    {
        super()
        this.handleClickHello = this.handleClickHello.bind(this)
        this.handleClickCache = this.handleClickCache.bind(this)
    }



    async handleClickCache ()
    {
        var xd = 1;
        await axios.get(`/api/${xd}`).then(response =>
        {
            console.log(response.data);
            // document.getElementById("result").value = response.data.toString();

        })
    }

    async handleClickCacheDebug ()
    {
        var beer = document.getElementById("beer").value;
        await axios.get(`/api/${beer}/${beer}`).then(response =>
        {
            console.log(response.data);
            document.getElementById("result").value = response.data.toString();

        })
    }

    async handleClickHello ()
    {
        var beer = document.getElementById("beer").value;

        await axios.get(`/api/bac/${beer}`).then(response =>
        {
            console.log(response);
            document.getElementById("result").value = response.data.toString();

        })
    }

    onCalculateClicked = async () => {
        var beer = document.getElementById("beer").value;
        // var shot = document.getElementById("shot").value;
        // var wine = document.getElementById("wine").value;
        // var weight = document.getElementById("weight").value;
        // var time = document.getElementById("time").value;
        const response = await axios.get(`/api/bac/${beer}`);
        console.log(response);
        document.getElementById("result").value = response.data.toString();
    };

    render() {

        return (
            <div className="App">
            <header className="App-header">
            <p>Breathalyzer by pluszak</p>

        <img src={logo} className="App-logo" alt="logo" />

            <input type="text" id="beer" placeholder="Ile piw wypiłeś..."></input>
            {/*<input type="text" id="shot" placeholder="Ile szotów wypiłeś..."></input>*/}
            {/*<input type="text" id="wine" placeholder="Ile kieliszków wina wypiłeś..."></input>*/}
            {/*<input type="text" id="weight" placeholder="Ile ważysz..."></input>*/}
            {/*<input type="text" id="time" placeholder="Ile godzin temu przestałeś pić.."></input>*/}
            <div>

                <button onClick={this.handleClickHello}>Calculate</button>

        <p>Szacowany poziom alkoholu we krwi :</p>

        </div>
        <input type="text" id="result" placeholder="wynik"></input>
            <p>Developer mode (open console):</p>
        <button onClick={this.handleClickCache}> SHOW CACHE </button>
        <button onClick={this.handleClickCacheDebug}> Debug </button>

        </header>
        </div>
    );
    }
}

export default App;

