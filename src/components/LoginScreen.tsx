import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Loader2, LogIn, UserPlus } from 'lucide-react';

interface LoginScreenProps {
  onSignIn: (email: string, password: string) => Promise<boolean>;
  onSignUp: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export function LoginScreen({ onSignIn, onSignUp }: LoginScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'login') {
      await onSignIn(email, password);
    } else {
      const success = await onSignUp(email, password, fullName);
      if (success) {
        setMode('login');
        setPassword('');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-apae-blue text-white rounded-2xl flex items-center justify-center shadow-xl shadow-apae-blue/10 mb-4">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Pesquisa PTS CER
          </h1>
          <p className="text-zinc-500 mt-2">
            {mode === 'login' ? 'Acesse sua conta para continuar' : 'Crie uma conta profissional'}
          </p>
        </div>

        <form onSubmit={handleSubmit} aria-label="Formulário de login" className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-5">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {isLoading ? (mode === 'login' ? 'Entrando na conta...' : 'Criando conta...') : ''}
          </div>
          {mode === 'register' && (
            <div className="space-y-2">
              <label htmlFor="login-fullname" className="text-sm font-medium text-zinc-700">Nome completo</label>
              <input
                id="login-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                aria-required="true"
                placeholder="Seu nome profissional"
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-zinc-700">E-mail</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              placeholder="seu@email.com"
              className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="text-sm font-medium text-zinc-700">Senha</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              minLength={6}
              placeholder="Minimo 6 caracteres"
              className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-apae-blue text-white rounded-xl font-medium hover:bg-apae-blue/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-5 h-5" />
                Entrar
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Criar conta
              </>
            )}
          </motion.button>

          <div className="text-center pt-2">
            {mode === 'login' ? (
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Nao tem conta? <span className="font-medium">Criar conta</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Ja tem conta? <span className="font-medium">Entrar</span>
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
