import { useState } from 'react';
import { uploadDocuments } from '../../services/uploadService';
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from 'react-toastify';
import './uploadForm.css'

function UploadForm() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [document, setDocument] = useState(null);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('document', document)
      

         try {
           const res = await uploadDocuments(formData)
           setMessage('Uspešno poslato!');
           setTitle('')
           setDescription('')
           setDocument(null)
           toast.success(message)
         } catch (error) {
          console.error(error);
          setMessage('Greška pri slanju fajla.');
           setMessage('Uspešno poslato!');
           setTitle('')
           setDescription('')
           setDocument(null)
           toast.error(message)
         } finally {
          setIsLoading(false);
           setMessage('Uspešno poslato!');
           setTitle('')
           setDescription('')
           setDocument(null)
           
          }
};
        
return (
  <div className="upload-container">
    <h2>Upload file</h2>
    <form onSubmit={handleSubmit}>
      <div >
        <label>Naslov: </label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Opis:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Dokument: </label>
        <input type='file' accept='.pdf, .doc, .txt' onChange={(e) => setDocument(e.target.files[0])} required />
      </div>

      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Slanje...' : 'Pošalji'}
      </button>
    </form>

    {isLoading && <div className="spinner"><LuLoaderCircle className="animate-spin" size={32} /></div>}
    {message && <p>{message}</p>}
  </div>
);

    }
    
   


export default UploadForm;
