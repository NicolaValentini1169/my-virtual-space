import React from 'react';
import {withRouter} from 'react-router-dom';
import routes from '../../routes';
import constants from '../../constants';
import NavButton from './navButton';
import {useHistory} from "react-router";

const NavBar = ({to, setTo}) => {
    const history = useHistory();

    const showLink = name => {
        let hasPermission = false;

        if (localStorage.getItem(constants.accessToken)) {
            // let jwt = jwtDecode(localStorage.getItem(constants.accessToken));

            if (name === 'home') {
                hasPermission = true;
            } else if (name === "anime") {
                hasPermission = true;
            }
        }

        return hasPermission;
    };

    const setActive = value => {
        if (to === value) return " active "
    }

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
                                id={routes.names.home}
                                to={routes.home}
                                history={history}
                                className={`nav-item nav-link clickable ${setActive(routes.home)}`}
                                callback={() => setTo(routes.home)}
                            />
                        </li>

                        {showLink("anime") && <li className="nav-item">
                            <NavButton
                                label={'Anime'}
                                id={routes.names.anime}
                                to={routes.anime}
                                history={history}
                                className={`nav-item nav-link clickable ${setActive(routes.anime)}`}
                                callback={() => setTo(routes.anime)}
                            />
                        </li>}

                        <li className="nav-item">
                            <NavButton
                                label={'Test1'}
                                id={routes.names.test1}
                                to={routes.test1}
                                history={history}
                                className={`nav-item nav-link clickable ${setActive(routes.test1)}`}
                                callback={() => setTo(routes.test1)}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Test2'}
                                id={routes.names.test2}
                                to={routes.test2}
                                history={history}
                                className={`nav-item nav-link clickable ${setActive(routes.test2)}`}
                                callback={() => setTo(routes.test2)}
                            />
                        </li>

                        <li className="nav-item">
                            <NavButton
                                label={'Test3'}
                                id={routes.names.test3}
                                to={routes.test3}
                                history={history}
                                className={`nav-item nav-link clickable ${setActive(routes.test3)}`}
                                callback={() => setTo(routes.test3)}
                            />
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default withRouter(NavBar);
