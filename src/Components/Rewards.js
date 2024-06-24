import MonthlyReward from "./MonthlyReward";
import Card from "./UI/Card";
import designs from "./Rewards.module.css";

/*
To display total reward and monthly reward under a card

customerName- name of the customer
rewards- object containg last three month txn and rewards
 */
const Rewards = ({ customerName, rewards }) => {
  let TotalReward = 0;
  for (let key in rewards) TotalReward += rewards[key].rewards;
  return (
    <Card class={designs.users}>
      <div className={designs.month}>
        <h3 data-testid={"customerName"}>{customerName}</h3>
        <h2 data-testid={"totalReward"}>{`${TotalReward} pts.`}</h2>
      </div>

      {Object.keys(rewards).map((key) => (
        <MonthlyReward item={rewards[key]} month={key} />
      ))}
    </Card>
  );
};

export default Rewards;
