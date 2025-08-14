
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from "@/integrations/supabase/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export function SubscribeForm() {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationFn: async () => {
//       if (!user || !user.email) throw new Error("User not authenticated or email missing.");
      
//       const { error } = await supabase
//         .from("subscriptions")
//         .insert({ user_id: user.id, email: user.email });

//       if (error) {
//         if (error.code === '23505') { // unique_violation
//           throw new Error("This email is already subscribed.");
//         }
//         throw error;
//       }
//     },
//     onSuccess: () => {
//       toast.success("You've subscribed!", {
//         description: `Alerts for free game deals will be sent to ${user?.email}.`,
//       });
//       queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     }
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutate();
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Subscribe for Deal Alerts</CardTitle>
//         <CardDescription>
//           Get real-time alerts for free game deals delivered straight to your inbox.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <p className="text-sm text-muted-foreground">
//             We will send alerts to the email address associated with your account: <strong>{user?.email}</strong>
//           </p>
//           <Button type="submit" className="w-full" disabled={isPending}>
//             {isPending ? 'Subscribing...' : 'Subscribe'}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
