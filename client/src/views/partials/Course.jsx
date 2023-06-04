import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getStudents } from "../../api/api";
import { Context } from "../../context/Context";

const BACKGROUND_COLOR = { background: "#131619" };

function Course() {
  const { idGroup } = useParams();

  const { person, socket } = useContext(Context);

  const [course, setCourse] = useState({});
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);

  // Socket
  useEffect(() => {
    socket.emit("client: connectChatGroup", idGroup);

    socket.on("server: sendMessage", ({ name, message }) => {
      setMessages([...messages, { from: name, body: message }]);
    });
  }, [socket, messages, idGroup]);

  // Load course
  useEffect(() => {
    const fetchCourse = async () => {
      setCourse([await getCourse(idGroup)][0][0]);
    };
    fetchCourse();
  }, [setCourse, idGroup]);

  useEffect(() => {
    const fetchStudents = async () => {
      setStudents([await getStudents(idGroup)][0]);
    };
    fetchStudents();
  }, [setStudents, idGroup]);

  function hanldeSubmit(e) {
    e.preventDefault();

    if (message === "") return;

    socket.emit("client: sendMessage", {
      idGroup,
      name: person.names,
      message,
    });
    setMessage("");
  }

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-4 col-auto d-flex flex-column">
        <div className="card text-white mb-3" style={BACKGROUND_COLOR}>
          <div className="card-body">
            <h5 className="card-title">Grupo {course.name || ""}</h5>
            <h6 className="card-subtitle mb-2 text-danger">
              <b>Profesor:</b>{" "}
              {`${course.teacher_names || ""} ${
                course.teacher_lastnames || ""
              }`}
            </h6>
            <p className="card-text">{course.asignature}</p>
          </div>
        </div>
        <div className="card text-white mb-3" style={BACKGROUND_COLOR}>
          <div className="card-body">
            <h5 className="card-title">Estudiantes</h5>
            <hr />
            <div className="card-text">
              {students.map(({ names, lastnames }, index) => {
                return (
                  <div key={index}>
                    {names} {lastnames}
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-auto table-responsive-sm">
        <div className="p-4 rounded" style={BACKGROUND_COLOR}>
          <h6>
            Chatea con{" "}
            {person.id_type === 1 ? "tus estudiantes" : "tu profesor"}
          </h6>
          <hr />
          <div className="d-flex flex-column">
            {messages.map(({ from, body }, index) => {
              return (
                <div
                  key={index}
                  className={from === person.names ? "text-end" : ""}
                >
                  <b>{from}</b>: {body}
                </div>
              );
            })}
          </div>
          <form onSubmit={(e) => hanldeSubmit(e)}>
            <div className="row justify-content-center mt-5">
              <div className="col-md-6 col-auto">
                <input
                  value={message}
                  onChange={({ target }) => setMessage(target.value)}
                  className="form-control bg-dark border-0 text-white"
                />
              </div>
              <div className="col-md-2 col-auto">
                <button className="btn btn-danger">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Course;
