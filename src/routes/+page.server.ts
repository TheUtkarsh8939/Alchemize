export const load = async () => {
    const response = await fetch("https://rsvp.hackclub.community/api/stats?slug=alchemize-ysws", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    return {
        rsvpCount: data.count,
    }
}