import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
    const { pathname } = useLocation() // pegar o nome do path atual
    return (
        <main>
            <h1>Stock Items</h1>
            <div className="tabs">
                <Link className={`tab ${pathname == "/items" ? "active" : ""}`} to="/items">Todos os Items</Link> 
                <Link className={`tab ${pathname == "/items/new" ? "active" : ""}`} to="/items/new">Novo Item</Link>
            </div>
            <Outlet/>
        </main>
    )
}