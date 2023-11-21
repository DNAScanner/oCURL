import {crayon} from "https://deno.land/x/crayon@3.3.3/mod.ts";

const downloadUrl = Deno.args[0] || "";

if (!downloadUrl) {
	console.error("No URL provided");
	Deno.exit(1);
}

const decodedUrl = decodeURIComponent(downloadUrl);
const filename = decodedUrl.split("/").at(-1)?.split("?")[0] || "download";

// Download the (internet) file to a local file.
try {
	Deno.writeFileSync(filename, new Uint8Array(await (await fetch(downloadUrl)).arrayBuffer()));
} catch {
	console.error("Failed to download file");
	Deno.exit(1);
}

console.log(`    ${crayon.green(downloadUrl)}\n -> ${crayon.green((Deno.cwd() + "/" + filename).replaceAll("\\", "/"))}`);
