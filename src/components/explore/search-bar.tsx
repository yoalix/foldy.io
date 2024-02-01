"use client";

import React, { useEffect, useRef, useState } from "react";

import { useSearch } from "@/hooks/queries/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandShortcut,
} from "../ui/command";
import { CommandLoading } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SearchItem } from "./search-item";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { isFollowing } from "@/lib/utils/isFollowing";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search);
  const { data, isPending } = useSearch(debouncedSearch);
  const { data: currentUser } = useGetCurrentUser();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 75 is the key code for 'k'
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 75) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // if (debouncedSearch.length === 0) {
    //   searchParams.delete();
    //   window.history.pushState(null, "", `?${searchParams}`);
    //   return;
    // }
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", debouncedSearch);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [debouncedSearch]);

  return (
    <Command className="h-full" shouldFilter={false}>
      {/* <Popover open={debouncedSearch.length > 0}> */}
      {/* <PopoverTrigger> */}
      <CommandInput
        ref={inputRef}
        className="text-base"
        placeholder="search people, folders, etc..."
        //   icon={<Search size={18} />}
        value={search}
        onValueChange={setSearch}
        cmd={!isMobile && <CommandShortcut>⌘K</CommandShortcut>}
      />
      {/* </PopoverTrigger> */}
      {/* <PopoverContent className=" max-w-96 md:w-96"> */}
      <CommandList className="h-full max-h-full">
        {!isPending && <CommandEmpty>No results</CommandEmpty>}
        {isPending && (
          <CommandLoading>
            <div className="animate-pulse w-full flex justify-center py-5">
              <img src="/icons/logo.png" height={16} width={16} />
            </div>
          </CommandLoading>
        )}
        {data?.map((user) => {
          return (
            <SearchItem
              key={user.id}
              value={user.id}
              currentUserId={currentUser?.id}
              fullName={user.full_name}
              username={user.username}
              userId={user.id}
              avatarUrl={user.avatar_url}
              folders={user.folders}
              accent="primary"
              buttonText={
                isFollowing(user.id || "", currentUser?.following || [])
                  ? "following"
                  : "follow"
              }
            />
          );
        })}
      </CommandList>
      {/* </PopoverContent>
      </Popover> */}
    </Command>
  );
};
