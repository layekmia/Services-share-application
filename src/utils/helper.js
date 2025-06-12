const BASE_URL = "https://a11server-iota.vercel.app/api";
export default BASE_URL;

function formatDate(isoString) {
  const date = new Date(isoString);

  const options = { 
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleString('en-US', options);
}

export {formatDate} 