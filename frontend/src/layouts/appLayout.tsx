import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SidebarMenu from "../features/components/sidebarMenu";
import '../styles/appLayout.css'

export default function AppLayout() {
    const { user, signOut, loading} = useAuth();

    if (loading) {
        return <p>Nalaganje uporabnika...</p>
    }

    return (
        <div className='app-layout'>
            <SidebarMenu 
                userName={user?.email ?? "Uporabnik"}
                onLogout={signOut}
            />

            <main>
                <Outlet />
            </main>

        </div>
    );
}