import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';



export async function GET(req, { params }) {
  const userId = Number(params.id);  // Obtenir l'ID de l'URL

  try {
    // Récupérer l'utilisateur avec ses images
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { images: true },  // Inclure les images de l'utilisateur
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { name, email, imageUrl } = await req.json();
  const userId = Number(params.id);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        images: {
          updateMany: {
            where: { userId: userId },
            data: { url: imageUrl },
          },
        },
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }, { status: 500 });
  }
}
