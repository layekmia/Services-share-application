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

export const serviceCategories = [
  "Health & Beauty",
  "Cleaning Service",
  "Home Service",
  "Electrical Service",
  "Plumbing Services",
  "Painting Services",
  "Moving & Packing",
  "AC & Cooling Services",
  "Law Consultation",
];

export const locationCategories = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];


export {formatDate} 