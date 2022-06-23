import React, { Component } from 'react';

class Monster extends Component {
    getClassNames() {
        let string = '';
        if (this.props.small) {
            string = string + ' monster--small';
        }
        return string;
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <div style={{ position: 'relative' }}>
                    <div className={`monster monster--${this.props.type}${this.getClassNames()}`} />
                    <div className={`monster-background monster-background--${this.props.type}${this.getClassNames()}`} />
                </div>
                {/* <div
                    className="commonShadow"
                    style={{
                        ...styles.monsterHead,
                        backgroundColor: this.props.color,
                        height: this.props.small ? 18 : 25,
                        width: this.props.small ? 28 : 35
                    }}
                >
                    <div className="rotate90CW" style={styles.monsterFace}>
                        :)
                    </div>
                </div>
                <div
                    className="commonShadow"
                    style={{
                        ...styles.monsterBody,
                        backgroundColor: this.props.color,
                        height: this.props.small ? 25 : 35,
                        width: this.props.small ? 38 : 45
                    }}
                /> */}
            </div>
        );
    }
}

const styles = {
    monsterFace: {
        fontSize: 16,
        fontWeight: 800
    },
    monsterHead: {
        height: 25,
        width: 35,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    monsterBody: {
        height: 35,
        width: 45,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex: 2
    }
}

export { Monster };
