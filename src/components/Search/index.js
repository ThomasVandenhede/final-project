import React, { useState, useEffect, useContext, useRef } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import SearchSuggestions from "./SearchSuggestions";
import { Auth } from "../../context";
import * as api from "../../api";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { token, currentUser: me } = useContext(Auth.Context);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClick = event => {
      !searchRef.current.contains(event.target) && handleClickOutside();
    };

    const handleClickOutside = () => {
      hideSuggestions();
    };

    document.addEventListener("mousedown", handleClick, false);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, []);

  const hideSuggestions = () => {
    setUsers([]);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);

    api
      .fetchUsers({ token })
      .then(res => {
        if (res.data && res.data.length) {
          const filteredUsers = res.data.filter(user => user.id !== me.id);
          setUsers(filteredUsers);
        }
      })
      .catch(err => console.debug(err));
  };

  const search = event => {
    const q = event.target.value;

    api.searchUsers({ q, token }).then(res => {
      const users = res.data;
      setUsers(users);
    });
  };

  return (
    <div ref={searchRef} style={{ maxWidth: 300 }} onFocus={handleFocus}>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Rechercher des membres"
          aria-label="Rechercher des membres"
          aria-describedby="btnGroupAddon"
          onChange={search}
        />
        <InputGroup.Append>
          <InputGroup.Text id="btnGroupAddon">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Append>

        {showSuggestions && (
          <SearchSuggestions
            users={users}
            onSuggestionClick={hideSuggestions}
          />
        )}
      </InputGroup>
    </div>
  );
};

export default Search;
