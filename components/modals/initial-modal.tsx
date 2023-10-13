"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const createformSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

const inviteFormSchema = z.object({
  link: z.string().min(1, {
    message: "Link is required.",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formCreate = useForm({
    resolver: zodResolver(createformSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const formInvite = useForm({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      link: "",
    },
  });

  const isLoading = formCreate.formState.isSubmitting;

  const onSubmitInvite = (values: z.infer<typeof inviteFormSchema>) => {
    try {
      router.push(`${values.link}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitCreate = async (values: z.infer<typeof createformSchema>) => {
    try {
      await axios.post("/api/servers", values);
      formCreate.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center uppercase ">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "mb-[25px] h-[48px] w-[48px] invert hue-rotate-90 brightness-[80%]",
            },
          }}
        />
        <h1 className="uppercase text-3xl p-5">wurstcord says hello</h1>
        <p className="uppercase text-xl">choose what you want to do</p>

        <div className="w-full flex justify-around mt-14">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-red-700 text-sm font-bold tracking-tight rounded-sm uppercase border-2 border-white m-2 w-2/4 max-w-[330px] h-9 max-h-9 hover:animate-wiggle"
              >
                Join server
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black dark:bg-black dark:text-white p-0">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                  Join server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                  Paste link down below
                </DialogDescription>
              </DialogHeader>
              <Form {...formInvite}>
                <form
                  onSubmit={formInvite.handleSubmit(onSubmitInvite)}
                  className="space-y-8"
                >
                  <div className="space-y-8 px-6">
                    <FormField
                      control={formInvite.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                            Paste link here
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                              placeholder="Enter link"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter className="dark:bg-[#101010] bg-gray-100 px-6 py-4">
                    <Button
                      className="bg-red-700 text-white"
                      disabled={isLoading}
                    >
                      Join
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-red-700 text-sm font-white font-bold tracking-tight rounded-sm uppercase border-2 border-white m-2 w-2/4 max-w-[330px] h-9 max-h-9 hover:animate-wiggle"
              >
                Create server
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black dark:bg-black dark:text-white p-0 overflow-hidden">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                  Create your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                  Give your server a personality with a name and an image. You
                  can always change it later.
                </DialogDescription>
              </DialogHeader>
              <Form {...formCreate}>
                <form
                  onSubmit={formCreate.handleSubmit(onSubmitCreate)}
                  className="space-y-8"
                >
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                      <FormField
                        control={formCreate.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={formCreate.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                            Server name
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                              placeholder="Enter server name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter className="dark:bg-[#101010] bg-gray-100 px-6 py-4">
                    <Button
                      className="bg-red-700 text-white"
                      disabled={isLoading}
                    >
                      Create
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};
