interface AddressResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export const useAddressSearch = () => {
  const searchAddress = async (query: string) => {
    try {
<<<<<<< Updated upstream
      // Add country filter for US and Canada
=======
>>>>>>> Stashed changes
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `format=json` +
        `&q=${encodeURIComponent(query)}` +
        `&countrycodes=us,ca` + // Restrict to USA and Canada
        `&addressdetails=1` +
        `&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
<<<<<<< Updated upstream
            'User-Agent': 'DTABSD-Caseflow-WebApp'
=======
            'User-Agent': 'DTABSD-Caseflow-WebApp' // Your app name
>>>>>>> Stashed changes
          }
        }
      );
      const data: AddressResult[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  };

  return { searchAddress };
<<<<<<< Updated upstream
};
=======
}; 
>>>>>>> Stashed changes
