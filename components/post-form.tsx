"use client";

import { useUser } from "@clerk/nextjs";
import {
  CalendarDaysIcon,
  ImageIcon,
  NewspaperIcon,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { createPostAction } from "@/actions/create-post-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const PostForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const { user } = useUser();
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePostAction = async (formData: FormData) => {
    const data = formData;

    formRef.current?.reset();

    const text = data.get("postInput") as string;

    if (!text.trim()) {
      return;
    }

    setPreview(null);

    try {
      await createPostAction(data);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={formRef}
        className="p-3 bg-white rounded-lg border"
        action={(formData) => handleCreatePostAction(formData)}
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-[#0b63c4] font-medium text-white">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <button type="submit" hidden>
            Post
          </button>
        </div>
        {preview && (
          <div className="mt-3 relative">
            <img src={preview} className="w-full object-cover" />
            <Button
              variant="outline"
              type="button"
              className="absolute p-2 top-2 right-2 rounded-full"
              onClick={() => setPreview(null)}
            >
              <XIcon className="size-5" />
            </Button>
          </div>
        )}
        <div className="flex justify-around mt-2 space-x-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mr-2 size-5 text-blue-600" />
            <p className="text-gray-700/80">Media</p>
          </Button>
          <Button type="button" variant="ghost" disabled>
            <CalendarDaysIcon className="mr-2 size-5 text-yellow-700" />
            <p className="text-gray-700/80">Event</p>
          </Button>
          <Button type="button" variant="ghost" disabled>
            <NewspaperIcon className="mr-2 size-5 text-orange-500" />
            <p className="text-gray-700/80">Article</p>
          </Button>
        </div>
      </form>
      <hr className="mt-2 border-gray-300" />
    </div>
  );
};
