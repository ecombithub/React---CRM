import { useState } from "react";
import { useLogin } from "../Use-auth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import ErrorToast from "../ui/ErrorToast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    login({ username, password },
      {
        onError: (err) => setError(err.message),
        onSuccess: () => setError(null),
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden"
      style={{ backgroundImage: 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)' }}>
      <Card className="w-full max-w-md border border-border/50 shadow-2xl bg-white/80 backdrop-blur-xl relative z-10 rounded-2xl">
        <CardHeader className="space-y-3 text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 mb-2" >
            <img src="https://www.hubsyntax.com/Hubsyntax-logo.png" alt="HubSyntax Logo" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access the workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 mt-6 hover:translate-y-[-2px] transition-all bg-green-500 text-white"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account? Contact your administrator.
              </p>
            </div>

          </form>
        </CardContent>
      </Card>
      <ErrorToast
        message={error}
        duration={4000}
        onClose={() => setError(null)}
      />
    </div>
  );
}