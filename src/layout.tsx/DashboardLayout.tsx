import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface SidebarLink {
  label: string; // Display text for the link
  path: string; // Navigation path
  roles: string[]; // Roles allowed to see this link
}

// Sidebar links

const DashboardLayout = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const userRole = userData?.role || ""; // Replace this with the actual role from user data (e.g., fetched from state)
  const sidebarLinks: SidebarLink[] = [
    {
      label: "Home",
      path: `/`,
      roles: ["customer", "buyer", "admin", "superAdmin", "seller"],
    },
    {
      label: "Dashboard",
      path: `/${userRole == "superAdmin" ? "admin" : userRole}/dashboard`,
      roles: ["customer", "buyer", "admin", "superAdmin", "seller"],
    },

    {
      label: "Add Product",
      path: "/seller/add-product",
      roles: ["seller"],
    },
  ];
  // Filter links based on the user's role
  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userRole)
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {filteredLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
