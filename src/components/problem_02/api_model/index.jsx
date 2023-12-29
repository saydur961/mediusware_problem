import { useState, useEffect, useRef, useCallback } from 'react';
import classes from './api_model.module.css';
import { Fetch } from '../../../functions/fetch';
import Model from '../../shared/model';

const API_Model = ({
	hadnleCurrenentModel,
	setSelectedContact,
	defaultUrl,
	modelCloseHanlder
}) => {
	const [contactList, setContactList] = useState([]);
	const [backupList, setBackupList] = useState([]);
	const [status, setStatus] = useState('loading');
	const [url, setUrl] = useState(defaultUrl);
	const [paginate, setPaginate] = useState({
		prev: null,
		next: null,
	});
	const [searchTxt, setSearchTxt] = useState('');
	const [isOnlyEven, setIsOnlyEven] = useState(false);

	const observer = useRef(null);

	const lastElementRef = useCallback(
		node => {
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(entries => {
				if (
					entries[0].isIntersecting &&
					paginate.next &&
					status === 'success'
				) {
					setUrl(paginate.next);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[paginate, status]
	);

	// call the api
	useEffect(() => {
		const fetchList = async () => {
			try {
				let targetUrl = url;

				if (searchTxt) {
					targetUrl = `${defaultUrl}?search=${searchTxt}`;
				}

				setStatus('loading');

				const res = await Fetch({
					url: targetUrl,
				});

				if (searchTxt) {
					setContactList([...res.results]);
				} else {
					setContactList([...contactList, ...res.results]);
				}

				setPaginate({
					prev: res.previous,
					next: res.next,
				});

				setStatus('success');
			} catch (err) {
				setStatus('error');
			}
		};

		fetchList();
	}, [url, searchTxt]);

	// handel only even
	useEffect(() => {
		if (isOnlyEven) {
			const newList = contactList.filter(el => el.id % 2 == 0);

			setBackupList([...contactList]);
			setContactList([...newList]);
		} else {
			setContactList([...backupList]);
		}
	}, [isOnlyEven]);

	// const prevHander = () => {
	// 	if (paginate.prev) {
	// 		setUrl(paginate.prev);
	// 	}
	// };

	// const nextHander = () => {
	// 	if (paginate.next) {
	// 		setUrl(paginate.next);
	// 	}
	// };

	const itemClickHanlder = item => {
		setSelectedContact(item);
	};

	const renderComp = () => {
		return (
			<div className={classes.contactList}>
				{contactList.map(item => (
					<div
						key={item.id}
						className={classes.contactItem}
						onClick={() => itemClickHanlder(item)}
					>
						{item.phone}
					</div>
				))}

				{status === 'error' ? (
					<h2> error </h2>
				) : status === 'loading' ? (
					<h2> loading.... </h2>
				) : contactList.length === 0 ? (
					<h2> No data found </h2>
				) : null}

				<div ref={lastElementRef}>&nbsp;</div>
			</div>
		);
	};

	return (
		<Model close={modelCloseHanlder}>
			<div className={classes.btn_div}>
				<button style={{backgroundColor: '#46139f'}}
					onClick={() => hadnleCurrenentModel('model_01')}
				>
					All Contacts
				</button>

				<button style={{backgroundColor: '#ff7f50'}}
					onClick={() => hadnleCurrenentModel('model_02')}
				>
					US Contacts
				</button>

				<button onClick={modelCloseHanlder}>Close</button>
			</div>

			<div className={classes.search_div}>
				<input
					type="text"
					placeholder="type here"
					value={searchTxt}
					onChange={e => setSearchTxt(e.target.value)}
				/>
			</div>

			{renderComp()}

			<div>
				only even{' '}
				<input type="checkbox" onClick={() => setIsOnlyEven(!isOnlyEven)} />
			</div>
		</Model>
	);
};

export default API_Model;
