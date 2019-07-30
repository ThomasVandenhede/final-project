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

    this.state = {
      users: [],
      loading: false
    };
  }

  handleBlur = event => {
    // this.setState({
    //   users: []
    // });
  };

  handleFocus = event => {
    const { token, currentUser: me } = this.context;

    this.setState({ loading: true });

    api
      .fetchUsers({ token })
      .then(res => {
        if (res.data && res.data.length) {
          const filteredUsers = res.data.filter(user => user.id !== me.id);
          this.setState({ users: filteredUsers });
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div
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
          />
          <InputGroup.Append>
            <InputGroup.Text id="btnGroupAddon">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Append>

          <SearchSuggestions
            users={this.state.users}
            loading={this.state.loading}
          />
        </InputGroup>
      </div>
    );
  }
}

Search.contextType = Auth.Context;

export default Search;
