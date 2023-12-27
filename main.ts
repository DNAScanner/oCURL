import {crayon} from "https://deno.land/x/crayon@3.3.3/mod.ts";
import fetchProgress from "https://dnascanner.de/functions/deno/fetchprogress.ts";

const downloadUrl = Deno.args[0] || "";

if (!downloadUrl) {
	console.error("No URL provided");
	Deno.exit(1);
}

const decodedUrl = decodeURIComponent(downloadUrl);
const filename = decodedUrl.split("/").at(-1)?.split("?")[0] || "download";

try {
	await fetchProgress(decodedUrl, filename);
	console.log(`\x1b[1F\x1b[1MDownloaded ${crayon.green(filename)} to ${crayon.green(filename)}`);
	Deno.exit(0);
} catch {
	console.error("Failed to download file");
	Deno.exit(1);
}
