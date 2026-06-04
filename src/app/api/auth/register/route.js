import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    const body = await req.json();

    const { name, email, password } = body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const role = await prisma.role.findFirst();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: role.id,
      },
    });

    return Response.json({
      success: true,
      user,
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });

  }

}