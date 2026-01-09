import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/0234" className="wd-dashboard-course-link">
            <Image src="/images/math.jpg" width={200} height={150} alt="mathdm" />
            <div>
              <h5> MA0234 Mathematics of Data Models </h5>
              <p className="wd-dashboard-course-title">
                Mathamatics of Data Models
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1034" className="wd-dashboard-course-link">
            <Image src="/images/CS1034.jpg" width={200} height={150} alt="computersystems" />
            <div>
              <h5> CS1034 Computer Systems </h5>
              <p className="wd-dashboard-course-title">
                Computer Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1204" className="wd-dashboard-course-link">
            <Image src="/images/CS1204.jpg" width={200} height={150} alt="algo" />
            <div>
              <h5> CS1204 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Algorithms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1230" className="wd-dashboard-course-link">
            <Image src="/images/CS1230.jpg" width={200} height={150} alt="discretestructures" />
            <div>
              <h5> CS1230 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
                Discrete Structures
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2300" className="wd-dashboard-course-link">
            <Image src="/images/CS2300.jpg" width={200} height={150} alt="oop" />
            <div>
              <h5> CS2300 Object Oriented Programming </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Programming
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/CS3000.jpg" width={200} height={150} alt="networks" />
            <div>
              <h5> CS3000 Fundamentals of Networks </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Networks
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/CS3500.jpg" width={200} height={150} alt="webdev" />
            <div>
              <h5> CS3500 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Web Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4000" className="wd-dashboard-course-link">
            <Image src="/images/CS4000.jpg" width={200} height={150} alt="appdev" />
            <div>
              <h5> CS4000 App Development </h5>
              <p className="wd-dashboard-course-title">
                App Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
