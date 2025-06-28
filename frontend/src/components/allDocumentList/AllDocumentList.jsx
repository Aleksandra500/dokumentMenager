import { useEffect, useState } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';
import { allListDocument } from '../../services/allDocumentListService';
import './allDocumentList.css';
import { deleteOne } from '../../services/deleteOneService';
import { toast } from 'react-toastify';
function AllDocumentList() {
	const [documents, setDocuments] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

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

	const handleDelete = async (id) => {
		setIsDeleting(true);
		const res = await deleteOne(id);
		setIsDeleting(false);

		if (res.success) {
			toast.success(res.message);
			setDocuments((prev) => prev.filter((doc) => doc.id !== id));
		} else {
			toast.error(res.message);
		}
	};

	return (
		<div className='document-list'>
			{(loading || isDeleting) && (
				<div className='spinner'>
					<LuLoaderCircle className='animate-spin' size={32} />
				</div>
			)}

			{!loading && documents.length > 0 && (
				<ul>
					{documents.map((doc) => (
						<li key={doc.id} className='document-item'>
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
								<a
									href={`http://localhost:5000/api/download/${doc.id}`}>
									⬇️ Preuzmi
								</a>
								<button
									onClick={() => handleDelete(doc.id)}
									disabled={isDeleting}>
									🗑️ Obriši
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			{!loading && documents.length === 0 && (
				<p>Nema dokumenata za prikaz.</p>
			)}
		</div>
	);
}

export default AllDocumentList;
