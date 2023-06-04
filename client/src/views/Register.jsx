import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import { sendEmail } from "../api/api";
import { MDBInputGroup as InputGroup } from "mdb-react-ui-kit";

function Register() {
  const { email, setEmail } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="mt-5 text-white container text-center"
      style={{ width: "50vw" }}
    >
      <h1>Registrate</h1>
      <p className="mt-4">
        Ingresa tu correo de gmail ¡Asi podremos enviarte un link y verificar
        que si tuyo!
      </p>
      <InputGroup className="mt-4" noWrap textBefore="user@gmail.com">
        <input
          onChange={({ target }) => setEmail(target.value)}
          className="form-control"
          type="text"
          placeholder="Ingresa tu correo"
        />
      </InputGroup>
      <br />
      <Link to="/message">
        <button
          className="btn btn-danger"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const response = await sendEmail(email);
            setIsLoading(false);
            alert(
              response
                ? "Hemos enviado el correo ✔️"
                : "Ha ocurrido un error ❌, es posible que se deba a que ya fue enviado el correo, vuleve a intentarlo en unos minutos"
            );
          }}
        >
          Enviar
        </button>
      </Link>
      <div>
        {isLoading && (
          <div class="spinner-border text-light mt-5" role="status">
            <span class="sr-only"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
