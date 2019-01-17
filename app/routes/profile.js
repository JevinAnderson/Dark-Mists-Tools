import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router';

import './profile.scss';
import InformationSettings from '../components/profile/information-settings';
import FormulaForm from '../components/enchanters/formula-form';

const ContentContainer = ({ children }) => <div className="profile-route__content-container">{children}</div>;
const LeftContent = ({ children }) => <div className="profile-route__left-content">{children}</div>;
const RightContent = ({ children }) => <div className="profile-route__right-content">{children}</div>;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // componentWillMount(){}
  // componentDidMount() {}
  // componentWillReceiveProps(nextProps) {}
  // shouldComponentUpdate(nextProps, nextState) { return true; }
  // componentWillUpdate(nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}
  render() {
    const { user } = this.props;

    if (!user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="profile-route">
        <ContentContainer>
          <LeftContent>
            <InformationSettings />
          </LeftContent>
          <RightContent>
            <FormulaForm />
          </RightContent>
        </ContentContainer>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  settings: PropTypes.object
};

Profile.defaultProps = {};

const mapStateToProps = ({ user, settings }) => ({ user, settings });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
