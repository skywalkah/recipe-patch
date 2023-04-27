const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDShG28-MjGo4_Eh-Xcx_zXFwi3uD9LaNM&location=-33.8670522,151.1957362&radius=5000&type=supermarket";

fetch(URL).then(data=> {
  return data.json()
}).then(jsonData => {
 console.log(jsonData.results)
}).catch(error=> {
  console.log(error);
}) 