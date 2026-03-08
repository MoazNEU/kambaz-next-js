"use client";

import "./styles.css";

import { ReactNode } from "react";
import KambazNavigation from "./navigation";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <div className="d-flex">
          <KambazNavigation />
          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

// import { ReactNode } from "react";
// import KambazNavigation from "./navigation";
// import "./styles.css";
// export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
//   return (
//     //  <table>
//     //    <tbody>
//     //      <tr>
//     //        <td valign="top" width="200">  <KambazNavigation /> </td>
//     //        <td valign="top" width="100%"> {children}           </td>
//     //      </tr>
//     //    </tbody>
//     //  </table>
//     <div id="wd-kambaz">
//       <div className="d-flex">
//         <div>
//           <KambazNavigation />
//         </div>
//         <div className="wd-main-content-offset p-3 flex-fill">
//           {children}
//         </div>
//       </div>
//     </div>

//   );
// }
