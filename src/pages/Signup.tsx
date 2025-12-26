import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROLE_CONFIGS, UserRole } from '@/types/user';

const Signup = () => {
  const [step, setStep] = useState<'details' | 'role'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters.',
        variant: 'destructive',
      });
      return;
    }

    setStep('role');
  };

  const getRoleDashboardPath = (role: UserRole): string => {
    switch (role) {
      case 'student':
        return '/dashboard/student';
      case 'business':
        return '/dashboard/business';
      case 'founder':
        return '/dashboard/founder';
      default:
        return '/dashboard';
    }
  };

  const handleRoleSelect = async () => {
    if (!selectedRole) {
      toast({
        title: 'Select a role',
        description: 'Please choose your AI experience type.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await signup(email, password, name, selectedRole);
      toast({
        title: 'Welcome to Ma3ak AI!',
        description: `Your ${selectedRole} AI is ready.`,
      });
      navigate(getRoleDashboardPath(selectedRole));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">Ma3ak AI</span>
        </Link>

        {/* Signup Card */}
        <div className="glass-effect rounded-2xl p-8 shadow-elevated">
          {step === 'details' ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Create your account</h1>
                <p className="text-muted-foreground">Start your AI-powered journey</p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full group">
                  Continue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Choose your AI experience</h1>
                <p className="text-muted-foreground">This determines how your AI assistant behaves</p>
              </div>

              <div className="space-y-4 mb-8">
                {ROLE_CONFIGS.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-border/80 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{role.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{role.title}</h3>
                          {selectedRole === role.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setStep('details')}
                >
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  className="flex-1 group"
                  onClick={handleRoleSelect}
                  disabled={!selectedRole || isLoading}
                >
                  {isLoading ? 'Creating...' : 'Get Started'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
