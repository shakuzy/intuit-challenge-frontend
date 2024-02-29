import React, { useContext, useState, useEffect } from "react";

const clienteContext = React.createContext();

export function useCliente() {
  return useContext(clienteContext);
}

export function ClienteProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  const [detalle, setDetalle] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  const agregarCliente = () => {
    setIdCliente(null);
    setDetalle(true);
  };
  const editarCliente = (idClienteParam) => {
    setIdCliente(idClienteParam);
    setDetalle(true);
  };
  const getClientes = () => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("https://localhost:7162/api/IntuitChallenge/GetAll", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            setClientes(data.clientes);
          } else {
            alert(data.descError);
          }
        })
        .catch((resp) => {
          alert(resp);
        });
    } catch (error) {
      alert("getClientes - Ocurrio un error inesperado: " + error);
    }
  };

  const getClienteNombre = (nombre) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://localhost:7162/api/IntuitChallenge/Search?nombreCliente=" +
          nombre,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.estado === "OK") {
            editarCliente(data.cliente.id);
          } else {
            alert(data.descError);
          }
        })
        .catch((resp) => {
          alert(resp);
        });
    } catch (error) {
      alert("getClienteNombre - Ocurrio un error inesperado: " + error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <clienteContext.Provider
      value={{
        getClientes,
        clientes,
        setClientes,
        detalle,
        setDetalle,
        idCliente,
        setIdCliente,
        agregarCliente,
        editarCliente,
        getClienteNombre
      }}
    >
      {children}
    </clienteContext.Provider>
  );
}
