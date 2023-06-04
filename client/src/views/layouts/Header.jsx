import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerson, verifyToken } from "../../api/api";
import { Context } from "../../context/Context";

function Header({ children }) {
  const { email, person, setPerson, setEmail } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("loginToken");
    const aux = Object.entries(person).length === 0;

    const validateSession = async () => {
      if (!token) {
        alert("Su sesion se ha vencido o ha terminado");
        navigate("/");
        return;
      }
      if (aux) {
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
          alert("Saque la mano de ahí, pa afuera");
          navigate("/");
          return;
        }
        setEmail(decodedToken.email);
        setPerson(await getPerson(decodedToken.email));
      }
    };

    validateSession();
  }, [navigate, person, setPerson, setEmail]);

  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark pt-3 pb-4">
        <div className="container-lg">
          <span className="navbar-brand">Condor 2.0</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/dashboard/courses"
                  className="nav-link text-decoration-none"
                >
                  Cursos
                </Link>
              </li>
              {person.id_type === 1 
              ? ""
              : (
                <li className="nav-item">
                  <Link
                    to="/dashboard/notes"
                    className="nav-link text-decoration-none"
                  >
                    Notas
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <span className="nav-link disabled">{email}</span>
              </li>
            </ul>
            <Link
              to="/"
              className="nav-link text-decoration-none text-danger ms-auto me-2"
            >
              <button className="btn btn-outline-danger px-5">Salir</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="text-light container-fluid-md container my-5 bg-dark px-5 py-4 rounded">
        {children}
      </div>
    </>
  );
}

export default Header;
