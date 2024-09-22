'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        imageUrl,
      }),
    });

    if (res.ok) {
      const newUser = await res.json();
      console.log('Utilisateur créé avec succès:', newUser);
      router.push('/users'); // Redirige vers la liste des utilisateurs
    } else {
      console.error('Erreur lors de la création de l\'utilisateur');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nom :</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email :</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">URL de l'image :</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
