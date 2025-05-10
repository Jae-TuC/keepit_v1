import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { extractFileData } from "@/lib/file-util";
import { toast } from "sonner";

const formSchema = z.object({
  file: z.instanceof(File),
});

const FileModal = () => {
  const { isOpen, type, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

  const generatedUploadUrl = useMutation(api.file.generateFileUploadUrl);
  const uploadFile = useMutation(api.file.uploadFile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(false);
    try {
      setIsLoading(true);

      const postUrl = await generatedUploadUrl();

      const result = await axios.post(postUrl, values.file);
      const { storageId } = result.data;

      const { name, extension, size, type } = extractFileData(values.file);

      const fileObject = {
        name,
        extension,
        size: size,
        type,
        folder: "j57emgyv5tfkjk4j4a0epep3wh7f8yxt" as Id<"folders">,
        storageId: storageId as Id<"_storage">,
        url: "",
      };
      await uploadFile(fileObject);
      toast.success("File uploaded successfully");
      setIsLoading(false);
      onClose();
      form.reset();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error uploading file");
      console.log("ERROR File Upload", error);
    }
  };

  const isModalOpen = isOpen && type === "file";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Upload a file to the cloud storage
          </DialogDescription>
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4 items-center justify-center py-6"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormControl className="flex items-center justify-center gap-2">
                        <Label
                          htmlFor="file"
                          className="flex items-center gap-2 border border-dashed border-muted-foreground p-2 rounded-md size-36"
                        >
                          <UploadCloud className="size-20 text-muted-foreground" />
                          <Input
                            id="file"
                            type="file"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            onBlur={onBlur}
                            name={name}
                            ref={ref}
                            className="hidden"
                          />
                        </Label>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    "w-36 text-background/90 bg-primary mt-8 text-sm",
                    isLoading && "opacity-50"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FileModal;
