"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import ArtistSearch from "@/components/reviews/artist-select";
import { useRouter } from "next/navigation";

const Reviews = () => {
  const apiKey = "";
  const artistName = "The Contortionist";
  const albumName = "Exoplanet"; // Replace with the correct album name
  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(
    artistName
  )}&album=${encodeURIComponent(albumName)}&format=json`;

  const router = useRouter();

  const handleClick = () => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Handle the response data here.
        const artistInfo = data.artist;
        console.log(artistInfo);
      })
      .catch((error) => {
        // Handle errors here.
        console.log("Error:", error);
      });
  };

  return (
    <Container>
      <div>Reviews</div>

      <Button onClick={() => router.push("/submit-review")}>
        Submit review
      </Button>
    </Container>
  );
};

export default Reviews;
