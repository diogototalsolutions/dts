import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PasswordForm } from './password-form';

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <div className="rounded bg-white p-4 shadow-sm">
        <p><strong>Email:</strong> {session?.user.email}</p>
        <p><strong>Função:</strong> {session?.user.role}</p>
      </div>
      <PasswordForm />
    </div>
  );
}
