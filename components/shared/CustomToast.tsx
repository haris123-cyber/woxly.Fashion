import { toast } from "sonner";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, XCircle, Info } from "lucide-react";

interface ToastProductData {
  name: string;
  price?: number;
  image?: string;
}

interface ToastVariantData {
  size?: string;
  color?: string;
}

export interface CustomToastProps {
  title: string;
  description?: string;
  product?: ToastProductData;
  variant?: ToastVariantData;
  quantity?: number;
  type?: 'success' | 'error' | 'info';
}

export function showCustomToast(props: CustomToastProps) {
  const type = props.type || 'success';
  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? XCircle : Info;
  const iconColor = type === 'success' ? 'text-[#cfae70]' : type === 'error' ? 'text-red-500' : 'text-blue-500';
  const titleColor = type === 'success' ? 'text-[#cfae70]' : type === 'error' ? 'text-red-500' : 'text-blue-500';

  toast.custom((t) => (
    <div className="flex bg-white text-black p-3 md:p-4 w-[300px] sm:w-[350px] md:w-[400px] shadow-sm font-inter  pointer-events-auto relative ml-auto border border-border">
      {props.product?.image && (
        <div className="relative w-[66px] h-[76px] md:w-[72px] md:h-[96px] shrink-0 bg-white  overflow-hidden border border-border">
          <Image src={props.product.image} alt={props.product.name || ""} fill className="object-cover" />
        </div>
      )}

      <div className="flex flex-col pl-3 md:pl-4 justify-center flex-1 ">
        <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconColor}`} />
          <h4 className={`text-[10px] tracking-[1px] md:text-[12px] uppercase font-bold leading-snug ${titleColor}`}>{props.title}</h4>
        </div>

        {props.description && (
          <p className="text-foreground text-[12px] mb-2 leading-tight pr-4">{props.description}</p>
        )}

        {props.product && (
          <p className="text-foreground tracking-[1px] text-[13px] mb-2 leading-tight">{props.product.name}</p>
        )}

        {props.product?.price && (
          <p className="text-foreground font-bold text-[15px] mb-1">{formatPrice(props.product.price)}</p>
        )}

        {(props.variant?.color || props.variant?.size || props.quantity) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] mt-0">
            {props.variant?.color && (
              <div className="flex gap-1.5">
                <span className="text-black/80">Colour:</span>
                <span className="capitalize font-medium text-black tracking-[1px]">{props.variant.color}</span>
              </div>
            )}
            {props.variant?.size && (
              <div className="flex gap-1.5">
                <span className="text-black/80">Size:</span>
                <span className="uppercase font-medium text-black">{props.variant.size}</span>
              </div>
            )}
            {props.quantity && (
              <div className="flex gap-1.5">
                <span className="text-black/80">Qty:</span>
                <span className="font-medium text-black">{props.quantity}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black p-1 transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </button>
    </div>
  ), {
    duration: 5000,
  });
}
