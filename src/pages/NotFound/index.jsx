import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-24 text-center space-y-6">
      <Container>
        <div className="max-w-md mx-auto space-y-4">
          <span className="text-6xl font-black text-brand-blue">404</span>
          <h1 className="gasoek  text-3xl text-slate-900">Offside! Page Not Found</h1>
          <p className="text-slate-600 text-sm">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="md" icon={Home} className="mt-4">
              Back To Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
