'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setImageUrl(user.images[0]?.url || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(editingUser);  // Vérifier l'utilisateur en édition
    const res = await fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        imageUrl,
      }),
    });
  
    if (!res.ok) {
      const errorMessage = await res.json();
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', errorMessage);
    } else {
      const updatedUser = await res.json();
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);  // Fermer le formulaire
    }
  };
  
    
    
    
  const handleDelete = async (id) => {
    const res = await fetch(`/api/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      const errorMessage = await res.json();
      console.error('Erreur lors de la suppression de l\'utilisateur:', errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Liste des utilisateurs</h1>

      {editingUser && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Modifier l'utilisateur</h2>
          <form onSubmit={handleUpdate}>
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
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
              Mettre à jour
            </button>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
  <tr key={user.id} className="hover:bg-gray-50">
    <td className="py-2 px-4 border-b">{user.name}</td>
    <td className="py-2 px-4 border-b">{user.email}</td>
    <td className="py-2 px-4 border-b">
      {user.images && user.images.length > 0 ? (
        user.images.map((image) => (
          <img key={image.id} src={image.url} alt={user.name} className="w-16 h-16 rounded-full" />
        ))
      ) : (
        <span>Aucune image disponible</span>
      )}
    </td>
    <td className="py-2 px-4 border-b">
      <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Editer</button>
      <button onClick={() => handeedit(user.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Supprimer</button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}
