import React from "react";
import Link from "next/link";
import { ListItem } from "@/components/ui/list-item";

export const FolderList = () => {
    const folders = [
        {
            id: 1,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "1 min",
        },
        {
            id: 2,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "12 min",
        },
        {
            id: 3,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days",
        },
        {
            id: 4,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "1 week",
        },
        {
            id: 5,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "1 week",
        },
        {
            id: 6,
            title: "My Folder",
            numberOfLinks: 4,
            updated: "1 month",
        },
    ];

    return (
        <div className="flex flex-col ">
            {folders.map((folder, i) => (
                <ListItem
                    key={`folder-${folder.id}-${folder.title}`}
                    id={folder.id}
                    title={folder.title}
                    subtitle={`${folder.numberOfLinks} links`}
                    icon="/icons/folder.png"
                    href={`/folder/${folder.id}`}
                    updated={folder.updated}
                />
            ))}
        </div>
    );
};