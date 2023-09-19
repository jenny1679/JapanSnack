import './page.css';
import main1 from './images/專題2/品牌故事圖.png'; 

//
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function page() {

    return (
<div>
        <section>
  <div class="pagesContainer d-flex  align-items-center text background ">
  <div class="row border border-dark m-2 mt-5  align-items-center">
      
    <div className="col-4">

    <img  className='img-fluid handmade rounded mx-auto d-block align-items-center m-4' src={main1} alt="" />
    </div>
    <div class="col-8">

<h1 className='border border-dark text-center fw-bold'>關於我們的故事</h1>

<h2 className='border border-dark m-1  text-center fw-bold'>「拾月菓」</h2>
<br></br>
  <h4 className='border border-dark m-3 fw-bold lh-3'>日式菓子專賣店創辦於2023年資策會前端班，
    「十月」是我們學習了半年要結訓發表的月份，
    我們的團隊熱愛日本文化，於是決定創建日式點心為主題的網站，
    傳達品牌承襲日本文化、嚴選天然頂級原料的理念秉持著文化精髓中「不懈不怠、嚴謹專注」的職人精神。
  </h4>
         
    </div>
    
  </div>
</div>  

        </section>


</div>
       
    );
}



export default page;