import { useEffect, useRef } from "react";

const autocompleteOptions = {
  componentRestrictions: { country: "es" },
  type: ["address"]
};

function AutocompleteInput({ className, onPlaceChange, ref }) {
  console.log(ref);
  const autocompleteInputRef = ref || useRef();
  

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, autocompleteOptions);
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
      <input ref={autocompleteInputRef} type="text" className="p-1 w-52 md:w-[500px] rounded-lg shadow-lg mt-4" id="autocomplete-input" placeholder="Calle de Guzmán el Bueno 23" />
    </div>
  )
}

AutocompleteInput.defaultProps = {
  className: "",
  onPlaceChange: (location) => console.debug(location)
}

export default AutocompleteInput