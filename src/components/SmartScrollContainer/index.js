import React, { PureComponent } from 'react'

const DEFAULT_RENDER_COUNT = 5
const SAFE_OFFSET = 100

function lazy(fn, ms = 50) {
    let timeoutId = null

    return function() {
        if (!timeoutId) {
            timeoutId = setTimeout(function() {
                timeoutId = null
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

        this._lazyRecalculate = lazy(this.recalculate)
    }

    componentDidMount() {
        window.addEventListener('resize', this._lazyRecalculate)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._lazyRecalculate)
    }

    render() {
        const children = this.props.children
        const count = Math.min(
            this.state.renderCount ||
                this.props.initialVisibleCount ||
                DEFAULT_RENDER_COUNT,
            children.length
        )

        let items

        if (count < children.length) {
            items = children.slice(0, count)

            for (let i = count; i < this.props.children.length; i++) {
                items.push(
                    <div
                        key={`_s${i}`}
                        style={{ height: this.props.minItemHeight }}
                    />
                )
            }
        } else {
            items = children
        }

        return (
            <div
                className={this.props.className}
                style={{ overflowY: 'auto' }}
                ref={this._onRef}
                onScroll={this._lazyRecalculate}
            >
                {items}
            </div>
        )
    }

    _onRef = el => {
        this._root = el

        if (el) {
            this.recalculate()
        }
    }

    recalculate = () => {
        const root = this._root

        const count =
            this.state.renderCount ||
            this.props.initialVisibleCount ||
            DEFAULT_RENDER_COUNT
        const lastItem = root.children[count]

        if (lastItem) {
            const delta =
                root.clientHeight +
                root.scrollTop +
                SAFE_OFFSET -
                lastItem.offsetTop

            if (delta > 0) {
                this.setState({
                    renderCount: Math.min(
                        count + Math.ceil(delta / this.props.minItemHeight),
                        this.props.children.length
                    ),
                })
            }
        }
    }
}
