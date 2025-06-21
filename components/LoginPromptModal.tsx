
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LoginPromptModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginPromptModal = ({ isOpen, onOpenChange }: LoginPromptModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <DialogDescription>
            You need to be signed in to subscribe to deal alerts.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
