import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
  onItemClick?: () => void;
}

export const NavDropdown = ({
  label,
  items,
  isActive = false,
  onItemClick,
}: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  return (
    <div className="relative">
      {/* Desktop Trigger */}
      <div className="hidden md:block group relative">
        <button
          className={cn(
            "flex items-center gap-1 text-sm font-medium transition-colors duration-300 relative py-2",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {label}
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          {isActive && (
            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        {/* Desktop Dropdown Menu */}
        <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 border-b border-border last:border-b-0"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "md:hidden flex items-center gap-1 w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors justify-between",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-accent"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-accent rounded-lg mt-2 overflow-hidden border border-border">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border last:border-b-0"
              onClick={handleItemClick}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
