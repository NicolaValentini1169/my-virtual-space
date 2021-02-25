import React from 'react';
import {withRouter} from 'react-router-dom';
import routes from '../../routes';
import constants from '../../constants';
import NavButton from './navButton';

const showLink = name => {
    let hasPermission = false;

    if (localStorage.getItem(constants.accessToken)) {
        // let jwt = jwtDecode(localStorage.getItem(constants.accessToken));

        if (name === 'home') {
            hasPermission = true;
        }
    }

    return hasPermission;
};

const NavBar = props => {
    return (
        <React.Fragment>
            <nav
                className="navbar navbar-expand-lg"
                id="top-navbar"
            >

                <div className="nav-item">
                    <button
                        type="button"
                        className='navbar-toggler nav-item nav-link clickable'
                        tabIndex="-1"
                        data-toggle="collapse"
                        data-target="#navbar"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Menù
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav col-md-12 d-flex justify-content-center">
                        <li className="nav-item">
                            <NavButton
                                label={'Home'}
                                id="home"
                                to={routes.home}
                                history={props.history}
                                className={'nav-item nav-link clickable'}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Home'}
                                id="home2"
                                to={routes.home}
                                history={props.history}
                                className={'nav-item nav-link clickable'}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Home'}
                                id="home3"
                                to={routes.home}
                                history={props.history}
                                className={'nav-item nav-link clickable'}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Home'}
                                id="home4"
                                to={routes.home}
                                history={props.history}
                                className={'nav-item nav-link clickable'}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Home'}
                                id="home5"
                                to={routes.home}
                                history={props.history}
                                className={'nav-item nav-link clickable'}
                            />
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default withRouter(NavBar);
