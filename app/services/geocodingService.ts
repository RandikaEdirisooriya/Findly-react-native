const API_KEY = ""; // 🔴 Replace with your actual OpenCage API key

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0].formatted; // 🏠 Returns formatted address
    }
    return "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};
