// import { useEffect, useState } from "react";
// import { Outlet, Navigate } from "react-router-dom";

// export default function PrivateRoutes() {
//   const [authToken,setAuthToken] = useState(false)
//   useEffect(()=>{
//       let data = localStorage.getItem("token");
//       if (data || authToken !== true) {
//         // val = true;
//         console.log("inside")
//         setAuthToken(true)
//       }

//   },[authToken])


// //   let auth = { token: authToken };
//   return authToken ? <Outlet /> : <h1>good</h1>
// //   return (<h1>hello</h1>);
// }
