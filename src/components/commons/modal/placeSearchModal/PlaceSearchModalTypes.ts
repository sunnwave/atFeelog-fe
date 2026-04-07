export type PlaceSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  closeOnOverlayClick?: boolean;

  loading?: boolean;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;

  className?: string;
};
