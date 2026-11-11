import { NavLink } from "react-router-dom";
import "../../styles/sidebarMenu.css"

const links = [
    { label: "Nadzorna plošča", path: "/dashboard" },
    { label: "Transakcije", path: "/transactions" },
    { label: "Računi", path: "/bills" },
    { label: "Proračun", path: "/budget" },
    { label: "Statistika", path: "/statistics" }
]

type SidebarMenuProps = {
    userName?: string,
    onLogout?: () => void
}

export default function SidebarMenu({
    userName = "Ime Priimek",
    onLogout
}: SidebarMenuProps) 
{
    return (
        <aside className='sidebar'>
            <div>
                <h1 className='sidebar__title'>Finance & Bill Tracker</h1>

                <nav className='sidebar__nav' aria-label='Glavna navigacija'>
                    {links.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => `sidebar__link${isActive ? " sidebar__link--active" : ""}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className='sidebar__account'>
                <strong>{userName || "Uporabnik"}</strong>
                <button 
                    type='button' 
                    className='sidebar__logout' 
                    onClick={onLogout}
                >
                    Odjava
                </button>
            </div>
        </aside>
    );
}