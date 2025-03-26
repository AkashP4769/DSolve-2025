export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { lat, lng } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API;
    const radius = 5000; // Search within 5 km
    const type = "hospital";

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK") {
            return res.status(500).json({ error: "Error fetching hospitals", details: data });
        }

        const hospitals = data.results.map(hospital => ({
            name: hospital.name,
            address: hospital.vicinity,
            rating: hospital.rating || "No rating",
            location: hospital.geometry.location
        }));

        res.status(200).json({ hospitals });
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
