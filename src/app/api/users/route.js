import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        images: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
  }
}

export async function POST(request) {
  const { name, email, imageUrl } = await request.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        images: {
          create: [{ url: imageUrl }],
        },
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json({ error: "Erreur lors de la création de l'utilisateur" }, { status: 500 });
  }
}


