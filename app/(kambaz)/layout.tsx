import { ReactNode } from "react";
import KambazNavigation from "./navigation";
import "./styles.css";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
  //  <table>
  //    <tbody>
  //      <tr>
  //        <td valign="top" width="200">  <KambazNavigation /> </td>
  //        <td valign="top" width="100%"> {children}           </td>
  //      </tr>
  //    </tbody>
  //  </table>
  <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
  </div>

);}
