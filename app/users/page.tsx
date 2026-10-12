export const dynamic = "force-dynamic";

import { getUsers } from "../services/blogs";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div data-testid="users-list" className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="border rounded p-3">
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-gray-600 ml-2">
              ({user.username})
            </span>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-gray-500">No users yet.</p>
        )}
      </div>
    </div>
  );
}
