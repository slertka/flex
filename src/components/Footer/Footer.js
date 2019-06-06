import React from "react";

// export default function() {
//   return <footer role="content-info">Footer</footer>;
// }

export default function(props) {
  return <button onClick={props.clickHandler}>Click Me</button>;
}
