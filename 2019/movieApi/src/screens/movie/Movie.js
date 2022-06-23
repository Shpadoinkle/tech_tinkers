import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { safeReadParams, } from '../../helper';
import { TEXT_BRAND } from '../../js';
import { MovieCard } from '../../components';

class Movie extends Component {
    initialState = {
        movieId: safeReadParams(this.props, 'movieId'),
        obj: {},
        loading: true
    }

    state = { ...this.initialState };

    componentDidMount() {
        if (this.state.movieId != null) {
            this.fetchMovieFromReducer();
            this.fetchMovieInfo();
        }
    }

    fetchMovieFromReducer() {
        let movieObj = _.find(this.props.list, (t) => { return t.id.toString() === this.state.movieId.toString(); });
        if (_.isEmpty(movieObj)) {
            movieObj = _.find(this.props.pop, (t) => { return t.id.toString() === this.state.movieId.toString(); });
            if (!_.isEmpty(movieObj)) {
                this.setState({ obj: movieObj });
            }
        } else {
            this.setState({ obj: movieObj });
        }
    }

    fetchMovieInfo = async () => {
        let apiUrl = `https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US`;

        this.setState({ empty: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                if (!_.isEmpty(res.data)) {
                    // console.log(res.data)
                    this.setState({ obj: res.data, loading: false });
                } else {
                    this.setState({ empty: true, loading: false })
                }
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
            });
    }

    getBackImage() {
        if (!_.isEmpty(this.state.obj) && !_.isUndefined(this.state.obj.backdrop_path)) {
            return `url('http://image.tmdb.org/t/p/w1280${this.state.obj.backdrop_path}')`
        }
        return '';
    }

    renderInfo(data, optionalText) {
        if (_.isEmpty(this.state.obj) || _.isUndefined(data) || data == null || _.isEmpty(data.toString())) {
            if (this.state.loading) {
                return (
                    <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
                );
            }
            return '';
        }
        if (optionalText) {
            return optionalText;
        }
        return data;
    }

    renderBottom() {
        if (_.isEmpty(this.state.obj) || _.isEmpty(this.state.obj.overview)) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
                </div>
            );
        }
        return (
            <div>
                <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                    Overview
                </div>
                <div className='generalText text-mid' style={styles.info}>
                    {this.renderInfo(this.state.obj.overview)}
                </div>
            </div>
        );
    }

    timeConvert(n) {
        if (_.isUndefined(n)) {
            return '';
        }
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes} min`;
    }

    renderTags() {
        if (_.isEmpty(this.state.obj) || _.isEmpty(this.state.obj.genres)) {
            return null;
        }
        return _.map(this.state.obj.genres, (t, index) => {
            if (t == null) {
                return null;
            }
            return (<div key={index} className='tag'>
                {t.name}
            </div>);
        });
    }

    render() {
        return (
            <div className="relative pageContainer jumboBackground" style={styles.overlay}>

                <div onClick={() => { window.history.back(); }}>
                    <FontAwesome style={styles.back} name="arrow-left" />
                </div>

                {this.state.empty &&
                    <div style={{ display: 'flex', paddingTop: 60, justifyContent: 'center' }}>
                        <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                            Something went wrong, please try again
                        </div>
                    </div>
                }
                {!this.state.empty &&
                    <div>
                        <div className='movie-banner relative' style={{ backgroundImage: this.getBackImage() }} >
                            <MovieCard
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    bottom: -150
                                }}
                                // hasRating
                                movie={this.state.obj}
                            />
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 60 }}>
                            <div style={styles.topInfo}>
                                <div className='generalText mont' style={styles.listheader}>
                                    {this.renderInfo(this.state.obj.title)}
                                </div>
                                <div className='generalText mont text-light' style={styles.goooF}>
                                    {this.renderInfo(this.state.obj.release_date, moment(this.state.obj.release_date, 'YYYY-MM-DD').format('YYYY'))}{this.renderInfo(this.state.obj.vote_average, ` - ${Math.floor((this.state.obj.vote_average / 10) * 100)}% User Score`)}
                                </div>
                                <div className='generalText mont text-light' style={styles.goooF}>
                                    {this.renderInfo(this.state.obj.runtime, this.timeConvert(this.state.obj.runtime))}
                                </div>
                                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap' }}>
                                    {this.renderTags()}
                                </div>
                            </div>
                            <div style={styles.bottomInfo}>
                                {this.renderBottom()}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const styles = {
    overlay: {
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'auto'
    },
    back: {
        position: 'fixed',
        top: 0,
        left: 0,
        padding: 15,
        fontSize: 18,
        zIndex: 10,
        color: '#fff',
        cursor: 'pointer'
    },
    topInfo: {
        display: 'block',
        paddingLeft: 156 + 18,
        paddingTop: 18,
        minHeight: 175,
        paddingBottom: 8,
        borderBottom: `1px #9FBBC7 solid`
    },
    listheader: {
        lineHeight: '24px',
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    },
    goooF: {
        fontSize: 12,
        lineHeight: '24px'
    },
    bottomInfo: {
        paddingTop: 25
    },
    info: {
        fontSize: 16,
        lineHeight: '24px'
    },
    spinner: {
        color: TEXT_BRAND
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        pop: list.popular,
        list: list.list
    };
};

export default connect(mapStateToProps, {})(withRouter(Movie));
