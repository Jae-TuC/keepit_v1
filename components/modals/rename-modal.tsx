import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  name: z.string(),
});

const RenameModal = () => {
  const { isOpen, type, onClose, file } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const renameFile = useMutation(api.file.renameFile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: file?.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsLoading(false);
    try {
      setIsLoading(true);
      if (file?._id) {
        renameFile({ id: file._id, name: values.name });
      }
      toast.success("File renamed successfully");
      setIsLoading(false);
      onClose();
      form.reset();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error renaming file");
      console.log("ERROR File Rename", error);
    }
  };

  const isModalOpen = isOpen && type === "rename";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>
          <DialogDescription>Rename your file to a new name</DialogDescription>
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full gap-4 items-center justify-center"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field: { name, ref, onChange } }) => (
                    <FormItem>
                      <FormControl className="flex  gap-2">
                        <Label
                          htmlFor="file"
                          className="w-full inline-flex flex-col items-start gap-2.5 border-muted-foreground rounded-md"
                        >
                          Rename file
                          <Input
                            id="rename"
                            type="text"
                            name={name}
                            ref={ref}
                            onChange={onChange}
                            className=""
                          />
                        </Label>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    "w-36 text-background/90 bg-primary mt-4 text-sm",
                    isLoading && "opacity-50"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? "Renaming..." : "Rename"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
