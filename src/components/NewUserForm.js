import React, { Component } from "react";
import "./NewUserForm.css";

class NewUserForm extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <form className="new-user-form">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input firstName="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input firstName="lastName" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input firstName="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input firstName="state" />
          </div>
          <div>
            <label htmlFor="zipCode">zipCode</label>
            <input firstName="zipCode" />
          </div>
          <div>
            <label htmlFor="milesWillingToDrive">milesWillingToDrive</label>
            <input firstName="milesWillingToDrive" />
          </div>
          <div>
            <label htmlFor="about">About</label>
            <input firstName="about" />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <input firstName="gender" />
          </div>
          <input type="submit" value="Create Profile" />
        </form>
      </div>
    );
  }
}
