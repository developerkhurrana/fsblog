import { Link } from "react-router-dom";
import classes from "./style.module.css";

export default function Header() {
  return (
    <div className={classes.header}>
      <h3>Fullstack Blog</h3>
      <ul>
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <Link to={'/add-blog'}>
          <li>Add blog</li>
        </Link>
      </ul>
    </div>
  );
}
