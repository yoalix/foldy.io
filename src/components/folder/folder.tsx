"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FolderMenu } from "./folder-menu";
import { CreateLink } from "./create-link";
import { LinksList } from "./links-list";
import { LeftArrow } from "@/components/icons/left-arrow";
import { useRouter } from "next/navigation";

export const Folder = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-3 p-8">
            <Button
                className="self-start mb-3 p-0 gap-1"
                variant="ghost"
                onClick={() => router.back()}
            >
                <LeftArrow />
                Back
            </Button>
            <div className="flex gap-3">
                <Avatar className="w-6 h-6">
                    <AvatarImage src="/profile.png" />
                    <AvatarFallback />
                </Avatar>
                <p className="text-black-secondary">@joeyj</p>
            </div>
            <div className="flex items-center gap-3 w-full">
                <img src="/icons/folder.png" width={40} />
                <div className="w-full">
                    <h1 className="text-sm">Raising Money</h1>
                    <p className="text-sm text-black-secondary">143 Links</p>
                </div>
                <FolderMenu />
            </div>
            <p>$0/mo. for followers of this folder</p>
            <p className="text-black-secondary text-sm">
                This could be a description or instructions for a folder from the
                influencer or creator standpoint that has a bunch of followers on the
                platform.
            </p>
            <CreateLink />
            <LinksList />
        </div>
    );
};
