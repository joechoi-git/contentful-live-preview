import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const refererHeader: string | null = request?.headers?.get("referer");
    const referer = refererHeader && /^(http|https):\/\//.test(refererHeader) ? refererHeader : "/";
    draftMode().disable();
    redirect(referer);
}
