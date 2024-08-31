import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Service from '../service/service';
import ReservationsForUser from "../reservation/ReservationsForUser";
import Resources from "../resource/Resources";
import ResourceDetails from "../resource/ResourceDetails";
import Header from "../header/header";
import LoginForm from "../login/LoginForm";
import Home from "../home/Home";
import ReserveForm from "../reservation/ReserveForm";
import Footer from "../footer/footer";
import './App.css'
import ResourceManager from "../resource/ResourceManager";
import RegisterForm from "../register/RegisterForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            resources: [],
            reservationsForUser: [],
            currentReservation: null,
            reserveError: null,
            loginError: null,
            currentResource: null
        };
    }


    componentDidMount() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.setState({currentUser: JSON.parse(storedUser)}, () => {
                this.fetchReservationsForUser();
            });
        }
        this.fetchResources();
    }

    fetchResources = (city = "", dateFrom = "", dateTo = "") => {
        return Service.fetchResources(city, dateFrom, dateTo)
            .then((response) => {
                // Sort resources by pricePerNight in ascending order
                const sortedResources = response.data.sort((a, b) => a.pricePerNight - b.pricePerNight);
                // Select top 10 cheapest resources
                const top10CheapestResources = sortedResources.slice(0, 10);
                this.setState({resources: top10CheapestResources});
                return response;
            })
            .catch((error) => {
                console.error("Error fetching resources:", error);
                throw error;
            });
    }

    setResources = (resources) => {
        this.setState({resources});
    }

    getCurrentResource = (id) => {
        return Service.fetchResourceById(id)
            .then((response) => {
                this.setState({currentResource: response.data});
                return response;
            })
            .catch((error) => {
                console.error("Error fetching resource:", error);
                throw error;
            });
    }

    logout = () => {
        Service.logout();
        localStorage.removeItem('currentUser');
        this.setState({
            currentUser: null,
            reservationsForUser: []
        });
    }

    login = (username, password) => {
        return Service.login(username, password)
            .then((response) => {
                const user = response.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.setState({currentUser: user, loginError: null}, () => {
                    this.fetchReservationsForUser();
                });
            })
            .catch((error) => {
                console.error("Error logging in", error);
                this.setState({loginError: error.response?.data?.message || "Error logging in"});
                throw error;
            });
    }

    register = (username, password) => {
        return Service.register(username, password)
            .then((response) => {
                const user = response.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.setState({currentUser: user, loginError: null}, () => {
                    this.fetchReservationsForUser();
                });
            })
            .catch((error) => {
                console.error("Error registering", error);
                this.setState({loginError: error.response?.data?.message || "Error registering"});
                throw error;
            });
    }

    reserve = (resourceId, dateFrom, dateTo, onSuccess, onError) => {
        const {currentUser} = this.state;
        const today = new Date().toISOString().split('T')[0];

        if (dateFrom < today || dateTo < today) {
            const errorMessage = "Reservation dates cannot be in the past.";
            console.error(errorMessage);
            this.setState({reserveError: errorMessage}, () => {
                onError(errorMessage);
            });
            return;
        }

        if (dateFrom > dateTo) {
            const errorMessage = "Start date must be on or before end date.";
            console.error(errorMessage);
            this.setState({reserveError: errorMessage}, () => {
                onError(errorMessage);
            });
            return;
        }

        if (currentUser) {
            const username = currentUser.username;
            Service.reserve(username, resourceId, dateFrom, dateTo)
                .then((response) => {
                    this.setState({currentReservation: response.data, reserveError: null}, () => {
                        this.fetchReservationsForUser(onSuccess);
                    });
                })
                .catch((error) => {
                    console.error("Error making reservation for these dates:", error);
                    const errorMessage = error.response?.data?.message || "Error making reservation";
                    this.setState({reserveError: errorMessage}, () => {
                        onError(errorMessage);
                    });
                });
        } else {
            const errorMessage = "User is not logged in";
            console.error(errorMessage);
            this.setState({reserveError: errorMessage}, () => {
                onError(errorMessage);
            });
        }
    }

    fetchReservationsForUser = (callback) => {
        const {currentUser} = this.state;
        if (currentUser) {
            Service.fetchReservationsForUser(currentUser.username)
                .then((response) => {
                    this.setState({reservationsForUser: response.data}, () => {
                        if (callback) {
                            callback();
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error fetching reservations for user:", error);
                });
        }
    }

    createResource = (name, city, country, imageUrl, pricePerNight, category) => {
        return Service.createResource(name, city, country, imageUrl, pricePerNight, category)
            .then(() => {
                this.fetchResources();
            })
            .catch((error) => {
                console.error('Error creating resource:', error);
            });
    }

    editResource = (id, name, city, country, imageUrl, pricePerNight, category) => {
        return Service.editResource(id, name, city, country, imageUrl, pricePerNight, category)
            .then(() => {
                this.fetchResources();
            })
            .catch((error) => {
                console.error('Error updating resource:', error);
            });
    }

    deleteResource = (id) => {
        return Service.deleteResource(id)
            .then(() => {
                alert('Resource deleted successfully!');
                this.fetchResources();
            })
            .catch((error) => {
                console.error('Error deleting resource:', error);
                alert('Failed to delete resource.');
            });
    }

    render() {
        const {currentUser, resources, reservationsForUser, reserveError, loginError, currentResource} = this.state;
        const showEditDeleteButtons = currentUser && currentResource && currentUser.username === currentResource.owner.username;

        return (
            <Router>
                <Header currentUser={currentUser} logout={this.logout}/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home resources={resources}/>}/>
                        <Route path="/reservations/user"
                               element={<ReservationsForUser reservations={reservationsForUser}/>}/>
                        <Route path="/reserve" element={<ReserveForm reserve={this.reserve} error={reserveError}/>}/>
                        <Route path="/resources" element={
                            <Resources
                                resources={resources}
                                reserve={this.reserve}
                                currentUser={currentUser}
                                fetchResources={this.fetchResources}
                                setResources={this.setResources}
                            />
                        }/>
                        <Route path="/login"
                               element={<LoginForm login={this.login} error={loginError}/>}/>

                        <Route path="/register"
                               element={<RegisterForm register={this.register} />} />

                        <Route path="/resource/:id" element={
                            <ResourceDetails
                                getResource={this.getCurrentResource}
                                resource={this.state.currentResource}
                                deleteResource={this.deleteResource}
                                showEditDeleteButtons={showEditDeleteButtons}
                            />
                        }/>

                        <Route path="/edit-resource/:resourceId" element={
                            <ResourceManager
                                mode="edit"
                                fetchResource={this.getCurrentResource}
                                editResource={this.editResource}
                                deleteResource={this.deleteResource}
                            />
                        }/>
                        <Route path="/create-resource" element={
                            <ResourceManager
                                mode="create"
                                createResource={this.createResource}
                            />
                        }/>
                    </Routes>
                </main>
                <Footer/>
            </Router>
        );
    }
}

export default App;
