import { useContext, useEffect, useState } from "react";
import { getCourses } from "../../api/api";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

function Loader() {
  return <div className="w-50 loader" />;
}

function Courses() {
  const { person } = useContext(Context);
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      setCourses(await getCourses(person.id, person.id_type));
    };
    fetchCourses();
  }, [person]);

  let typePerson = "Estudiate";
  if (person.id_type === 1) typePerson = "Profesor";
  if (person.id_type === 2) typePerson = "Administrador";

  let list = !courses ? (
    <tr>
      <td className="text-center">
        <div className="w-50 loader" />
      </td>
      <td className="text-center">
        <div className="w-50 loader" />
      </td>
      <td className="text-center">
        <div className="w-50 loader" />
      </td>
    </tr>
  ) : (
    courses.length === 0 ? <td colSpan={3} className="text-center p-4">No estas inscrito en ningún curso.</td>:
    courses.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.grp}</td>
          <td>{row.asignature}</td>
          <td>
            <Link to={"/dashboard/courses/" + row.id}>
              <button className="btn btn-outline-info">Ver grupo</button>
            </Link>
          </td>
        </tr>
      );
    })
  );

  return (
    <>
      <h1 className="text-center">Cursos</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 col-auto">
          <div
            className="card text-white mb-3"
            style={{ background: "#131619" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                {person.names || person.lastnames ? (
                  `${person.names} ${person.lastnames}`
                ) : (
                  <Loader />
                )}
              </h5>
              <h6 className="card-subtitle mb-2 text-danger">{typePerson}</h6>
              <p className="card-text" />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-auto table-responsive-sm">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Materia</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Courses;
