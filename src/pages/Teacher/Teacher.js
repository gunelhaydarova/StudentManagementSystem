
import Table from '../../components/Information/TeacherData';
import '../../App.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
function Teacher() {
    $('.sidebar_1').addClass('active_menu_link')

    return (
        <div className="App">
            {/* <Login /> */}
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

export default Teacher;
