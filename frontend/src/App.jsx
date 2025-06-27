import { useState } from 'react';
import './App.css';
import AllDocumentList from './components/allDocumentList/AllDocumentList';
import UploadForm from './components/uploadForm/UploadForm';
import { ToastContainer } from 'react-toastify';

function App() {
	const [activeComponent, setActiveComponent] = useState('upload');
	return (
		<div className='app-container'>
			<ToastContainer />
			<div className='nav-buttons'>
				<button onClick={() => setActiveComponent('upload')}>
					📤 Upload Dokumenta
				</button>
				<button onClick={() => setActiveComponent('list')}>
					📄 Lista Dokumenata
				</button>
			</div>
			<div>
				{activeComponent === 'upload' && <UploadForm/>}
				{activeComponent === 'list' && <AllDocumentList/>}
			</div>
		</div>
	);
}

export default App;
