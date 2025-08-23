import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
  children?: React.ReactNode;
  floating?: boolean;
}

export default function WhatsAppButton({ phoneNumber, className = "", children, floating = false }: WhatsAppButtonProps) {
  const handleClick = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const baseClasses = "whatsapp-glow bg-whatsapp-green text-white rounded-full flex items-center font-semibold hover:bg-green-600 transition-all duration-300";
  const floatingClasses = floating 
    ? "fixed bottom-6 right-6 z-50 w-16 h-16 shadow-2xl hover:scale-110 justify-center" 
    : "space-x-3";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${floatingClasses} ${className}`}
      data-testid="whatsapp-button"
      title={floating ? `WhatsApp: ${phoneNumber}` : undefined}
    >
      <MessageCircle className={floating ? "text-2xl" : "text-2xl"} />
      {!floating && children && <span>{children}</span>}
      {!floating && <span className="text-sm opacity-90">{phoneNumber}</span>}
    </button>
  );
}
