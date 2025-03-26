/*export default async function handler(req, res) {
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
}*/

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { lat, lng } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API;
    const radius = 5000; // Search radius (5km)
    const type = "hospital";

    // Fetch nearby hospitals
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;
    
    try {
        const nearbyResponse = await fetch(nearbyUrl);
        const nearbyData = await nearbyResponse.json();

        if (!nearbyData.results) {
            return res.status(500).json({ error: "No hospitals found." });
        }

        // Fetch details for each hospital using Place Details API
        const hospitals = await Promise.all(nearbyData.results.map(async (hospital) => {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${hospital.place_id}&fields=name,vicinity,rating,formatted_phone_number,website&key=${API_KEY}`;
            
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            return {
                name: detailsData.result.name,
                address: detailsData.result.vicinity,
                rating: detailsData.result.rating || "No rating",
                phone: detailsData.result.formatted_phone_number || "No phone number",
                website: detailsData.result.website || "No website",
            };
        }));

        res.status(200).json({ hospitals });
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

