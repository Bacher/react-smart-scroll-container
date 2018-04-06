import React, { PureComponent } from 'react'

const SAFE_OFFSET = 100;

function lazy(fn, ms = 50) {
    let timeoutId = null;

    return function() {
        if (!timeoutId) {
            timeoutId = setTimeout(function() {
                timeoutId = null;
                fn()
            }, ms)
        }
    }
}

export default class SmartScrollContainer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            renderCount: null,
        }

        this._lazyOnScroll = lazy(this._onScroll)
    }

    render() {
        const children = this.props.children;
        const count = Math.min(this.state.renderCount || this.props.initialVisibleCount, children.length)

        let items;

        if (children.length < count) {
            items = children.slice(0, count)

            for (let i = count; i < this.props.children.length; i++) {
                items.push(<div key={`_s${i}`} style={{ height: this.props.avgItemHeight || '50px' }} />)
            }
        } else {
            items = children;
        }

        return (
            <div
                className={this.props.className}
                style={{ overflowY: 'auto' }}
                ref={this._onRef}
                onScroll={this._lazyOnScroll}
            >
                {items}
            </div>
        )
    }

    _onRef = el => {
        this._root = el

        if (el) {
            this._recalc()
        }
    }

    _onScroll = () => {
        this._recalc()
    }

    _recalc() {
        const root = this._root

        const count = this.state.renderCount || this.props.initialVisibleCount
        const lastItem = root.children[count]

        if (lastItem) {
            if (lastItem.offsetTop < root.clientHeight + root.scrollTop + SAFE_OFFSET) {
                this.setState({
                    renderCount: count + 1,
                })
            }
        }
    }
}
