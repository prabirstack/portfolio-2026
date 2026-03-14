import { Github, Linkedin, X, Mail } from "lucide-react";

export const Socials = () => {
  return (
    <div className="flex gap-4">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="h-5 w-5" />
        <span className="sr-only">Email</span>
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Twitter X</span>
      </a>
    </div>
  );
};
