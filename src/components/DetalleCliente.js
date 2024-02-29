import { useEffect, useState } from "react";

import { useCliente } from "../context/clienteContext";

export default function DetalleCliente() {
  const clienteContext = useCliente();
  const [idCliente, setIdCliente] = useState(clienteContext.idCliente);
  const [cliente, setCliente] = useState(null);

  const [nombres, setNombres] = useState(undefined);
  const [apellidos, setApellidos] = useState(undefined);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cuit, setCuit] = useState(undefined);
  const [domicilio, setDomicilio] = useState(undefined);
  const [telefonoCelular, setTelefonoCelular] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const getCliente = () => {
    try {
      if (idCliente === null) {
        return;
      }
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://localhost:7162/api/IntuitChallenge/Get?idCliente=" + idCliente,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            setCliente(data.cliente);
            setNombres(data.cliente.nombres);
            setApellidos(data.cliente.apellidos);
            setFechaNacimiento(data.cliente.fechaNacimiento);
            setCuit(data.cliente.cuit);
            setDomicilio(data.cliente.domicilio);
            setTelefonoCelular(data.cliente.telefonoCelular);
            setEmail(data.cliente.email);
          } else {
            alert(data.descError);
          }
        })
        .catch((resp) => {
          alert(resp);
        });
    } catch (error) {
      alert("getCliente - Ocurrio un error inesperado: " + error);
    }
  };
  useEffect(() => {
    getCliente();
  }, []);

  const handleChangeNombres = (event) => {
    setNombres(event.target.value);
  };

  const handleChangeApellidos = (event) => {
    setApellidos(event.target.value);
  };
  const handleChangefechaNacimiento = (event) => {
    setFechaNacimiento(event.target.value + "T00:00:00.000");
  };

  const handleChangeCuit = (event) => {
    setCuit(event.target.value);
  };
  const handleChangeDomicilio = (event) => {
    setDomicilio(event.target.value);
  };

  const handleChangeTelefonoCelular = (event) => {
    setTelefonoCelular(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const agregarCliente = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        cliente: {
          id: 0,
          nombres: nombres,
          apellidos: apellidos,
          fechaNacimiento: fechaNacimiento,
          cuit: cuit,
          domicilio: domicilio,
          telefonoCelular: telefonoCelular,
          email: email,
        },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://localhost:7162/api/IntuitChallenge/Insert", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            alert("El cliente se ha agregado exitosamente.");
            clienteContext.getClientes();
            clienteContext.setDetalle(false);
          } else {
            alert(data.descError);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("agregarCliente - Ocurrio un error inesperado: " + error);
    }
  };

  const eliminarCliente = () => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      fetch(
        "https://localhost:7162/api/IntuitChallenge/Delete?idCliente=" +
          idCliente,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            alert("El cliente se ha eliminado exitosamente.");
            clienteContext.getClientes();
            clienteContext.setDetalle(false);
          } else {
            alert(data.descError);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("eliminarCliente - Ocurrio un error inesperado: " + error);
    }
  };

  const editarCliente = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        cliente: {
          id: idCliente,
          nombres: nombres,
          apellidos: apellidos,
          fechaNacimiento: fechaNacimiento,
          cuit: cuit,
          domicilio: domicilio,
          telefonoCelular: telefonoCelular,
          email: email,
        },
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://localhost:7162/api/IntuitChallenge/Update", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            alert("El cliente se ha editado exitosamente.");
            clienteContext.getClientes();
            clienteContext.setDetalle(false);
          } else {
            alert(data.descError);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("editarCliente - Ocurrio un error inesperado: " + error);
    }
  };

  const volver = () => {
    clienteContext.setDetalle(false);
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-xs-12 col-md-12 col-lg-12 d-grid gap-2">
          <div>
            {idCliente === null ? <h1>agregar</h1> : <h1>editar</h1>}

            <div className="mb-3">
              <label className="form-label">nombres</label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                value={nombres}
                onChange={handleChangeNombres}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">apellidos</label>
              <input
                type="text"
                className="form-control"
                id="text"
                value={apellidos}
                onChange={handleChangeApellidos}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={
                  fechaNacimiento !== null && fechaNacimiento !== undefined
                    ? fechaNacimiento.slice(0, 10)
                    : null
                }
                onChange={handleChangefechaNacimiento}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">cuit</label>
              <input
                type="text"
                className="form-control"
                id="cuit"
                value={cuit}
                onChange={handleChangeCuit}
                maxLength="11"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">domicilio</label>
              <input
                type="text"
                className="form-control"
                id="domicilio"
                value={domicilio}
                onChange={handleChangeDomicilio}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">telefono celular</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                value={telefonoCelular}
                onChange={handleChangeTelefonoCelular}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>

            <div style={{display:"flex", flexDirection:"column"}}>
            {idCliente === null ? (
              <button
                className="btn btn-success  btn-lg btn-block mb-3"
                onClick={agregarCliente}
              >
                agregar
              </button>
            ) : (
              <>
                <button
                  className="btn btn-danger btn-lg btn-block mb-3"
                  onClick={eliminarCliente}
                >
                  eliminar
                </button>
                <button
                  className="btn btn-primary btn-lg btn-block mb-3"
                  onClick={editarCliente}
                >
                  editar
                </button>
              </>
            )}
            <button
              className="btn btn-secondary btn-lg btn-block mb-3"
              onClick={volver}
            >
              volver
            </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
