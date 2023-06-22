import { Outlet } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Link to={`/`}>
        <h3>Go back home</h3>
      </Link>
      <ul>
        <li><Link to={`/child`}>child</Link></li>
        <li><Link to={`/add-new-property`}>Add New Property</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}

export default App;
