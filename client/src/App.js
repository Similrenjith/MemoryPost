import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Container } from "@material-ui/core";
import Auth from "./components/Auth/Auth";
const App = () => {

    return(
        <BrowserRouter>
        <Container maxidth="lg">
            <Navbar/>
            <Routes>
                <Route path="/" exact Component={Home}></Route>
                <Route path="/auth" exact Component={Auth}></Route>
            </Routes>
           

        </Container>
        </BrowserRouter>
    )



}

export default App;