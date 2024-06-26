import { useEffect } from "react";

const autocompleteOptions = {
  componentRestrictions: { country: "es" },
  type: ["address"]
};

function AutocompleteInput({ className, onPlaceChange, reference }) {

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(reference.current, autocompleteOptions);
    window.google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry?.location) {
        const location = { 
          lat: place.geometry.location.lat(), 
          lng: place.geometry.location.lng(), 
          address: place.formatted_address 
        };
        onPlaceChange(location);
      }
    })

    return () => {
      window.google.maps.event.clearListeners(autocomplete, "place_changed");
    }
  }, []);

  return (
    <div>
      <input ref={reference} type="text" className="p-1 w-52 md:w-[500px] lg:w-[700px] lg:p-2 rounded-lg shadow-lg mt-6" id="autocomplete-input" placeholder="Calle de Guzmán el Bueno 23" />
    </div>
  )
}

AutocompleteInput.defaultProps = {
  className: "",
  onPlaceChange: (location) => console.debug(location)
}

export default AutocompleteInput