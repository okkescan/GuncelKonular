import React, { Component } from 'react';

export class Lorenz extends Component {
    static displayName = Lorenz.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    componentDidMount() {
        // Remove any existing content in the component
        const counterDiv = document.getElementById("counter-content");
        counterDiv.innerHTML = "";

        // Create an iframe element
        const iframe = document.createElement("iframe");
        iframe.src = "https://deneme123-1.onrender.com";
        iframe.style.width = "100%";
        iframe.style.height = "530px"; // Set the height to 100% of the viewport height
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";

        // Append the iframe to the component
        counterDiv.appendChild(iframe);
    }


    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <div id="counter-content"></div>
        );
    }
}
