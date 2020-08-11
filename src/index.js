const measureLayout = class {
    
    constructor(container, measureLayout, show) {
        let { contentOffset, dimensions } = container
        this._show = show
        measureLayout(container.data, (x, y, width, height) => {
            this.layoutFullScreen = dimensions
            this.layoutChild = { start: y, end: y + height }
            this.move(contentOffset.x, contentOffset.y)
        })
    }

    move = (x, y) => {
        if (!this.layoutFullScreen && !this.layoutChild) return
        let { height } = this.layoutFullScreen
        const { start, end } = this.layoutChild

        const offer = height * 1.5
        if (
            ((y - offer) < start && start < (y + height + offer)) ||
            ((y - offer) < end && end < (y + height + offer))
        ) {
            this._show(true)
        } else {
            this._show(false)
        }
    };
}

module.exports = measureLayout