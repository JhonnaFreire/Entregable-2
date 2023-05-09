export const getCoordinates = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.latitude,
    };
  } catch (_) {
    return null;
  }

  // navigator.geolocation.getCurrentPosition(
  //     (location) => console.log(location),
  //     () => console.error("Not allowed")
  // );
};
