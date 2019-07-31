import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { Auth } from "../../context";

const Profile = ({ user }) => (
  <Auth.Consumer>
    {({ currentUser }) => (
      <Card>
        <Card.Img
          variant="top"
          src={user.picture}
          style={{ maxWidth: "150px", margin: "1em auto 0", padding: "1em" }}
        />
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
            {currentUser.id === user.id
              ? user.description || (
                  <>
                    Tu n'as pas écrit de description...
                    <br />
                    C'est peut-être le moment ? <br />
                    <Link to="/settings">Ajouter une description</Link>
                  </>
                )
              : user.description ||
                `${user.username} n'a pas encore de description`}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          {!!(user.friends && user.friends.length) ? (
            <Link to="/friends">Voir mes amis</Link>
          ) : (
            <>
              Découvre les <Link to="/search">autres membres</Link> et fais-toi
              des amis :)
            </>
          )}
        </Card.Body>
      </Card>
    )}
  </Auth.Consumer>
);

export default Profile;
