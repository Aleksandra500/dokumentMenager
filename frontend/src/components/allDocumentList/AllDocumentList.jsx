import { useEffect, useState } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';
import { allListDocument } from '../../services/allDocumentListService';
import './allDocumentList.css';
function AllDocumentList() {
	const [documents, setDocuments] = useState([]);
	const [loading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchDocument = async () => {
			setIsLoading(true);
			const res = await allListDocument();
			setIsLoading(false);

			if (res.status === 'success') {
				setDocuments(res.result);
			}
		};

		fetchDocument();
	}, []);

    const handleDelete = () => {
        
    }

	return (
		<div className='document-list'>
			{loading && (
				<div className='spinner'>
					<LuLoaderCircle className='animate-spin' size={32} />
				</div>
			)}

			{!loading && documents.length > 0 && (
				<ul>
					{documents.map((doc) => (
						<div key={doc.id} className='document-item'>
							<div className='document-title'>{doc.title}</div>
							<div className='document-description'>
								{doc.description}
							</div>
							<div className='document-actions'>
								<a
									href={`http://localhost:5000/${doc.filepath}`}
									target='_blank'
									rel='noreferrer'>
									📄 Otvori fajl
								</a>
								<button onClick={() => handleDelete(doc.id)}>
									🗑️ Obriši
								</button>
							</div>
						</div>
					))}
				</ul>
			)}
		</div>
	);
}

export default AllDocumentList;
