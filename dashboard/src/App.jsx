import './App.css';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';

function App() {
    return (
            <div id='wrapper'>
                <SideBar />

                <div id='content-wrapper'>
                    <div id='content'>
                        <TopBar />
                        <div className='container-fluid'>
                            <div className='d-sm-flex align-items-center justify-content-between mb-4'>
                                <h1 className='h3 mb-0 text-gray-800'>
                                    Dashboard
                                </h1>
                            </div>

                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
    );
}

export default App;
