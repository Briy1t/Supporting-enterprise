import "../styles/layout.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">SUPPORTING 🫴</h2>

            <ul className="sidebar-menu">

                <li className="sidebar-item">
                    <Link to="/clientes">
                        <span className="icon">
                            <svg width="20" height="20" fill="#e2e8f0" viewBox="0 0 24 24">
                                <path d="M16 14c2.21 0 4 1.79 4 4v2h-2v-2c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v2H4v-2c0-2.21 1.79-4 4-4h8zm-4-2c-2.21 0-4-1.79-4-4
                                s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                            </svg>
                        </span>
                        Clientes
                    </Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/tecnicos">
                        <span className="icon">
                            <svg width="20" height="20" fill="#e2e8f0" viewBox="0 0 24 24">
                                <path d="M22.7 19.3l-6.4-6.4c.5-1.1.8-2.3.8-3.5 0-4.4-3.6-8-8-8-1.2 0-2.4.3-3.5.8l4.2 4.2-3 3-4.2-4.2c-.5 1.1-.8 2.3-.8 3.5
                                0 4.4 3.6 8 8 8 1.2 0 2.4-.3 3.5-.8l6.4 6.4 2-2z"/>
                            </svg>
                        </span>
                        Técnicos
                    </Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/servicios">
                        <span className="icon">
                            <svg width="20" height="20" fill="#e2e8f0" viewBox="0 0 24 24">
                                <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.11-.2-.36-.28-.57-.2l-2.39.96
                                c-.5-.38-1.05-.68-1.66-.89l-.36-2.54A.488.488 0 0 0 14.5 2h-5a.488.488 0 0 0-.49.42l-.36 2.54c-.61.21-1.16.51-1.66.89l-2.39-.96
                                a.495.495 0 0 0-.57.2L1.61 8.87c-.11.2-.06.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 0 0-.12.61
                                l1.92 3.32c.11.2.36.28.57.2l2.39-.96c.5.38 1.05.68 1.66.89l.36 2.54c.04.24.25.42.49.42h5c.24 0 .45-.18.49-.42l.36-2.54
                                c.61-.21 1.16-.51 1.66-.89l2.39.96c.21.08.46 0 .57-.2l1.92-3.32a.495.495 0 0 0-.12-.61l-2.03-1.58zM12 15.5
                                c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                            </svg>
                        </span>
                        Servicios
                    </Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/alertas">
                        <span className="icon">
                            <svg width="20" height="20" fill="#e2e8f0" viewBox="0 0 24 24">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                            </svg>
                        </span>
                        Alertas
                    </Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/administracion">
                        <span className="icon">
                            <svg width="20" height="20" fill="#e2e8f0" viewBox="0 0 24 24">
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                            </svg>
                        </span>
                        Administración
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
