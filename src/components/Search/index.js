import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import SearchSuggestions from "./SearchSuggestions";
import { Auth } from "../../context";
import * as api from "../../api";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  handleBlur = event => {
    this.setState({
      users: []
    });
  };

  handleFocus = event => {
    const { token, user: me } = this.context;

    api.fetchUsersWithToken(token).then(res => {
      if (res.data && res.data.length) {
        const filteredUsers = res.data.filter(user => user.id !== me.id);
        this.setState({ users: filteredUsers });
      }
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
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
          <InputGroup.Append>
            <InputGroup.Text id="btnGroupAddon">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Append>
          {!!this.state.users.length && (
            <SearchSuggestions users={this.state.users} />
          )}
        </InputGroup>
      </div>
    );
  }
}

Search.contextType = Auth.Context;

export default Search;
