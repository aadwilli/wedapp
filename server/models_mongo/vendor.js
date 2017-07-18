module.exports = function(){

  var VendorSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String}, 
  });

  var Vendor = new mongoose.model('Vendor', VendorSchema);

  var createVendor = function(name, email, phone){
  	var vendor = new Vendor({
  		name: name, 
  		email: email, 
  		phone: phone
  	})

  	event.save(function(err){
  		if(err){
  			console.log(err)
  		}else{
  			console.log("Vendor was created")
  		}
  	})
  } 

  return{
  	Vendor: Vendor,
  	createVendor : createVendor
  }

}