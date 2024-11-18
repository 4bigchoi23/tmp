// Outputs: /youtube.json
export async function GET() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=48&regionCode=KR&key=${import.meta.env.GG_TOKEN}`);
  return new Response(await response.arrayBuffer());
}
