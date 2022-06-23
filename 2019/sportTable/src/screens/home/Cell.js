import React, { Component } from 'react';

class Cell extends Component {
    getClass() {
        let string = "";
        if (this.props.isCentered) string = string + 'dataRow';
        if (this.props.isAverage) string = string + ' dataRow-avg';
        if (this.props.type === 'muscle') {
            if (parseInt(this.props.value, 10) >= 8) {
                string = string + ' dataRow-red';
            } else if (parseInt(this.props.value, 10) >= 5 && parseInt(this.props.value, 10) <= 7) {
                string = string + ' dataRow-orange';
            }
        }
        if (this.props.type === 'sleep') {
            if (parseInt(this.props.value, 10) === 10) {
                string = string + ' dataRow-green';
            } else if (parseInt(this.props.value, 10) <= 3) {
                string = string + ' dataRow-red';
            }
        }

        return string;
    }

    render() {
        return (
            <td className={this.getClass()}>{this.props.value}</td>
        );
    }
}

export default Cell;
