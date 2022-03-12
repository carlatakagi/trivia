const requestQuestion = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const requestJson = await request.json();
  return requestJson;
};

export default requestQuestion;
