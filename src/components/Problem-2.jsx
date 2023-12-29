import { useState, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import Model_1 from './problem_02/model_1';
import Model_2 from './problem_02/model_2';
import Model_3 from './problem_02/model_3';

const MODAL_PARAM = 'modal';

const Problem2 = () => {
	const [selectedContact, setSelectedContact] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	let currentModel = searchParams.get(MODAL_PARAM);

	const hadnleCurrenentModel = name => {
		if (name) {
			setSearchParams({ [MODAL_PARAM]: name });
		} else {
			searchParams.delete(MODAL_PARAM);
			setSearchParams(searchParams);
		}
	};

    const modelCloseHanlder = () => {
        hadnleCurrenentModel(null);
        setSelectedContact(null);
    }

	// render model
	const renderModel = () => {

		if (selectedContact) {
			return (
				<Model_3
					contact={selectedContact}
					setSelectedContact={setSelectedContact}
                    modelCloseHanlder={modelCloseHanlder}
				/>
			);
		}
		if (currentModel === 'model_01') {
			return (
				<Model_1
					hadnleCurrenentModel={hadnleCurrenentModel}
					setSelectedContact={setSelectedContact}
                    modelCloseHanlder={modelCloseHanlder}
				/>
			);
		}
		if (currentModel === 'model_02') {
			return (
				<Model_2
					hadnleCurrenentModel={hadnleCurrenentModel}
					setSelectedContact={setSelectedContact}
                    modelCloseHanlder={modelCloseHanlder}
				/>
			);
		}
		return null;
	};

	return (
		<Fragment>
			{renderModel()}

			<div className="container">
				<div className="row justify-content-center mt-5">
					<h4 className="text-center text-uppercase mb-5">Problem-2</h4>

					<div className="d-flex justify-content-center gap-3">
						<button
							className="btn btn-lg btn-outline-primary"
							type="button"
							onClick={() => hadnleCurrenentModel('model_01')}
						>
							All Contacts
						</button>
						<button
							className="btn btn-lg btn-outline-warning"
							type="button"
							onClick={() => hadnleCurrenentModel('model_02')}
						>
							US Contacts
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Problem2;