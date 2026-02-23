<script>
window.addEventListener("message", function(e) {
  if (e.data.event === "calendly.event_scheduled") {
    var bookingInformation = e.data.payload.invitee.uri;

    var options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer {Calendly_Token}" // Replace with your own token
      }
    };

    fetch(bookingInformation, options)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        // Push data to dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "calendly_booked", // You can customize the event name
          email: data.resource.email,
          first_name: data.resource.first_name,
          last_name: data.resource.last_name,
          fullname: data.resource.name,
          question: data.resource.questions_and_answers,
          phone_number: data.resource.text_reminder_number,
          timezone: data.resource.timezone,
          utm_source: data.resource.tracking.utm_source,
          utm_medium: data.resource.tracking.utm_medium,
          utm_campaign: data.resource.tracking.utm_campaign
        });
      })
      .catch(function(err) {
        console.error("Error fetching booking information:", err);
      });
  }
});
</script>
