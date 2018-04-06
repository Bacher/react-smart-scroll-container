import React, { Component } from 'react'
import './index.css'
import SmartScrollContainer from '../SmartScrollContainer'

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <SmartScrollContainer minItemHeight={50} initialVisibleCount={10} className="b-list">
                    <div className="b-card">ITEM1</div>
                    <div className="b-card">ITEM2</div>
                    <div className="b-card">ITEM3</div>
                    <div className="b-card">ITEM4</div>
                    <div className="b-card">ITEM5</div>
                    <div className="b-card">ITEM6</div>
                    <div className="b-card">ITEM7</div>
                    <div className="b-card">ITEM8</div>
                    <div className="b-card">ITEM9</div>
                    <div className="b-card">ITEM10</div>
                    <div className="b-card">ITEM11</div>
                    <div className="b-card">ITEM12</div>
                    <div className="b-card">ITEM13</div>
                    <div className="b-card">ITEM14</div>
                    <div className="b-card">ITEM15</div>
                    <div className="b-card">ITEM16</div>
                </SmartScrollContainer>
            </div>
        )
    }
}
