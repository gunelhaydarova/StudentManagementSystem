
import Table from '../../components/Information/FacultiesData';
import '../../App.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Row } from 'react-bootstrap';
function Faculty() {
    return (
        <div className="App">
            <Row>
                <div className='left'>
                    <Sidebar />
                </div>
                <div className='right'>
                    <Table />
                </div>
            </Row>


        </div>
    );
}

export default Faculty;
