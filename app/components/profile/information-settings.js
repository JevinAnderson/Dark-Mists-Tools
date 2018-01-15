import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withUser from '../higher-order-components/with-user';

import { bind, merge } from '../../utilities/component';
import StringEditor from '../editors/string';
import ImageEditor from '../editors/image';

class InformationSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    bind(this, 'updateDisplayName', 'updatePhotoURL');
  }

  updateDisplayName(displayName) {
    firebase
      .auth()
      .currentUser.updateProfile({ displayName })
      .then(results => {
        console.log('%cresults', 'color:green', results);

        const user = merge(this.props.user, { displayName });
        this.props.setUser(user);
      })
      .catch(this.error);
  }

  updatePhotoURL(photoURL) {
    firebase
      .auth()
      .currentUser.updateProfile({ photoURL })
      .then(results => {
        console.log('%cresults', 'color:blue', results);

        const user = merge(this.props.user, { photoURL });
        this.props.setUser(user);
      })
      .catch(this.error);
  }

  error(error) {
    console.error('information-settings error: ', error);
  }

  render() {
    return (
      <div className="profile__information-settings">
        <StringEditor value={this.props.user.displayName} placeholder="Display Name" update={this.updateDisplayName} />
        <ImageEditor
          value={this.props.user.photoURL}
          placeholder="Display Image"
          alt="User Display Image"
          update={this.updatePhotoURL}
        />
      </div>
    );
  }
}

InformationSettings.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
};

export default compose(withUser())(InformationSettings);
