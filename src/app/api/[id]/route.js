import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const userId = params.id;

  try {
    // Supprimer d'abord les images associées à l'utilisateur
    await prisma.image.deleteMany({
      where: { userId: Number(userId) },
    });

    // Ensuite, supprimer l'utilisateur
    const deletedUser = await prisma.user.delete({
      where: { id: Number(userId) },
    });

    return NextResponse.json({ message: 'Utilisateur supprimé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'utilisateur' }, { status: 500 });
  }
}


