import logo from './logo.svg';
import './App.css';
import './styles/global.css';

import Header from './components/Header';
import MainScene from './components/MainScene';
import Tracklist from './components/Tracklist';

function App() {
    return (
        <div className="App">
            <Header />
            <MainScene />
            <Tracklist />
        </div>
    );
}

export default App;
