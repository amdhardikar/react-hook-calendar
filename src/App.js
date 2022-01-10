import './App.css'
import Tasks from './component/Tasks'
import Calendar from './component/Calendar'

function App() {
   return (
      <div className="App">
         <div className="app-container">
            <Tasks />
            <Calendar />
         </div>
      </div>
   )
}

export default App
