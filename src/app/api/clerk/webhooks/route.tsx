/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    console.log("Received webhook request...");

    const { data } = await req.json();
    console.log("Data received:", data);

    // Optional chaining to handle potential undefined value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const email = data.email_addresses?.[0]?.email_address;
    const firstname = data.first_name;
    const lastname = data.last_name;
    const imageUrl = data.image_url ?? null; // Handle missing image URL gracefully
    const id = data.id;

    if (!email || !firstname || !lastname || !id) {
      return new Response("Missing required fields", { status: 400 });
    }

    await db.user.create({
      data: {
        id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email_address: email,
        first_name: firstname,
        last_name: lastname,
        imageURL: imageUrl,
      },
    });

    console.log("User added to database successfully.");
    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
