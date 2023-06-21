import {Inicio} from './components/inicio';
import style from "./App.module.css";
import {Link,Route,Switch,BrowserRouter,} from 'react-router-dom';
import { Home } from './components/home';
import DogsCreate from './components/form';
import Detail from './components/detail'

function App() {
  
  



  return (
    
      <BrowserRouter>
      <div className={style}>
       <Switch>
        
        <Route exact={true} path="/" component={Inicio}/>
          
          <Route exact={true} path="/home" component={Home}  />
          <Route  path="/form" component={DogsCreate}  />
          <Route path='/home/:id' component={Detail}/>
          </Switch>
          </div>
          </BrowserRouter>
    
  );
}

export default App;
