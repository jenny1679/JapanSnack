import './page.css';
import main1 from './images/最新消息1.jpg';
import main2 from './images/最新消息2.jpg';
import main3 from './images/最新消息3.jpg';

//
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function page2() {

    return (

<div className='background2 border border-dark h-100'>
<div className='text-center  m-3'><h1 className='fw-bold'>最新消息</h1></div> 
<div class="pagesContainer border border-dark background2  d-flex  align-items-center">
    
	<div class="row m-5 ">
		<div class="col-md-4 ">
        <img
              className="h-100 w-100 border border-5 rounded-3"
              src={main1}
              alt=""
            />
		</div>
		<div class="col-md-4 ">
        <img
              className="h-100 w-100 border border-5 rounded-3"
              src={main2}
              alt=""
            />
		</div>
		<div class="col-md-4 ">
        <img
              className="h-100 w-100 border border-5 rounded-3"
              src={main3}
              alt=""
            />
		</div>
        <div className='text-center fw-bold m-2'><h3>查看更多</h3></div>
	</div>
</div>




</div>
        
    );
}



export default page2;