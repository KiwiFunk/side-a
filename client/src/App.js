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

            <div style={{ padding: '50px', height: '100vh', background: '#f0f0f0', textAlign: 'center' }}>
                <h2>Welcome to the Mixtape Builder</h2>
                <p>Scroll down to see the magic happen!</p>
            </div>

        </div>
    );
}

export default App;
