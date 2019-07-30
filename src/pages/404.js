import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => (
  <div>
    <h2>Page introuvable :'(</h2>
    <p>
      <Link to="/">Retour à l'accueil</Link>
    </p>
  </div>
);

export default NoMatch;
