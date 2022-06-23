import React, { Component } from 'react';
import { Monster } from './Monster';

class TypeMatchup extends Component {
    getModColor() {
        if (this.props.type.modifier === '0') {
            return 'black';
        }
        if (this.props.type.modifier === '½') {
            return this.props.isAttack ? 'red' : 'green';
        }
        if (this.props.type.modifier === '2') {
            return this.props.isAttack ? 'green' : 'red';
        }
    }

    renderTypeName() {
        return (
            <div>
                {this.props.type.id}
            </div>
        )
    }

    renderModifier() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <div style={{
                    color: 'red',
                    fontWeight: 600
                }}>
                    >>>>
                </div>
                <div
                    style={{
                        marginLeft: 10,
                        height: 25,
                        width: 25,
                        borderRadius: 14,
                        textAlign: 'center',
                        paddingTop: 2,
                        fontWeight: 600,
                        color: this.props.type.modifier === '0' ? 'white' : 'black',
                        backgroundColor: this.getModColor()
                    }}
                >
                    {this.props.type.modifier}
                </div>
            </div>
        )
    }

    renderLeft() {
        if (this.props.isAttack) {
            return this.renderModifier();
        }
        return this.renderTypeName();
    }
    renderRight() {
        if (this.props.isAttack) {
            return this.renderTypeName();
        }
        return this.renderModifier();
    }

    render() {
        return (
            <div
                style={{
                    marginTop: this.props.repeatIndex > 0 ? 8 : 0,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: this.props.isAttack ? 'flex-start' : 'flex-end',
                    alignItems: 'center'
                }}>
                {this.renderLeft()}
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    <Monster small type={this.props.type.id} color={this.props.color} />
                </div>
                {this.renderRight()}
            </div>
        );
    }
}

export { TypeMatchup };
