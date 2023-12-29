import React, {useState, useEffect} from 'react';

const dummyList = [

    { name: '01', status: 'other' },
    { name: '02', status: 'active' },
    { name: '03', status: 'pending' },
    { name: '04', status: 'completed' }

]

const Problem1 = () => {

    const [dataList, setDataList] = useState([...dummyList]);
    const [currentList, setCurrentList] = useState([]);

    const [show, setShow] = useState('all');
    const [formName, setFormName] = useState('');
    const [formStatus, setFormstatus] = useState('');

    // handle shosw list
    useEffect(() => {

        if(show === 'active') {
            const newList = dataList.filter(el => el.status === 'active');
            setCurrentList([...newList]);
            return;
        }

        if(show === 'completed') {
            const newList = dataList.filter(el => el.status === 'completed');
            setCurrentList([...newList]);
            return;
        }

        let activeList = [];
        let completeList = [];
        let oterList = [];

        dataList.forEach(el => {

            if(el.status === 'active') {
                activeList.push(el); 
            }
            else if(el.status === 'completed') {
                completeList.push(el); 
            }
            else {
                oterList.push(el)
            }

        })

        setCurrentList([...activeList, ...completeList, ...oterList]);

    }, [show, dataList]);

    const handleClick = (val) =>{
        setShow(val);
    }

    const submitHanlder = e => {
        e.preventDefault();

        if(!formName || !formStatus) return null;

        setDataList([
            ...dataList,
            { name: formName, status: formStatus }
        ]);
        
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4"
                        onSubmit={submitHanlder}
                    >
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name"
                                value={formName} onChange={e => setFormName(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status"
                                value={formStatus} onChange={e => setFormstatus(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                currentList.map((el, idx) => (
                                <tr key={idx} >
                                    <td scope="col"> {el.name} </td>
                                    <td scope="col"> {el.status} </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;