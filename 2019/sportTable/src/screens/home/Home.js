import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loadResults, resetResults } from '../../actions';
import { TEXT_DARK } from '../../js';
import Table from './Table';

class Home extends Component {
    initialState = {
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
    }

    getJson() {
        this.props.loadResults();
    }

    render() {
        return (
            <div className={`relative pageContainer`} style={{ padding: 17, paddingTop: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }} >
                    <div className='TableName'>
                        Wellness Report
                    </div>
                    <div onClick={this.getJson.bind(this)} className="homeButton">
                        Load Data
                    </div>
                </div>

                <div style={{ ...styles.resultsContainer, marginTop: 16 }}>
                    <Table />
                </div>
            </div>
        );
    }
}

const styles = {
    resultsContainer: {
        margin: '0 auto'
    },
    listheader: {
        lineHeight: '24px',
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    },
    spinner: {
        color: TEXT_DARK
    }
}

export default connect(null, { loadResults, resetResults })(withRouter(Home));
