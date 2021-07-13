// import React, { useState } from "react";
// import { useEffect } from "react";

// const Neww = () => {
//   const [myMemories, setMyMemories] = useState([]);
//   console.log("myMemories", myMemories);
//   useEffect(() => {
//     fetch("http://localhost:1000/allPost")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setMyMemories(data);
//       });
//   }, []);
//   return (
//     <div>
//       {myMemories.map((myMemories) => (
//         <div>
//           <iframe
//             width="560"
//             height="315"
//             src={myMemories.tags}
//             title="YouTube video player"
//             frameborder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowfullscreen
//           ></iframe>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Neww;
