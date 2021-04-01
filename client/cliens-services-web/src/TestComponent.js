import * as React from 'react';

export class TestComponent extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            retourApi: "rien",
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch("https://localhost:44373/WeatherForecast"
        ).then(res => {
            res.text().then(retourString => {
                console.log(retourString);
            })
        })
    }

    render() {
        if (!this.state.isLoaded){
            return (
                <div className="loader"></div>
            )
        } else {
            return(
                <div>{this.state.retourApi}</div>
            )
        }
    }

}
