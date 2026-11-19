import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import EmptyState from "../components/ui/EmptyState";
import Card from "../components/ui/Card";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <Card>
        <EmptyState
          icon={<Compass size={26} />}
          title="Page not found"
          description="The page you're looking for doesn't exist or may have been moved."
          action={
            <Link to="/" className="btn btn--primary btn--md">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          }
        />
      </Card>

      <style>{`
        .not-found {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 220px);
        }
        .not-found .btn {
          display: inline-flex; align-items: center; gap: var(--space-2);
        }
      `}</style>
    </div>
  );
}