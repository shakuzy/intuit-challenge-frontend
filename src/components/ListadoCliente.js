import { useCliente } from "../context/clienteContext";
import { useState } from "react";

export default function ListadoCliente() {
  const clienteContext = useCliente();
  const [nombreCliente, setNombreCliente] = useState(null);

  return (
    <>
      <div class="container text-center">
        <div class="row">
          <div class="col-12 col-sm-12 col-xs-12 col-md-12 col-lg-12 d-grid gap-2">
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
                margin:"3% 3%"
              }}
            >
              <div className="mb-3 col-8">
                <label className="form-label">
                  nombre del cliente a buscar
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  value={nombreCliente}
                  onChange={(event) => setNombreCliente(event.target.value)}
                />
              </div>

              <button
                className="btn btn-info  btn-lg col-2"
                onClick={() => clienteContext.getClienteNombre(nombreCliente)}
              >
                buscar
              </button>
            </div>
            <ul className="list-group">
              {clienteContext.clientes.map((item, index) => (
                <button
                  className="list-group-item d-flex justify-content-between align-items-start"
                  onClick={() => clienteContext.editarCliente(item.id)}
                  key={item.id}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {item.nombres} {item.apellidos}
                    </div>
                    {item.cuit}
                  </div>
                </button>
              ))}
            </ul>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => clienteContext.agregarCliente()}
            >
              agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
