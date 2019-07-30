import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { Auth } from "../../context";

const Profile = ({ user }) => (
  <Auth.Consumer>
    {({ currentUser }) => (
      <Card>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            {user.description || (
              <>
                Tu n'as pas écrit de description...
                <br />
                C'est peut-être le moment ? <br />
                <Link to="/settings">Ajouter une description</Link>
              </>
            )}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Cras justo odio</ListGroupItem>
        </ListGroup>
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
