if (!sessionStorage.getItem("response")) {
    sessionStorage.setItem("response", ""); // Default to an empty string
}
function react_php() {
	$.ajax({
	    url: 'react-php.php',
	    method: "GET",
	    dataType: "json",
	    success: function(data) {
	    	data = JSON.stringify(data, null, 4);
	        if (sessionStorage.getItem("response") != data) {
				sessionStorage.removeItem("response");
				sessionStorage.setItem("response", data);
				location.reload();
	        }
			react_php();
	    },
	    error: function(xhr, status, error) {
	        console.error("Failed to load JSON file:", status, error);
	        $("#json-output").text("Error loading JSON file.");
			react_php();
	    }
	});
}

$.ajax({
	url: 'react-php.php',
	method: "GET",
	dataType: "json",
	success: function(data) {
		data = JSON.stringify(data, null, 4);
		$("#json-output").text(data);
		console.log(data);
	},
	error: function(xhr, status, error) {
		console.error("Failed to load JSON file:", status, error);
		$("#json-output").text("Error loading JSON file.");
	}
});

react_php();