import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../redux/features/authSlice";
import { useAppSelector } from "../../../redux/hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navlinks = (
    <>
      <li>
        <Link to={"/products"}>Mobiles</Link>
      </li>
      {/* <li>
        <details>
          <summary>Category</summary>
          <ul className="p-2">
            <li>
              <a>Smart Phone</a>
            </li>
            <li>
              <a>Button Phone</a>
            </li>
          </ul>
        </details>
      </li> */}
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact Us</Link>
      </li>
      <li>
        <Link
          to={`/${user?.role == "superAdmin" ? "admin" : user?.role}/dashboard`}
        >
          Dashboard
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar max-h-[50px] text-white bg-gray-950">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden"
          >
            {navlinks}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Mobile Dokan
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="flex items-center w-full justify-end space-x-2 pr-4">
        <Link to={"/cart"} className="btn btn-sm btn-ghost">
          Cart
        </Link>
        {user && user.userEmail ? (
          <button className="btn btn-sm" onClick={() => dispatch(userLogout())}>
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
