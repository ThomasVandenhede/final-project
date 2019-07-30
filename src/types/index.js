// types/index.js
import { shape, number, string, oneOf } from "prop-types";

export const userType = shape({
  id: number,
  firstName: string.isRequired,
  lastName: string.isRequired,
  role: oneOf(["visitor", "user", "author"])
});

export const postType = shape({
  body: string.isRequired
});
