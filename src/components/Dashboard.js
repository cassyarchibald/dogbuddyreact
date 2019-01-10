import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import axios from "axios";
import NewDogForm from "./NewDogForm";
import Dog from "./Dog";
import EditUserForm from "./EditUserForm";

//TODO show requested playdate,
// received playdates
// a way to edit their info via patch request/form

// load component that allows editing info
// does an update callback to axios request

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      dogs: null,
      requestedPlaydates: null,
      receivedPlaydates: null,
      currentUserObject: null,
      showAddDogForm: false,
      showEditUserForm: false,
      currentUserObject: null
    };
  }

  findByUid(uid) {
    // console.log("find user by uid");
    // console.log(`http://localhost:8080/persons/search/findByUid?uid=${uid}`);
    axios
      .get(`http://localhost:8080/persons/search/findByUid?uid=${uid}`)
      .then(response => {
        // console.log("find user by uid response");
        // console.log(response.data._embedded.persons);
        // console.log(
        //   response.status === 200 &&
        //     response.data._embedded.persons.length === 1
        // );
        // If successful, update profile created

        if (
          response.status === 200 &&
          response.data._embedded.persons.length === 1
        ) {
          // console.log("update profile created to true ");
          // console.log(response.data._embedded.persons[0]);
          this.setState({
            currentUserObject: response.data._embedded.persons[0]
          });

          // console.log(this.state.currentUserObject);
          // console.log(this.state.currentUserObject.resourceId);
          // load dogs for this person

          this.loadUsersDogs(this.state.currentUserObject.resourceId);
        } else {
        }
        if (response.status === 404) {
          console.log("uid not found");
          // this.setState({
          //   profileCreated: false
          // });
        }
      })
      .catch(error => {
        console.log("find by uid not successful");
        console.log(error.message);
      });
  }

  loadUsersDogs(personId) {
    axios
      .get(`http://localhost:8080/persons/${personId}/dogs`)
      .then(response => {
        // console.log("loading dogs from resposne");
        // console.log(response.data);
        const dogComponents = response.data._embedded.dogs.map(dog => {
          // console.log("value of user in loading dogs");
          // console.log(this.state.user);
          // console.log(this.props);
          return (
            <Dog
              user={this.state.currentUserObject}
              key={dog.resourceId}
              id={dog.resourceId}
              name={dog.name}
              age={dog.age}
              size={dog.size}
              vaccinated={dog.vaccinated}
              about={dog.about}
              photo={dog.photo}
              breed={dog.breed}
              ownerLink={dog._links.person.href}
              preferredPlayBuddy={dog.preferredPlayBuddy}
              addPlayDateCallback={this.props.addPlayDateCallback}
              showEditDelete={true}
              editDogCallback={this.props.editDogCallback}
              removeDogCallback={this.props.removeDogCallback}
            />
          );
        });
        // console.log(dogComponents);

        this.setState({
          dogs: dogComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  componentDidMount() {
    // find by id via api call -
    // if person logged in, try to find them
    // if not found - direct to registration form
    // else, good to go - dashboard
    // pass uer object data from user -
    // hidden field
    // Part from input/part from oauth,
    // save when form is filled out
    // only see that form if information is incomplete
    // check if already in system
    if (this.props.user) {
      this.findByUid(this.props.user.uid);
      // console.log(this.state);
    } else {
      console.log("no user in state");
    }
  }

  // look in persons array to see if user is already
  // in our system
  // if not, do a post request to create a person
  // if so, render a form with their details filled in
  // let them add/edit details that Google doesn't give us
  render() {
    return (
      <div>
        <div id="dashboard-container">
          <h1>Welcome</h1>
          {this.state.currentUserObject ? (
            <section id="user-information">
              <h2>
                {this.state.currentUserObject.firstName}{" "}
                {this.state.currentUserObject.lastName}
              </h2>
              <p>{this.state.currentUserObject.city}</p>
              <p>{this.state.currentUserObject.state}</p>

              <p>{this.state.currentUserObject.zipCode}</p>

              <p>{this.state.currentUserObject.about}</p>
              <p>{this.state.currentUserObject.photo}</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    showEditUserForm: !this.state.showEditUserForm
                  });
                }}
              >
                Edit Profile
              </button>
            </section>
          ) : null}

          {this.state.currentUserObject && this.state.showEditUserForm ? (
            <EditUserForm
              editPersonCallback={this.props.editPersonCallback}
              person={this.state.currentUserObject}
            />
          ) : null}
          {this.state.dogs ? this.state.dogs : null}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            this.setState({ showAddDogForm: !this.state.showAddDogForm });
          }}
        >
          {this.state.showAddDogForm ? "Hide Form" : "Add Dog"}
        </button>
        {this.state.showAddDogForm ? (
          <NewDogForm addDogCallback={this.props.addDogCallback} />
        ) : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  addPersonCallback: PropTypes.func
};
export default Dashboard;
