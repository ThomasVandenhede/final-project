import React, { Component } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import SearchSuggestions from "./SearchSuggestions";
import { Auth } from "../../context";
import * as api from "../../api";

class Search extends Component {
  constructor(props) {
    super(props);

    this.searchRef = React.createRef();

    this.state = {
      users: [],
      showSuggestions: false
    };
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = event => {
    if (this.searchRef && this.searchRef.current.contains(event.target)) {
      return;
    }

    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.hideSuggestions();
  };

  hideSuggestions = () => {
    this.setState({
      users: [],
      showSuggestions: false
    });
  };

  handleFocus = event => {
    const { token, currentUser: me } = this.context;

    this.setState({ showSuggestions: true });

    api
      .fetchUsers({ token })
      .then(res => {
        if (res.data && res.data.length) {
          const filteredUsers = res.data.filter(user => user.id !== me.id);
          this.setState({ users: filteredUsers });
        }
      })
      .catch(err => console.debug(err));
  };

  search = event => {
    const q = event.target.value;
    const { token } = this.context;

    api.searchUsers({ q, token }).then(res => {
      const users = res.data;
      console.log("TCL: Search -> res.data", res.data);
      this.setState({
        users
      });
    });
  };

  render() {
    return (
      <div
        ref={this.searchRef}
        style={{ maxWidth: 300 }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Rechercher des membres"
            aria-label="Rechercher des membres"
            aria-describedby="btnGroupAddon"
            onChange={this.search}
          />
          <InputGroup.Append>
            <InputGroup.Text id="btnGroupAddon">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Append>

          {this.state.showSuggestions && (
            <SearchSuggestions
              ref={this.suggestionsRef}
              users={this.state.users}
              onSuggestionClick={this.hideSuggestions}
            />
          )}
        </InputGroup>
      </div>
    );
  }
}

Search.contextType = Auth.Context;

export default Search;
