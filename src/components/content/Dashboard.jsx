import Widget from "../widget/Widget";
import Chart from "../chart/Chart";
import Featured from "../featured/Featured";
const Dashboard = () =>{
    return(
        <>
        <div className="widgets d-flex">
          <Widget type="user" />
          <Widget type="cars" />
          <Widget type="bookings" />
          <Widget type="earning" />
        </div>
        <div className="charts d-flex">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        </>
    );
}
 export default Dashboard