import { useCliente } from "../context/clienteContext";
import  ListadoCliente  from "./ListadoCliente.js";
import  DetalleCliente  from "./DetalleCliente.js";
export default function ClienteShell() {
  const clienteContext = useCliente();
  return clienteContext.detalle === false ? (
    <ListadoCliente />
  ) : (
    <DetalleCliente />
  );
}
