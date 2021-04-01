import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes.json';
import config from './config.json';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/home';
import Login from './components/login/login';
import AnimeList from './components/anime/animeList';
import Header from './components/header';
import NavBar from './components/common/navbar';
import SlideBook from './components/SlideBook';
import NotFound from './components/notFound';
import { handleCheckToken } from './utils/authUtils';
import { useHistory } from 'react-router';

const Test = ({ num }) => {
  return <h1>TEST {num}</h1>;
};

const App = () => {
  const history = useHistory();

  useEffect(() => {
    for (let api in config) {
      config[api] = config[api].replace(
        '[REACT_APP_URL_JAVA]',
        process.env.REACT_APP_URL_JAVA,
      );
    }

    handleCheckToken().then(jwt =>
      jwt ? history.push(routes.urls.login) : history.push(routes.urls.home),
    );
  }, [history]);

  return (
    <React.Fragment>
      <Provider store={store}>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        <main>
          <Header />
          <SlideBook />
          <NavBar />
          <Switch>
            <Route exact path={routes.urls.login} component={Login} />
            <Route exact path={routes.urls.anime} component={AnimeList} />
            <Route exact path={routes.urls.test1}>
              <Test num={1} />
            </Route>
            <Route exact path={routes.urls.test2}>
              <Test num={2} />
            </Route>
            <Route exact path={routes.urls.test3}>
              <Test num={3} />
            </Route>
            <Route exact path={routes.urls.home} component={Home} />
            <Route exact path={routes.urls.notFound} component={NotFound} />
            <Redirect to={routes.urls.notFound} />
          </Switch>
        </main>
        <div className="version-number">{process.env.REACT_APP_VERSION}</div>
      </Provider>
    </React.Fragment>
  );
};

export default withRouter(App);
