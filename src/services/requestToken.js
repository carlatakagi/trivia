const requestToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const requestJson = await request.json();
  return requestJson;
};

export default requestToken;
