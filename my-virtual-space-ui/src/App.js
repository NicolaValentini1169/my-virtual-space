import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config.json';
import routes from './routes.json';
import constants from './constants.json';
import Home from './components/home';
import Login from './components/login/login';
import './App.css';
import PrivateRoute from './components/privateRoute';
import loginApi from "./components/login/loginApi";
import $ from "jquery";
import {Provider} from 'react-redux'
import store from "./redux/store";

class App extends Component {
    state = {
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        fileLoading: false
    };

    test = async () => {
        // console.log("user find all", await userApi.findAll());
        // console.log("anime find all", await animeApi.findAll());
        // console.log("season find all", await seasonApi.findAll());
        // console.log("state find all", await stateApi.findAll());
        // console.log("genre find all", await genreApi.findAll());
        //
        //
        // console.log("user find by id", await userApi.findById('a5b51143-5223-4e33-9cea-fcd4936a9119'));
        // console.log("anime find by id", await animeApi.findById('69af548c-3d42-429e-8081-17709246b37f'));
        // console.log("season find by id", await seasonApi.findById('fb4f84d1-2de7-467c-839e-ab39fb1adf98'));
        // console.log("state find by id", await stateApi.findById('afc4c5d8-d3a4-4e59-a811-ac93759ce2e0'));
        // console.log("genre fantasy find by id", await genreApi.findById('01b6c76c-8207-434a-bf55-42bb72bf5d61'));

        // console.log("user find by id 404", await userApi.findById('a5b51143-5223-4e33-9cea-fcd4936a9117')); // da errore
        // console.log("user find by id 400", await userApi.findById()); // da errore
    }

    componentWillMount() {
        for (let api in config) {
            config[api] = config[api].replace(
                '[REACT_APP_URL_JAVA]',
                process.env.REACT_APP_URL_JAVA,
            );
        }

        this.test();

        // this.handleCheckToken(this.props.location.pathname);
    }

    //---------- Inizio Login

    handleLogin = credential => {
        this.setState({loading: true}, async () => {
            // const user = await loginApi.handleLogin(credential);

            localStorage.setItem(constants.accessToken, 'Dr.Niar');

            this.setState({
                currentUser: {
                    id: '7b92e92a-9a9c-46bc-93fe-a175c1f3bd17',
                    userName: 'Dr.Niar',
                    cn: 'Nicola Valentini',
                    ruoli: ['admin', 'user'],
                },
                isAuthenticated: true,
                loading: false
            });

            this.props.history.push(routes.urls.home);

            // if (user.id) {
            //     localStorage.setItem(constants.accessToken, user.accessToken);
            //
            //     this.setState({
            //         currentUser: {
            //             id: user.id,
            //             userName: user.username,
            //             cn: user.cn,
            //             ruoli: [...user.roles],
            //         },
            //         isAuthenticated: true,
            //         loading: false
            //     });
            //
            //     this.props.history.push(routes.urls.home);
            // } else {
            //     this.setState({loading: false});
            //
            //     if (user.request.status === 401) {
            //         $('#login-error').removeClass('d-none').addClass('show');
            //     } else {
            //         $('#network-error').removeClass('d-none').addClass('show');
            //     }
            // }
        })
    }

    handleRegistration = credential => {
        this.setState({loading: true}, async () => {
            const user = await loginApi.handleRegistration(credential);

            if (user.id) {
                localStorage.setItem(constants.accessToken, user.accessToken);

                this.setState({
                    currentUser: {
                        id: user.id,
                        userName: user.username,
                        cn: user.cn,
                        ruoli: [...user.roles],
                    },
                    isAuthenticated: true,
                    loading: false
                });

                this.props.history.push(routes.urls.home);
            } else {
                this.setState({loading: false});

                if (user.request.status === 401) {
                    $('#login-error').removeClass('d-none').addClass('show');
                } else {
                    $('#network-error').removeClass('d-none').addClass('show');
                }
            }
        })
    }

    // handleCheckToken = async (path) => {
    //     const user = await loginApi.handleCheckToken(path);
    //
    //     if (user != null) {
    //         if (user.username !== '') {
    //             this.setState({
    //                 currentUser: {
    //                     id: user.id,
    //                     userName: user.username,
    //                     cn: user.cn,
    //                     ruoli: [...user.roles],
    //                 },
    //                 isAuthenticated: true,
    //             });
    //         } else {
    //             localStorage.removeItem(constants.accessToken);
    //
    //             this.props.history.replace(routes.urls.login);
    //
    //             this.setState({
    //                 currentUser: null,
    //                 isAuthenticated: false,
    //             });
    //         }
    //
    //         this.props.history.push(this.state.location);
    //     } else {
    //         localStorage.removeItem(constants.accessToken);
    //
    //         this.props.history.replace(routes.urls.login);
    //
    //         this.setState({
    //             currentUser: null,
    //             isAuthenticated: false,
    //         });
    //     }
    // }

    handleLogout = () => {
        // localStorage.removeItem(constants.accessToken);

        this.setState({
            currentUser: null,
            isAuthenticated: false,
            loading: false,
            fileLoading: false
        });

        this.props.history.replace(routes.urls.login);
    };

//---------- Fine Login

    render() {
        return (
            <React.Fragment>
                <Provider store={store}>
                    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
                    {/*this.props.location.pathname !== routes.notFound &&
                this.props.location.pathname !== routes.urls.login && (
                    <Navbar
                        currentUser={this.state.currentUser}
                    />
                )*/}
                    <main>
                        <Switch>
                            <Route
                                path={routes.urls.login}
                                exact
                                render={props => (
                                    <Login
                                        onLogin={this.handleLogin}
                                        onRegistration={this.handleRegistration}
                                        loading={this.state.loading}
                                        {...props}
                                    />
                                )}
                            />
                            <PrivateRoute
                                path="*"
                                name={routes.names.home}
                                component={Home}
                                onLogout={this.handleLogout}
                            />
                        </Switch>
                    </main>
                    <div className="version-number">{process.env.REACT_APP_VERSION}</div>
                </Provider>
            </React.Fragment>
        );
    }
}

export default withRouter(App);
