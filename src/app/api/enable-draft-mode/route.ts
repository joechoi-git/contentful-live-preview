import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request) {
    draftMode().enable();
    redirect("/");
}
