import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import Cell from './Cell';

class Tablex extends Component {
    state = {
        athletes: [],
        muscleSoreness: [],
        sleepQuality: [],

        muscAvg: 0,
        sleepAvg: 0,

        Top: 35,
        Bottom: 20
    };

    componentDidMount() {
        this.updateState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        if (!_.isEmpty(props.results)) {
            this.setState({
                athletes: props.results.athlete,
                muscleSoreness: props.results["muscle-soreness"],
                sleepQuality: props.results["sleep-quality"]
            });
            setTimeout(() => {
                this.calculateAverages();
            }, 50);
        }
    }

    calculateAverages() {
        const { muscleSoreness, sleepQuality } = this.state;
        let muscSum = 0;
        let sleepSum = 0;

        for (var i = 0; i < muscleSoreness.length; i++) {
            muscSum += parseInt(muscleSoreness[i], 10);
        }
        for (var x = 0; x < sleepQuality.length; x++) {
            sleepSum += parseInt(sleepQuality[x], 10);
        }

        this.setState({
            muscAvg: muscSum / muscleSoreness.length,
            sleepAvg: sleepSum / sleepQuality.length
        })
    }

    rednerAverage() {
        const { athletes, muscAvg, sleepAvg } = this.state;
        if (_.isEmpty(athletes)) {
            return null;
        }
        return (
            <tr>
                <Cell
                    isCentered
                    isAverage
                    value={"Averages"}
                />
                <Cell
                    isCentered
                    isAverage
                    value={muscAvg}
                />
                <Cell
                    isCentered
                    isAverage
                    value={sleepAvg}
                />
            </tr>
        )
    }

    renderResults() {
        const { athletes, muscleSoreness, sleepQuality } = this.state;

        if (_.isEmpty(athletes)) {
            return null;
        }

        return athletes.map(function (val, index) {
            const data = {
                name: val,
                musc: muscleSoreness[index],
                sleep: sleepQuality[index]
            }
            return (
                <tr key={index}>
                    <Cell
                        value={data.name}
                    />
                    <Cell
                        value={data.musc}
                        isCentered
                        type="muscle"
                    />
                    <Cell
                        value={data.sleep}
                        isCentered
                        type="sleep"
                    />
                </tr>
            )
        });
    }

    render() {
        return (
            <Table striped bordered hover style={{ minWidth: '100%' }}>
                <thead>
                    <tr>
                        <th>Athlete</th>
                        <th>Muscle Soreness</th>
                        <th>Sleep Quality</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderResults()}
                    {this.rednerAverage()}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        results: list.results
    };
};

export default connect(mapStateToProps, {})(withRouter(Tablex));
