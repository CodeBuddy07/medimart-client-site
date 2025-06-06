
interface PageHeaderProps {
    heading: string;
    description?: string;
  }
  
  export function PageHeader({ heading, description }: PageHeaderProps) {
    return (
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
    );
  }