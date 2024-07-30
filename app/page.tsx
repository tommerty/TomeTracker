import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
    return redirect("/dashboard");
}
