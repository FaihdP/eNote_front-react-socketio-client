import { useContext, useEffect, useState } from "react";
import { getGrades } from "../../api/api";
import { Context } from "../../context/Context";

function Notes() {
  const { person } = useContext(Context);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (Object.entries(person).length === 0) return;
    const fetchNotes = async () => {
      setList(await getGrades(person.id));
    };
    fetchNotes();
  }, [person]);

  const notes = list.map(({ asignature, notes }) => {
    return (
      <tr>
        <td>{asignature}</td>
        <td>{(!notes[0] ? "0" : notes[0].note )}</td>
        <td>{(!notes[1] ? "0" : notes[1].note )}</td>
        <td>{(!notes[2] ? "0" : notes[2].note )}</td>
        <td>{(!notes[3] ? "0" : notes[3].note )}</td>
        <td>{(!notes[4] ? "0" : notes[4].note )}</td>
        <td>{notes.map(note => note.note).reduce((prev, curr) => prev + curr, 0)/5}</td>
      </tr>
    )
  });

  return (
    <>
      <h1 className="text-white text-center">Notas</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 col-auto">
          <div
            className="card text-white mb-3"
            style={{ background: "#131619" }}
          >
            <div className="card-body">
              <h5 className="card-title">{`${person.names} ${person.lastnames}`}</h5>
              <h6 className="card-subtitle mb-2 text-danger">
                {person.id_type === 1 ? "Profesor" : "Estudiante"}
              </h6>
              <p className="card-text" />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-auto table-responsive-lg">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Nota 4</th>
                <th>Nota 5</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>{notes}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Notes;
