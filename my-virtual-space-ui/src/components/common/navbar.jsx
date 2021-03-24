import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import routes from '../../routes';
import constants from '../../constants';
import NavButton from './navButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.user);
  const history = useHistory();

  const showLink = name => {
    let hasPermission = false;

    if (localStorage.getItem(constants.accessToken)) {
      // let jwt = jwtDecode(localStorage.getItem(constants.accessToken));

      if (name === 'home') {
        hasPermission = true;
      } else if (name === 'anime') {
        hasPermission = true;
      }
    }

    return hasPermission;
  };

  const setActive = value => {
    if (history.location.pathname === value) return ' active ';
  };

  return (
    user && (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg" id="top-navbar">
          <div className="nav-item">
            <button
              type="button"
              className="navbar-toggler nav-item nav-link clickable body-font-size"
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
                  label={routes.labels.home}
                  id={routes.names.home}
                  className={`nav-item nav-link clickable ${setActive(
                    routes.urls.home,
                  )}`}
                  callback={() => history.push(routes.urls.home)}
                />
              </li>

              {showLink('anime') && (
                <li className="nav-item">
                  <NavButton
                    label={routes.labels.anime}
                    id={routes.names.anime}
                    className={`nav-item nav-link clickable ${setActive(
                      routes.urls.anime,
                    )}`}
                    callback={() => history.push(routes.urls.anime)}
                  />
                </li>
              )}

              <li className="nav-item">
                <NavButton
                  label={routes.labels.test1}
                  id={routes.names.test1}
                  className={`nav-item nav-link clickable ${setActive(
                    routes.urls.test1,
                  )}`}
                  callback={() => history.push(routes.urls.test1)}
                />
              </li>

              <li className="nav-item">
                <NavButton
                  label={routes.labels.test2}
                  id={routes.names.test2}
                  className={`nav-item nav-link clickable ${setActive(
                    routes.urls.test2,
                  )}`}
                  callback={() => history.push(routes.urls.test2)}
                />
              </li>

              <li className="nav-item">
                <NavButton
                  label={routes.labels.test3}
                  id={routes.names.test3}
                  className={`nav-item nav-link clickable ${setActive(
                    routes.urls.test3,
                  )}`}
                  callback={() => history.push(routes.urls.test3)}
                />
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    )
  );
};

export default withRouter(NavBar);
