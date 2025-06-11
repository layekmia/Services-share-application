const BASE_URL = "http://localhost:3000/api/services";
export default BASE_URL;

function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return date.toLocaleString('en-US', options);
}

export {formatDate}