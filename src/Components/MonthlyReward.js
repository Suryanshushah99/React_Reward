import designs from "./MonthlyReward.module.css";
import Card from "./UI/Card";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/*
give monthly reward

item- object containing reward and txn for each month
month- month in numerical form starting from 0 as january
*/
const MonthlyReward = ({ item, month }) => {
  return (
    <Card class={designs.users}>
      <div key={month} className={designs.month} data-testid={"monthlyReward"}>
        <h5>{months[month]}</h5>
        <h4>{`${item.rewards} pts.`}</h4>
      </div>
    </Card>
  );
};

export default MonthlyReward;
