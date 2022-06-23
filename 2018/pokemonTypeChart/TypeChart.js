import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header } from '../../components';
import { getRandomColour } from '../../js';
import typeChart from '../../json/types.json';
import { Monster } from './Monster';
import { TypeButton } from './TypeButton';
import { TypeMatchup } from './TypeMatchup';

class Splash extends Component {
    initialState = {
        backgroundColor: '#fff',
        types: [],
        selectedType: null
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.setState({ types: _.cloneDeep(typeChart) });
        this.changeLoadingColours();
    }

    changeLoadingColours() {
        this.setState({
            backgroundColor: "bgColour--" + getRandomColour()
        })
        setTimeout(() => {
            this.changeLoadingColours();
        }, 5000);
    }

    selectType(type) {
        let newState = { selectedType: null };
        if (this.state.selectedType == null || type.id !== this.state.selectedType.id) {
            newState.selectedType = type;
        }
        this.setState(newState);
    }

    renderTypes() {
        return (this.state.types.map((t, index) => {
            if (t == null || _.isEmpty(t)) {
                return null;
            }
            return (
                <TypeButton
                    isActive={this.state.selectedType}
                    type={t}
                    onClick={() => { this.selectType(t) }}
                />
            );
        }));
    }

    getColor(id) {
        let color = null
        this.state.types.forEach(element => {
            if (element.id === id) {
                color = element.color
            };
        });
        return color;
    }

    renderDefense() {
        if (_.isEmpty(this.state.selectedType.defense)) {
            return null;
        }
        return (this.state.selectedType.defense.map((t, index) => {
            return <TypeMatchup repeatIndex={index} key={t.id} type={t} color={this.getColor(t.id)} />
        }));
    }

    renderAttack() {
        if (_.isEmpty(this.state.selectedType.attack)) {
            return null;
        }
        return (this.state.selectedType.attack.map((t, index) => {
            return <TypeMatchup isAttack repeatIndex={index} key={t.id} type={t} color={this.getColor(t.id)} />
        }));
    }

    renderSelectedType() {
        if (this.state.selectedType == null) {
            return null;
        }
        return (
            <div key={this.state.selectedType.id} className="commonShadow" style={{ ...styles.boxContainer, padding: 0, paddingTop: 0 }}>
                <div className="text--shadow" style={{ ...styles.selectedTitle, backgroundColor: this.state.selectedType.color }}>
                    {this.state.selectedType.id}
                </div>
                <div style={{ padding: 8, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', fontWeight: 600, paddingBottom: 8 }}>Damage Taken Multiplier</div>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {this.renderDefense()}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 20, paddingLeft: 20, paddingTop: 16, paddingBottom: 16 }}>
                        <Monster type={this.state.selectedType.id} color={this.state.selectedType.color} />
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignContent: 'center' }}>
                        <div style={{ textAlign: 'center', fontWeight: 600, paddingBottom: 8 }}>Attack Damage Multiplier</div>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {this.renderAttack()}
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    render() {
        return (
            <div className="relative pageContainer">
                <Header
                    title="Type Chart (Gen 1)"
                />
                <div className={`background fade ${this.state.backgroundColor}`} style={{ opacity: 0.05 }} />
                <div className="commonShadow" style={{ ...styles.boxContainer }}>
                    <div style={styles.typesContainer}>
                        {this.renderTypes()}
                    </div>
                </div>

                {this.renderSelectedType()}
            </div>
        );
    }
}

const styles = {
    boxContainer: {
        position: 'relative',
        maxWidth: 600,
        height: 'auto',
        margin: '16px auto',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 4,
        paddingTop: 8,
        paddingBottom: 0
    },
    typesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    selectedTitle: {
        color: 'white',
        fontWeight: 600,
        fontSize: 16,
        textAlign: 'center',
        padding: 8,
        borderBottom: '1px solid #888',
        letterSpacing: 1
    }
}

export default connect(null, {})(withRouter(Splash));
