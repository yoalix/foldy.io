import React from "react";

export const FolderList = () => {
    const folders = [
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
        {
            title: "My Folder",
            numberOfLinks: 4,
            updated: "2 days ago",
        },
    ]

    return (
        <div>
            {folders.map((folder, i) => (
                <div key={`folder-${i}-${folder.title}`} className="flex w-full items-center gap-3">
                    <img src="./icons/folder.png" alt="folder" width={24} height={24} className="h-[24px]" />
                    <div className="w-full">
                        <h1 className="text-sm">{folder.title}</h1>
                        <p className="text-black-secondary text-sm">{folder.numberOfLinks} links</p>
                    </div>
                    <p className="text-black-secondary text-sm w-full justify-self-end">{folder.updated}</p>
                </div>
            ))}
        </div>
    );
}
