import React, { Component } from 'react'
import './index.css'
import SmartScrollContainer from '../SmartScrollContainer'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemsCount: 5,
        }
    }

    render() {
        const { itemsCount } = this.state

        return (
            <div className="App">
                <button onClick={this._onAddClick}>Add Item</button>
                <SmartScrollContainer
                    minItemHeight={40}
                    initialVisibleCount={5}
                    className="b-list"
                >
                    {Array.from({ length: itemsCount }).map((item, i) => (
                        <div key={i} className="b-card">
                            ITEM{i}
                        </div>
                    ))}
                </SmartScrollContainer>
            </div>
        )
    }

    _onAddClick = () => {
        this.setState({
            itemsCount: this.state.itemsCount + 1,
        })
    }
}
