module.exports = {

  distance: function(locationOne, locationTwo){
    return ( ((locationOne.x - locationTwo.x)^2) + (locationOne.y - locationTwo.y )^2 )^(1/2)
  }

};
