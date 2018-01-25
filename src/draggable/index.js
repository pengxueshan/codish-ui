import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

export default class Draggable extends Component {
    static defaultProps = {
        draggable: true,
        onMoveStart: () => {},
        onMoving: () => {},
        onMoveEnd: () => {},
    };

    state = {
        x: 0,
        y: 0
    };

    componentDidMount() {
        if (!this.props.draggable) return;
        if (typeof this.props.getBoundaryDom === 'function') {
            this.boundaryDom = this.props.getBoundaryDom();
            this.thisDom = findDOMNode(this);
        }
        this.initDrag();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.draggable !== this.props.draggable) {
            if (nextProps.draggable) {
                this.initDrag();
            } else {
                this.removeDrag();
            }
        }
    }

    componentWillUnmount() {
        this.removeDrag();
    }

    initDrag = () => {
        if (this.props.dragId) {
            this.bar = document.getElementById(this.props.dragId);
        }
        if (this.bar) {
            this.bar.addEventListener('mousedown', this.handleMouseDown);
        }
    }

    removeDrag = () => {
        if (this.bar) {
            this.bar.removeEventListener('mousedown', this.handleMouseDown);
            this.bar = null;
        }
    }

    handleMouseDown = e => {
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.startSrcX = this.state.x;
        this.startSrcY = this.state.y;
        if (this.boundaryDom && this.thisDom) {
            if (!this.startBoundary && !this.boundary) {
                this.startBoundary = this.thisDom.getBoundingClientRect();
                this.boundary = this.boundaryDom.getBoundingClientRect();
            }
        }
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.props.onMoveStart(e);
    }

    handleMouseMove = e => {
        let deltaX = e.pageX - this.startX;
        let deltaY = e.pageY - this.startY;
        this.setState({
            x: this.startSrcX + deltaX,
            y: this.startSrcY + deltaY,
        }, this.checkBoundary);
        this.props.onMoving(e);
    }

    handleMouseUp = e => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        this.props.onMoveEnd(e);
    }

    checkBoundary = () => {
        if (this.boundary && this.thisDom) {
            let thisBoundary = this.thisDom.getBoundingClientRect();
            if (thisBoundary.x < this.boundary.x) {
                this.setState({
                    x: this.boundary.x - this.startBoundary.x
                });
            } else if ((thisBoundary.x + thisBoundary.width) > (this.boundary.x + this.boundary.width)) {
                this.setState({
                    x: this.boundary.x + this.boundary.width - thisBoundary.width - this.startBoundary.x
                });
            }
            if (thisBoundary.y < this.boundary.y) {
                this.setState({
                    y: this.boundary.y - this.startBoundary.y
                });
            } else if ((thisBoundary.y + thisBoundary.height) > (this.boundary.y + this.boundary.height)) {
                this.setState({
                    y: this.boundary.y + this.boundary.height - thisBoundary.height - this.startBoundary.y
                });
            }
        }
    }

    render() {
        return React.cloneElement(this.props.children, {
            style: {
                transform: `translate(${this.state.x}px, ${this.state.y}px)`
            }
        });
    }
}

Draggable.propTypes = {
    dragId: PropTypes.string,
    draggable: PropTypes.bool,
    onMoveStart: PropTypes.func,
    onMoving: PropTypes.func,
    onMoveEnd: PropTypes.func,
    getBoundaryDom: PropTypes.func,
};
