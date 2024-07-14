import Header from './Components/header/Header'
import Table from './Components/table/Table'
import Graph from './Components/graph/Graph'
import { CustomerProvider } from './context/context'

export default function App() {







  return (
    <CustomerProvider>

      <Header />
      <Table />
      <Graph />
    </CustomerProvider>
  )
}
