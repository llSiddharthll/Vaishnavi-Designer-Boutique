import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const { paramsToSign } = await request.json();

  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error signing Cloudinary params:", error);
    return NextResponse.json({ error: "Failed to sign Cloudinary params" }, { status: 500 });
  }
}