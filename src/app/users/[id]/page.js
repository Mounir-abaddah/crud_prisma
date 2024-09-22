'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDetails({ params }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = params;  // Obtenir l'ID de l'utilisateur à partir des paramètres d'URL

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    }

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Chargement...</div>;  // Affichage pendant le chargement
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Détails de l'utilisateur</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {/* Afficher l'image de l'utilisateur */}
          {user.images && user.images.length > 0 ? (
            <img
              src={user.images[0].url}
              alt={user.name}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <span className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-full">
              Aucune image
            </span>
          )}

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => router.push('/users')}
        >
          Retour à la liste
        </button>
      </div>
    </div>
  );
}
