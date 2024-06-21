const calculateReward = (price) => {
  let rewards = 0;
  if (price > 50) {
    rewards = price - 50;
  }
  if (price > 100) {
    rewards = rewards + (price - 100);
  }
  return rewards;
};

export const customerReward = (userData) => {
  const d = new Date();
  let currentMonth = d.getMonth();

  let calculatedArray = {
    [currentMonth]: {
      amounts: [],
      rewards: 0,
    },
    [currentMonth - 1]: {
      amounts: [],
      rewards: 0,
    },
    [currentMonth - 2]: {
      amounts: [],
      rewards: 0,
    },
  };

  for (let i = 0; i < userData.length; i++) {
    let month = new Date(userData[i]["date"]);
    if (currentMonth - month < 3) {
      calculatedArray[month.getMonth()]["amounts"].push(userData[i]["amount"]);
    }
  }
  for (let key in calculatedArray) {
    let total_month_rewards = 0;
    for (let i = 0; i < calculatedArray[key]["amounts"].length; i++) {
      let price = calculatedArray[key]["amounts"][i];

      total_month_rewards = total_month_rewards + calculateReward(price);
    }
    calculatedArray[key]["rewards"] = total_month_rewards;
  }
  return calculatedArray;
};
