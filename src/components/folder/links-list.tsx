import React from "react";
import Image from "next/image";
import { ListItem } from "@/components/ui/list-item";
import { timeSince } from "@/lib/utils/date";
import { Database } from "@/lib/supabase/database.types";

type Link = Database["public"]["Tables"]["links"]["Row"];

export const LinksList = ({ links }: { links?: Link[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {links?.map((link) => (
        <ListItem
          key={`link-${link.id}-${link.name}`}
          id={link.id}
          title={link.name || ""}
          subtitle={link.url}
          href={link.url}
          rightText={timeSince(new Date(link.updated_at).getTime())}
          icon={
            <Image
              src={"/icons/link.png"}
              alt={link.name || ""}
              width={24}
              height={24}
            />
          }
        />
      ))}
    </div>
  );
};
