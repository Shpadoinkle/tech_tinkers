import React, { Component } from 'react';

class TypeButton extends Component {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className="text--shadow"
                style={{
                    ...styles.typeButton,
                    backgroundColor: this.props.type.color,
                    borderColor: this.props.isActive != null && this.props.isActive.id === this.props.type.id ? 'black' : 'transparent'
                }}
            >
                {this.props.type.id}
            </div>
        );
    }
}

const styles = {
    typeButton: {
        cursor: 'pointer',
        position: 'relative',
        padding: 4,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 8,
        marginLeft: 4,
        marginRight: 4,
        minWidth: 70,
        fontWeight: 600,
        letterSpacing: 1,
        color: '#fff',
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: 'transparent'
    }
}

export { TypeButton };
