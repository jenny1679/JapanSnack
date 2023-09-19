import React from 'react'


export default function Sub() {
    return (
        <>
           

{/* <head>
  
    <title>訂閱通知</title>
    
</head> */}

<body>
<link rel="stylesheet" href="./style.css"></link>
    <h1 className='subh1 mt-3'>訂閱我們的最新消息</h1>
    <form id="subscribe-form" action="/subscribe" method="post">
        <input type="email" id="email" name="email" placeholder="輸入你的電子郵件" />
        <button className='subButton' type="submit">訂閱</button>
    </form>
    <div id="message"></div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./script.js"></script>
</body>


        </>
    )
}
