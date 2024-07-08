/* <![CDATA[ */

/// Jquery validate newsletter
$('#newsletter_form').submit(function () {

	var action = $(this).attr('action');

	$("#message-newsletter").slideUp(750, function () {
		$('#message-newsletter').hide();

		$('#submit-newsletter')
			.after('<i class="icon_loading loader newsletter"></i>')
			.attr('disabled', 'disabled');

		$.post(action, {
				email_newsletter: $('#email_newsletter').val()
			},
			function (data) {
				document.getElementById('message-newsletter').innerHTML = data;
				$('#message-newsletter').slideDown('slow');
				$('#newsletter_form .loader').fadeOut('slow', function () {
					$(this).remove()
				});
				$('#submit-newsletter').removeAttr('disabled');
				if (data.match('success') != null) $('#newsletter_form').slideUp('slow');

			}
		);

	});
	return false;
});

// Jquery validate form register
$('#register').submit(function(){

		var action = $(this).attr('action');

		$("#message-register").slideUp(750,function() {
		$('#message-register').hide();

 		$('#submit-register')
			.after('<i class="icon_loading loader register"></i>')
			.attr('disabled','disabled');
			
		$.post(action, {
			name_register: $('#name_register').val(),
			email_register: $('#email_register').val(),
			restaurantname_register: $('#restaurantname_register').val(),
			address_register: $('#address_register').val(),
			city_register: $('#city_register').val(),
			country_register: $('#country_register').val(),
			verify_register: $('#verify_register').val()
		},
			function(data){
				document.getElementById('message-register').innerHTML = data;
				$('#message-register').slideDown('slow');
				$('#register .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-register').removeAttr('disabled');
				if(data.match('success') != null) $('#register').slideUp('slow');

			}
		);

		});
		return false;
	});

// Jquery validate form contact
$('#contactform').submit(function () {

	var action = $(this).attr('action');

	$("#message-contact").slideUp(750, function () {
		$('#message-contact').hide();

		$('#submit-contact')
			.after('<i class="icon_loading loader"></i>')
			.attr('disabled', 'disabled');

		$.post(action, {
				name_contact: $('#name_contact').val(),
				email_contact: $('#email_contact').val(),
				message_contact: $('#message_contact').val(),
				verify_contact: $('#verify_contact').val()
			},
			function (data) {
				document.getElementById('message-contact').innerHTML = data;
				$('#message-contact').slideDown('slow');
				$('#contactform .loader').fadeOut('slow', function () {
					$(this).remove()
				});
				$('#submit-contact').removeAttr('disabled');
				if (data.match('success') != null) $('#contactform').slideUp('slow');

			}
		);

	});
	return false;
});

// Jquery validate detail page contact form
$('#detail_contact').submit(function () {

	var action = $(this).attr('action');

	$("#message-detail-contact").slideUp(750, function () {
	$('#message-detail-contact').hide();

		$('#submit-message')
			.after('<i class="icon_loading loader"></i>')
			.attr('disabled', 'disabled');

		$.post(action, {
				restaurant_name: $('#restaurant_name').val(),
				name_detail_contact: $('#name_detail_contact').val(),
				email_detail_contact: $('#email_detail_contact').val(),
				telephone_detail_contact: $('#telephone_detail_contact').val(),
				message_detail: $('#message_detail').val()
			},
			function (data) {
				document.getElementById('message-detail-contact').innerHTML = data;
				$('#message-detail-contact').slideDown('slow');
				$('#detail_contact .loader').fadeOut('slow', function () {
					$(this).remove()
				});
				$('#submit-message').removeAttr('disabled');
				if (data.match('success') != null) $('#detail_contact').slideUp('slow');

			}
		);

	});
	return false;
});

/* ]]> */