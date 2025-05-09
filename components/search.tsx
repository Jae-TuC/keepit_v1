"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  searchTerm: z.string(),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="w-full max-w-sm sm:max-w-2xl hidden sm:block">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex w-full h-full"
          >
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Search" {...field} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="absolute right-0" variant="ghost">
              <SearchIcon className="size-4 text-muted-foreground" />
            </Button>
          </form>
        </Form>
      </div>
      {/* dialog for mobile search only */}
      {/* <div className="absolute bottom-0 right-0 w-full max-w-sm sm:max-w-2xl  sm:hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex w-full h-full"
          >
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Search" {...field} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="absolute right-0" variant="ghost">
              <SearchIcon className="size-4 text-muted-foreground" />
            </Button>
          </form>
        </Form>
      </div> */}
    </>
  );
};

export default Search;
