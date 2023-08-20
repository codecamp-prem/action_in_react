import { NavLink, Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

export function RootLayout(){
    const {state} = useNavigation()
    const isLoading = state === "loading"

    return (
        <>
        <nav className="top-nav">
            <div className="nav-text-large">React Actions in form</div>
            <ul className="nav-list">
                <li><NavLink to="/">Todos</NavLink></li>
                 <li><NavLink to="/new">New Todos</NavLink></li>
            </ul>
        </nav>
        <ScrollRestoration />
        {isLoading && <div className="loading-spinner" />}
        <div className={`container ${isLoading ? "loading" : ""}`}>
            <Outlet />
        </div>
        </>
    )
    
}