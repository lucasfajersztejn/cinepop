import { useState } from "react";
import { Carousel } from "react-responsive-carousel";


function CinemasCarrousel() {
  const [cinemas, setCinemas] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div>CinemasCarrousel</div>
  )
}

export default CinemasCarrousel;