import ClienteShell from "./components/ClienteShell";
import { ClienteProvider } from "./context/clienteContext";

function App() {
  return (
    <ClienteProvider>
      <ClienteShell/>
    </ClienteProvider>
  );
}

export default App;
